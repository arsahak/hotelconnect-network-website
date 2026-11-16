"use client";

import { useState, useTransition } from "react";
import { registerAction, type RegistrationInput } from "@/app/actions/register";
import { buttonClasses } from "@/component/shared/button-styles";
import { Icon } from "@/component/shared/Icon";
import { cn } from "@/lib/cn";
import { hotelTiers, legalDoc, membershipPlans, site } from "@/lib/site";

type Type = RegistrationInput["type"];
type Plan = NonNullable<RegistrationInput["plan"]>;

const field = "h-12 w-full rounded-md border border-line bg-white px-4 text-[0.9375rem] text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500";
const label = "mb-1.5 block text-sm font-medium text-ink-900";

function Chips({ options, value, onChange }: { options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const on = value.includes(option);
        return (
          <button
            key={option}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(on ? value.filter((v) => v !== option) : [...value, option])}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              on ? "border-brass-500 bg-brass-100/70 font-medium text-brass-700" : "border-line bg-white text-ink-700 hover:border-ink-300",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

/** Rooms → price tier (Master Briefing v4): ≤15 small, 16–40 medium, 40+ large. */
function tierFor(rooms: number) {
  if (!rooms || rooms < 1) return null;
  return rooms <= 15 ? hotelTiers[0] : rooms <= 40 ? hotelTiers[1] : hotelTiers[2];
}

/**
 * Sign-up form for hotels and suppliers. Hotels: the 7-field form of Master
 * Briefing v4 (names, KvK, VAT, address + country, rooms → tier, general +
 * billing email, booking URL); no IBAN. Suppliers: company, country, trades,
 * regions and plan. Everyone ticks the T&C box. HotelConnect approves every member.
 */
export function RegisterForm({
  initialType,
  initialPlan,
  regions,
  countries,
  supplierRegions,
  supplierCategories,
  invite,
}: {
  invite?: string;
  initialType: Type;
  initialPlan: Plan;
  regions: string[];
  countries: { code: string; name: string }[];
  supplierRegions: string[];
  supplierCategories: string[];
}) {
  const [type, setType] = useState<Type>(initialType);
  const [plan, setPlan] = useState<Plan>(initialPlan);
  const [categories, setCategories] = useState<string[]>([]);
  const [serviceRegions, setServiceRegions] = useState<string[]>([]);
  const [country, setCountry] = useState("NL");
  const [rooms, setRooms] = useState(0);
  const dutch = country === "NL";
  const tier = tierFor(rooms);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [isPending, startTransition] = useTransition();

  const plans = membershipPlans.filter((p) => p.memberType === "supplier");

  if (done) {
    return (
      <div role="status" className="rounded-xl bg-white p-8 text-center shadow-[0_10px_40px_-18px_rgba(27,22,17,0.35)] ring-1 ring-line">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-moss-100 text-moss-600">
          <Icon name="check" size={26} />
        </span>
        <h2 className="mt-5 font-display text-3xl text-ink-950">Thank you for registering</h2>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] text-ink-500">
          We check every new member. You get an email as soon as your account is approved; then you can sign in with
          your email address and password.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        const form = new FormData(e.currentTarget);
        const get = (k: string) => String(form.get(k) ?? "").trim();
        if (get("password") !== get("password2")) return setError("The two passwords are not the same.");
        if (type === "supplier" && (!categories.length || !serviceRegions.length)) {
          return setError("Choose at least one category and one region.");
        }
        const data: RegistrationInput = {
          type,
          companyName: get("companyName"),
          kvkNumber: get("kvkNumber"),
          contactFirstName: get("contactFirstName"),
          contactLastName: get("contactLastName"),
          email: get("email"),
          phone: get("phone"),
          password: get("password"),
          country,
          acceptTerms: form.get("acceptTerms") === "on",
          ...(type === "hotel"
            ? {
                legalName: get("legalName"),
                vatNumber: get("vatNumber"),
                address: get("address"),
                postalCode: get("postalCode"),
                city: get("city"),
                ...(dutch ? { region: get("region") } : {}),
                rooms: Number(get("rooms")),
                billingEmail: get("billingEmail"),
                bookingUrl: get("bookingUrl"),
              }
            : { categories, regions: serviceRegions, plan, website: get("website"), ...(invite ? { invite } : {}) }),
        };
        startTransition(async () => {
          const res = await registerAction(data);
          if (res.ok) {
            setDone(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else setError(res.error || "Your registration could not be sent.");
        });
      }}
      className="rounded-xl bg-white p-6 shadow-[0_10px_40px_-18px_rgba(27,22,17,0.35)] ring-1 ring-line sm:p-10"
    >
      {invite && type === "supplier" && (
        <p className="mb-6 flex items-start gap-2.5 rounded-md bg-moss-100/70 px-4 py-3 text-sm text-ink-700">
          <Icon name="sparkles" size={17} className="mt-0.5 shrink-0 text-moss-600" />
          A hotel invited you as its trusted partner. Register for free (until 1 May 2028) and it appears under My Partner Hotels.
        </p>
      )}
      <fieldset>
        <legend className={label}>I register as</legend>
        <div className="grid grid-cols-2 gap-2">
          {(["hotel", "supplier"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={type === option}
              onClick={() => setType(option)}
              className={cn(
                "flex h-12 items-center justify-center gap-2 rounded-md border text-sm transition-colors",
                type === option ? "border-brass-500 bg-brass-100/60 font-medium text-brass-700" : "border-line text-ink-700 hover:border-ink-300",
              )}
            >
              <Icon name={option === "hotel" ? "building" : "wrench"} size={17} />
              {option === "hotel" ? "A hotel" : "A supplier"}
            </button>
          ))}
        </div>
      </fieldset>

      {type === "supplier" && (
        <fieldset className="mt-6">
          <legend className={label}>Plan</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {plans.map((p) => {
              const value: Plan = p.id === "supplier-contract" ? "contract" : "commission";
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={plan === value}
                  onClick={() => setPlan(value)}
                  className={cn(
                    "rounded-lg border p-4 text-left transition-colors",
                    plan === value ? "border-brass-500 bg-brass-100/50" : "border-line hover:border-ink-300",
                  )}
                >
                  <span className="block font-medium text-ink-950">{p.name}</span>
                  <span className="mt-1 block text-sm text-brass-700">
                    {p.priceLabel} <span className="text-ink-500">{p.priceNote}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className={type === "hotel" ? undefined : "sm:col-span-2"}>
          <label htmlFor="r-company" className={label}>{type === "hotel" ? "Official hotel name" : "Company name"}</label>
          <input id="r-company" name="companyName" required minLength={2} maxLength={120} className={field} />
        </div>
        {type === "hotel" && (
          <div>
            <label htmlFor="r-legal" className={label}>Legal company name</label>
            <input id="r-legal" name="legalName" maxLength={120} autoComplete="organization" placeholder="e.g. Canal House B.V." className={field} />
          </div>
        )}
        <div>
          <label htmlFor="r-country" className={label}>Country</label>
          <select id="r-country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} className={field}>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="r-kvk" className={label}>{dutch ? "KvK number" : "Company registration number"}</label>
          <input
            id="r-kvk"
            name="kvkNumber"
            required
            {...(dutch
              ? { inputMode: "numeric" as const, pattern: "[0-9 ]{8,10}", title: "8 digits", placeholder: "12345678" }
              : { pattern: "[A-Za-z0-9.\\- ]{4,24}", title: "4–20 letters or digits" })}
            className={field}
          />
        </div>

        {type === "hotel" ? (
          <>
            <div>
              <label htmlFor="r-vat" className={label}>VAT number</label>
              <input id="r-vat" name="vatNumber" required pattern="[A-Za-z]{2}[A-Za-z0-9 .]{2,16}" title="Country code + number, e.g. NL123456789B01" placeholder={`${country}123456789B01`} className={field} />
            </div>
            <div>
              <label htmlFor="r-rooms" className={label}>Number of rooms</label>
              <input
                id="r-rooms"
                name="rooms"
                type="number"
                required
                min={1}
                max={5000}
                inputMode="numeric"
                onChange={(e) => setRooms(Number(e.target.value))}
                aria-describedby="r-rooms-tier"
                className={field}
              />
              <p id="r-rooms-tier" aria-live="polite" className="mt-1 text-xs text-ink-500">
                {tier ? (
                  <>
                    <span className="font-medium text-brass-700">{tier.name}</span> · {tier.price} per year
                  </>
                ) : (
                  "Decides your membership tier."
                )}
              </p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="r-address" className={label}>Street and number</label>
              <input id="r-address" name="address" required autoComplete="street-address" className={field} />
            </div>
            <div>
              <label htmlFor="r-postal" className={label}>Postal code</label>
              <input id="r-postal" name="postalCode" required maxLength={12} autoComplete="postal-code" className={field} />
            </div>
            <div>
              <label htmlFor="r-city" className={label}>City</label>
              <input id="r-city" name="city" required autoComplete="address-level2" className={field} />
            </div>
            {dutch && (
              <div className="sm:col-span-2">
                <label htmlFor="r-region" className={label}>Province</label>
                <select id="r-region" name="region" required defaultValue="" className={field}>
                  <option value="" disabled>
                    Choose…
                  </option>
                  {regions.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="sm:col-span-2">
              <p className={label}>Trades</p>
              <Chips options={supplierCategories} value={categories} onChange={setCategories} />
            </div>
            <div className="sm:col-span-2">
              <p className={label}>Regions you work in</p>
              <Chips options={supplierRegions} value={serviceRegions} onChange={setServiceRegions} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="r-website" className={label}>Website (optional)</label>
              <input id="r-website" name="website" type="url" placeholder="https://" className={field} />
            </div>
          </>
        )}

        <div>
          <label htmlFor="r-first" className={label}>First name (contact person)</label>
          <input id="r-first" name="contactFirstName" required autoComplete="given-name" className={field} />
        </div>
        <div>
          <label htmlFor="r-last" className={label}>Last name</label>
          <input id="r-last" name="contactLastName" autoComplete="family-name" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="r-phone" className={label}>Phone (optional)</label>
          <input id="r-phone" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="r-email" className={label}>General email address</label>
          <input id="r-email" name="email" type="email" required autoComplete="email" className={field} />
          <p className="mt-1 text-xs text-ink-500">You sign in with this address; we also use it for messages from {site.shortName}.</p>
        </div>
        {type === "hotel" && (
          <>
            <div className="sm:col-span-2">
              <label htmlFor="r-billing" className={label}>Billing email address</label>
              <input id="r-billing" name="billingEmail" type="email" required className={field} />
              <p className="mt-1 text-xs text-ink-500">Your yearly invoice goes here. No IBAN needed now.</p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="r-booking" className={label}>Direct booking engine URL</label>
              <input id="r-booking" name="bookingUrl" type="url" placeholder="https://" className={field} />
              <p className="mt-1 text-xs text-ink-500">Guests book with you directly, at 0% commission. You can add it later.</p>
            </div>
          </>
        )}
        <div>
          <label htmlFor="r-password" className={label}>Password</label>
          <input id="r-password" name="password" type="password" required minLength={8} maxLength={72} autoComplete="new-password" className={field} />
        </div>
        <div>
          <label htmlFor="r-password2" className={label}>Repeat password</label>
          <input id="r-password2" name="password2" type="password" required minLength={8} maxLength={72} autoComplete="new-password" className={field} />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-6 rounded-md bg-ember-100 px-4 py-3 text-sm text-ember-600">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-start gap-3 text-sm text-ink-700">
          <input type="checkbox" name="acceptTerms" required className="mt-0.5 size-4 shrink-0 accent-brass-500" />
          <span>
            I agree to the{" "}
            <a href={legalDoc(type === "hotel" ? "terms-hotels" : "terms-suppliers").href} target="_blank" rel="noopener" className="underline underline-offset-4">
              Terms &amp; Conditions
            </a>{" "}
            and{" "}
            <a href={legalDoc("privacy-cookies").href} target="_blank" rel="noopener" className="underline underline-offset-4">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        <button type="submit" disabled={isPending} className={buttonClasses({ size: "lg" })}>
          {isPending ? "Sending…" : "Register"}
          {!isPending && <Icon name="arrow-right" size={17} />}
        </button>
      </div>
    </form>
  );
}

"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { regions } from "@/lib/site";
import { buttonClasses } from "@/component/shared/button-styles";
import { Icon, type IconName } from "@/component/shared/Icon";
import { Select, type SelectOption } from "@/component/shared/Select";

const lookingFor: SelectOption[] = [
  { value: "hotels", label: "Hotels to book", icon: "building" },
  { value: "jobs", label: "Jobs", icon: "briefcase" },
  { value: "suppliers", label: "Suppliers", icon: "users" },
];

const regionOptions: SelectOption[] = [
  { value: "", label: "All regions" },
  ...regions.map((region) => ({ value: region, label: region })),
];

/** The open list lines up with the whole field (icon included), not just the text. */
const listPosition = "-left-[3.75rem] w-[calc(100%_+_5rem)] min-w-64";

/**
 * Search bar under the hero. UI only: it sends the visitor to the
 * hotels / jobs / suppliers page with the chosen filters in the URL.
 */
export function HeroSearch() {
  const router = useRouter();

  return (
    <form
      role="search"
      aria-label="Search the network"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const params = new URLSearchParams();
        const region = String(data.get("region") ?? "");
        const keyword = String(data.get("q") ?? "").trim();
        if (region) params.set("region", region);
        if (keyword) params.set("q", keyword);
        const query = params.toString();
        router.push(`/${data.get("type")}${query ? `?${query}` : ""}`);
      }}
      className="grid gap-1 rounded-xl bg-white p-2.5 text-ink-900 shadow-2xl shadow-ink-950/40 ring-1 ring-white/30 lg:grid-cols-[1fr_1fr_1.25fr_auto] lg:items-center lg:divide-x lg:divide-line lg:p-3"
    >
      <Field icon="search" label="Looking for" htmlFor="search-type">
        <Select
          id="search-type"
          name="type"
          options={lookingFor}
          defaultValue="hotels"
          labelledBy="search-type-label"
          className="mt-0.5"
          listClassName={listPosition}
          // Below: past the field padding. Above: past the label + field padding.
          gap={20}
          gapUp={56}
        />
      </Field>

      <Field icon="map-pin" label="Region" htmlFor="search-region">
        <Select
          id="search-region"
          name="region"
          options={regionOptions}
          defaultValue=""
          labelledBy="search-region-label"
          className="mt-0.5"
          listClassName={listPosition}
          // Below: past the field padding. Above: past the label + field padding.
          gap={20}
          gapUp={56}
        />
      </Field>

      <Field icon="tag" label="Keyword" htmlFor="search-q">
        <input
          id="search-q"
          name="q"
          type="search"
          placeholder="e.g. Amsterdam or chef"
          className={controlClasses}
        />
      </Field>

      <div className="p-2 lg:pl-5">
        <button
          type="submit"
          className={buttonClasses({ size: "lg", className: "h-14 w-full px-8 text-base lg:w-auto" })}
        >
          <Icon name="search" size={19} />
          Search
        </button>
      </div>
    </form>
  );
}

const controlClasses =
  "mt-0.5 w-full bg-transparent text-base font-medium text-ink-900 outline-none placeholder:font-normal placeholder:text-ink-300";

function Field({
  icon,
  label,
  htmlFor,
  children,
}: {
  icon: IconName;
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg px-5 py-4 focus-within:bg-sand/60">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brass-100 text-brass-600">
        <Icon name={icon} size={20} strokeWidth={1.75} />
      </span>
      <div className="relative min-w-0 flex-1">
        <label id={`${htmlFor}-label`} htmlFor={htmlFor} className="block text-[0.8125rem] text-ink-500">
          {label}
        </label>
        {children}
      </div>
    </div>
  );
}

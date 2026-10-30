"use client";

import { useActionState, useRef } from "react";
import { applyToVacancyAction } from "@/app/actions/vacancy";
import { buttonClasses } from "@/component/shared/button-styles";
import { Icon } from "@/component/shared/Icon";
import { cn } from "@/lib/cn";

type State = { ok: boolean; error?: string; sent?: boolean };

const MAX_CV_BYTES = 5 * 1024 * 1024;

const inputClass =
  "h-11 w-full rounded-md border border-line bg-white px-3.5 text-[0.9375rem] text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500";

/**
 * "Apply with your CV": name, email, phone, message and an optional CV.
 * The CV goes straight to the hotel by email and is never stored.
 */
export function JobApplicationForm({ slug, hotelName }: { slug: string; hotelName: string }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [state, formAction, isPending] = useActionState<State, FormData>(
    async (_prev, formData) => {
      const cv = formData.get("cv");
      if (cv instanceof File && cv.size > MAX_CV_BYTES) {
        return { ok: false, error: "Your CV is larger than 5 MB. Please send a smaller file." };
      }
      const res = await applyToVacancyAction(slug, formData);
      return res.ok ? { ok: true, sent: true } : { ok: false, error: res.error };
    },
    { ok: false },
  );

  if (state.sent) {
    return (
      <div role="status" className="flex items-start gap-3 rounded-md bg-moss-100 p-4 text-sm text-moss-600">
        <Icon name="check" className="mt-0.5 shrink-0" />
        <p>
          Thank you! Your application was sent to {hotelName}. They will contact you directly.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div>
          <label htmlFor="apply-name" className="mb-1.5 block text-[0.8125rem] font-medium text-ink-700">
            Name <span className="text-ember-600">*</span>
          </label>
          <input id="apply-name" name="name" required minLength={2} maxLength={100} autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="apply-phone" className="mb-1.5 block text-[0.8125rem] font-medium text-ink-700">
            Phone
          </label>
          <input id="apply-phone" name="phone" type="tel" autoComplete="tel" placeholder="+31 6 12345678" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="apply-email" className="mb-1.5 block text-[0.8125rem] font-medium text-ink-700">
          Email <span className="text-ember-600">*</span>
        </label>
        <input id="apply-email" name="email" type="email" required autoComplete="email" className={inputClass} />
      </div>
      <div>
        <label htmlFor="apply-message" className="mb-1.5 block text-[0.8125rem] font-medium text-ink-700">
          Short message
        </label>
        <textarea
          id="apply-message"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder={`Why would you like to work at ${hotelName}?`}
          className={cn(inputClass, "h-auto py-2.5")}
        />
      </div>
      <div>
        <label htmlFor="apply-cv" className="mb-1.5 block text-[0.8125rem] font-medium text-ink-700">
          CV <span className="font-normal text-ink-500">(PDF or Word, max 5 MB)</span>
        </label>
        <input
          ref={fileRef}
          id="apply-cv"
          name="cv"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="block w-full text-sm text-ink-700 file:mr-3 file:rounded-md file:border-0 file:bg-brass-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-brass-700 hover:file:bg-brass-400/30"
        />
      </div>

      {state.error && (
        <p role="alert" className="rounded-md bg-ember-100 px-4 py-3 text-sm text-ember-600">
          {state.error}
        </p>
      )}

      <button type="submit" disabled={isPending} className={buttonClasses({ size: "lg" })}>
        {isPending ? "Sending…" : "Send application"}
        {!isPending && <Icon name="arrow-right" size={17} />}
      </button>
      <p className="flex items-start gap-2 text-xs text-ink-500">
        <Icon name="shield-check" size={15} className="mt-px shrink-0 text-brass-500" />
        Your details and CV go straight to the hotel. HotelConnect does not store applications.
      </p>
    </form>
  );
}

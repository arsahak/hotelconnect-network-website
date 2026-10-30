"use client";

import { useMember } from "@/component/member/MemberContext";
import { buttonClasses } from "@/component/shared/button-styles";
import { Icon } from "@/component/shared/Icon";
import { JoinButton } from "@/component/shared/JoinButton";
import { memberLoginUrl } from "@/lib/site";

/**
 * Buttons under a voucher in the slideshow (briefing §2.4): "Book now" only for
 * a signed-in supplier; everyone else can become a member or log in.
 */
export function VoucherBookingActions({ voucherId }: { voucherId: string }) {
  const member = useMember();

  if (member) {
    return (
      <a
        href={`/suppliers/vouchers/${encodeURIComponent(voucherId)}/book`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses({})}
      >
        Book now
        <Icon name="arrow-up-right" size={16} />
        <span className="sr-only">(opens the hotel&apos;s booking page in a new tab)</span>
      </a>
    );
  }

  return (
    <>
      <JoinButton>Become a member to book</JoinButton>
      <a href={memberLoginUrl("/suppliers#vouchers")} className={buttonClasses({ variant: "outline" })}>
        Log in to book
      </a>
    </>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button-styles";
import { Icon } from "./Icon";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Opens in a new tab and shows an "external" arrow. */
  external?: boolean;
};

/** A link that looks like a button. Internal links use next/link. */
export function ButtonLink({
  href,
  children,
  variant,
  size,
  className,
  external,
}: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <Icon name="arrow-up-right" size={16} />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

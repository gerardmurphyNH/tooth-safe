"use client";

import { trackOutboundClick } from "@/lib/analytics";

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;        // event_label in GA4 (e.g. "nav_workshop", "footer_workshop")
  href: string;
  children: React.ReactNode;
}

/**
 * TrackedLink — drop-in replacement for <a> on outbound links.
 * Fires a GA4 `outbound_click` event before following the link.
 */
export default function TrackedLink({
  label,
  href,
  children,
  onClick,
  ...props
}: TrackedLinkProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    trackOutboundClick(label, href);
    if (onClick) onClick(e);
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

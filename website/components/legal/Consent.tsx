"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePublicPolicies } from "@/app/features/policy/hook/usePolicy";

// Same query as the site footer, so the policy list is fetched once and
// shared from the React Query cache.
const POLICY_QUERY = {
  sortBy: "createdAt",
  sortOrder: "asc",
  isActive: true,
} as const;

/**
 * Policies are managed in the console and addressed by database id, so the
 * privacy policy has no fixed URL. Find it by title ("Privacy Policy",
 * "Privacy & Data Protection Policy", …). Returns null until it loads or if
 * no active policy has "privacy" in its title.
 */
export function usePrivacyPolicyHref(): string | null {
  const { data } = usePublicPolicies(POLICY_QUERY);
  const policy = data?.data?.find((p) => /privacy/i.test(p.title ?? ""));
  return policy ? `/policy/details/${policy._id}` : null;
}

/** "Privacy Policy" link (opens in a new tab so form input isn't lost). */
export function PrivacyPolicyLink({ className }: { className?: string }) {
  const href = usePrivacyPolicyHref();
  if (!href) return <span className={className}>Privacy Policy</span>;
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("underline underline-offset-2 hover:opacity-80", className)}
      onClick={(e) => e.stopPropagation()}
    >
      Privacy Policy
    </Link>
  );
}

/**
 * The consent sentences shown next to each form's checkbox. "Privacy
 * Policy." (as a link) is appended after each one. The same text is sent to
 * the backend and stored with the submission as proof of what the person
 * agreed to, so if you reword one, new submissions record the new wording.
 */
export const CONSENT_TEXT = {
  enquiry:
    "I consent to Vipprow using the details above to respond to my enquiry, including contacting me by phone, WhatsApp or email, as described in the",
  career:
    "I consent to Vipprow using my name and resume to assess my job application, as described in the",
  newsletter:
    "I agree to receive Vipprow's newsletter by email and can unsubscribe at any time. See our",
} as const;

/** Fields to add to a form's request body so the backend records consent. */
export function consentFields(text: string) {
  return { consent: true, consentText: `${text} Privacy Policy.` };
}

/**
 * Required consent checkbox for forms that collect personal data (DPDP Act).
 * Uses the native `required` attribute, so the browser blocks submission and
 * shows its own "please tick this box" message until it is checked.
 */
export function ConsentCheckbox({
  checked,
  onChange,
  text,
  className,
  accentColor = "#2563eb",
  linkClassName,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** One of CONSENT_TEXT; the Privacy Policy link is appended after it. */
  text: string;
  className?: string;
  accentColor?: string;
  linkClassName?: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-2.5 text-left text-xs leading-relaxed text-muted-foreground",
        className,
      )}
    >
      <input
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer"
        style={{ accentColor }}
      />
      <span>
        {text} <PrivacyPolicyLink className={linkClassName} />.
      </span>
    </label>
  );
}

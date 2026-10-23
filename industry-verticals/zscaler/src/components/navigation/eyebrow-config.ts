// Hand-refined from the header-kit output (measured on https://www.zscaler.com). Hardcoded on purpose: the demo's eyebrow bar is not CMS driven.
// Do not re-run harness/scripts/header-kit.mjs for the eyebrow: it would overwrite the announcement bar added here.
export const eyebrowConfig: {
  announcement: { text: string; cta: { label: string; href: string } } | null;
  links: { label: string; href: string }[];
  phone: { label: string; href: string } | null;
  cta: { label: string; href: string } | null;
  search: boolean;
} = {
  announcement: {
    text: 'Zscaler ThreatLabz 2026 Ransomware Report',
    cta: {
      label: 'Download Now',
      href: 'https://www.zscaler.com/campaign/threatlabz-ransomware-report',
    },
  },
  links: [
    { label: 'Request a demo', href: '/request-a-demo' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'Sign In', href: 'https://admin.zscaler.net' },
  ],
  phone: null,
  cta: null,
  search: true,
};

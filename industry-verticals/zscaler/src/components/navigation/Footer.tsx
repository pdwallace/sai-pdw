'use client';

import { JSX } from 'react';
import NextLink from 'next/link';
import {
  Field,
  ImageField,
  LinkField,
  Link,
  Text,
  RichTextField,
  RichText,
  NextImage,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  Image1: ImageField;
  Title1: Field<string>;
  Text1: RichTextField;
  Title2: Field<string>;
  Text2: RichTextField;
  Title3: Field<string>;
  Text3: RichTextField;
  Title4: Field<string>;
  Text4: RichTextField;
  Copyright: Field<string>;
  Link1: LinkField;
  Link2: LinkField;
  SocialsTitle: Field<string>;
  SocialLink1: LinkField;
  SocialIcon1: ImageField;
  SocialLink2: LinkField;
  SocialIcon2: ImageField;
  SocialLink3: LinkField;
  SocialIcon3: ImageField;
}

export type FooterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component component-spaced footer ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <div className="content">
          <div className="logo">
            <NextImage
              field={props.fields?.Image1}
              width={200}
              height={200}
              className="img-fluid"
            />
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 row-gap-5 gx-5">
            <div className="col">
              <div className="title">
                <Text field={props.fields?.Title1} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text1} />
              </div>
            </div>
            <div className="col">
              <div className="title">
                <Text field={props.fields?.Title2} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text2} />
              </div>
            </div>
            <div className="col">
              <div className="title">
                <Text field={props.fields?.Title3} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text3} />
              </div>
            </div>
            <div className="col">
              <div className="title">
                <Text field={props.fields?.Title4} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text4} />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="footnote">
          <Text field={props.fields?.Copyright} />
          <div className="privacy-links">
            <Link field={props.fields?.Link1} />
            <Link field={props.fields?.Link2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const WithSocials = (props: FooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component component-spaced footer with-socials ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="content">
          <div className="logo">
            <NextImage
              field={props.fields?.Image1}
              width={200}
              height={200}
              className="img-fluid"
            />
          </div>
          <div className="row row-cols-1 row-cols-md-3 row-gap-5 gx-5">
            <div className="col">
              <div className="title eyebrow-accent">
                <Text field={props.fields?.Title1} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text1} />
              </div>
            </div>
            <div className="col">
              <div className="title eyebrow-accent">
                <Text field={props.fields?.Title2} />
              </div>
              <div className="links">
                <RichText field={props.fields?.Text2} />
              </div>
            </div>
            <div className="col">
              <div className="title eyebrow-accent">
                <Text field={props.fields?.SocialsTitle} />
              </div>
              <div className="links links-socials">
                <Link field={props.fields?.SocialLink1}>
                  <NextImage field={props.fields?.SocialIcon1} width={16} height={16} />
                </Link>
                <Link field={props.fields?.SocialLink2}>
                  <NextImage field={props.fields?.SocialIcon2} width={16} height={16} />
                </Link>
                <Link field={props.fields?.SocialLink3}>
                  <NextImage field={props.fields?.SocialIcon3} width={16} height={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="footnote">
          <Text field={props.fields?.Copyright} />
          <div className="privacy-links">
            <Link field={props.fields?.Link1} />
            <Link field={props.fields?.Link2} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ZscalerFooterLink {
  label: string;
  href: string;
}

interface ZscalerFooterColumn {
  title: string;
  links: ZscalerFooterLink[];
}

const ZSCALER_SITE = 'https://www.zscaler.com';

// Link columns of the live zscaler.com footer. Pages that exist in this demo link internally.
const ZSCALER_FOOTER_COLUMNS: ZscalerFooterColumn[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Zscaler Platform', href: '/platform' },
      { label: 'AI Security', href: `${ZSCALER_SITE}/platform/ai-security` },
      { label: 'Data Security', href: `${ZSCALER_SITE}/platform/data-protection` },
      { label: 'SecOps', href: `${ZSCALER_SITE}/platform/secops` },
      { label: 'Product & Solutions', href: '/solutions' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Zscaler', href: '/company' },
      { label: 'Zscaler FAQ', href: `${ZSCALER_SITE}/faq` },
      { label: 'Leadership', href: `${ZSCALER_SITE}/company/leadership` },
      { label: 'Careers', href: `${ZSCALER_SITE}/careers` },
      { label: 'Investors', href: 'https://ir.zscaler.com' },
    ],
  },
  {
    title: 'Popular Links',
    links: [
      { label: 'Red Canary', href: `${ZSCALER_SITE}/products-and-solutions/red-canary` },
      { label: 'Community', href: 'https://community.zscaler.com' },
      { label: 'Analysts', href: `${ZSCALER_SITE}/analyst-reports` },
      { label: 'News', href: `${ZSCALER_SITE}/press` },
      { label: 'Zenith Live', href: 'https://www.zenithlive.com' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'ThreatLabz Research', href: `${ZSCALER_SITE}/threatlabz` },
      { label: 'Resource Library', href: '/resources' },
      { label: 'Blog', href: '/blogs' },
      { label: 'Webinars', href: `${ZSCALER_SITE}/resources/webinars` },
      { label: 'Zpedia Articles', href: '/zpedia' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Support', href: `${ZSCALER_SITE}/support` },
      { label: 'Help Portal', href: 'https://help.zscaler.com' },
      { label: 'Security Advisories', href: `${ZSCALER_SITE}/trust/security-advisories` },
      { label: 'Disclose a Vulnerability', href: `${ZSCALER_SITE}/disclosure-policy` },
      { label: 'Security Risk Assessments', href: `${ZSCALER_SITE}/security-risk-assessment` },
    ],
  },
];

const isInternalHref = (href: string): boolean => href.startsWith('/');

/** Deep navy footer with the five live link columns, logo above and legal line below. */
export const Zscaler = (props: FooterProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component footer variant-zscaler ${sxaStyles}`} id={id ? id : undefined}>
      <div className="zs-footer-inner">
        <div className="zs-footer-logo">
          <NextImage field={props.fields?.Image1} width={160} height={40} />
        </div>
        <nav className="zs-footer-columns" aria-label="Footer">
          {ZSCALER_FOOTER_COLUMNS.map((column) => (
            <div className="zs-footer-column" key={column.title}>
              <p className="zs-footer-title">{column.title}</p>
              <ul className="zs-footer-links">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {isInternalHref(link.href) ? (
                      <NextLink href={link.href}>{link.label}</NextLink>
                    ) : (
                      <a href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="zs-footer-legal">
          <Text field={props.fields?.Copyright} tag="span" />
          <span className="zs-footer-privacy">
            <Link field={props.fields?.Link1} />
            <Link field={props.fields?.Link2} />
          </span>
        </div>
      </div>
    </div>
  );
};

'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  RichTextField,
  Text,
  RichText,
  Link,
  LinkField,
  useSitecore,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { DottedAccent } from 'components/non-sitecore/DottedAccent';
import { IconAccent } from 'components/non-sitecore/IconAccent';
import useVisibility from 'src/hooks/useVisibility';

interface Fields {
  Eyebrow: Field<string>;
  Title: Field<string>;
  Text: RichTextField;
  Link: LinkField;
  Image: ImageField;
  Icon: ImageField;
}

export type CtaBannerProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: CtaBannerProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const [isVisible, domRef] = useVisibility();
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component cta-banner component-spaced ${sxaStyles}`}
      id={id ? id : undefined}
      ref={domRef}
    >
      <div className="container container-widest-fluid">
        <div className="container">
          <div className="row row-gap-4 main-content align-items-center">
            <div className="col-lg-6">
              <IconAccent image={props.fields.Icon} inverted />
              <div className="content-wrapper">
                <h6 className="eyebrow-accent">
                  <Text field={props.fields.Eyebrow} />
                </h6>
                <h1 className="display-4 fw-bold mb-3">
                  <Text field={props.fields.Title} />
                </h1>
                <div className="fs-5">
                  <RichText field={props.fields.Text} className="text-content" />

                  {(isPageEditing || props.fields?.Link?.value?.href) && (
                    <Link field={props.fields.Link} className="button button-main mt-3" />
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-10 mx-auto col-lg-6 mx-lg-0">
              <div className="image-wrapper">
                <DottedAccent className="dotted-accent-top" />
                <NextImage
                  field={props.fields.Image}
                  className={`d-block mx-lg-auto img-fluid ${
                    !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
                  }`}
                  width={800}
                  height={800}
                />
                <DottedAccent className="dotted-accent-bottom" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LargeImage = (props: CtaBannerProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const [isVisible, domRef] = useVisibility();
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component cta-banner component-spaced with-large-image with-dotted-accents ${sxaStyles}`}
      id={id ? id : undefined}
      ref={domRef}
    >
      <div className="container container-widest-fluid">
        <div className="row row-gap-4 main-content align-items-center">
          <div className="col-lg-6">
            <div className="content-column">
              <IconAccent image={props.fields.Icon} inverted />
              <div className="content-wrapper">
                <h6 className="eyebrow-accent">
                  <Text field={props.fields.Eyebrow} />
                </h6>
                <h1 className="display-4 fw-bold mb-3">
                  <Text field={props.fields.Title} />
                </h1>
                <div className="fs-5">
                  <RichText field={props.fields.Text} className="text-content" />

                  {(isPageEditing || props.fields?.Link?.value?.href) && (
                    <Link field={props.fields.Link} className="button button-main mt-3" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-10 mx-auto col-lg-6 mx-lg-0">
            <div className="image-wrapper">
              <DottedAccent className="dotted-accent-top" />
              <NextImage
                field={props.fields.Image}
                className={`d-block mx-lg-auto img-fluid ${
                  !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
                }`}
                width={850}
                height={850}
              />
              <DottedAccent className="dotted-accent-bottom" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Dark image panel with a glass card; falls back to the navy brand background when no image is set. */
export const Zscaler = (props: CtaBannerProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { Eyebrow, Title, Text: body, Link: cta, Image } = props.fields || ({} as Fields);
  const hasImage = Boolean(Image?.value?.src);

  return (
    <div
      className={`component cta-banner variant-zscaler ${hasImage ? 'has-image' : ''} ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="zs-cta-frame">
        {(hasImage || isPageEditing) && (
          <NextImage field={Image} className="zs-cta-bg" width={1600} height={700} />
        )}
        <div className="zs-cta-panel">
          {(isPageEditing || Eyebrow?.value) && (
            <p className="zs-eyebrow">
              <Text field={Eyebrow} />
            </p>
          )}
          <h2 className="zs-cta-title">
            <Text field={Title} />
          </h2>
          {(isPageEditing || body?.value) && (
            <div className="zs-cta-text">
              <RichText field={body} />
            </div>
          )}
          {(isPageEditing || cta?.value?.href) && <Link field={cta} className="zs-btn" />}
        </div>
      </div>
    </div>
  );
};

/** Gradient newsletter band: heading, email field with mint Subscribe button, privacy line. */
export const ZscalerSubscribe = (props: CtaBannerProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { Title, Text: body, Link: cta } = props.fields || ({} as Fields);

  return (
    <div
      className={`component cta-banner variant-zscaler zs-subscribe ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="zs-subscribe-panel">
        <h2 className="zs-subscribe-title">
          <Text field={Title} />
        </h2>
        <form className="zs-subscribe-form" onSubmit={(event) => event.preventDefault()}>
          <input
            type="email"
            className="zs-subscribe-input"
            placeholder="Email Address"
            aria-label="Email Address"
          />
          {(isPageEditing || cta?.value?.href) && <Link field={cta} className="zs-btn" />}
        </form>
        {(isPageEditing || body?.value) && (
          <div className="zs-subscribe-legal">
            <RichText field={body} />
          </div>
        )}
      </div>
    </div>
  );
};

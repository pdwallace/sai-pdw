'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Link,
  useSitecore,
  Placeholder,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import useVisibility from 'src/hooks/useVisibility';

interface Fields {
  Title1: Field<string>;
  Text1: Field<string>;
  Image1: ImageField;
  Link1: LinkField;
  Title2: Field<string>;
  Text2: Field<string>;
  Image2: ImageField;
  Link2: LinkField;
}

export type TwoColumnCtaProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: TwoColumnCtaProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;

  const Column = ({
    image,
    title,
    text,
    link,
    placeholder,
    delay,
  }: {
    image: ImageField;
    title: Field<string>;
    text: Field<string>;
    link: LinkField;
    placeholder: string;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);
    const buttonStyle = props.params?.ButtonStyle
      ? `button-${props.params.ButtonStyle.toLowerCase()}`
      : 'button-main';

    return (
      <div
        className={`col-sm-12 col-lg-6 ${
          !isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''
        }`}
        ref={domRef}
      >
        <div className="content-wrapper">
          <NextImage field={image} width={800} height={800} />
          {(isPageEditing || title?.value) && (
            <h2>
              <Text field={title} />
            </h2>
          )}
          {(isPageEditing || text?.value) && (
            <p>
              <Text field={text} />
            </p>
          )}
          {(isPageEditing || link?.value?.href) && (
            <Link field={link} className={`button ${buttonStyle}`} />
          )}
          <Placeholder name={placeholder} rendering={props.rendering} />
        </div>
      </div>
    );
  };

  return (
    <div className={`component two-column-cta pb-5 ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <div className="row">
          <Column
            image={props.fields.Image1}
            title={props.fields.Title1}
            text={props.fields.Text1}
            link={props.fields.Link1}
            placeholder="two-col-placeholder-left"
            delay={0}
          />
          <Column
            image={props.fields.Image2}
            title={props.fields.Title2}
            text={props.fields.Text2}
            link={props.fields.Link2}
            placeholder="two-col-placeholder-right"
            delay={500}
          />
        </div>
      </div>
    </div>
  );
};

const ZSCALER_CARD_SLOTS = [1, 2] as const;

/** Two linked cards side by side: image, headline, teaser, arrow link. */
export const Zscaler = (props: TwoColumnCtaProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const fields = props.fields || ({} as Fields);

  return (
    <div
      className={`component two-column-cta variant-zscaler ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="zs-two-inner">
        {ZSCALER_CARD_SLOTS.map((n) => {
          const title = fields[`Title${n}` as keyof Fields] as Field<string> | undefined;
          const text = fields[`Text${n}` as keyof Fields] as Field<string> | undefined;
          const image = fields[`Image${n}` as keyof Fields] as ImageField | undefined;
          const link = fields[`Link${n}` as keyof Fields] as LinkField;
          if (!isPageEditing && !title?.value) return null;

          return (
            <div className="zs-two-card" key={n}>
              {(isPageEditing || image?.value?.src) && (
                <NextImage field={image} className="zs-two-img" width={720} height={400} />
              )}
              <div className="zs-two-body">
                <h3 className="zs-two-title">
                  <Text field={title} />
                </h3>
                {(isPageEditing || text?.value) && (
                  <p className="zs-two-text">
                    <Text field={text} />
                  </p>
                )}
                {(isPageEditing || link?.value?.href) && <Link field={link} className="zs-link" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

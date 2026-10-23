'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  Link,
  LinkField,
  NextImage,
  RichText,
  RichTextField,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  Eyebrow: Field<string>;
  Text: RichTextField;
  Link: LinkField;
  Image1: ImageField;
  Title1: Field<string>;
  Text1: Field<string>;
  Title2: Field<string>;
  Text2: Field<string>;
}

export type FeaturesProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FeaturesProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`component features component-spaced ${sxaStyles}`} id={id ? id : undefined}>
      <div className="container">
        <div className="info">
          <div className="eyebrow-accent">
            <Text field={props.fields?.Eyebrow} />
          </div>
          <div className="tagline">
            <RichText field={props.fields?.Text} />
          </div>
          <div className="button button-main">
            <Link field={props.fields?.Link} />
          </div>
        </div>
        <div className="items">
          <div className="item left">
            <div className="icon">
              <NextImage field={props.fields?.Image1} width={32} height={32} />
            </div>
            <div className="title">
              <Text field={props.fields?.Title1} />
            </div>
            <p className="subtitle">
              <Text field={props.fields?.Text1} />
            </p>
          </div>
          <div className="item right">
            <div className="title">
              <Text field={props.fields?.Title2} />
            </div>
            <p className="subtitle">
              <Text field={props.fields?.Text2} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

type ZscalerFeatureLayout = 'image-right' | 'image-left' | 'stacked';

const ZscalerFeature = ({
  props,
  layout,
}: {
  props: FeaturesProps;
  layout: ZscalerFeatureLayout;
}): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { Eyebrow, Text: body, Link: cta, Image1 } = props.fields || ({} as Fields);
  const hasImage = Boolean(Image1?.value?.src);

  return (
    <div
      className={`component features variant-zscaler zs-feature-${layout} ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="zs-feature-inner">
        <div className="zs-feature-copy">
          {(isPageEditing || Eyebrow?.value) && (
            <p className="zs-eyebrow">
              <Text field={Eyebrow} />
            </p>
          )}
          <div className="zs-feature-text">
            <RichText field={body} />
          </div>
          {(isPageEditing || cta?.value?.href) && <Link field={cta} className="zs-btn" />}
        </div>
        {(isPageEditing || hasImage) && (
          <div className="zs-feature-media">
            <NextImage field={Image1} className="zs-feature-img" width={900} height={640} />
          </div>
        )}
      </div>
    </div>
  );
};

export const Zscaler = (props: FeaturesProps): JSX.Element => (
  <ZscalerFeature props={props} layout="image-right" />
);

export const ZscalerImageRight = (props: FeaturesProps): JSX.Element => (
  <ZscalerFeature props={props} layout="image-right" />
);

export const ZscalerImageLeft = (props: FeaturesProps): JSX.Element => (
  <ZscalerFeature props={props} layout="image-left" />
);

/** Centred copy above a wide product screenshot. */
export const ZscalerSocIntegration = (props: FeaturesProps): JSX.Element => (
  <ZscalerFeature props={props} layout="stacked" />
);

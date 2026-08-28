import React, { JSX } from "react";
import {
  RichText as ContentSdkRichText,
  RichTextField,
  Text,
  TextField,
} from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

interface Fields {
  SEConfidence: TextField;
  OpportunityName: TextField;
}

type OpportunityDetailProps = ComponentProps & {
  fields: Fields;
};

export const Default = ({
  params,
  fields,
  page,
}: OpportunityDetailProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = params;

  const SEConfidenceField =
    fields?.SEConfidence ?? (page.layout.sitecore.route?.fields?.SEConfidence as TextField);
  const OpportunityNameField =
    fields?.['Opportunity Name'] ?? (page.layout.sitecore.route?.fields?.['Opportunity Name'] as TextField);


  return (
    <div className={`component content ${styles}`} id={id}>
      <section>
        <h1>Opportunity Detail</h1>
        <div>Opportunity Name: {OpportunityNameField ? <Text field={OpportunityNameField} /> : ""}</div>
        <div>SE Confidence: {SEConfidenceField ? <Text field={SEConfidenceField} /> : ""}</div>
      </section>
    </div>
  );
};

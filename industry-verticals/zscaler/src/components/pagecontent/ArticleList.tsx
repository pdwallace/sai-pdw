'use client';

import React, { JSX } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  Text,
  RichTextField,
  withDatasourceCheck,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';

interface Fields {
  Title: Field<string>;
  Excerpt: Field<string>;
  Content: RichTextField;
  Thumbnail: ImageField;
  BackgroundImage: ImageField;
  Name: Field<string>;
  Photo: ImageField;
  Position: Field<string>;
}

export type ArticleListItemProps = {
  fields: Fields;
  name: string;
  url: string;
};

interface ArticleListComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    items: ArticleListItemProps[];
  };
}

const getNewsItems = (items: ArticleListItemProps[], numOfItems: number) => {
  return items
    ?.filter((item) => item.name !== 'Data' && item.name !== 'Authors')
    .slice(0, numOfItems || undefined);
};

const getAllArticlesPageHref = (items: ArticleListItemProps[]) => {
  return items?.find((item) => item.name === 'Data')?.url.replace(/\/Data$/, '') || '#';
};

const ArticleListDefault = (props: ArticleListComponentProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const newsItems = getNewsItems(props.fields?.items, parseInt(props.params?.NumberOfItems));

  return (
    <div
      className={`component article-list ${props.params?.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="background p-3 p-sm-5">
          {newsItems?.map((item, i) => (
            <React.Fragment key={item.url}>
              <div
                className={`row gx-5 row-gap-3 align-items-center ${
                  i % 2 !== 0 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="col-lg-4">
                  <NextImage field={item.fields.Thumbnail} width={400} height={300} />
                </div>

                <div className="col-lg-8">
                  <h3 className="fs-4">
                    <Text field={item.fields.Title}></Text>
                  </h3>
                  <p className="article-excerpt fs-5">
                    <Text field={item.fields.Excerpt}></Text>
                  </p>
                  <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
                    <Link href={item.url} className="button button-secondary">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
              {i === newsItems.length - 1 ? <></> : <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const ArticleListThreeColumn = (props: ArticleListComponentProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const newsItems = getNewsItems(props.fields?.items, parseInt(props.params?.NumberOfItems));
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component component-spaced article-list ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row row-gap-3">
          {newsItems?.map((item) => (
            <div className="col-lg-4" key={item.url}>
              <Link href={item.url} className="wrapper-link">
                <NextImage field={item.fields.Thumbnail} width={400} height={300} />
                <h3 className="fs-4 mt-3">
                  <Text field={item.fields.Title}></Text>
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ArticleListSimplified = (props: ArticleListComponentProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const newsItems = getNewsItems(props.fields?.items, parseInt(props.params?.NumberOfItems));
  const allArticlesPageHref = getAllArticlesPageHref(props.fields?.items);
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component component-spaced article-list ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col">
            <div className="title display-6">News</div>
          </div>
          <div className="col-auto learn-more">
            <Link href={allArticlesPageHref} className="button button-simple">
              See All <i className="fa fa-angle-right fs-4" />
            </Link>
          </div>
        </div>

        <div className="background p-3 p-sm-5">
          {newsItems?.map((item, i) => (
            <React.Fragment key={item.url}>
              <div className="row gx-5 row-gap-3 align-items-center">
                <div className="col-lg-4">
                  <NextImage field={item.fields.Thumbnail} width={400} height={300} />
                </div>

                <div className="col-lg-6">
                  <h3 className="fs-4">
                    <Text field={item.fields.Title}></Text>
                  </h3>
                  <p>
                    <Text field={item.fields.Excerpt}></Text>
                  </p>
                  <Link href={item.url} className="button button-simple">
                    Read More
                  </Link>
                </div>
              </div>
              {i === newsItems.length - 1 ? <></> : <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const ArticleListGrid = (props: ArticleListComponentProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const newsItems = getNewsItems(props.fields?.items, parseInt(props.params?.NumberOfItems));
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div
      className={`component component-spaced article-list ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="container container-wide">
        <div className="article-list-grid">
          {newsItems?.map((item) => (
            <div className="article-grid-item" key={item.url}>
              <Link href={item.url} className="wrapper-link">
                <NextImage field={item.fields.Thumbnail} width={800} height={400} />
                <h3 className="fs-4 mt-3">
                  <Text field={item.fields.Title}></Text>
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Default = withDatasourceCheck()<ArticleListComponentProps>(ArticleListDefault);
export const ThreeColumn = withDatasourceCheck()<ArticleListComponentProps>(ArticleListThreeColumn);
export const Simplified = withDatasourceCheck()<ArticleListComponentProps>(ArticleListSimplified);
export const Grid = withDatasourceCheck()<ArticleListComponentProps>(ArticleListGrid);

const ZSCALER_FEATURED_PREFIX = 'featured-';

const isZscalerFeatured = (item: ArticleListItemProps): boolean =>
  item.name?.startsWith(ZSCALER_FEATURED_PREFIX);

type ZscalerArticleLayout = 'latest' | 'featured' | 'tiles' | 'topics';

const selectZscalerArticles = (
  props: ArticleListComponentProps,
  layout: ZscalerArticleLayout
): ArticleListItemProps[] => {
  const items = getNewsItems(props.fields?.items || [], parseInt(props.params?.NumberOfItems)) || [];
  if (layout === 'featured') return items.filter(isZscalerFeatured);
  if (layout === 'latest') return items.filter((item) => !isZscalerFeatured(item));
  return items;
};

const ZscalerArticleCard = ({ item }: { item: ArticleListItemProps }): JSX.Element => {
  const { Title, Excerpt, Thumbnail } = item.fields || ({} as Fields);

  return (
    <Link href={item.url} className="zs-article-card">
      {Thumbnail?.value?.src && (
        <NextImage field={Thumbnail} className="zs-article-img" width={640} height={300} />
      )}
      <span className="zs-article-body">
        {Excerpt?.value && (
          <span className="zs-article-meta">
            <Text field={Excerpt} />
          </span>
        )}
        <span className="zs-article-title">
          <Text field={Title} />
        </span>
      </span>
    </Link>
  );
};

const ZscalerArticles = ({
  props,
  layout,
}: {
  props: ArticleListComponentProps;
  layout: ZscalerArticleLayout;
}): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const articles = selectZscalerArticles(props, layout);
  const sxaStyles = `${props.params?.styles?.trimEnd() || ''}`;

  return (
    <div
      className={`component article-list variant-zscaler zs-articles-${layout} ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <div className="zs-articles-inner">
        {articles.map((item) =>
          layout === 'tiles' ? (
            <Link href={item.url} className="zs-tile" key={item.url}>
              {item.fields?.Excerpt?.value && (
                <span className="zs-tag">
                  <Text field={item.fields.Excerpt} />
                </span>
              )}
              <span className="zs-tile-title">
                <Text field={item.fields?.Title} />
              </span>
            </Link>
          ) : (
            <ZscalerArticleCard item={item} key={item.url} />
          )
        )}
      </div>
    </div>
  );
};

/** Latest posts grid: thumbnail, meta line and headline. Featured posts are listed separately. */
export const Zscaler = withDatasourceCheck()<ArticleListComponentProps>(
  (props: ArticleListComponentProps) => <ZscalerArticles props={props} layout="latest" />
);

/** Resource tiles: type chip plus headline, for the Resources and Zpedia indexes. */
export const ZscalerResourceTiles = withDatasourceCheck()<ArticleListComponentProps>(
  (props: ArticleListComponentProps) => <ZscalerArticles props={props} layout="tiles" />
);

/** Featured posts (names starting with "featured-"): one large card beside two compact ones. */
export const ZscalerFeatured = withDatasourceCheck()<ArticleListComponentProps>(
  (props: ArticleListComponentProps) => <ZscalerArticles props={props} layout="featured" />
);

/** Plain ruled list of every article. */
export const ZscalerTopic = withDatasourceCheck()<ArticleListComponentProps>(
  (props: ArticleListComponentProps) => <ZscalerArticles props={props} layout="topics" />
);

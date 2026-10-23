'use client';

import { useState, JSX } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  Text,
  RichText,
  RichTextField,
  withDatasourceCheck,
  NextImage,
} from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';

interface Fields {
  Title: Field<string>;
  Category: Field<string>;
  Abstract: Field<string>;
  Problem: RichTextField;
  Solution: RichTextField;
  Thumbnail: ImageField;
  Client: ImageField;
}

export type ProjectListItemProps = {
  fields: Fields;
  name: string;
  url: string;
};

interface ProjectListComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    items: ProjectListItemProps[];
  };
}

const getProjectItems = (items: ProjectListItemProps[], numOfItems: number) => {
  return items
    ?.filter((item) => item.name !== 'Data' && item.name !== 'Authors')
    .slice(0, numOfItems || undefined);
};

const getProjectsCategories = (items: ProjectListItemProps[]) => {
  return items.reduce((acc: Record<string, number>, item) => {
    const category = item.fields.Category.value;
    if (acc[category]) {
      acc[category]++;
    } else {
      acc[category] = 1;
    }
    return acc;
  }, {});
};

const applyCategoryFilter = (
  items: ProjectListItemProps[],
  selectedCategory: string | null
): ProjectListItemProps[] => {
  return selectedCategory
    ? items.filter((item) => item.fields.Category.value === selectedCategory)
    : items;
};

const ProjectFilters = ({
  projectItems,
  selectedCategory,
  setSelectedCategory,
}: {
  projectItems: ProjectListItemProps[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}) => {
  const categories = getProjectsCategories(projectItems);

  return (
    <div className="project-filters">
      <button
        className={`button-clear-appearance ${!selectedCategory ? 'active' : ''}`}
        onClick={() => setSelectedCategory(null)}
      >
        <span>Show all</span>
        <sup>{projectItems.length}</sup>
      </button>
      {Object.entries(categories).map(([category, count]) => (
        <button
          className={`button-clear-appearance ${selectedCategory === category ? 'active' : ''}`}
          key={category}
          onClick={() => setSelectedCategory(category)}
        >
          <span>{category}</span>
          <sup>{count}</sup>
        </button>
      ))}
    </div>
  );
};

const ProjectGridItem = ({ item }: { item: ProjectListItemProps }) => (
  <div className="project-grid-item">
    <Link href={item.url} className="wrapper-link">
      <NextImage field={item.fields.Thumbnail} width={800} height={600} />
      <div className="project-grid-item-content">
        <span className="project-category">
          <Text field={item.fields.Category} />
        </span>
        <h3 className="project-title fs-5 mb-0">
          <Text field={item.fields.Title} />
        </h3>
      </div>
    </Link>
  </div>
);

const ProjectListDefault = (props: ProjectListComponentProps): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const id = props.params?.RenderingIdentifier;
  const projectItems = getProjectItems(props.fields?.items, parseInt(props.params?.NumberOfItems));
  const filteredItems = applyCategoryFilter(projectItems, selectedCategory);

  return (
    <div
      className={`component project-list ${props.params?.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="container container-wide">
        {!!props.params?.ShowFilters && (
          <ProjectFilters
            projectItems={projectItems}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        <div className="project-list-grid">
          {filteredItems?.map((item) => (
            <ProjectGridItem item={item} key={item.url} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectListMosaic = (props: ProjectListComponentProps): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const id = props.params?.RenderingIdentifier;
  const projectItems = getProjectItems(props.fields?.items, parseInt(props.params?.NumberOfItems));
  const filteredItems = applyCategoryFilter(projectItems, selectedCategory);

  return (
    <div
      className={`component project-list ${props.params?.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="container">
        {!!props.params?.ShowFilters && (
          <ProjectFilters
            projectItems={projectItems}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        <div className="project-list-grid-mosaic">
          {filteredItems?.map((item) => (
            <ProjectGridItem item={item} key={item.url} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Default = withDatasourceCheck()<ProjectListComponentProps>(ProjectListDefault);
export const Mosaic = withDatasourceCheck()<ProjectListComponentProps>(ProjectListMosaic);

const ZSCALER_CUSTOMER_BASE_URL = 'https://www.zscaler.com/customers';

const ZscalerStory = ({ item }: { item: ProjectListItemProps }): JSX.Element => {
  const { Title, Category, Abstract, Problem, Solution, Thumbnail } = item.fields || ({} as Fields);

  return (
    <article className="zs-story">
      <div className="zs-story-copy">
        <div className="zs-story-tags">
          {Category?.value && (
            <span className="zs-tag">
              <Text field={Category} />
            </span>
          )}
          {Abstract?.value && (
            <span className="zs-tag">
              <Text field={Abstract} />
            </span>
          )}
        </div>
        <h3 className="zs-story-title">
          <Text field={Title} />
        </h3>
        {Problem?.value && (
          <div className="zs-story-quote">
            <RichText field={Problem} />
          </div>
        )}
        {Solution?.value && (
          <div className="zs-story-byline">
            <RichText field={Solution} />
          </div>
        )}
        <a className="zs-btn" href={`${ZSCALER_CUSTOMER_BASE_URL}/${item.name}`}>
          Read the customer story
        </a>
      </div>
      <div className="zs-story-media">
        <NextImage field={Thumbnail} width={640} height={440} className="zs-story-img" />
      </div>
    </article>
  );
};

const ZscalerStories = (
  props: ProjectListComponentProps & { isSlider: boolean }
): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);
  const id = props.params?.RenderingIdentifier;
  const items = getProjectItems(props.fields?.items, parseInt(props.params?.NumberOfItems)) || [];
  const safeIndex = Math.min(activeIndex, Math.max(items.length - 1, 0));
  const visibleItems = props.isSlider ? items.slice(safeIndex, safeIndex + 1) : items;

  return (
    <div
      className={`component project-list variant-zscaler ${props.params?.styles?.trimEnd() || ''}`}
      id={id ? id : undefined}
    >
      <div className="zs-stories-inner">
        {visibleItems.map((item) => (
          <ZscalerStory item={item} key={item.url || item.name} />
        ))}
        {props.isSlider && items.length > 1 && (
          <div className="zs-stories-nav" role="tablist" aria-label="Customer stories">
            {items.map((item, index) => (
              <button
                key={item.url || item.name}
                type="button"
                role="tab"
                aria-selected={index === safeIndex}
                aria-label={`Show story ${index + 1} of ${items.length}`}
                className={`zs-stories-dot ${index === safeIndex ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ZscalerProjectList = (props: ProjectListComponentProps): JSX.Element => (
  <ZscalerStories {...props} isSlider={false} />
);

const ZscalerProjectSlider = (props: ProjectListComponentProps): JSX.Element => (
  <ZscalerStories {...props} isSlider />
);

export const Zscaler = withDatasourceCheck()<ProjectListComponentProps>(ZscalerProjectList);
export const ZscalerCustomerStory = withDatasourceCheck()<ProjectListComponentProps>(
  ZscalerProjectSlider
);

'use client';

import { useRef, useState, JSX } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  RichTextField,
  LinkField,
  Text,
  Link,
  RichText,
  useSitecore,
  NextImage,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  Title: Field<string>;
  Text: RichTextField;
  Image: ImageField;
  Link: LinkField;
  Video: ImageField;
}

export type CarouselItemProps = {
  id: string;
  fields: Fields;
};

interface CarouselComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    items: CarouselItemProps[];
  };
}

export const Default = (props: CarouselComponentProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [index, setIndex] = useState(0);
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex < props.fields.items.length - 1 ? prevIndex + 1 : 0));
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : props.fields.items.length - 1));
  };

  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section className={`component carousel ${sxaStyles}`} id={id ? id : undefined}>
      <div className="carousel-inner">
        {props.fields.items.map((item, i) => (
          <div key={i} className={'carousel-item ' + (i == index ? 'active' : '')}>
            {!isPageEditing && item.fields?.Video?.value?.src ? (
              <video
                className="object-fit-cover d-block w-100 h-100"
                key={item.id}
                autoPlay={true}
                loop={true}
                muted
                playsInline
                poster={item.fields.Image?.value?.src}
              >
                <source src={item.fields.Video.value.src} type="video/webm" />
              </video>
            ) : (
              <NextImage
                field={item.fields.Image}
                className="object-fit-cover d-block w-100 h-100"
                width={1920}
                height={800}
              />
            )}

            <div className="side-content">
              <div className="container">
                <div className="col-lg-5 col-md-6 offset-md-6 offset-lg-7">
                  <h1 className="display-6 fw-bold">
                    <Text field={item.fields.Title}></Text>
                  </h1>
                  <RichText field={item.fields.Text}></RichText>
                  {!isPageEditing && item.fields?.Link?.value?.href && (
                    <Link field={item.fields.Link} className="button button-accent"></Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ol className="carousel-indicators">
        {props.fields.items.map((_item, i) => (
          <li
            key={i}
            aria-label="Slide"
            className={i == index ? 'active' : ''}
            onClick={() => setIndex(i)}
          ></li>
        ))}
      </ol>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
        onClick={handlePrev}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
          </svg>
        </span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
        onClick={handleNext}
      >
        <span className="carousel-control-next-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </span>
        <span className="visually-hidden">Next</span>
      </button>
    </section>
  );
};

const CARD_SCROLL_STEP = 320;

/** Announcement slider: one full-bleed slide at a time with a glass text panel. */
export const Zscaler = (props: CarouselComponentProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const [index, setIndex] = useState(0);
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const sxaStyles = `${props.params?.styles || ''}`;
  const items = props.fields?.items || [];
  const activeItem = items[Math.min(index, Math.max(items.length - 1, 0))];

  const goTo = (step: number) =>
    setIndex((current) => (items.length ? (current + step + items.length) % items.length : 0));

  return (
    <section
      className={`component carousel variant-zscaler zs-slider ${sxaStyles}`}
      id={id ? id : undefined}
    >
      {activeItem && (
        <div className="zs-slide">
          <NextImage
            field={activeItem.fields?.Image}
            className="zs-slide-bg"
            width={1920}
            height={800}
          />
          <div className="zs-slide-panel">
            <h2 className="zs-slide-title">
              <Text field={activeItem.fields?.Title} />
            </h2>
            <div className="zs-slide-text">
              <RichText field={activeItem.fields?.Text} />
            </div>
            {(isPageEditing || activeItem.fields?.Link?.value?.href) && (
              <Link field={activeItem.fields?.Link} className="zs-btn" />
            )}
          </div>
        </div>
      )}
      {items.length > 1 && (
        <div className="zs-slider-controls">
          <button type="button" aria-label="Previous slide" onClick={() => goTo(-1)}>
            &lsaquo;
          </button>
          <button type="button" aria-label="Next slide" onClick={() => goTo(1)}>
            &rsaquo;
          </button>
        </div>
      )}
    </section>
  );
};

/** News strip: image beside a short headline and teaser, scrolling sideways with arrow buttons. */
export const ZscalerNewsCards = (props: CarouselComponentProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const trackRef = useRef<HTMLUListElement>(null);
  const sxaStyles = `${props.params?.styles || ''}`;
  const items = props.fields?.items || [];

  const scrollBy = (direction: 1 | -1) =>
    trackRef.current?.scrollBy({ left: direction * CARD_SCROLL_STEP, behavior: 'smooth' });

  return (
    <section
      className={`component carousel variant-zscaler zs-news ${sxaStyles}`}
      id={id ? id : undefined}
    >
      <button
        type="button"
        className="zs-news-arrow zs-news-prev"
        aria-label="Previous news"
        onClick={() => scrollBy(-1)}
      >
        &lsaquo;
      </button>
      <ul className="zs-news-track" ref={trackRef}>
        {items.map((item, i) => (
          <li className="zs-news-card" key={item.id || i}>
            <Link field={item.fields?.Link} className="zs-news-link">
              <NextImage
                field={item.fields?.Image}
                className="zs-news-img"
                width={140}
                height={140}
              />
              <span className="zs-news-body">
                <span className="zs-news-title">
                  <Text field={item.fields?.Title} />
                </span>
                <span className="zs-news-text">
                  <RichText field={item.fields?.Text} tag="span" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="zs-news-arrow zs-news-next"
        aria-label="Next news"
        onClick={() => scrollBy(1)}
      >
        &rsaquo;
      </button>
    </section>
  );
};

import React, { useState, Fragment, useMemo } from "react";
import { Separator } from "react-flatifycss";
import clsx from "clsx";
import Highlighter from "react-highlight-words";
import { useSettings } from "../../contexts/settings";
import { usePoets } from "../../contexts/poets";
import { ImageViewer } from "..";
import Icons from "../Icons";
import "./style.scss";

export interface DefinitionImagesProps {
  link: string;
  mime: string;
  source: string;
  thumbnail_link: string;
  title: string;
}

interface DefinitionBoxProps {
  children?: string | React.ReactNode;
  className?: string;
  definition?: string | string[];
  hasMultipleLine?: boolean;
  highlight?: string[] | false;
  highlightColor?: string;
  images?: DefinitionImagesProps[];
  limit?: number | false;
  showPoetAvatar?: boolean;
  title: string;
  titleTagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function DefinitionBox(props: DefinitionBoxProps) {
  const {
    children,
    className,
    definition,
    hasMultipleLine,
    highlight,
    highlightColor,
    images,
    limit,
    showPoetAvatar,
    title,
    titleTagName,
  } = props;
  const Heading = titleTagName || "h2";

  const { imageSearch } = useSettings();
  const { poets } = usePoets();

  const [isLimited, setIsLimited] = useState(definition && limit && definition.length > limit);
  const [showGallery, setShowGallery] = useState(false);

  const hasImage = images?.length && imageSearch;

  const imagesGallery: any = useMemo(
    () =>
      images?.map(({ thumbnail_link, link, mime, source, title }) => ({
        src: link,
        caption: (
          <div className="caption">
            <span className="mime badge">{mime.split("/")[1]}</span>
            <a href={source} rel="nofollow noreferrer noopener" target="_blank">
              {title}
            </a>
          </div>
        ),
        thumbnail: thumbnail_link,
      })),
    [images]
  );

  const poetName = title.includes("|") ? title.split("|")?.[0]?.trim() : "";
  const poetsAvatar = imageSearch && showPoetAvatar && poetName && poets ? poets[poetName] : "";

  return (
    <article className={clsx("definition-box", className, !(poetsAvatar || hasImage) && "crumbled")}>
      <header className="main-header">
        {hasImage && (
          <>
            <button
              aria-label={`نمایش تصاویر مرتبط با ${title}`}
              className={clsx("images-preview", images.length > 2 && "animated")}
              onClick={() => setShowGallery(true)}
            >
              {images.slice(0, 3).map((image, index) => (
                <img
                  draggable={false}
                  key={image.title + index}
                  className="preview"
                  src={image.thumbnail_link}
                  alt={image.title}
                  loading="lazy"
                />
              ))}
            </button>
            <ImageViewer images={imagesGallery} isOpen={showGallery} onClose={() => setShowGallery(false)} />
          </>
        )}
        {poetsAvatar && (
          <img draggable={false} className="poet-avatar" src={poetsAvatar} alt={poetName} loading="lazy" />
        )}
        <Heading className="definition-title">{title}</Heading>
      </header>

      <p className={clsx("definition-content", isLimited && "limited")}>
        {hasMultipleLine && Array.isArray(definition) ? (
          definition.map((line: string, index) => {
            return (
              <Fragment key={index}>
                {line ? (
                  highlight ? (
                    <Highlighter
                      className="definition"
                      highlightClassName={clsx("marked-word", `style-${highlightColor}-light`)}
                      autoEscape={true}
                      searchWords={highlight}
                      textToHighlight={line}
                    />
                  ) : (
                    <span className="definition">{line}</span>
                  )
                ) : (
                  <Separator type="short" size="xs" />
                )}
                <br />
              </Fragment>
            );
          })
        ) : highlight ? (
          <Highlighter
            className="definition"
            highlightClassName={clsx("marked-word", `style-${highlightColor}-light`)}
            autoEscape={true}
            searchWords={highlight}
            textToHighlight={Array.isArray(definition) ? definition.join("، ") : definition}
          />
        ) : (
          <span className="definition">{Array.isArray(definition) ? definition.join("، ") : definition}</span>
        )}
        {children}
        {isLimited && (
          <button
            className="show-more"
            title="نمایش بیشتر"
            aria-label="نمایش بیشتر"
            onClick={() => setIsLimited(false)}
          >
            <Icons.More />
          </button>
        )}
      </p>
    </article>
  );
}

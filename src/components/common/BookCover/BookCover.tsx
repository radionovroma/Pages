import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component"
import classNames from "classnames";
import bookCoverPlaceholder from "@img/bookCoverPlaceholder.png";

interface BookCoverProps {
  coverImg: string;
  alt: string;
  delay?: number
  className: string;
}

export const BookCover: FC<BookCoverProps> = ({ coverImg, alt, delay = 300, className }) => {
  return (
    <LazyLoadImage
      src={coverImg}
      alt={alt}
      placeholderSrc={bookCoverPlaceholder}
      delayTime={delay}
      wrapperClassName={classNames(className, "book-cover__wrap")}
    />
  );
}

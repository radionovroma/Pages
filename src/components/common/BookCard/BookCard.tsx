import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@router";
import { Book } from "@types";
import BookmarkSVG from "@img/bookmarkIcon.svg";
import { BookCover } from "@common"
import "./styles.module.scss"

interface BookCardProps {
  book: Book;
}

export const BookCard: FC<BookCardProps> = ({ book}) => {
  const { img, authors, title, price } = book;
  return (
    <article>
      <Link
        to={ROUTES.book(book.id)}>
          <BookCover
            coverImg={img}
            alt={`Cover of the book "${title}"`}
            className="h-[334px] w-[222px] shadow-md"/>
      </Link>
      <p
        className="mt-15 font-sans text-lg text-yellow cursor-default">
        {`$${price}`}
      </p>
      <div className="h-[80px] mt-10">
        <Link
          to={ROUTES.book(book.id)}
          className="font-serif font-bold text-xl text-blue hover:text-jeans line-clamp-2">
          {title}
        </Link>
        <p
          className="font-sans text-gray line-clamp-1 cursor-default">
          {authors.join(", ")}
        </p>
      </div>
      <div className="flex gap-10 mt-10">
        <button
          className="w-[162px] h-50 border border-yellow font-serif font-bold text-blue hover:bg-yellow">
          Add To Cart
        </button>
        <button
          className="flex justify-center items-center w-50 h-50 border border-yellow hover:bg-yellow hover:border-0 bookmark-button">
          <BookmarkSVG/>
        </button>
      </div>
    </article>
  );
}

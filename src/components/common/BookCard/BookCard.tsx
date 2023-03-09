import { FC } from "react";
import { Book } from "@types";
import BookmarkSVG from "@img/bookmark-icon.svg";

interface BookCardProps {
  book: Book;
}

export const BookCard: FC<BookCardProps> = ({ book}) => {
  const { img, authors, title, price } = book;
  return (
    <article>
      <a href="src/components/common/BookCard">
        <img
          src={img}
          alt={`${title} cover`}
          className="h-350 w-230 shadow-md"/>
      </a>
      <p
        className="mt-15 font-sans text-lg text-yellow cursor-default">
        {`${price}$`}
      </p>
      <div className="h-[80px] mt-10">
        <a
          href="src/components/common/BookCard"
          className="font-serif font-bold text-xl text-blue hover:text-jeans">
          {title}
        </a>
        <p
          className="font-sans text-gray line-clamp-1 cursor-default">
          {authors.join(", ")}
        </p>
      </div>
      <div className="flex gap-10 mt-10">
        <button
          className="w-[170px] h-50 border border-yellow font-serif font-bold text-blue hover:bg-yellow">
          Order Today
        </button>
        <button
          className="flex justify-center items-center w-50 h-50 border border-yellow hover:bg-yellow/75 hover:border-0 bookmark-button">
          <BookmarkSVG/>
        </button>
      </div>
    </article>
  );
}

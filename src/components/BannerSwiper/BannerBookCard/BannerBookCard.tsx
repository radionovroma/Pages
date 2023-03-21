import { FC } from "react";
import { Link } from "react-router-dom";
import { BookCover } from "@common";
import { Book } from "@types";

interface BannerBookCardProps {
  book: Book;
}

export const BannerBookCard: FC<BannerBookCardProps> = ({ book }) => {
  return (
    <article className="w-cont flex justify-center items-center gap-65 pt-50 pb-90 cursor-default bg-blue">
      <div className="flex flex-col w-660">
        <h1
          className="max-h-[144px] font-serif font-bold text-[65px] leading-[72px] text-white">
          {book.title}
        </h1>
        <p
          className="relative font-serif italic text-2xl leading-9 text-white pl-50
                  before:absolute before:w-35 before:h-[1px] before:bg-yellow before:left-0 before:top-1/2 before:-translate-y-2/4">
          {book.authors.join(', ')}
        </p>
        <p
          className="mt-35 font-sans text-xl leading-9 text-lightBlue line-clamp-2">
          {book.description}
        </p>
        <div
          className="mt-35 flex gap-35">
          <button
            className="w-230 h-50 font-serif font-bold text-lg leading-6 text-blue bg-yellow hover:bg-gold">
            Add To Cart
          </button>
          <Link
            to={`/book/${book.id}`}
            className="flex justify-center items-center
                      w-230 h-50 font-serif font-bold text-lg leading-6 text-lightBlue
                      border border-lightBlue
                      hover:text-white hover:border-white">
            Learn more
          </Link>
        </div>
        <ul
          className="flex justify-between mt-35">
          {
            [ { label: "Pages:", content: book.pages },
              { label: "Language:", content: book.language},
              { label: "Published:", content: book.date_published},]
              .map(item => (
                  <li
                    key={item.label}
                    className="relative w-[160px] pl-30
                            before:absolute before:left-0 before:top-[7px] before:w-15 before:h-15 before:bg-yellow before:rounded-full">
                    <h3
                      className="font-serif font-bold text-2xl text-white">
                      {item.label}
                    </h3>
                    <p
                      className="mt-[5px] font-sans text-lg leading-8 text-lightBlue capitalize">
                      {item.content}
                    </p>
                  </li>
                )
              )
          }
        </ul>
      </div>
      <Link to={`/book/${book.id}`}>
        <BookCover
          coverImg={book.img}
          alt={`Cover of the book "${book.title}"`}
          delay={1500}
          className="h-[500px] w-[335px]"/>
      </Link>
    </article>
  );
}

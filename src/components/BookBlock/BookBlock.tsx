import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@store/store";
import { head } from "lodash";
import { fetchCatalog, getCatalogList, getCatalogLoadStatus, } from "@store/catalog";
import { BookCover, Loader } from "@common";
import CartSvg from "@img/cartButtonIcon.svg";
import BookmarkSvg from "@img/bookPageBookmarkIcon.svg";
import { LOAD_STATUSES } from "@types";
import "./styles.module.scss";

export const BookBlock: FC = () => {
  const book = head(useSelector(getCatalogList));
  const bookStatus = useSelector(getCatalogLoadStatus);
  const dispatch = useAppDispatch();

  const { ids } = useParams();

  useEffect(() => {
    if (ids) {
      dispatch(fetchCatalog({ids}));
    }
  }, [ids]);

  return(
    <section
      className="flex flex-col items-center gap-50 w-full py-90">
      {
        (bookStatus === LOAD_STATUSES.UNKNOWN || bookStatus === LOAD_STATUSES.LOADING) &&
        <Loader type="bookBlock"/>
      }
      {
        (book && bookStatus === LOAD_STATUSES.LOADED) &&
        <>
          <div className="w-cont flex gap-[100px]">
            <div className="flex justify-center items-center w-600 h-660 bg-lightGray/30">
              <BookCover coverImg={book.img} alt={`Cover of the book "${book.title}"`} className="w-[340px] h-[510px] shadow-xl"/>
            </div>
            <div className="flex flex-col justify-center gap-20 w-600">
              <div className="flex flex-col gap-[5px]">
                <h2 className="font-serif font-bold text-3xl text-blue cursor-default">
                  {book.title}
                </h2>
                <p
                  className="relative pl-40 font-serif font-medium italic  text-xl text-blue cursor-default
                before:absolute before:w-20 before:h-[1px] before:bg-blue before:left-0 before:top-1/2 before:-translate-y-2/4">
                  {book.authors.join(",")}
                </p>
                <p className="font-sans font-extrabold text-3xl text-yellow cursor-default">
                  {`$${book.price.toString().split(".")[0]}.`}
                  <span className="text-xl">
                  {`${book.price.toString().split(".")[1]} USD`}
                </span>
                </p>
              </div>
              <table className="font-sans font-normal text-lg leading-[40px] text-gray cursor-default">
                <tbody>
                {
                  [ { label: "Publisher : ", content: `${book.publisher}, ${book.date_published}` },
                    { label: "Language : ", content: book.language },
                    { label: "Paperback : ", content: `${book.pages} pages` },
                    { label: "Dimensions :", content: book.dimensions },
                  ].map((item) => {
                    return (
                      <tr
                        key={item.label}
                        className="flex gap-20">
                        <th className="w-120 font-normal text-start">
                          {item.label}
                        </th>
                        <th className="font-normal text-start capitalize">
                          {item.content}
                        </th>
                      </tr>
                    );
                  })
                }
                </tbody>
              </table>
              <div className="flex gap-20">
                <button
                  className="flex justify-center items-center gap-20 w-300 h-65 bg-yellow hover:bg-gold bookPage-svg-fill">
                  <CartSvg/>
                  <span className="font-serif font-bold text-lg text-blue">
                    Add to Cart
                  </span>
                </button>
                <button
                  className="flex justify-center items-center w-65 h-65 border border-yellow
                  hover:border-0 hover:bg-gold bookmark-button">
                  <BookmarkSvg/>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10 w-cont">
            { book.description.split('\n').map((item, index) => {
              return (
                <p
                  key={index}
                  className="font-sans text-lg text-gray text-justify indent-40 cursor-default">
                  {item}
                </p>
              )
            })}
          </div>
        </>
      }
    </section>
  );
}

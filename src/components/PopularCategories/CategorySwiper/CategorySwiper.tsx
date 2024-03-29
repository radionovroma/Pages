import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@router";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { BookCard } from "@common";
import { Category, Book} from "@types";
import LastSlideImg from "@img/categorySwiperLastSlide.png";
import "swiper/swiper.css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./stules.module.scss";

interface CategorySwiperProps{
  category: Category;
  books: Book[];
}

export const CategorySwiper: FC<CategorySwiperProps> = ({category, books}) => {
  return (
    <div
      className="w-cont+">
      <Link
        to={ROUTES.categoryCatalog(category.type)}
        className="ml-[60px] font-serif font-bold text-3xl text-blue capitalize hover:text-jeans">
        {category.label}
      </Link>
      <Swiper
        modules={[Navigation]}
        slidesPerView={5}
        spaceBetween={48}
        slidesPerGroup={4}
        speed={1000}
        navigation
        className="category-swiper">
        {
          books.map((book) => {
            return (
              <SwiperSlide
                key={book.id}
                className="flex justify-center">
                <BookCard
                  book={book}/>
              </SwiperSlide>
            )
          })
        }
        <SwiperSlide>
          <Link
            to={ROUTES.categoryCatalog(category.type)}
            className="cursor-pointer">
            <img
              src={LastSlideImg}
              alt="View all category books"
              className="h-[334px] w-[222px] hover:animate-wiggle"
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

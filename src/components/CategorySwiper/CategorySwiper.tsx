import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { BookCard } from "@common";
import { Category, Book} from "@types";
import "swiper/swiper.css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CategorySwiperProps{
  category: Category;
  books: Book[];
}

export const CategorySwiper: FC<CategorySwiperProps> = ({category, books}) => {
  return (
    <section
      className="w-cont+">
      <a
        href=""
        className="ml-[60px] font-serif font-bold text-3xl text-blue capitalize hover:text-jeans">
        {category.label}
      </a>
      <Swiper
        modules={[Navigation]}
        slidesPerView={5}
        spaceBetween={30}
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
                <BookCard book={book}/>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </section>
  );
}

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannerProducts, getBannerBooksList, getBannerBooksStatus } from "@store/banerProducts";
import { BannerBookCard } from "./BannerBookCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import "swiper/swiper.css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const BannerSwiper = () => {
  const bannerBooksList = useSelector(getBannerBooksList);
  const bannerBooksLoadStatus = useSelector(getBannerBooksStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBannerProducts() as any);
  }, []);

  return (
    <section className="flex justify-center items-center min-h-[640px] bg-blue">
      {
        (bannerBooksLoadStatus === 'UNKNOWN' || bannerBooksLoadStatus === 'LOADING') &&
        <span
          className="banner-loader">
        </span>
      }
      {
        bannerBooksLoadStatus === 'LOADED' &&
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          allowTouchMove={false}
          loop={true}
          speed={1000}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="banner-swiper">
          {
            bannerBooksList.map((book) => {
              return (
                <SwiperSlide
                  key={book.id}
                  className="flex justify-center">
                  <BannerBookCard
                    book={book}/>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      }
    </section>
  );
}

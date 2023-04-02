import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@store/store";
import { fetchBannerProducts, getBannerBooksList, getBannerBooksStatus } from "@store/banerProducts";
import { BannerBookCard } from "./BannerBookCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Loader } from "@common";
import "swiper/swiper.css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { LOAD_STATUSES } from "@types";
import "./styles.module.scss";

export const BannerSwiper = () => {
  const bannerBooksList = useSelector(getBannerBooksList);
  const bannerBooksLoadStatus = useSelector(getBannerBooksStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBannerProducts());
  }, []);

  return (
    <section className="flex justify-center items-center min-h-[640px] bg-blue">
      {
        (bannerBooksLoadStatus === LOAD_STATUSES.UNKNOWN || bannerBooksLoadStatus === LOAD_STATUSES.LOADING) &&
        <Loader type="bannerBook"/>
      }
      {
        bannerBooksLoadStatus === LOAD_STATUSES.LOADED &&
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

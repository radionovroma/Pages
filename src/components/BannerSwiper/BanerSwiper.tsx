import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannerProducts, getBannerBooksList, getBannerBooksStatus } from "@store/banerProducts";
import { BannerBookCard } from "./BannerBookCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import classNames from "classnames";
import "swiper/swiper.css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { LOAD_STATUSES } from "@types";

export const BannerSwiper = () => {
  const bannerBooksList = useSelector(getBannerBooksList);
  const bannerBooksLoadStatus = useSelector(getBannerBooksStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBannerProducts() as any);
  }, []);

  const pulse = "bg-lightBlue rounded opacity-10";

  const bannerBookLoader =
    <div className="w-cont flex justify-center items-center gap-65 pt-50 pb-90 animate-pulse">
    <div className="w-660">
      <div className={classNames("w-[330px] h-[64px] mt-[4px]", pulse)}></div>
      <div className={classNames("w-230 h-[28px] mt-10", pulse)}></div>
      <div className={classNames("h-[72px] mt-35", pulse)}></div>
      <div className="flex gap-35 mt-35">
        <div className={classNames("w-230 h-50", pulse)}></div>
        <div className={classNames("w-230 h-50", pulse)}></div>
      </div>
      <div className="flex justify-between mt-35">
        <div className="w-[160px]">
          <div className={classNames("h-[32px]", pulse)}></div>
          <div className={classNames("h-[32px] mt-[5px]", pulse)}></div>
        </div>
        <div className="w-[160px]">
          <div className={classNames("h-[32px]", pulse)}></div>
          <div className={classNames("h-[32px] mt-[5px]", pulse)}></div>
        </div>
        <div className="w-[160px]">
          <div className={classNames("h-[32px]", pulse)}></div>
          <div className={classNames("h-[32px] mt-[5px]", pulse)}></div>
        </div>
      </div>
    </div>
    <div className={classNames("h-[500px] w-[335px]", pulse)}></div>
  </div>;

  return (
    <section className="flex justify-center items-center min-h-[640px] bg-blue">
      {
        (bannerBooksLoadStatus === LOAD_STATUSES.UNKNOWN || bannerBooksLoadStatus === LOAD_STATUSES.LOADING) &&
        bannerBookLoader
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

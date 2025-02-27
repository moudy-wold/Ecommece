"use client"
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Navigation,
  Pagination,
  Keyboard,
  Autoplay,
} from "swiper/modules";

type Props = {
  data: any
}

function AdsSlder({ data }: Props) {


  return (
    <main className="relative">
      <Swiper
        cssMode={true}
        navigation={true}
        keyboard={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination, Keyboard, Autoplay]}
      >
        {data?.map((item: any, index: number) => (
          <SwiperSlide key={index} >
            <div>
              <Image
                src={item.image}
                alt={"item.image"}
                height={250}
                width={1000}
                className="!w-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}

export default AdsSlder;

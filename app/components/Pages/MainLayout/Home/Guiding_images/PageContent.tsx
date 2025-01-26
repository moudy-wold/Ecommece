"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { JackInTheBox } from "react-awesome-reveal";

function BennerImages() {
  const data = [
    { id: 1, image: "https://cdn.modamizbir.com/Uploads/banner/103088086.webp" },
    { id: 2, image: "https://cdn.modamizbir.com/Uploads/banner/324310281.webp" },
    { id: 3, image: "https://cdn.modamizbir.com/Uploads/banner/1446710218.webp" },
    { id: 4, image: "https://cdn.modamizbir.com/Uploads/banner/2055825906.webp" }
  ]
  return (
    <div className="container my-5">
      <div className="grid md:grid-cols-2 gap-3">
        {data.map((item: any, index: number) => (
          <JackInTheBox
            duration={500}
            delay={0}
            cascade
            className="relative"
            key={index}
          >
            <div className="">
              <Link href={item.image}>
                <Image
                  src={item.image}
                  width={650}
                  height={300}
                  alt="guiding image"
                  className="!w-[650] !h-[300] rounded-lg object-fill"
                />
              </Link>
            </div>
          </JackInTheBox>
        ))}
      </div>
    </div>
  );
}

export default BennerImages;

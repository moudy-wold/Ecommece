"use client";
import React  from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedinIn,  FaTelegramPlane,   } from "react-icons/fa";

function Footer() {
  const social_data = [
    { url: "www.facebook.com", icon: FaFacebook, name: "Facebook" },
    { url: "www.linkidin.com", icon: FaLinkedinIn, name: "LinkedinIn" },
    { url: "www.telegram.com", icon: FaTelegramPlane, name: "Telegram" },

  ]

  return (
    <div className="bg-[#f9f9f9]">

      <div className="block lg:flex justify-between  p-5 lg:px-10 container">

        <div className=" ">
          <Link href="/">
            <Image src={"/assets/logo.png"} alt="Logo" height={150} width={150} />
          </Link>
          <p className="text-lg mt-2 font-semibold underline">Ideal Store Experience</p>
        </div>

        <div className="my-5 lg:mt-0">
          <p className="text-lg underline">links</p>
          <div className="text-[#004169] mt-3 lg:mt-1">
            <Link href="/about-us" className="cursor-pointer hover:border-b-2 border-[#004169] transition-all text-lg lg:text-xl font-semibold lg:font-normal">
              Who Us
            </Link>
          </div>
          <div className="text-[#004169] mt-3 lg:mt-1">
            <span className="cursor-pointer hover:border-b-2 border-[#004169] transition-all text-lg lg:text-xl font-semibold lg:font-normal">
              Our Services
            </span>
          </div>
          <div className="text-[#004169] mt-3 lg:mt-1">
            <span className="cursor-pointer hover:border-b-2 border-[#004169] transition-all text-lg lg:text-xl font-semibold lg:font-normal">
              Privacy Policy
            </span>
          </div>
        </div>

        <div className="">
          <p className="text-lg underline">Follow Us On Social Media</p>
          <ul className="flex flex-col gap-3 mt-3 ">
            {social_data.map((item, index: number) => (
              <li key={index} className="ml-2">
                <Link href={item.url} className="flex items-center gap-3 text-[#006496] hover:border-b-2 border-[#4267B2] hover:p-[1px] transition-all w-fit">
                  {item.icon && <item.icon className="text-3xl lg:text-lg text-[#4267B2] " />}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="py-2 flex items-center justify-center">
        <p className="text-sm lg:text-base">
          All Rights Reserved <span className="text-sm">{new Date().getFullYear()}</span> To The Company <span className="text-[#006496]">Moudy</span> ©
        </p>
      </div>
    </div>

  );
}

export default Footer;

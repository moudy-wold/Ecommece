"use client";
import Form from './Form';
import Image from 'next/image';
import { useSelector } from "react-redux";


function Register() {
  // const { infoData } = useSelector((state: any) => state.counter)
  return (
    <main className="py-5 md:px-9 min-h-[calc(100vh-221px)]">
      <div className=" lg-contain bg-bottom max-lg:pb-44  ">
        <div className=" flex justify-center">
          <Image
            // src={infoData?.data?.logo != "" && infoData?.data?.logo != undefined ? infoData?.data?.logo : "/assets/logo.png"}
            src={"/assets/logo.png"}
            width={95}
            height={159}
            alt="logo"
          />
        </div>
        <div className="container relative py-10 min-h-[calc(100vh-270px)] flex items-center justify-center">

          <div className="max-w-xl mx-auto shadow-2xl px-11 py-5 bg-white rounded-md">
            <div className="px-5">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;

"use client";
import Image from 'next/image';
import FormComponent from './ChangePassword';

function ChangePassword() {
  return (
    <main className="py-5 md:px-9">
      <div className=" bg-no-repeat bg-contain bg-bottom max-lg:pb-44  h-[calc(100vh-220px)] flex items-center">
        <div className="container relative py-6">
          <div className="mb-5 flex justify-center">
            <Image
              // src={infoData?.data?.logo != "" && infoData?.data?.logo != undefined? infoData?.data?.logo : "/assets/logo.png"}
              src={"/assets/logo.png"}
              width={95}
              height={159}
              alt="logo"
            />
          </div>
          <div className="max-w-xl mx-auto shadow-xl px-11 py-5 bg-white rounded-md">
            <div className="relative">

            </div>

            <div className="px-5">
              <FormComponent/>
            </div>
          </div>
        </div>


      </div>
    </main>
  );
}

export default ChangePassword

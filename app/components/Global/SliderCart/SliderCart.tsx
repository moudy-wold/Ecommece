"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { IoIosArrowForward, IoIosArrowBack, IoMdCart } from "react-icons/io";
import { BsArrowsExpandVertical } from "react-icons/bs";
import { Modal, notification } from "antd";
import { Slide } from "react-awesome-reveal";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from 'react-redux'
import { AddToCard } from "@/app/api/Front/order";
import { useRouter } from "next/navigation";
import { LuShoppingCart } from "react-icons/lu";
import ProductDetails from "@/app/components/Global/ProductDetailsModal/ProductDetailsModal"
import GlobalRating from "../GlobalRating/GlobalRating";
import { FaWhatsapp } from "react-icons/fa";

type Props = {
  data: {
    _id: string,
    name: string,
    description: string,
    quantity: number,
    price: number,
    currency: string,
    has_coupon: boolean,
    category: string,
    recommended: boolean,
    details: Object,
    createdAt: string,
    updatedAt: string,
    __v: 0
  }[],
  title: string;
  category_id: string;
};

function SliderCart({ data, title, category_id }: Props) {
  const dispatch = useDispatch();
  const { islogendRedux } = useSelector((state: any) => state.counter)
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [idDetails, setIdDetails] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openProductDetails, setOpenProductDetails] = useState(false);
  const [currentDate, setcurrentDate] = useState(new Date());
  const [whatsApp_number, set_whatsApp_number] = useState("")
  const [arr, setArr] = useState<any>([]);

  const handleHover = (_id: any) => {
    setDetails(true)
    setIdDetails(_id)
  }


  const handleAddOrDeleteTowishList = async (id: string) => {
    notification.success({
      message: "product has been added to favourites"
    })
    // setIsLoading(true)
    // try {
    //   const response = await AddDeleteToWishList(id);
    //   if (response.data.delete) {
    //     notification.success({
    //       message: "product has been removed from favourites"
    //     })

    //     // let idsArray = idsArray.filter((ids: any) => ids !== id);
    //     // setArr(idsArray)
    //   } else {

    //     notification.success({
    //       message: "product has been added to favourites"
    //     })
    //   }

    // } catch (err: any) {
    //   console.log(err)
    //   notification.error({ message: "You must log in first." })
    //   router.push("/auth/login")
    // }finally{
    //   setIsLoading(false)
    // }

  }

  const handleAddToCard = async (id: string) => {
    notification.success({
      message: "Product added to cart",
    });
    notification.info({
      message: "s"
    })
    // setIsLoading(true)
    // const datas = {
    //   product_id: id,
    //   quantity: 1,
    //   details: JSON.stringify({})
    // }
    // let res: any;

    // try {
    //   const  res = await AddToCard(datas);
    //   notification.success({
    //     message: "Product added to cart",
    //   });
    // }
    // catch (err: any) {
    //   console.log(err);
    //   notification.error({
    //     message: err.response.data.message,
    //   });
    // }
    // finally{
    //   setIsLoading(false)

    // }
  };
 

  return (
    <main className="container relative mb-5 overflow-hidden">
      {isLoading && <Loader />}
      {data.length > 0 && <>
        {/* Start Ttile & View All */}
        <div className="flex items-center justify-between my-4">
          <h2 className="text-3xl font-extrabold text-[#006496]">
            {title}
          </h2>
        </div>
        {/* End Ttile & View All */}

        {/* Start Slider Button */}
        <div className=" hidden sm:block absolute right-5 top-1/2 translate-x-1/2 translate-y-1/2 text-xl md:text-4xl z-10 ">
          <button id={`shares-slider-prev-arrow-button-${title}`} className='bg-white rounded-full border-2 border-gray-300 w-10 h-10 flex items-center justify-center '>
            <IoIosArrowForward className="text-[#d0d0d0] text-xl" />
          </button>
        </div>
        {/* Endq Slider Button */}

        <Slide duration={500} delay={0} cascade className="relative">
          <Swiper
            cssMode={true}
            modules={[Navigation]}
            navigation={{
              nextEl: `#shares-slider-next-arrow-button-${title}`,
              prevEl: `#shares-slider-prev-arrow-button-${title}`,
              disabledClass: 'swiper-button-disabled',
            }}
            spaceBetween={8}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              1220: {
                slidesPerView: 6,
                spaceBetween: 10,
              },
            }}
          >

            {data.map((item: any, index: number) => {
              const isFavorite = arr.includes(item._id);
              return (
                <SwiperSlide key={item._id}>
                  <div className={` py-2  flex flex-col gap-0 bg-white p-1  border-2 border-gray-300 rounded-xl overflow-hidden`}>

                    {/* Start Image & Wishlist & Compare */}
                    <div className="flex justify-center relative"
                      onMouseEnter={() => handleHover(item._id)}
                      onMouseLeave={() => setDetails(false)}
                    >
                      <div className={`relative`}>
                        <Image
                          src={item.image ? item?.image : "/"}
                          alt="item.title"
                          width={187}
                          height={187}
                          className="!h-[166px] lg:!h-[187px] rounded-lg"
                        />
                        <div className={`${item.quantity == 0 ? "block" : "hidden"} absolute bottom-2 right-2 border-gray-300 border-2 rounded-lg p-1 `}>
                          <p className="text-center text-gray-300 ">Currently unavailable</p>
                        </div>
                      </div>

                      <div className={`absolute opacity-0 z-30 bg-[#eeeeee8c] transition-all flex items-center  w-full h-full top-0 left-0 ${details && idDetails == item._id ? "opacity-100" : "opacity-0"} `}>
                        <div className="flex items-center justify-between p-1 w-fit mx-auto">
                            <div className="bg-[#f1f1f1] p-3  rounded-full  cursor-pointer hover:bg-[#004169!important] ml-2 [&:hover>svg]:text-white ">
                              {isFavorite ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 -5.37 77.646 77.646" onClick={() => { handleAddOrDeleteTowishList(item._id) }}>
                                  <defs>
                                    <linearGradient id="linear-gradient" x1="1.044" y1="0.005" x2="0.413" y2="0.749" gradientUnits="objectBoundingBox">
                                      <stop offset="0" stop-color="#ff7471" />
                                      <stop offset="1" stop-color="#ff5245" />
                                    </linearGradient>
                                  </defs>
                                  <g id="heart_red" data-name="heart red" transform="translate(-263.982 -435.283)">
                                    <g id="Group_25" data-name="Group 25">
                                      <path id="Path_69" data-name="Path 69" d="M302.81,446.03c-.059-.106-.128-.2-.187-.307.059.1.128.2.187.307Z" fill="none" />
                                      <path id="Path_70" data-name="Path 70" d="M341.628,456.395l-.025-.006c.006-.142.025-.279.025-.431a20.662,20.662,0,0,0-37.039-12.611.171.171,0,0,0-.024-.007,2.169,2.169,0,0,1-3.54-.046l-.035.008a20.657,20.657,0,0,0-37,12.656c0,.147.018.282.018.424l-.029.013s0,.5.1,1.413a20.552,20.552,0,0,0,.6,3.364c1.608,6.945,6.938,20.286,24.659,32.122,10.242,6.879,12.73,8.743,13.383,8.867.031.006.048.033.083.033s.058-.033.094-.043c.7-.162,3.265-2.071,13.359-8.857,16.931-11.313,22.555-24,24.428-31.163a20.743,20.743,0,0,0,.854-4.546C341.623,456.824,341.628,456.395,341.628,456.395ZM302.81,446.03h0c-.059-.1-.128-.2-.187-.307C302.682,445.825,302.751,445.924,302.81,446.03Z" fill="#ff5245" />
                                    </g>
                                    <path id="Path_71" data-name="Path 71" d="M295.337,474.437c-5.407-20.228,1.411-28.894,5-31.889a20.747,20.747,0,0,0-6.426-5.077c-6.5-1.416-15.583.295-21.458,16.921-1,3.4-1.458,11.938-.492,22.426a65.334,65.334,0,0,0,17.38,16.476c10.242,6.879,12.73,8.743,13.383,8.867.031.006.048.033.083.033s.058-.033.094-.043a2.946,2.946,0,0,0,.76-.373C301.6,496.005,298.749,487.182,295.337,474.437Z" fill="url(#linear-gradient)" />
                                  </g>
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="25px" width="25px" version="1.1" id="Capa_1" viewBox="0 0 471.701 471.701" onClick={() => { handleAddOrDeleteTowishList(item._id) }}>
                                  <g>
                                    <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3   s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4   c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3   C444.801,187.101,434.001,213.101,414.401,232.701z" />
                                  </g>
                                </svg>}
                            </div> 

                        </div>
                      </div>

                    </div>
                    {/* End Image & Wishlist & Compare */}


                    {/* Start product Name && rating && price */}
                    <Link href={`/products/${item._id}`} className="flex flex-col items-center gap-2 my-2 ">
                      {/* Start Name  */}
                      <p className=" w-[90%] mx-auto  text-center text-sm md:text-base lg:text-lg pr-2 text-[#8c8c8c] ">
                        {item.name}
                      </p>
                      {/* End Name  */}

                      {/* Start Rating */}
                      <div className="w-fit mx-auto">
                        <GlobalRating average_rating={index} />
                      </div>
                      {/* End Rating */}

                      {/* Start Price */}
                      <div className={`  mx-auto w-fit `} >
                        <p className={`  text-[#004169]  text-xl`}>{item.price}</p>
                      </div>
                      {/* End Price */}
                    </Link>
                    {/* Start product Name && rating && price */}
                    {/* Start Add To Cart */}
                    <div>
                      <button
                        className=" border-2 border-[#006496] rounded-lg text-center text-white bg-[#006496] w-[90%] block mx-auto hover:text-[#006496] hover:bg-white cursor-pointer p-1 transition-all"
                        onClick={() => {
                          setOpenProductDetails(true);
                        }}>
                        <div className="text-sm  lg:text-base flex items-center justify-center gap-3">
                          <LuShoppingCart />
                          <p className="-mb-0">Add To Cart</p>
                        </div>
                      </button>
                    </div>
                    {/* End Add To Cart */}
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </Slide>
        <div className=" hidden sm:block absolute left-6 top-1/2 -translate-x-1/2 translate-y-1/2 text-xl md:text-4xl text-primary">
          <button id={`shares-slider-next-arrow-button-${title}`} className='bg-white rounded-full border-2 border-gray-300 w-11 h-11 flex items-center justify-center'>
            <IoIosArrowBack className="text-[#d0d0d0] text-xl" />
          </button>
        </div>
        {/* Start Details Modal */}
        <div>
          {openProductDetails &&
            <Modal
              title="Product Details"
              open={openProductDetails}
              onCancel={() => setOpenProductDetails(false)}
              okButtonProps={{ style: { display: "none" } }}
              cancelButtonProps={{ style: { display: "none" } }}
              // styles={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} 
              className="custom-modal"
            >
              <ProductDetails data={selectedProduct} openProductDetails={openProductDetails} setOpenProductDetails={setOpenProductDetails} />
            </Modal>}
        </div>
        {/* End Details Modal */}
      </>}
    </main>
  );
}

export default SliderCart;

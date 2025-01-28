"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Space, Spin, } from "antd";
import Link from "next/link";


type Props = {
  path?: string,
  store?: boolean
  setOpenSearch?: any
}

function SearchProducts({ path, store, setOpenSearch }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputvalue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [openResult, setOpenResult] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const getData = async () => {
    // if (inputvalue.trim() != "") {
    //   setIsLoading(true);
    //   let res;
    //   try {
    //     if (store) {
    //       res = await SearchProducts_Talab(inputvalue, 1)
    //       console.log(res.data.data, "if")
    //     } else {
    //       res = await SearchProductsForCustomer(inputvalue)
    //       // console.log(res.data.data, "else")
    //     }
    //     // console.log(res.data.data)
    //     setData(res.data?.data)
    //     setOpenResult(true)
    //   }
    //   catch (err: any) {
    //     console.log(err.response.data.message)
    //   }
    //   finally {
    //     setIsLoading(false);
    //   }
    // }
  }

  const handleOnChange = () => { const interval = setTimeout(getData, 1000); }

  const handleSearch = () => {
    setIsLoading(true);
    getData();
  }


  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setData([])
        setInputValue("")
        setOpenResult(false)
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="w-full relative !z-40" ref={wrapperRef}>
      <div className="flex items-center w-full ">
        <input
          type="text"
          placeholder={"search..."}
          onChange={(e) => { handleOnChange(); setInputValue(e.target.value) }}
          value={inputvalue}
          className="outline-none px-2 lg:px-4 py-2 lg:py-[10px] border-2 border-solid w-11/12 rounded-s-md text-lg text-[#8c8c8c]"
        />

        <Link href={`${store ? `/admin/talab/search/${inputvalue}` : `/search/${inputvalue}`} `} className={`${inputvalue.trim() === "" && "pointer-events-none"}`}>
          <button
            onClick={() => { handleSearch() }}
            className={`${isLoading ? "bg-white" : "bg-[#006496]"} ${inputvalue.trim() === "" && "pointer-events-none"}  bg-[#006496] w-12 h-12 lg:w-12 lg:h-[52px] text-xs text-white flex items-center justify-center rounded-e-md border-[2px] border-[#006496]`}
          >
            {isLoading ?
              <Space size="small">
                <Spin size="small" />
              </Space> :
              <CiSearch className={`${inputvalue.trim() === "" && "pointer-events-none"} w-7 h-7 lg:font-bold`} />}
          </button>
        </Link>
      </div>

      {openResult ?
        <>
          {data.length ?
            <div className="w-full max-h-[400px] min-h-10 overflow-y-scroll absolute z-50 top-12 md:top-[60px] right-0 bg-white border-[1px] border-gray-300 rounded-lg p-1  shadow-lg " >
              {data.map((item: any) => (
                <Link
                  onClick={() => { if (setOpenSearch) { setOpenSearch(false) }; }}
                  key={item._id}
                  href={path && !store ? `/admin/category/${path}/edit/${item._id}` : !path && !store ? `/category/product/${item._id}` : store ? `/admin/talab/${item?.category_sub?.slug}/${item._id}` : ``}
                >
                  <div className="flex  border-b-[1px] border-gray-400 p-1 hover:bg-[#006496] [&>div>p]:hover:text-white  ">
                    <div className="p-2">
                      <Image src={item.images[0]} alt={"item.name"} width={60} height={60} className="border-[1px] border-gray-300 rounded-xl !w-16 !h-16" />
                    </div>
                    <div className="mr-3 p-4">
                      <p className="text-[#444] text-base ">{item.name}</p>
                      <p className="text-[#006496]  text-lg mt-4 ">{item.price}</p>
                    </div>
                  </div>
                </Link>
              ))}

            </div> :
            <div className="absolute w-full min-h-10 bg-white border-[1px] border-gray-300 rounded-lg p-4 top-[58px] right-0 shadow-lg "  >
              <p className=" text-xl"> No Matching Data...</p>
            </div>
          }
        </> : <></>}

    </div>
  );
}

export default SearchProducts;

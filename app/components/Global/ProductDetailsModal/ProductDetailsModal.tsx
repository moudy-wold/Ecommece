"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { notification, Radio } from "antd";
import { LuShoppingCart } from "react-icons/lu";
import { AddToCard } from "@/app/api/Front/order";
import Loader from "@/app/components/Global/Loader/Loader"
type Props = {
    data: any,
    openProductDetails: any,
    setOpenProductDetails: any,
    store?: boolean,
}
function ProductDetailsModal(props: any) {
    const [details, setDetails] = useState<any>({});
    const [arrayOfObjects, setArrayOfObjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = (label: string, value: string) => {
        setDetails((prevState: any) => ({ ...prevState, [label]: value }));
    };

    const AddProductToCard = async (id: string) => {
        // setIsLoading(true)
        // const datas = {
        //     product_id: id,
        //     quantity: 1,
        //     details: JSON.stringify(details),
        // };

        // try {
        //     await AddToCard(datas);
        //     notification.success({
        //         message: "Product added to cart",
        //     });
        //     props.setOpenProductDetails(false)
        // }
        // catch (err: any) {
        //     console.log(err);
        //     notification.error({
        //         message: err.response.data.message,
        //     });
        // } finally {
        //     setIsLoading(false)
        // }
    };

    const options =
    {
        size: ["34", "36", "38", "40", "42"],
        color: ["black", "red", "green", "blue", "yellow"]
    }


    useEffect(() => {

    }, [props.data]);

    return (
        <div className="px-8 pt-8">
            {isLoading && <Loader />}
            {/* Start Image && Name */}
            <div className="flex items-center gap-4 mb-4">
                {/* Start Image */}
                <div className="">
                    <Image
                        src={props.data.images[0]}
                        width={70}
                        height={70}
                        alt={props.data.name ? "item.name" : "asdqqq"}
                        className={`!w-[70px] !h-[70px] border-2 border-gray-300 rounded-lg p-2 `}
                    />
                </div>
                {/* End Image */}
                {/* Start Name */}
                <div className="">
                    <p className="text-lg">{props.data.name}</p>
                    <p className="text-[#006496]">{props.data.brand}</p>
                </div>
                {/* End Name */}
            </div>
            {/* End Image && Name */}

            {/* Start details */}
            <div className="py-5 border-t-2 border-b-2 border-gray-300 ">
                {Object.entries(options).map(([key, values]: any) => (
                    <div key={key} className="mb-4">
                        <h3 className="text-lg font-bold mb-2">{key}</h3>
                        <Radio.Group>
                            {values.map((value: any, index: any) => (
                                <Radio.Button
                                    key={index}
                                    value={value}
                                    className="m-1"
                                    onClick={() => handleClick(key, value)}
                                >
                                    {value}
                                </Radio.Button>
                            ))}
                        </Radio.Group>
                    </div>
                ))}
            </div>
            {/* End details */}

            {/* Start Button */}
            <div className="mt-5">
                <button
                    onClick={() => { AddProductToCard(props.data._id) }}
                    className="w-full flex items-center justify-center gap-2 text-lg py-2 rounded-xl bg-[#006496] text-white hover:text-[#006496] hover:bg-white transition-all duration-150 border-2 border-[#006496] ">
                    <LuShoppingCart />
                    Add To Cart
                </button>
            </div>
            {/* End Button */}
        </div>
    )
}
export default ProductDetailsModal
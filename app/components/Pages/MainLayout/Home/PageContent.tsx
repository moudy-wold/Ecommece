import React from "react";
import SliderCart from "@/app/components/Global/SliderCart/SliderCart";
import AdsSlder from "@/app/components/Global/AdsSlider/AdsSlider"

function HomePage({ products_data, main_sliderData, branch_sliderData }: any) {
    return (
        <div>
            <div className="">
                <AdsSlder data={main_sliderData} />
            </div>
            {products_data?.map((item: any, index: number) => (
                <div key={index}>
                    {index == 1 && <><AdsSlder data={branch_sliderData} /></>}
                    <SliderCart data={item.products} title={item.name} category_id={item.id} />
                </div>
            ))}
        </div>
    )
}
export default HomePage;
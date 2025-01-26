import React from "react";
import SliderCart from "@/app/components/Global/SliderCart/SliderCart";
import AdsSlder from "@/app/components/Global/AdsSlider/AdsSlider"
import BennerImages from "./Guiding_images/PageContent";

function HomePage({ products_data, main_sliderData, branch_sliderData }: any) {
    return (
        <div>
            {/* Start Main Slider */}
            <AdsSlder data={main_sliderData} />
            {/* End Main Slider */}

            {/* Start Benner Image */}
            <BennerImages />
            {/* End Benner Image */}
            {/* Start Products & Branch SLider */}
            {products_data?.map((item: any, index: number) => (
                <div key={index}>
                    {/* Start Branch Slider */}
                    {index == 1 && <><AdsSlder data={branch_sliderData} /></>}
                    {/* End Branch Slider */}
                    <SliderCart data={item.products} title={item.name} category_id={item.id} />
                </div>
            ))}
            {/* ENd Products & Branch SLider*/}

        </div>
    )
}
export default HomePage;
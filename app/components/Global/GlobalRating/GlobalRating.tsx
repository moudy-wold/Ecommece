import React, { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
    average_rating: number
}

function GlobalRating({ average_rating }: Props) {
    const [ratingMarge, setRatingMarge] = useState([false, false, false, false, false])
    useEffect(() => {
        const updatedMarge = ratingMarge.map((_, index) => index < average_rating);
        setRatingMarge(updatedMarge);
    }, [])
    return (
        <div>
            <ul className="flex gap-1 ">
                {ratingMarge?.map((item: any, index: number) => (
                    <li className="" key={index}>

                        {item ?
                            <Image alt="star" src="/assets/fullStar.svg" width={17} height={17} className="" />
                            :
                            <Image alt="star" src="/assets/emptyStar.svg" width={15} height={15} className="" />
                        }
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default GlobalRating;
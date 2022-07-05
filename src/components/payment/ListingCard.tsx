import React, { useRef, useState } from "react";
import { Login } from "@components/login";
import { useOnClickOutside } from "usehooks-ts";
import { VerifyIcon } from "@components/icons";
import { CheckIcon, StarIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

export const Payment: React.FC = () => {
    const Router = useRouter();

    const { location, title, star, rating } = Router.query;
    const {img} = Router.query as unknown as {img: string};
  

    return (
        <div className="" id="listing_card">
            <div className="">
                <div className="flex border-b border-gray-300 p-6">
                    <div className="w-1/3">
                        <img
                            src={img}
                            className="w-[124px] h-[106px] rounded-xl "
                        ></img>
                    </div>
                    <div className="px-4 w-2/3 flex flex-col justify-between ">
                        <div className="">
                            <div className="text-xs font-normal">
                                {location}
                            </div>
                            <div className="text-black text-sm font-normal">
                                {title}
                            </div>
                        </div>

                        <div className="flex">
                            <StarIcon className="w-4 h-4 mr-1 text-black" />
                            <div className="text-black text-xs mr-1">
                                {star}
                            </div>
                            <div className="font-normal text-xs">
                                {"(" + rating + " đánh giá)"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="">
                <div className="border-b border-gray-300 flex p-6">
                    <div className="font-normal text-black mr-1">
                        Đặt phòng của bạn được bảo vệ bởi
                    </div>
                    <img src="https://a0.muscache.com/pictures/aircover/aircover-logo/original/56683a2f-f11b-43f6-8af7-a1b3861b2c85.svg"></img>
                </div>
            </div>
        </div>
    );
};

export default Payment;

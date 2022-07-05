import React, { useRef, useState } from "react";
import { Login } from "@components/login";
import { useOnClickOutside } from "usehooks-ts";
import { VerifyIcon } from "@components/icons";
import { CheckIcon, ChevronLeftIcon, StarIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { HeartIcon, ShareIcon } from "@heroicons/react/outline";

export const TitleDefaultMobile: React.FC = () => {
    const Router = useRouter();

    const {
        roomID,
        img,
        place,
        title,
        displayName,
        homeType,
        totalGuests,
        totalBedrooms,
        totalBathrooms,
        hasTv,
        hasKitchen,
        hasAirCon,
        hasHeating,
        hasWifi,
        star,
        rating,
        price,
    } = Router.query;

    return (
        <div className="flex justify-between pt-6">
            <div className="flex">
                <a href="/">
                    <ChevronLeftIcon className="w-8 h-8 mr-2 text-black p-1 rounded-full self-center hover:bg-gray-300 cursor-pointer" />
                </a>
                <h1 className="text-xl font-semibold text-black">
                    {"Toàn bộ khách sạn/nhà ở " +
                        " tại " +
                        displayName +
                        "- Airbnb"}
                </h1>
            </div>

            <div className="flex space-x-4 flex-grow justify-end">
                <a className="flex items-center cursor-pointer  text-black rounded-xl hover:bg-gray-300">
                    <ShareIcon className="h-5 w-5 mr-2" />
                </a>

                <a className="flex items-center cursor-pointer text-black rounded-xl hover:bg-gray-300">
                    <HeartIcon className="h-5 w-5 mr-2" />
                </a>
            </div>
        </div>
    );
};

export default TitleDefaultMobile;

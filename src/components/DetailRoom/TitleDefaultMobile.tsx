import React, { useRef, useState } from "react";
import { Login } from "@components/login";
import { useOnClickOutside } from "usehooks-ts";
import { VerifyIcon } from "@components/icons";
import { CheckIcon, StarIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

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

        price,
    } = Router.query;

    const star = 5;
    const rating = 0;

    return (
        <div className="py-6 border-b border-gray-300">
            <h2 className="font-semibold text-3xl text-black">{title}</h2>
            <div className="flex mt-3 items-center">
                <div className="flex items-center text-black">
                    <StarIcon className="h-5 text-red-500 mr-1" />
                    {star + " · "}
                </div>
                <p className="ml-2 items-center m-0 underline text-black cursor-pointer">
                    {rating + " đánh giá"}
                </p>
            </div>

            <p className="underline ml-2 items-center font-semibold text-black cursor-pointer">
                {place}
            </p>
        </div>
    );
};

export default TitleDefaultMobile;

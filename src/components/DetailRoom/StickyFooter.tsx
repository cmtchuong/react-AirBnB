import React, { useRef, useState } from "react";
import { Login } from "@components/login";
import { useOnClickOutside } from "usehooks-ts";
import { VerifyIcon } from "@components/icons";
import { CheckIcon, ChevronLeftIcon, StarIcon } from "@heroicons/react/solid";
import TitleDefaultMobile from "@components/DetailRoom/TitleDefaultMobile";
import NavMobile from "@components/DetailRoom/NavMobile";
import { useRouter } from "next/router";
import { Modal, useModal } from "@nextui-org/react"
import { format, addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";

export const RepoMobile: React.FC = () => {
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

    const [pickDay, setPickDay] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection",
        },
    ]);

    const formattedStartDate = format(
        new Date(pickDay[0].startDate),
        "dd/MM/yyyy",
    );
    const formattedEndDate = format(new Date(pickDay[0].endDate), "dd/MM/yyyy");

    const dayNum =
        new Date(pickDay[0].endDate).getDate() -
        new Date(pickDay[0].startDate).getDate();

    return (
        <div className="sticky bottom-0 z-10 w-full px-[5%] py-5 bg-white border border-gray-300">
            <div className="flex justify-between">
                <div className="flex flex-col space-y-1">
                    <div className="text-xl text-black">
                        {"$" + price}{" "}
                        <span className="font-normal text-lg"> / đêm </span>
                    </div>

                    <div className="">
                        <span className="font-normal text-lg">{formattedStartDate + " - "}</span>
                        <span className="font-normal text-lg">{formattedEndDate}</span>
                    </div>
                </div>

                <button
                    type="button"
                    className="bg-gradient-to-r from-[#e61e4d] to-[#d70466] rounded-xl p-3 text-white active:bg-pink-500 hover:shadow-xl active:scale-90 transition duration-150 font-medium"
                    onClick={() => {
                        Router.push({
                            pathname: "/payment/confirm",
                            query: {
                                img: img,
                                roomID: roomID,
                                place: place,
                                // startAt: formattedStartDate,
                                // endAt: formattedEndDate,
                                // guests: guests,
                                // adults: adults,
                                // children: children,
                                price: price,
                                // location: location,
                                rating: rating,
                                star: star,
                                title: title,
                                // dayNum: dayNum,
                            },
                        });
                    }}
                >
                    Thanh toán
                </button>
            </div>
        </div>
    );
};

export default RepoMobile;

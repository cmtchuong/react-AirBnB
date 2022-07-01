import React, { useRef, useState } from "react";
import { Login } from "@components/login";
import { useOnClickOutside } from "usehooks-ts";
import { VerifyIcon } from "@components/icons";
import { CheckIcon, StarIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

export const Payment: React.FC = () => {
    const Router = useRouter();

    const { startDate, endDate, guests, adults, children } = Router.query;

    return (
        <div className="pb-6 border-b border-gray-300 pt-6">
            <h2 className="text-2xl text-black font-semibold pb-2">
                Chuyến đi của bạn
            </h2>

            <div className="flex justify-between py-6">
                <div className="flex flex-col space-y-1">
                    <h2 className="text-black font-semibold"> Ngày </h2>
                    <p className="text-black">{startDate + " - " + endDate} </p>
                </div>

                
                <div className="text-black underline font-semibold self-center cursor-pointer">Chỉnh sửa</div>
            </div>

            <div className="flex justify-between">
                <div className="flex flex-col space-y-1">
                    <h2 className="text-black font-semibold"> Khách </h2>
                    <p className="text-black">{guests + " khách (" + adults + " người lớn và " + children + " trẻ em)"} </p>
                </div>

                
                <div className="text-black underline font-semibold self-center cursor-pointer">Chỉnh sửa</div>
            </div>
        </div>
    );
};

export default Payment;

import React, { useRef, useState } from "react";
import { Login } from "@components/login";
import { useOnClickOutside } from "usehooks-ts";
import { VerifyIcon } from "@components/icons";
import { CheckIcon, StarIcon } from "@heroicons/react/solid";
import { Modal, useModal } from "@nextui-org/react";
import { useRouter } from "next/router";

export const Payment: React.FC = () => {
    const Router = useRouter();

    const { setVisible, bindings } = useModal();

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
    const rating = 0

    return (
        <div>
            <div className="py-6 flex items-center" id="danhGia">
                <StarIcon className="h-5 text-red-500 mr-1" />
                <h2 className="text-2xl text-black">{star}</h2>
                <div className="mx-1 text-black text-2xl">·</div>
                <h2 className="text-2xl text-black">{rating + " đánh giá"}</h2>
            </div>

            <button className="my-10 w-full py-3 cursor-pointer active:scale-95 active:bg-gray 100 transition transform ease-out block border rounded-xl font-medium text-black hover:bg-gray-300  duration-200 ">
                {/* {rating !== "0" && "Hiển thị tất cả " + rating + " đánh giá"}

                {rating === "0" && "Đánh giá tại đây"} */}

                Đánh giá tại đây
            </button>
        </div>
    );
};

export default Payment;

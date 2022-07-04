import React, { useRef, useState } from "react";
import { Login } from "@components/login";
import { useOnClickOutside } from "usehooks-ts";
import { VerifyIcon } from "@components/icons";
import { CheckIcon, StarIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

export const Payment: React.FC = () => {
   
   const Router = useRouter();
   
   const {dayNum, price} = Router.query as unknown as {dayNum: number, price: number};

   const cleaningFee = price * 0.25;
   const totalPrice = price * dayNum + cleaningFee;

    return (
        <div className="p-6">
            <div className="flex flex-col space-y-4 border-b border-gray-300 pb-6">
                <h2 className="text-black text-2xl">Chi tiết giá</h2>

                <div className="flex justify-between font-normal text-black">
                    <div className=""> {"$" + price + " x " + dayNum + " đêm " } </div>
                    <div className=""> {"$" + price * dayNum + " " } </div>
                </div>

                <div className="flex justify-between font-normal text-black">
                    <div className=""> Phí vệ sinh </div>
                    <div className=""> {"$" + cleaningFee} </div>
                </div>
            </div>

            <div className="pt-6 flex justify-between">
                <div className="text-black">Tổng (USD): </div>
                <div className=" text-black"> {"$" + totalPrice} </div>
            </div>
        </div>
    );
};

export default Payment;

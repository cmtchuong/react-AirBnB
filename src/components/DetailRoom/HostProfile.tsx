import React, { useRef, useState } from "react";
import { Login } from "@components/login";
import { useOnClickOutside } from "usehooks-ts";
import { AirbnbPrivacy, VerifyIcon } from "@components/icons";
import { CheckIcon, FingerPrintIcon, StarIcon } from "@heroicons/react/solid";

export const Payment: React.FC = () => {
   
   

    return (
        <div>
            <div className="flex flex-col py-6 border-b border-gray-300">
                    <div className="flex">
                        <img
                            src="https://media.discordapp.net/attachments/890493745982767111/988728915382128680/unknown.png"
                            className="w-16 h-16 rounded-full cursor-pointer"
                        ></img>
                        <div className="flex-grow px-4">
                            <h2 className="text-black text-2xl pt-1">
                                Chủ nhà CBS
                            </h2>
                            <p className="font-normal">
                                Đã tham gia vào tháng 11 năm 2021
                            </p>
                        </div>
                    </div>

                    <div className="flex py-6 lg:space-x-6">
                        <div className="items-center hidden lg:flex">
                            <StarIcon className="h-5 w-5 text-black mr-2" />
                            <p className="font-normal text-black">
                                11 đánh giá
                            </p>
                        </div>

                        <div className="flex items-center">
                            <FingerPrintIcon className="h-5 text-black mr-2" />
                            <p className="font-normal text-black">
                                Đã xác minh danh tính
                            </p>
                        </div>
                    </div>

                    <p className="text-black font-normal pt-4 mb-4">
                        Tỉ lệ phản hồi: 91%
                    </p>

                    <p className="text-black font-normal">
                        Thời gian phản hồi: Trong vòng 12 giờ
                    </p>

                    <button className="w-full lg:w-1/4 my-10 py-3 cursor-pointer active:scale-95 active:bg-gray 100 transition transform ease-out block border rounded-xl font-medium text-black hover:bg-gray-300  duration-200 ">
                        {" "}
                        Liên hệ với chủ nhà{" "}
                    </button>

                    <div className="flex items-center">
                        <div className="mr-4">
                            {" "}
                            <AirbnbPrivacy />{" "}
                        </div>
                        <p className="font-normal text-xs text-black w-full lg:w-1/4">
                            Để bảo vệ khoản thanh toán của bạn, tuyệt đối không
                            chuyển tiền hoặc liên lạc bên ngoài trang web hoặc
                            ứng dụng Airbnb.
                        </p>
                    </div>
                </div>
        </div>
    );
};

export default Payment;

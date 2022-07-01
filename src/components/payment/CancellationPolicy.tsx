import React, { useRef, useState } from "react";
import { Login } from "@components/login";
import { useOnClickOutside } from "usehooks-ts";
import { VerifyIcon } from "@components/icons";
import { CheckIcon, StarIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { start } from "repl";
import { Modal, useModal } from "@nextui-org/react";

export const Payment: React.FC = () => {
    const Router = useRouter();

    const { startDate, endDate } = Router.query;

    const { setVisible, bindings } = useModal();

    return (
        <div className="py-6">
            <h2 className="text-black font-semibold text-2xl">
                Chính sách hủy
            </h2>

            <div className="py-4">
                <span className="text-black font-semibold">
                    {" "}
                    {"Hủy miễn phí trước 15:00 trong vòng 30 ngày kể từ ngày " +
                        startDate +
                        ". "}{" "}
                </span>
                <span className="font-normal">
                    {"Sau đó, hủy trước 17:00 trong vòng 7 ngày kể từ ngày " +
                        startDate +
                        " để được hoàn lại 50%, trừ phí dịch vụ. "}
                </span>
                <span className="text-black font-semibold underline cursor-pointer">
                    <a href="https://www.airbnb.com.vn/help/article/2637">
                    Tìm hiểu thêm
                    </a>
                </span>
            </div>

            <div className="pt-4 pb-8 border-b border-gray-300">
                <span className="font-normal">
                    Chính sách trường hợp bất khả kháng của chúng tôi không áp
                    dụng cho các trường hợp gián đoạn đi lại do COVID-19 gây ra.{" "}
                </span>
                <span className="text-black font-semibold underline cursor-pointer">
                    <a href="https://www.airbnb.com.vn/help/article/2701/extenuating-circumstances-policy-and-the-coronavirus-covid19">
                        Tìm hiểu thêm
                    </a>
                </span>
            </div>
        </div>
    );
};

export default Payment;

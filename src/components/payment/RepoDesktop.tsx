import React, { useRef, useState } from "react";
import { Login } from "@components/login";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import LoginHeader from "@components/header/LoginHeader";
import { Footer } from "@components/footer";
import YourTrip from "@components/payment/YourTrip";
import PaymentPlan from "@components/payment/PaymentPlan";
import PaymentOption from "@components/payment/PaymentOption";
import CancellationPolicy from "@components/payment/CancellationPolicy";
import ConfirmButton from "@components/payment/ConfirmButton";
import TermsAndConditions from "@components/payment/TermsAndConditions";
import ListingCard from "@components/payment/ListingCard";
import PriceDetail from "@components/payment/PriceDetail";
import { Loading } from "@nextui-org/react";
import { useOnClickOutside } from "usehooks-ts";
import { GoogleIcon, PaypalIcon, VerifyIcon } from "@components/icons";
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    StarIcon,
} from "@heroicons/react/solid";

import { useForm, SubmitHandler } from "react-hook-form";
import {
    CreditCardIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/outline";
import { Router, useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "@utils/apiEndpoints";
import http from "@utils/http";
import { format } from "date-fns";
import { getCookie } from "cookies-next";

// import { API_ENDPOINTS } from "@utils/apiEndpoints";

type PaymentOptionProps = {
    roomId: string;
    checkIn: string;
    checkOut: string;
    cardNumber: number;
    expiredDate: string;
    cvv: number;
    zipCode: number;
};

export const Payment: React.FC = () => {
    const value = getCookie("isLoggedIn");
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<PaymentOptionProps>();

    const Router = useRouter();
    const { roomID, startAt, endAt, startDate, endDate } = Router.query;

    const onSubmit = handleSubmit(async (user) => {
        setIsLoading(true);
        const response = await http
            .post(
                `https://airbnb.cybersoft.edu.vn${API_ENDPOINTS.BOOKING}${roomID}`,
                user,
            )
            .then((res) => {
                toast.info("Thanh toán thành công!", {
                    position: "top-right",
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    autoClose: 3000,
                });

                Router.push("/payment/success");
                setIsLoading(false);
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    toast.error("Có lỗi xảy ra!", {
                        position: "top-right",
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        autoClose: 3000,
                    });

                    setIsLoading(false);
                }

                if (err.response.status === 401) {
                    toast.error("Đã có lỗi xảy ra!", {
                        position: "top-right",
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        autoClose: 3000,
                    });

                    setIsLoading(false);
                }

                if (err.response.status === 403) {
                    toast.error("Đã có lỗi xảy ra!", {
                        position: "top-right",
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        autoClose: 3000,
                    });
                    setIsLoading(false);
                }

                if (err.response.status === 500) {
                    toast.error(
                        "Đã có lỗi xảy ra, vui lòng liên hệ bộ phận CSKH để được hỗ trợ",
                        {
                            position: "top-right",
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                            autoClose: 3000,
                        },
                    );
                    setIsLoading(false);
                }
            });
    });

    const [openCreditCard, setOpenCreditCard] = useState(false);
    const [openNation, setOpenNation] = useState(false);
    const [anchorErrors, setAnchorErrors] = useState(false);
    const [cardName, setCardName] = useState("Thẻ tín dụng hoặc thẻ ghi nợ");
    const [nationName, setNationName] = useState("Việt Nam");

    const [isLoading, setIsLoading] = useState(false);

    const { price } = Router.query;

    let priceToPay = parseInt(price);

    return (
        <div>
            <LoginHeader />

            <div className="flex xl:mx-[12%] mx-[8%]">
                <div className="flex flex-col w-3/5 px-6 xl:px-12">
                    <div className="flex pt-6 pb-10">
                        <a href="/">
                            <ChevronLeftIcon className="w-8 h-8 mr-3 text-black p-1 rounded-full self-center hover:bg-gray-300 cursor-pointer" />
                        </a>
                        <h1 className="text-3xl font-semibold text-black">
                            {" "}
                            Xác nhận và thanh toán - Airbnb{" "}
                        </h1>
                    </div>

                    <YourTrip />

                    {/* <PaymentPlan halfPrice/> */}

                    {/* <PaymentOption /> */}
                    <div
                        className="flex flex-col py-6 border-b border-gray-300"
                        id="PaymentOption"
                    >
                        <div className="flex justify-between pb-6">
                            <h2 className="text-black font-semibold text-2xl">
                                Thanh toán bằng
                            </h2>
                            <div className="flex items-center space-x-2">
                                <img
                                    className="w-[29px] h-[9px]"
                                    src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_visa.0adea522bb26bd90821a8fade4911913.svg"
                                    alt=""
                                />

                                <img
                                    className="w-[39px] h-[9px]"
                                    src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_amex.84088b520ca1b3384cb71398095627da.svg"
                                    alt=""
                                />

                                <img
                                    className="w-[59px] h-[9px]"
                                    src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_discover.7f05c82f07d62a0f8a69d54dbcd7c8be.svg"
                                    alt=""
                                />

                                <img
                                    className="w-[35px] h-[9px]"
                                    src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_paypal.faa3042fa2daf6b4a9822cc4b43e8609.svg"
                                    alt=""
                                />

                                <img
                                    className="w-[23px] h-[9px]"
                                    src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_googlepay.3f786bc031b59575d24f504dfb859da0.svg"
                                    alt=""
                                />
                            </div>
                        </div>

                        <div className="p-4 border border-gray-500 rounded-xl relative hover:border-gray-300 cursor-pointer">
                            <div
                                className="flex justify-between relative"
                                onClick={() => {
                                    setOpenCreditCard(!openCreditCard);
                                }}
                            >
                                <div className="flex">
                                    {cardName ===
                                        "Thẻ tín dụng hoặc thẻ ghi nợ" && (
                                        <CreditCardIcon className="h-[33px] w-[33px] mr-4" />
                                    )}

                                    {cardName === "Paypal" && (
                                        <div className="mr-4">
                                            {" "}
                                            <PaypalIcon />{" "}
                                        </div>
                                    )}

                                    {cardName === "Google Pay" && (
                                        <div className="mr-6 self-center">
                                            {" "}
                                            <GoogleIcon />{" "}
                                        </div>
                                    )}
                                    <p className="self-center">{cardName}</p>
                                </div>

                                {!openCreditCard && (
                                    <ChevronDownIcon className="h-6 w-6 self-center" />
                                )}

                                {openCreditCard && (
                                    <ChevronUpIcon className="h-6 w-6 self-center" />
                                )}
                            </div>

                            {openCreditCard && (
                                <div className="absolute left-0 rounded-xl border border-gray-300 shadow-listProduct bg-white w-full ">
                                    <div
                                        className="flex justify-between py-4 border-b border-gray-300 hover:bg-gray-300 cursor-pointer px-4"
                                        onClick={() => {
                                            setOpenCreditCard(false);
                                            setCardName(
                                                "Thẻ tín dụng hoặc thẻ ghi nợ",
                                            );
                                        }}
                                    >
                                        <div className="flex">
                                            <CreditCardIcon className="h-[33px] w-[33px] mr-4" />
                                            <p className="self-center">
                                                Thẻ tín dụng hoặc thẻ ghi nợ
                                            </p>
                                        </div>

                                        {cardName ===
                                            "Thẻ tín dụng hoặc thẻ ghi nợ" && (
                                            <CheckIcon className="h-6 w-6 mr-4 self-center" />
                                        )}
                                    </div>

                                    <div
                                        className="flex justify-between py-4 border-b border-gray-300 hover:bg-gray-300 cursor-pointer px-4"
                                        onClick={() => {
                                            setOpenCreditCard(false);
                                            setCardName("Paypal");
                                        }}
                                    >
                                        <div className="flex">
                                            <div className="mr-4">
                                                {" "}
                                                <PaypalIcon />{" "}
                                            </div>
                                            <p className="self-center">
                                                Paypal
                                            </p>
                                        </div>

                                        {cardName === "Paypal" && (
                                            <CheckIcon className="h-6 w-6 mr-4 self-center" />
                                        )}
                                    </div>

                                    <div
                                        className="flex justify-between py-4 border-b border-gray-300 hover:bg-gray-300 cursor-pointer px-4"
                                        onClick={() => {
                                            setOpenCreditCard(false);
                                            setCardName("Google Pay");
                                        }}
                                    >
                                        <div className="flex">
                                            <div className="mr-6 self-center">
                                                {" "}
                                                <GoogleIcon />{" "}
                                            </div>
                                            <p className="self-center">
                                                Google Pay
                                            </p>
                                        </div>

                                        {cardName === "Google Pay" && (
                                            <CheckIcon className="h-6 w-6 mr-4 self-center" />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="mb-4">
                            <label className="">
                                <div className=" border rounded-t-xl border-gray-500 p-3 ">
                                    <div>
                                        <p className="text-black text-xs font-semibold">
                                            Mã phòng
                                        </p>
                                    </div>
                                    <input
                                        {...register("roomId")}
                                        id="roomId"
                                        name="roomId"
                                        readOnly
                                        value={roomID}
                                        className=" text-base w-full md:text-left text-center text-black "
                                    ></input>
                                </div>
                            </label>

                            <div className="flex">
                                <label className="flex-grow">
                                    <div className="border border-gray-500 p-3 rounded-bl-xl  border-r-0">
                                        <div>
                                            <p className="text-black text-xs font-semibold">
                                                Ngày bắt đầu
                                            </p>
                                        </div>

                                        <input
                                            {...register("checkIn")}
                                            readOnly
                                            id="checkIn"
                                            name="checkIn"
                                            value={startAt}
                                            className=" text-base w-full md:text-left text-center text-black "
                                        ></input>
                                    </div>
                                </label>

                                <label className="flex-grow">
                                    <div className="border border-gray-500 p-3 rounded-br-xl ">
                                        <div>
                                            <p className="text-black text-xs font-semibold">
                                                Ngày kết thúc
                                            </p>
                                        </div>
                                        <input
                                            {...register("checkOut")}
                                            required
                                            id="checkOut"
                                            name="checkOut"
                                            value={endAt}
                                            readOnly
                                            className=" text-base w-full md:text-left text-center text-black "
                                        ></input>
                                    </div>
                                </label>
                            </div>
                        </div>
                        {/* 
                            <label className="">
                                <div className=" border rounded-t-xl border-gray-500 p-3 ">
                                    <div>
                                        <p className="text-red-600 text-xs font-semibold">
                                            Số thẻ
                                        </p>
                                    </div>
                                    <input
                                        {...register("cardNumber", {
                                            required:
                                                "Số thẻ không được để trống",
                                            pattern: {
                                                value: /^[0-9 ]+$/,
                                                message:
                                                    "Định dạng thẻ phải là số",
                                            },

                                            minLength: {
                                                value: 19,
                                                message:
                                                    "Số thẻ phải có 16 ký tự",
                                            },

                                            maxLength: {
                                                value: 19,
                                                message:
                                                    "Số thẻ phải có 16 ký tự",
                                            },
                                        })}
                                        required
                                        id="cardNumber"
                                        name="cardNumber"
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="0000 0000 0000 0000"
                                        className=" text-base w-full md:text-left text-center text-black "
                                    ></input>
                                </div>

                                {errors.cardNumber && (
                                    <div className="text-red-800 font-medium text-xs my-2 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                        <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                        {errors.cardNumber.message}
                                    </div>
                                )}
                            </label> */}

                        {/* <div className="flex">
                                <label className="flex-grow">
                                    <div className="border border-gray-500 p-3 rounded-bl-xl  border-r-0">
                                        <div>
                                            <p className="text-red-600 text-xs font-semibold">
                                                Ngày hết hạn
                                            </p>
                                        </div>

                                        <input
                                            {...register("expiredDate", {
                                                required:
                                                    "Ngày hết hạn không được để trống",
                                                pattern: {
                                                    value: /^(?:0[1-9]|1[0-2])\/(?:2[2-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])$/,
                                                    message:
                                                        "Hãy nhập đúng định dạng (năm hết hạn ≥ 2022)",
                                                },
                                            })}
                                            required
                                            id="expiredDate"
                                            name="expiredDate"
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="TT/NN"
                                            className=" text-base w-full md:text-left text-center text-black "
                                        ></input>
                                    </div>
                                    {errors.expiredDate && (
                                        <div className="text-red-800 font-medium text-xs my-2 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                            <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                            {errors.expiredDate.message}
                                        </div>
                                    )}
                                </label>

                                <label className="flex-grow">
                                    <div className="border border-gray-500 p-3 rounded-br-xl ">
                                        <div>
                                            <p className="text-red-600 text-xs font-semibold">
                                                CVV
                                            </p>
                                        </div>
                                        <input
                                            {...register("cvv", {
                                                required:
                                                    "CVV không được để trống",
                                                pattern: {
                                                    value: /^[0-9]{3,4}$/,
                                                    message:
                                                        "CVV chưa đúng dịnh dạng",
                                                },
                                            })}
                                            required
                                            id="cvv"
                                            name="cvv"
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="123"
                                            className=" text-base w-full md:text-left text-center text-black "
                                        ></input>
                                    </div>
                                    {errors.cvv && (
                                        <div className="text-red-800 font-medium text-xs my-2 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                            <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                            {errors.cvv.message}
                                        </div>
                                    )}
                                </label>
                            </div>

                            <label className="">
                                <div className=" border rounded-xl border-gray-500 p-3 mt-4">
                                    <div>
                                        <p className="text-red-600 text-xs font-semibold">
                                            Mã bưu chính
                                        </p>
                                    </div>
                                    <input
                                        {...register("zipCode", {
                                            required:
                                                "Mã bưu chính không được để trống",
                                            pattern: {
                                                value: /^[0-9 ]+$/,
                                                message:
                                                    "Hãy nhập đúng định dạng",
                                            },
                                        })}
                                        required
                                        id="zipCode"
                                        name="zipCode"
                                        type="text"
                                        inputMode="decimal"
                                        placeholder=""
                                        className=" text-base w-full md:text-left text-center text-black "
                                    ></input>
                                </div>

                                {errors.zipCode && (
                                    <div className="text-red-800 font-medium text-xs my-2 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                        <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                        {errors.zipCode.message}
                                    </div>
                                )}
                            </label>
                        </div> */}

                        <label>
                            <div
                                className=" border rounded-xl border-gray-500 p-3 mt-4 cursor-pointer relative"
                                onClick={() => {
                                    setOpenNation(!openNation);
                                }}
                            >
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-black text-xs font-semibold">
                                            Quốc gia/Khu vực
                                        </p>
                                        <div className="text-black font-normal">
                                            {nationName}
                                        </div>
                                    </div>
                                    {!openNation && (
                                        <ChevronDownIcon className="w-6 h-6 self-center" />
                                    )}

                                    {openNation && (
                                        <ChevronUpIcon className="w-6 h-6 self-center" />
                                    )}
                                </div>

                                {openNation && (
                                    <div className=" absolute left-0 rounded-xl border border-gray-300 shadow-listProduct bg-white w-full overflow-y-scroll h-[180px] ">
                                        <div
                                            className="p-4 border-b border-gray-300 hover:bg-gray-300 cursor-pointer flex justify-between"
                                            onClick={() => {
                                                setNationName("Việt Nam");
                                                setOpenNation(false);
                                            }}
                                        >
                                            <div className="text-black font-normal">
                                                {" "}
                                                Việt Nam{" "}
                                            </div>

                                            {nationName === "Việt Nam" && (
                                                <CheckIcon className="w-6 h-6 self-center" />
                                            )}
                                        </div>

                                        <div
                                            className="p-4 border-b border-gray-300 hover:bg-gray-300 cursor-pointer flex justify-between"
                                            onClick={() => {
                                                setNationName("Mỹ");
                                                setOpenNation(false);
                                            }}
                                        >
                                            <div className="text-black font-normal">
                                                {" "}
                                                Mỹ{" "}
                                            </div>

                                            {nationName === "Mỹ" && (
                                                <CheckIcon className="w-6 h-6 self-center" />
                                            )}
                                        </div>

                                        <div
                                            className="p-4 border-b border-gray-300 hover:bg-gray-300 cursor-pointer flex justify-between"
                                            onClick={() => {
                                                setNationName("Hàn Quốc");
                                                setOpenNation(false);
                                            }}
                                        >
                                            <div className="text-black font-normal">
                                                {" "}
                                                Hàn Quốc{" "}
                                            </div>

                                            {nationName === "Hàn Quốc" && (
                                                <CheckIcon className="w-6 h-6 self-center" />
                                            )}
                                        </div>

                                        <div
                                            className="p-4 border-b border-gray-300 hover:bg-gray-300 cursor-pointer flex justify-between"
                                            onClick={() => {
                                                setNationName("Nhật Bản");
                                                setOpenNation(false);
                                            }}
                                        >
                                            <div className="text-black font-normal">
                                                {" "}
                                                Nhật Bản{" "}
                                            </div>

                                            {nationName === "Nhật Bản" && (
                                                <CheckIcon className="w-6 h-6 self-center" />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </label>

                        <div className=" text-base text-black font-semibold underline cursor-pointer pt-4">
                            Nhập mã giảm giá
                        </div>
                    </div>

                    <CancellationPolicy />

                    {/* <ConfirmButton /> */}

                    <TermsAndConditions />

                    {value === undefined ? (
                        <div className="mb-20">
                            <button
                                type="submit"
                                className="bg-gray-500 rounded-xl py-3 mt-5 font-medium md:w-2/3 text-xl cursor-not-allowed"
                            >
                                Xác nhận và thanh toán - Airbnb
                            </button>

                            <p className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                Hãy đăng nhập để tiến hành thanh toán
                            </p>
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-[#e61e4d] to-[#d70466] w-full rounded-xl py-3 mt-5 mb-20 text-white active:bg-pink-500 hover:shadow-xl active:scale-90 transition duration-150 font-medium md:w-2/3 text-xl cursor-pointer"
                            onClick={() => {
                                onSubmit;
                                Router.push("/payment/success");
                            }}
                        >
                            {isLoading ? (
                                <Loading type="default" color="white" />
                            ) : (
                                "Xác nhận và thanh toán - Airbnb"
                            )}
                        </button>
                    )}
                </div>

                <div className="w-2/5 xl:p-6 p-3 mb-12">
                    <div className="border border-gray-300 rounded-xl sticky top-[20%]">
                        <ListingCard />

                        <PriceDetail />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Payment;

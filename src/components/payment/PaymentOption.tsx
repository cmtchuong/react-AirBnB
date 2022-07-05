import React, { useState } from "react";
import { GoogleIcon, PaypalIcon } from "@components/icons";
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "@heroicons/react/solid";

import { useForm } from "react-hook-form";
import {
    CreditCardIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/outline";

import { Modal, useModal } from "@nextui-org/react";

type PaymentOptionProps = {
    cardNumber: number;
    expiredDate: string;
    cvv: number;
    zipCode: number;
};

export const Payment: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<PaymentOptionProps>();

    const onSubmit = (data: PaymentOptionProps) => {};

    const [openCreditCard, setOpenCreditCard] = useState(false);
    const [openNation, setOpenNation] = useState(false);
    const [cardName, setCardName] = useState("Thẻ tín dụng hoặc thẻ ghi nợ");
    const [nationName, setNationName] = useState("Việt Nam");

    const { setVisible, bindings } = useModal();

    return (
        <>
            <div className="flex flex-col py-6 border-b border-gray-300">
                <div className="flex justify-between pb-6">
                    <h2 className="text-black font-semibold text-2xl">
                        Thanh toán bằng
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-x-2 sm:space-y-0">
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
                            {cardName === "Thẻ tín dụng hoặc thẻ ghi nợ" && (
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
                                    setCardName("Thẻ tín dụng hoặc thẻ ghi nợ");
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
                                    <p className="self-center">Paypal</p>
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
                                    <p className="self-center">Google Pay</p>
                                </div>

                                {cardName === "Google Pay" && (
                                    <CheckIcon className="h-6 w-6 mr-4 self-center" />
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-4" onClick={handleSubmit(onSubmit)}>
                    <label className="">
                        <div className=" border rounded-t-xl border-gray-500 p-3 ">
                            <div>
                                <p className="text-red-600 text-xs font-semibold">
                                    Số thẻ
                                </p>
                            </div>
                            <input
                                {...register("cardNumber", {
                                    required: "Số thẻ không được để trống",
                                    pattern: {
                                        value: /^[0-9 ]+$/,
                                        message: "Định dạng thẻ phải là số",
                                    },

                                    minLength: {
                                        value: 19,
                                        message: "Số thẻ phải có 16 ký tự",
                                    },

                                    maxLength: {
                                        value: 19,
                                        message: "Số thẻ phải có 16 ký tự",
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
                    </label>

                    <div className="flex">
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
                                        required: "CVV không được để trống",
                                        pattern: {
                                            value: /^[0-9]{3,4}$/,
                                            message: "CVV chưa đúng dịnh dạng",
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
                                        message: "Hãy nhập đúng định dạng",
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
                </div>

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
                            <div className=" absolute left-0 rounded-xl border border-gray-300 shadow-listProduct bg-white w-full ">
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

                <h2
                    className=" text-base text-black font-semibold underline cursor-pointer pt-4"
                    onClick={() => {
                        setVisible(true);
                    }}
                >
                    Nhập mã giảm giá
                </h2>
            </div>
            <Modal
                scroll
                closeButton
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                width="600px"
                className=""
                {...bindings}
            >
                <Modal.Header className="block border-b border-gray-300">
                    <h2 className="text-black font-semibold text-xl pb-4">
                        Nội quy nhà
                    </h2>
                </Modal.Header>
                <Modal.Body>
                    wrfrfdgf
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Payment;

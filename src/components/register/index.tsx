import React, { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { API_ENDPOINTS } from "@utils/apiEndpoints";
import http from "@utils/http";
import { toast } from "react-toastify";
import {
    AppleIcon,
    ColorFacebookIcon,
    GoogleIcon,
} from "@components/icons";
// import classNames from "classnames";

import { Loading } from "@nextui-org/react";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

type User = {
    username: string;
    password: string;
    confirmPassword?: string;
    name: string;
    email: String;
    birthday: string;
    gender: boolean;
    phoneNumber: number;
    address: string;
    type: string;
};

export const Register: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<User>();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = handleSubmit(async (user) => {
        setIsLoading(true);
        delete user.confirmPassword;
        const response = await http
            .post(
                `https://airbnb.cybersoft.edu.vn${API_ENDPOINTS.REGISTER}`,
                user,
            )
            .then((res) => {
                toast.info("Đăng ký thành công!", {
                    position: "top-right",
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                });
                setIsLoading(false);
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    toast.error("Truy cập bị chặn!", {
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

    const newPassword = useRef({});
    newPassword.current = watch("password", "");

    // const ref = useRef(null);
    // const handleClickOutside = () => {

    //     console.log("clicked outside");
    // };

    // const handleClickInside = () => {
    //     // Your custom logic here
    //     console.log("clicked inside");
    // };

    // useOnClickOutside(ref, handleClickOutside);

    return (
        <div className="center block bg-white relative border border-gray-400 rounded-xl w-full lg:w-2/5 md:w-3/5 mx-auto md:mt-14 md:mb-10 ">
            <div className=" text-black ">
                {/* Title */}

                <div className="items-center  lg:relative sticky top-0 border-b border-gray-500 bg-white py-[25px] rounded-t-22">
                    {/* <button
                        ref={ref}
                        className="absolute hover:bg-gray-200 rounded-full ml-6"
                        onClick={() => {}}
                    >
                        X
                    </button> */}
                    <div className=" text-center text-xl">
                        <h1>Đăng ký</h1>
                    </div>
                </div>

                <div className="">
                    {/* Body */}
                    <div className="p-6 ">
                        <h2 className="text-[22px] leading-6">
                            Chào mừng bạn đến với Airbnb
                        </h2>

                        <form className="form py-5" onSubmit={onSubmit}>
                            <div className="flex flex-col justify-between ">
                                
                                <label className="pb-4">
                                    <div className="">
                                        <div>
                                            <p className="text-base">Email</p>
                                        </div>
                                        <div className="rounded-lg ">
                                            <input
                                                {...register("email", {
                                                    required:
                                                        "Email không được để trống",
                                                    pattern: {
                                                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                        message:
                                                            "Email không đúng định dạng",
                                                    },
                                                })}
                                                required
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="abc@gmail.com"
                                                className=" text-base w-full  border border-gray-500 md:text-left text-center p-4 focus:border-black focus:border-2"
                                            ></input>
                                        </div>
                                        {errors.email && (
                                            <div className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                                <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                                {errors.email.message}
                                            </div>
                                        )}
                                    </div>
                                </label>

                                <label className="pb-4">
                                    <div className="">
                                        <div>
                                            <p className="text-base">
                                                Mật khẩu
                                            </p>
                                        </div>
                                        <div className="rounded-lg">
                                            <input
                                                {...register("password", {
                                                    required:
                                                        "Bạn chưa nhập mật khẩu",
                                                    minLength: {
                                                        value: 8,
                                                        message:
                                                            "Mật khẩu phải có ít nhất 8 ký tự",
                                                    },

                                                    pattern: {
                                                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/i,
                                                        message:
                                                            "Mật khẩu phải có ít nhất 1 kí tự in hoa, 1 kí tự thường, 1 kí tự số và 1 kí tự đặc biệt",
                                                    },
                                                })}
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder=""
                                                required
                                                className="text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black"
                                            ></input>
                                        </div>
                                        {errors.password && (
                                            <div className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                                <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                                {errors.password.message}
                                            </div>
                                        )}
                                    </div>
                                </label>

                                <label className="pb-4">
                                    <div className="">
                                        <div>
                                            <p className="text-base">
                                                Nhập lại mật khẩu
                                            </p>
                                        </div>
                                        <div className="rounded-lg">
                                            <input
                                                {...register(
                                                    "confirmPassword",
                                                    {
                                                        required:
                                                            "Bạn chưa nhập mật khẩu xác nhận",
                                                        validate: (value) =>
                                                            value ===
                                                                newPassword.current ||
                                                            "Mật khẩu xác nhận phải giống mật khẩu đặt trước đó",
                                                    },
                                                )}
                                                required
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                placeholder=""
                                                className=" text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black "
                                            ></input>
                                        </div>
                                        {errors.confirmPassword && (
                                            <div className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                                <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                                {errors.confirmPassword.message}
                                            </div>
                                        )}
                                    </div>
                                </label>

                                <label className="pb-4">
                                    <div className="">
                                        <div>
                                            <p className="text-base">Họ tên</p>
                                        </div>
                                        <div className="rounded-lg">
                                            <input
                                                {...register("name", {
                                                    required:
                                                        "Bạn chưa nhập tên",

                                                    pattern: {
                                                        value: /^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i,
                                                        message:
                                                            "Tên không được chứa ký tự đặc biệt và số",
                                                    },
                                                })}
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Trần Văn A"
                                                className=" text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black "
                                            ></input>
                                        </div>
                                        {errors.name && (
                                            <div className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                                <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                                {errors.name.message}
                                            </div>
                                        )}
                                    </div>
                                </label>

                                <div className="flex pb-4">
                                    <label className="pb-4  flex-grow">
                                        <div className="">
                                            <div>
                                                <p className="text-base">
                                                    Ngày sinh
                                                </p>
                                            </div>
                                            <div className="rounded-lg">
                                                <input
                                                    {...register("birthday", {
                                                        required:
                                                            "Ngày sinh không được để trống",
                                                        pattern: {
                                                            value: /\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])*/,
                                                            message:
                                                                "Ngày sinh chưa đúng định dạng",
                                                        },
                                                    })}
                                                    required
                                                    id="birthday"
                                                    name="birthday"
                                                    type="text"
                                                    placeholder="2001/1/21"
                                                    className=" text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black "
                                                ></input>
                                            </div>
                                            {errors.birthday && (
                                                <div className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                                    <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                                    {errors.birthday.message}
                                                </div>
                                            )}
                                        </div>
                                    </label>

                                    <label className="pb-4 flex-grow">
                                        <div className="">
                                            <div>
                                                <p className="text-base">
                                                    Giới tính{" "}
                                                    
                                                </p>
                                            </div>
                                            <div className="rounded-lg flex justify-between">
                                                <select
                                                    {...register("gender")}
                                                    className=" text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black "
                                                >
                                                    
                                                    <option value="true">
                                                        Nam
                                                    </option>
                                                    <option value="false">
                                                        Nữ
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                <label className="pb-4 flex-grow">
                                    <div className="">
                                        <div>
                                            <p className="text-base">
                                                Địa chỉ{" "}
                                            </p>
                                        </div>
                                        <div className="rounded-lg">
                                            <input
                                                {...register("address", {
                                                    required:
                                                        "Bạn chưa điền địa chỉ",
                                                })}
                                                required
                                                id="address"
                                                name="address"
                                                type="text"
                                                placeholder="12/3 Đường A, Phường B, Quận C, Thành Phố D"
                                                className=" text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black "
                                            ></input>
                                        </div>
                                        {errors.gender && (
                                            <div className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                                <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                                {errors.address.message}
                                            </div>
                                        )}
                                    </div>
                                </label>

                                <label className="pb-4">
                                    <div className="">
                                        <div>
                                            <p className="text-base">
                                                Số điện thoại
                                            </p>
                                        </div>
                                        <div className="rounded-lg">
                                            <input
                                                {...register("phoneNumber", {
                                                    required:
                                                        "Số điện thoại không được để trống",

                                                    pattern: {
                                                        value: /^[0-9]*$/,
                                                        message:
                                                            "Số điện thoại không đúng định dạng",
                                                    },

                                                    maxLength: {
                                                        value: 10,
                                                        message:
                                                            "Số điện thoại phải có 10 số",
                                                    },

                                                    minLength: {
                                                        value: 10,
                                                        message:
                                                            "Số điện thoại phải có 10 số",
                                                    },
                                                })}
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                type="tel"
                                                placeholder="0123456789"
                                                className=" text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black "
                                            ></input>
                                        </div>
                                        {errors.phoneNumber && (
                                            <div className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                                <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                                {errors.phoneNumber.message}
                                            </div>
                                        )}
                                    </div>
                                </label>

                                {/* <label className="pb-4 flex-grow">
                                        <div className="">
                                            <div>
                                                <p className="text-base">
                                                    vị trí{" "}
                                                    
                                                </p>
                                            </div>
                                            <div className="rounded-lg flex justify-between">
                                            <input
                                                {...register("type", {
                                                    required:
                                                        "Bạn chưa điền vị trí",
                                                })}
                                                required
                                                id="type"
                                                name="type"
                                                type="text"
                                                placeholder="12/3 Đường A, Phường B, Quận C, Thành Phố D"
                                                className=" text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black "
                                            ></input>
                                            </div>
                                        </div>
                                    </label> */}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-[#e61e4d] to-[#d70466] w-full rounded-xl py-3 mt-5 text-white active:bg-pink-500 hover:shadow-xl active:scale-90 transition duration-150"
                                    onClick={onSubmit}
                                >
                                    {isLoading ? (
                                        <Loading type="default" color="white" />
                                    ) : (
                                        "Tiếp tục"
                                    )}
                                </button>
                            </div>

                            <div>
                                <a href="/login">
                                    <button
                                        type="button"
                                        className="bg-white w-full rounded-xl py-3 mt-5 text-black active:bg-gray-300 hover:shadow-xl border active:scale-90 transition duration-150 font-medium"
                                    >
                                        Đăng nhập
                                    </button>
                                </a>
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center">
                        <hr className="text-gray-500 h-[1px] bg-gray-500 mr-3 w-full flex-1  "></hr>
                        <div className="font-normal text-sm">hoặc</div>
                        <hr className="text-gray-500  h-[1px] bg-gray-500 ml-3 w-full flex-1  "></hr>
                    </div>

                    {/* Footer */}
                    <div className="flex-col flex justify-between p-6">
                        <button
                            type="button"
                            className=" w-full rounded-xl py-3 px-5 border text-black flex font-medium hover:bg-gray-200 items-center hover:shadow-xl active:scale-90 transition duration-150"
                            onClick={() => {}}
                        >
                            <ColorFacebookIcon />
                            <div className="flex-1">Tiếp tục với Facebook</div>
                        </button>
                        <button
                            type="button"
                            className=" w-full rounded-xl py-3 px-5 mt-5 border text-black flex font-medium hover:bg-gray-200 items-center hover:shadow-xl active:scale-90 transition duration-150"
                            onClick={() => {}}
                        >
                            <GoogleIcon />
                            <div className="flex-1">Tiếp tục với Google</div>
                        </button>
                        <button
                            type="button"
                            className=" w-full rounded-xl py-3 px-5 mt-5 border text-black flex items-center font-medium hover:bg-gray-200 hover:shadow-xl active:scale-90 transition duration-150"
                            onClick={() => {}}
                        >
                            <AppleIcon />
                            <div className="flex-1">Tiếp tục với Apple</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

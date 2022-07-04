import React, { useRef, RefObject } from "react";
import Image from "next/image";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMouseWheel } from "react-use";
import { useForm } from "react-hook-form";
import { useOnClickOutside } from "usehooks-ts";
import { Menu } from "@components/menu/Menu";
import {
    AppleIcon,
    ColorFacebookIcon,
    GoogleIcon,
    InstagramIcon,
    MailIcon,
    UserIcon,
} from "@components/icons";
// import classNames from "classnames";
import { Hidden } from "@material-ui/core";
import axios from "axios";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "@utils/apiEndpoints";
import { Loading } from "@nextui-org/react";
import { redirect } from "next/dist/server/api-utils";
import {
    DeviceMobileIcon,
    ExclamationCircleIcon,
    PhoneIcon,
} from "@heroicons/react/outline";
import { setCookies } from "cookies-next";
import http from "@utils/http";

type User = {
    password: string;
    email: String;
    phoneNumber: String;
    _id: string;
    type: string;
};

export const Login: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<User>();

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = handleSubmit(async (user) => {
        setIsLoading(true);
        const response = await http
            .post(
                `https://airbnb.cybersoft.edu.vn${API_ENDPOINTS.LOGIN}`,
                user,
            )
            .then((res) => {
                setCookies("userId", res.data.user._id);
                setCookies("userType", res.data.user.type);
                toast.info("Đăng nhập thành công", {
                    position: "top-right",
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    autoClose: 3000,
                    
                });

                setCookies("isLoggedIn", true);
                
                router.push("/");
                // console.log(res.data.user._id)
                setIsLoading(false);
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    toast.error("Tài khoản hoặc mật khẩu không đúng", {
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
                    toast.error("Forbidden", {
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

    // const ref = useRef(null);
    // const handleClickOutside = () => {

    //     console.log("clicked outside");
    // };

    // const handleClickInside = () => {
    //     // Your custom logic here
    //     console.log("clicked inside");
    // };

    // useOnClickOutside(ref, handleClickOutside);

    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="center block bg-white relative border border-gray-400 rounded-xl w-full lg:w-2/5 mx-auto lg:mt-14 lg:mb-10 ">
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
                    <div className=" text-center">
                        <h1>Đăng nhập</h1>
                    </div>
                </div>

                <div className="">
                    {/* Body */}
                    <div className="p-6 ">
                        <h2 className="text-[22px] leading-6">
                            Chào mừng bạn đến với Airbnb
                        </h2>

                        <form className="form py-5" onSubmit={onSubmit}>
                            {isLogin && (
                                <div className="flex flex-col justify-between ">
                                    {/* <div className="rounded-lg">
                                        <input
                                            {...register("username", {
                                                required: true,
                                            })}
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="Tài khoản"
                                            className=" text-base w-full  border border-gray-500 border-b-0 md:text-left text-center p-4 active:outline-black "
                                        ></input>
                                        {errors.username && (
                                            <div className="text-red-500 font-medium text-xs my-2">
                                                Tài khoản không được để trống
                                            </div>
                                        )}
                                    </div> */}
                                    <label className="pb-4">
                                        <div className="">
                                            <div>
                                                <p className="text-base">
                                                    Email
                                                </p>
                                            </div>
                                            <div className="rounded-lg">
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
                                                    id="email"
                                                    name="email"
                                                    type="text"
                                                    placeholder=""
                                                    className=" text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black "
                                                ></input>
                                            </div>
                                            {errors.email && (
                                                <div className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                                    <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                                    {(errors.email as any)?.message}
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
                                                        required: true,
                                                    })}
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    placeholder=""
                                                    className="text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black"
                                                ></input>
                                            </div>
                                            {errors.password && (
                                                <div className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                                    <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                                    Bạn chưa nhập mật khẩu
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            )}

                            {!isLogin && (
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
                                                        "Bạn chưa nhập số điện thoại",

                                                    pattern: {
                                                        value: /^[0-9]{10}$/,
                                                        message:
                                                            "Số điện thoại chỉ chứa số và có 10 ký tự",
                                                    },
                                                })}
                                                type="text"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                placeholder=""
                                                className="text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black"
                                            ></input>
                                        </div>
                                        {errors.phoneNumber && (
                                            <div className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                                <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                                {(errors.phoneNumber as any)?.message}
                                            </div>
                                        )}
                                    </div>
                                </label>
                            )}

                            <div>
                                <button
                                    type="button"
                                    className="bg-gradient-to-r from-[#e61e4d] to-[#d70466] w-full rounded-xl py-3 mt-5 text-white active:bg-pink-500 hover:shadow-xl active:scale-90 transition duration-150 font-medium"
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
                                <a href="/register">
                                    <button
                                        type="button"
                                        className="bg-white w-full rounded-xl py-3 mt-5 text-black active:bg-gray-300 hover:shadow-xl border active:scale-90 transition duration-150 font-medium"
                                    >
                                        Đăng ký
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

                        {isLogin && (
                            <button
                                type="button"
                                className=" w-full rounded-xl py-3 px-5 mt-5 border items-center text-black flex font-medium hover:bg-gray-200 hover:shadow-xl active:scale-90 transition duration-150"
                                onClick={() => {
                                    {
                                        setIsLogin(false);
                                    }
                                }}
                            >
                                <DeviceMobileIcon className="w-6 h-6 " />
                                <div className="flex-1">
                                    Tiếp tục với Số điện thoại
                                </div>
                            </button>
                        )}

                        {!isLogin && (
                            <button
                                type="button"
                                className=" w-full rounded-xl py-3 px-5 mt-5 border items-center text-black flex font-medium hover:bg-gray-200 hover:shadow-xl active:scale-90 transition duration-150"
                                onClick={() => {
                                    {
                                        setIsLogin(true);
                                    }
                                }}
                            >
                                <MailIcon />
                                <div className="flex-1">Tiếp tục với Email</div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

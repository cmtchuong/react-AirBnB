/* eslint-disable */
import react from "react";
import React, { useRef, RefObject } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
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
} from "@components/icons";
// import classNames from "classnames";
import { Hidden } from "@material-ui/core";
import Login from "@components/login";
import { Footer } from "@components/footer";
import {LoginHeader} from "@components/header/LoginHeader";
import Head from "next/head";

type User = {
    username: string;
    password: string;
};

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const City: React.FC<Props> = (
    {
        // isOpen = true,
        // setIsOpen = () => {},
    },
) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<User>();

    const onSubmit = handleSubmit((data) => {
        alert(JSON.stringify(data));
    });

    const ref = useRef(null);
    const handleClickOutside = () => {
       
    };

    const handleClickInside = () => {
        // Your custom logic here
        
    };

    useOnClickOutside(ref, handleClickOutside);

    return (
        <div>
             <Head>
                <title>
                    Đăng nhập - Airbnb
                </title>
                <link
                    rel="icon"
                    href="https://a0.muscache.com/airbnb/static/icons/android-icon-192x192-c0465f9f0380893768972a31a614b670.png"
                    type="image/x-icon"
                ></link>
            </Head>

            <LoginHeader />

           <Login /> 

            <div className="hidden lg:block"><Footer /> </div>
        </div>
    );
};

export default City;

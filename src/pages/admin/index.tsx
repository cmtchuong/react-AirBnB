import React, { useRef, useState } from "react";
import { Login } from "@components/login";
import { useOnClickOutside } from "usehooks-ts";
import { VerifyIcon } from "@components/icons";
import { CheckIcon, StarIcon } from "@heroicons/react/solid";
import Head from "next/head";
import Admin from "@components/admin";

export const AdminPage: React.FC = () => {
   
   

    return (
        <div>
             <Head>
                <title>
                    Quản lý - Airbnb
                </title>
                <link
                    rel="icon"
                    href="https://a0.muscache.com/airbnb/static/icons/android-icon-192x192-c0465f9f0380893768972a31a614b670.png"
                    type="image/x-icon"
                ></link>
            </Head>

            <Admin />
        </div>
    );
};

export default AdminPage;

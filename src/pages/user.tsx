import React from "react";
import Head from "next/head";
import "tailwind.config";
import { Footer } from "@components";

import { useState } from "react";

import { LoginHeader } from "@components/header/LoginHeader";
import Profile from "@components/profile";
import { GetServerSideProps } from "next";

import cookie from "cookie";

// function Redirect({to}) {
//     useEffect(() => {
//         router.push(to);
//     }, [to]);
//     return null;
// }


const User: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // const router = useRouter();
    // return <Redirect to="" />;

    

    return (
        <div>
            <Head>
                <title>Hồ sơ người dùng - Airbnb</title>
                <link
                    rel="icon"
                    href="https://a0.muscache.com/airbnb/static/icons/android-icon-192x192-c0465f9f0380893768972a31a614b670.png"
                    type="image/x-icon"
                ></link>
            </Head>

            <LoginHeader />

            <Profile />

            <Footer />
        </div>
    );
};

export default User;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const cookies = cookie.parse(req.headers.cookie || "");
    const value = cookies["isLoggedIn"];

   

    if (!value) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};


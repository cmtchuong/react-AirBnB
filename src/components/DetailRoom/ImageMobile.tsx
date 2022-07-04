import React, { useRef, useState } from "react";
import { Login } from "@components/login";
import { useOnClickOutside } from "usehooks-ts";
import { VerifyIcon } from "@components/icons";
import { CheckIcon, StarIcon } from "@heroicons/react/solid";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/router";



export const Payment: React.FC = () => {

    
const Router = useRouter();
const img = Router.query as unknown as string

    return (
        <div className="pt-6">
            <Image
                showSkeleton
                maxDelay={5000}
                src={img || "https://media.discordapp.net/attachments/988365102870827008/988365133040484353/unknown.png?width=663&height=663"}
                alt=""
                objectFit="cover"
                className="rounded-none"
            />
        </div>
    );
};

export default Payment;

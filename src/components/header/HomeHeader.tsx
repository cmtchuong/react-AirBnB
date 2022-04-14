import React from "react";
import { StickyHeader } from "./StickyHeader";
import { SearchIcon } from "@heroicons/react/solid";
import { Logo } from "@components";
import { Button } from "@components/button";
import { AirbnbIcon, GlobeIcon, MenuIcon, UserIcon } from "@components/icons";
import { useMouseWheel } from "react-use";
import { useEffect, useState } from "react";

export const HomeHeader: React.FC = () => {
    return (
        <>
            <div className="text-center bg-black grid md:grid-cols-3 grid-cols-2 px-20 py-3 items-center justify-between ">
                <div className="flex items-center h-10 cursor-pointer my-auto ">
                    <a className="" href="#">
                        <AirbnbIcon color="white" />
                    </a>
                </div>

                <div className=" items-center text-white hidden md:flex cursor-pointer justify-between space-x-8">
                    <a className="inline-block relative justify-center items-center">
                        Nơi ở
                    </a>
                    <a>Trải nghiệm</a>

                    <div className="items-center text-white">
                        <a>Trải nghiệm trực tuyến</a>
                    </div>
                </div>

                <div className="flex items-center space-x-4 justify-end">
                    <div className="relative flex items-center">
                        <a
                            className="p-3 rounded-22 hover:bg-gray-600 text-white hidden md:inline"
                            href="https://www.airbnb.com.vn/host/homes"
                        >
                            Trở thành chủ nhà
                        </a>
                        <a
                            className="hover:bg-gray-600 rounded-22 p-3 m-2"
                            href="#"
                        >
                            <GlobeIcon color="white" />
                        </a>

                        <Button
                            variant="flat"
                            className="border-gray-500 border hover:shadow-cart p-2 flex items-center space-x-3 rounded-full transition duration-150 "
                            onClick={() => {}}
                        >
                            <MenuIcon className="h-6" />
                            <UserIcon className="h-6" />
                        </Button>
                    </div>
                </div>
            </div>
            

        </>
    );
};

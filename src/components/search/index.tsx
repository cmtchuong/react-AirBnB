import React, { useRef } from "react";
import {
    MinusSmIcon,
    PlusSmIcon,
    SearchIcon,
    UsersIcon,
} from "@heroicons/react/solid";
import { Logo } from "@components";
import { Button } from "@components/button";
import { AirbnbIcon, GlobeIcon, MenuIcon, UserIcon } from "@components/icons";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import { Menu } from "@components/menu/Menu";
import { Router } from "next/router";
import { useRouter } from "next/router";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "react-date-range";
import { addDays, format } from "date-fns";

import { useOnClickOutside } from "usehooks-ts";

interface Props {
    place?: string;
    className?: string;
}

export const Search: React.FC<Props> = ({
    place = "Bạn sắp đi đâu?",
    className = "pb-8 bg-white",
}) => {
    const Router = useRouter();
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const [openDay, setOpenDay] = useState(false);

    const [openGuests, setOpenGuests] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const guests = adults + children;
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());

    // const handleSelect = (date: any) => {
    //     setStartDate(date.selection.startDate);
    //     setEndDate(date.selection.endDate);
    // };

    const [pickDay, setPickDay] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection",
        },
    ]);

    const ref = useRef(null);

    const handleClickOutside = () => {
        // Your custom logic here
        console.log("clicked outside");
    };

    const handleClickInside = () => {
        // Your custom logic here
        console.log("clicked inside");
    };

    useOnClickOutside(ref, handleClickOutside);

    const resetInput = () => {
        setOpenDay(false);
    };

    const formattedStartDate = format(
        new Date(pickDay[0].startDate),
        "dd/MM/yyyy",
    );
    const formattedEndDate = format(new Date(pickDay[0].endDate), "dd/MM/yyyy");

    return (
        <div className={className}>
            <div className="flex border border-gray-500 mx-[20%] rounded-40 justify-between items-center bg-white">
                <div className=" rounded-full flex-1 py-1 ">
                    <p className="px-5 lg:text-left text-center">
                        <p>Địa điểm</p>

                        <input
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={searchInput || ""}
                            placeholder={place}
                            className=" text-base w-full outline-0 lg:text-left text-center"
                        />
                    </p>
                    {/* <div className="border-r h-[30px]"></div> */}
                </div>

                <div className="hidden lg:inline-block border-l border-gray-500  flex-1">
                    <div
                        className="hover:bg-gray-500 cursor-pointer rounded-40 px-5 py-1 "
                        onClick={() => {
                            openDay ? setOpenDay(false) : setOpenDay(true);
                        }}
                    >
                        <p className="m-0">Nhận phòng</p>
                        <p className="text-gray-400">{formattedStartDate}</p>
                    </div>
                </div>

                <div className="hidden lg:inline-block border-l border-gray-500  flex-1">
                    <div
                        className="hover:bg-gray-500 cursor-pointer rounded-40 px-5 py-1 "
                        onClick={() => {
                            openDay ? setOpenDay(false) : setOpenDay(true);
                        }}
                    >
                        <p className="m-0">Trả phòng</p>
                        <p className="text-gray-400">{formattedEndDate}</p>
                    </div>
                </div>

                <div className=" border-l border-gray-500 relative">
                    <div className="hover:bg-gray-500 rounded-40 flex">
                        <div
                            className=" cursor-pointer  lg:px-5 lg:py-1 flex pl-4 "
                            onClick={() => {
                                openGuests
                                    ? setOpenGuests(false)
                                    : setOpenGuests(true);
                            }}
                        >
                            <div className="hidden lg:inline-block">
                                <p className="m-0">Khách</p>
                                <p>{guests} người</p>
                            </div>
                        </div>

                        <div className="lg:pl-5 lg:pr-0 self-center pr-4">
                            <a
                                onClick={() => {
                                    Router.push({
                                        pathname: "/search",
                                        query: {
                                            location: searchInput,
                                            startDate:
                                                pickDay[0].startDate.toISOString(),
                                            endDate:
                                                pickDay[0].endDate.toISOString(),
                                            guests: guests,
                                        },
                                    });
                                }}
                            >
                                <SearchIcon className="h-10 bg-red-500 text-white rounded-full cursor-pointer p-2 md:mx-2 hover:bg-red-700" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {openDay && (
                <div className=" flex flex-col col-span-3 mx-auto items-center">
                    <DateRangePicker
                        onChange={(item: { selection: any }) =>
                            setPickDay([item.selection])
                        }
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        ranges={pickDay}
                        direction="vertical"
                        rangeColors={["#ff385c"]}
                        startDate={new Date()}
                        endDate={pickDay[0].endDate}
                    />

                    {/* <div className="flex items-center border-b mb-3 w-[58%] bg-white">
                        <h2 className="flex-grow ">Số lượng khách:</h2>

                        <UsersIcon className="h-5 mr-2" />
                        <input
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            type="number"
                            className="text-lg outline-none text-red-500 w-8"
                            min={1}
                        />
                    </div> */}

                    <div className="flex space-x-20">
                        <button
                            className="flex-grow hover:bg-gray-500 hover:text-black py-3 px-5 font-semibold rounded-full"
                            onClick={resetInput}
                        >
                            Đóng
                        </button>
                        <button className="flex-grow text-red-500 hover:bg-red-500 hover:text-white py-3 px-5 font-semibold rounded-full">
                            <a
                                onClick={() => {
                                    Router.push({
                                        pathname: "/search",
                                        query: {
                                            location: searchInput,
                                            startDate:
                                                pickDay[0].startDate.toISOString(),
                                            endDate:
                                                pickDay[0].endDate.toISOString(),
                                            guests: guests,
                                            page: 1,
                                            limit: 5,
                                        },
                                    });
                                }}
                            >
                                Tìm kiếm
                            </a>
                        </button>
                    </div>
                </div>
            )}

            {openGuests && (
                <div className="flex flex-col space-y-6 p-4 border-t border-gray-300 shadow-product rounded-xl ml-[60%] mr-[20%] bg-white">
                    <div className="flex justify-between ">
                        <div className="">
                            <h2 className="text-black"> Người lớn </h2>
                            <p className="">Từ 13 tuổi trở lên</p>
                        </div>

                        <div className="flex items-center">
                            <PlusSmIcon
                                className="w-8 h-8 p-1 text-black font-normal rounded-40 border cursor-pointer"
                                onClick={() => {
                                    setAdults(adults + 1);
                                }}
                            />
                            <div className="text-black text-xl mx-4">
                                {adults}
                            </div>
                            <MinusSmIcon
                                className="w-8 h-8 p-1 text-black font-normal rounded-40 border cursor-pointer"
                                onClick={() => {
                                    setAdults(adults - 1);

                                    adults <= 1
                                        ? setAdults(1)
                                        : setAdults(adults - 1);
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="">
                            <h2 className="text-black"> Trẻ em </h2>
                            <p className="">Từ 13 tuổi trở xuống</p>
                        </div>

                        <div className="flex items-center">
                            <PlusSmIcon
                                className="w-8 h-8 p-1 text-black font-normal rounded-40 border cursor-pointer"
                                onClick={() => {
                                    setChildren(children + 1);
                                }}
                            />
                            <div className="text-black text-xl mx-4">
                                {children}
                            </div>
                            <MinusSmIcon
                                className="w-8 h-8 p-1 text-black font-normal rounded-40 border cursor-pointer"
                                onClick={() => {
                                    setChildren(children - 1);

                                    children <= 0
                                        ? setChildren(0)
                                        : setChildren(children - 1);
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;

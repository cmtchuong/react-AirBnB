import React, { useRef } from "react";
import { MinusSmIcon, PlusSmIcon, SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRouter } from "next/router";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "react-date-range";
import { addDays, format } from "date-fns";

import { useOnClickOutside } from "usehooks-ts";

import http from "@utils/http";
import { API_ENDPOINTS } from "@utils/apiEndpoints";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { Loading } from "@nextui-org/react";

export interface RootObject {
    deleteAt?: boolean;
    _id?: string;
    name?: string;
    province?: string;
    country?: string;
    valueate?: number;
    __v?: number;
    image?: string;
}

interface Props {
    place?: string;
    className?: string;
}

// const getLocations = async () =>
//     await (
//         await fetch(
//             `airbnb.cybersoft.edu.vn${API_ENDPOINTS.SEARCH}`,
//         )
//     ).json();

const getLocations = async () => {
    const response = await http.get(
        `https://airbnb.cybersoft.edu.vn${API_ENDPOINTS.SEARCH}`,
    );
    return response.data;
};

export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery<RootObject[]>("info", getLocations);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

export const Search: React.FC<Props> = ({
    place = "Bạn sắp đi đâu?",
    className = "pb-8 bg-white",
}) => {
    const Router = useRouter();
    const [searchInput, setSearchInput] = useState("");
    const [openDay, setOpenDay] = useState(false);
    const [openLocation, setOpenLocation] = useState(false);

    const [openGuests, setOpenGuests] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const [pickDay, setPickDay] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection",
        },
    ]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const ref = useRef(null);

    const handleClickOutside = () => {
        setOpenLocation(false);
        setOpenGuests(false);
        setOpenDay(false);
    };

    console.log(openLocation, openGuests, openDay);

    const handleClickInside = () => {
        // Your custom logic here
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

    const { data, isLoading, isFetching } = useQuery<RootObject[]>(
        "info",
        getLocations,
    );

    if (isLoading) {
        return (
            <div className="p-4 mx-[25%]">
                {" "}
                <Loading type="points" />{" "}
            </div>
        );
    }

    if (!data) {
        return <p className="">Dữ liệu không tìm thấy :)</p>;
    }

    const guests = adults + children;
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());

    // const handleSelect = (date: any) => {
    //     setStartDate(date.selection.startDate);
    //     setEndDate(date.selection.endDate);
    // };

    const cleanAccents = (str?: string): string => {
        if (!str) return;
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Combining Diacritical Marks
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // huyền, sắc, hỏi, ngã, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // mũ â (ê), mũ ă, mũ ơ (ư)

        return str;
    };

    return (
        <div className={className}>
            <div
                className="flex border border-gray-500 mx-[20%] rounded-40 justify-between items-center bg-white relative"
                ref={ref}
            >
                <div className=" rounded-full flex-1 py-1 ">
                    <p className="px-5 lg:text-left text-center">
                        <p>Địa điểm</p>

                        <input
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={searchInput || ""}
                            placeholder={place}
                            className=" text-base w-full outline-0 lg:text-left text-center"
                            onClick={() => setOpenLocation(true)}
                        />
                    </p>

                    {openLocation && (
                        <div className="absolute bg-white lg:w-1/2 w-full h-[200px] top-[70px] z-10 border border-gray-300 shadow-listProduct rounded-xl overflow-y-auto">
                            <div className="mx-[6%] my-2 ">
                                {data?.map((i) => {
                                    return (
                                        <div className="flex flex-col ">
                                            {(cleanAccents(i?.name)?.includes(
                                                cleanAccents(searchInput),
                                            ) ||
                                                cleanAccents(
                                                    i?.province,
                                                )?.includes(
                                                    cleanAccents(searchInput),
                                                ) ||
                                                searchInput === "") && (
                                                <a
                                                    className="hover:bg-gray-500 space-y-3 "
                                                    key={i._id}
                                                    onClick={() => {
                                                        setSearchInput(
                                                            i?.name +
                                                                ", " +
                                                                i?.province,
                                                        );
                                                        setOpenLocation(false);
                                                    }}
                                                >
                                                    {i?.name}, {i?.province}{" "}
                                                </a>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {/* <div className="border-r h-[30px]"></div> */}
                </div>

                <div className="flex-grow flex" ref={ref}>
                    <div className="hidden lg:inline-block border-l border-gray-500  flex-1">
                        <div
                            className="hover:bg-gray-500 cursor-pointer rounded-40 px-5 py-1 "
                            onClick={() => {
                                setOpenDay(!openDay);
                            }}
                        >
                            <p className="m-0">Nhận phòng</p>
                            <p className="text-gray-400">
                                {formattedStartDate}
                            </p>
                        </div>
                    </div>

                    <div className="hidden lg:inline-block border-l border-gray-500  flex-1">
                        <div
                            className="hover:bg-gray-500 cursor-pointer rounded-40 px-5 py-1 "
                            onClick={() => {
                                setOpenDay(!openDay);
                            }}
                        >
                            <p className="m-0">Trả phòng</p>
                            <p className="text-gray-400">{formattedEndDate}</p>
                        </div>
                    </div>
                </div>
                <div className=" border-l border-gray-500 relative" ref={ref}>
                    <div className="hover:bg-gray-500 rounded-40 flex">
                        <div
                            className=" cursor-pointer  lg:px-5 lg:py-1 flex pl-4 "
                            onClick={() => {
                                setOpenGuests(!openGuests);
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
                                            startAt:
                                                pickDay[0].startDate.toISOString(),
                                            endAt: pickDay[0].endDate.toISOString(),
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
                <div className=" flex flex-col col-span-3 items-center absolute z-10 mx-[30%]">
                    <DateRangePicker
                        onChange={(item: { selection: any }) =>
                            setPickDay([item.selection])
                        }
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={pickDay}
                        direction="horizontal"
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

                    {/* <div className="flex space-x-20">
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
                                            startAt:
                                                pickDay[0].startDate.toISOString(),
                                            endAt: pickDay[0].endDate.toISOString(),
                                            guests: guests,
                                            page: 1,
                                        },
                                    });
                                }}
                            >
                                Tìm kiếm
                            </a>
                        </button>
                    </div> */}
                </div>
            )}

            {openGuests && (
                <div className="flex flex-col absolute z-10 space-y-6 p-4 border-t border-gray-300 shadow-product rounded-xl ml-[60%] mr-[10%] bg-white">
                    <div className="flex justify-between ">
                        <div className="mr-6">
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
                        <div className="mr-6">
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

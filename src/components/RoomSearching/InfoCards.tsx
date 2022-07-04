import React from "react";
import Image from "next/image";

import { dehydrate, QueryClient, useQuery } from "react-query";


import { HeartIcon } from "@heroicons/react/outline";
import {
    StarIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { API_ENDPOINTS } from "@utils/apiEndpoints";

import { Loading } from "@nextui-org/react";
import http from "@utils/http";

export interface RootObject {
    deleteAt: boolean;
    _id: string;
    name: string;
    guests: number;
    bedRoom: number;
    bath: number;
    description: string;
    price: number;
    elevator: boolean;
    hotTub: boolean;
    pool: boolean;
    indoorFireplace: boolean;
    dryer: boolean;
    gym: boolean;
    kitchen: boolean;
    wifi: boolean;
    heating: boolean;
    cableTV: boolean;
    __v: number;
    image: string;
    locationId: {
        deleteAt: boolean;
        name: string;
        province: string;
        country: string;
        valueate: number;
        image: string;
    };
}

const getInfoRooms = async () => {
    // await (
    //     await http.get(
    //         `https://airbnb.cybersoft.edu.vn${API_ENDPOINTS.SEARCH}`,
    //     )
    // ).data.json();
    const response = await http.get(
        `https://airbnb.cybersoft.edu.vn${API_ENDPOINTS.GET_ROOMS}`,
    );

    return response.data;
};

export const InfoCards: React.FC = () => {
    // const address = `https://cc62e73f33af4d5eb355d601efc35466-3afda50d-vm-80.vlab2.uit.edu.vn/api/v1${API_ENDPOINTS.GET_ROOMS}?page=1&limit=2`;

    const { data, isLoading, isFetching } = useQuery<RootObject[]>(
        "infoRoom",
        getInfoRooms,
    );
    console.log(data);

    if (!data) {
        return <p className="p-6">Dữ liệu không tìm thấy :)</p>;
    }

    if (isLoading) return <Loading type="points" />;

    const Router = useRouter();

    const { startAt, endAt, guests } = Router.query;
    const {location} = Router.query;

    // function onChangePage(pageNum: number) {
    //     page = pageNum;
    //     console.log(pageNum);
    //     Router.push({
    //         pathname: "/search",
    //         query: {
    //             location: location,
    //             startDate: startDate,
    //             endDate: endDate,
    //             guests: guests,
    //             page: pageNum,
    //         },
    //     });
    // }

    const cleanAccents = (str?: string): string => {
        if (!str) return 
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
    }

    return (
        <div>
            {/* <p className="my-4 text-sm">
                Hơn {data.length} chỗ ở tại {location}
            </p> */}
            <p className="py-4 mt-1 ">
                Kiểm tra lại quy định hạn chế đi lại trong đại dịch COVID-19
                trước khi đặt.
                <span>
                    {" "}
                    <a
                        className="underline"
                        href="https://www.airbnb.com.vn/help/topic/1418/government-travel-restrictions-and-advisories"
                    >
                        Tìm hiểu thêm
                    </a>
                </span>
            </p>

            {data?.map((i) => {
                return (
                    <div key={i._id}>
                    {((cleanAccents(location.toString().toLowerCase())?.includes(cleanAccents(i?.locationId?.name?.toString().toLowerCase()))) || (cleanAccents(location?.toString().toLowerCase())?.includes(cleanAccents(i?.locationId?.province?.toString().toLowerCase())))) && (
                    <div
                        className="flex py-4 px-2 border-b border-gray-500 cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first: border-t"
                        onClick={() => {
                            Router.push({
                                pathname: "/rooms",
                                query: {
                                    roomID: i?._id,

                                    displayName: i?.name,
                                    title: i?.name,

                                    totalGuests: i?.guests,
                                    totalBedrooms: i?.bedRoom,
                                    totalBathrooms: i?.bath,
                                    hasTv: i?.cableTV,
                                    hasKitchen: i?.kitchen,
                                    hasAirCon: i?.heating,

                                    hasWifi: i?.wifi,
                                    // star: i?.locationId.valueate,

                                    price: i?.price,
                                    img: i?.image,
                                },
                            });
                        }}
                    >
                        <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0 ">
                            <Image
                                src={
                                    i?.image ||
                                    "https://media.discordapp.net/attachments/988365102870827008/988365133040484353/unknown.png?width=663&height=663"
                                }
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col flex-grow pl-5">
                            <div className="flex justify-between">
                                <p>
                                    {"Toàn bộ khách sạn và nhà ở tại " +
                                        i?.locationId?.name +
                                        ", " +
                                        i?.locationId?.province}
                                </p>

                                <HeartIcon
                                    className="h-7 cursor-pointer"

                                    // onClick={() => {
                                    //     fillHeart ? (
                                    //         setFillHeart("red")
                                    //     ) : (
                                    //         setFillHeart("white")
                                    //     );
                                    // }}

                                    // fill={fillHeart}
                                />
                            </div>

                            <h4 className="text-xl font-semibold">{i?.name}</h4>

                            <div className="border-b w-10 pt-2 border-gray-500" />

                            <p className="pt-2 text-sm flex-grow flex">
                                {i?.guests + "  khách ·  "}
                                {i?.bedRoom === 0
                                    ? ""
                                    : i?.bedRoom + "  phòng ngủ ·  "}
                                {i?.bath === 0
                                    ? ""
                                    : i?.bath + "  phòng tắm ·  "}
                                {i?.cableTV ? "" : "Tivi ·  "}
                                {i?.wifi ? "" : "Wi-fi ·  "}
                                {i?.kitchen ? "" : "Bếp ·  "}
                                {i?.heating ? "" : "Điều hòa ·  "}
                            </p>

                            <div className="flex sm:flex-row flex-col justify-between items-end pt-5">
                                <p className="flex items-center font-semibold">
                                    <StarIcon className="h-5 text-red-500 mr-1" />
                                    {"5"}
                                    {/* <p className="font-lg text-gray-400 font-normal sm:block hidden">
                                                ({el.totalReviews} đánh giá)
                                            </p> */}
                                </p>

                                <div className="">
                                    <p className="text-lg lg:text-2xl d sm:pb-2 m-0">
                                        <span className="font-semibold">
                                            {"$" + i?.price}
                                        </span>
                                        <span> / đêm </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* )} */}
                        {/* Pagination */}
                        {/* <div className="items-center flex space-x-8 justify-center pb-4 pt-10 ">
                <button>
                    {" "}
                    {page <= 1 ? (
                        <ChevronLeftIcon
                            fill="#dddddd"
                            className=" w-5 h-5"
                            cursor={"not-allowed"}
                            fontSize="light"
                        />
                    ) : (
                        <ChevronLeftIcon
                            fill="#black"
                            className="w-6 h-6 p-1 rounded-full font-bold text-black hover:bg-gray-300"
                            // onClick={}
                                
                        />
                    )}
                </button>
                <button
                    className="rounded-full bg-black text-white w-8 h-8 font-bold"
                    // onClick={}
                >
                    1
                </button>
                <button
                    className="rounded-full font-bold text-black w-8 h-8 hover:bg-gray-300"
                    // onClick={}
                >
                    2
                </button>
                <button className="rounded-full font-bold text-black w-8 h-8 hover:bg-gray-300">
                    3
                </button>
                <div className="items-center font-bold text-black align-baseline">
                    ...
                </div>
                <button className="rounded-full font-bold text-black w-8 h-8 hover:bg-gray-300">
                    4
                </button>
                <button className="rounded-full font-bold text-black w-8 h-8 hover:bg-gray-300">
                    5
                </button>
                <button className="rounded-full font-bold text-black w-8 h-8 hover:bg-gray-300">
                    6
                </button>
                <button>
                    {page >= limit ? (
                        <ChevronRightIcon
                            fill="#dddddd"
                            className=" w-5 h-5"
                            cursor={"not-allowed"}
                            fontSize="light"
                        />
                    ) : (
                        <ChevronRightIcon
                            fill="black"
                            className=" w-6 h-6 p-1 rounded-full font-bold text-black hover:bg-gray-300"
                            // onClick={}
                               
                        />
                    )}
                </button>
            </div> */}
                    </div>
                    )}
                </div>
                );
            })}
        </div>
    );
};

export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery<RootObject>("info", getInfoRooms);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

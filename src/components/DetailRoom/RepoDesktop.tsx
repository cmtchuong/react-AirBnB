/* eslint-disable */
import React, { Children } from "react";

import { useEffect, useState } from "react";

import search from "@public/search.json";

import { StickyHeader } from "@components/header/StickyHeader";
import { Footer } from "@components";

import router, { useRouter } from "next/router";
import { addDays, format } from "date-fns";
import {
    HeartIcon,
    KeyIcon,
    LocationMarkerIcon,
    LoginIcon,
    MinusSmIcon,
    PlusCircleIcon,
    ShareIcon,
    WifiIcon,
    FireIcon,
    CalendarIcon,
} from "@heroicons/react/outline";
import { Item } from "framer-motion/types/components/Reorder/Item";
import {
    ClockIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    FingerPrintIcon,
    FlagIcon,
    StarIcon,
    ExclamationCircleIcon,
    SparklesIcon,
    CreditCardIcon,
    ChevronUpIcon,
    PlusSmIcon,
} from "@heroicons/react/solid";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { Input } from "@material-ui/core";
import { CommentCards } from "@components/CommnentCards";
import { Map } from "@components/RoomSearching/Map";
import { MoreUnderline } from "@components/moreUnderline";
import { AirbnbPrivacy } from "@components/icons";
import { WayToPoolIcon } from "@components/icons";
import { TVIcon } from "@components/icons";
import Amenities from "@components/DetailRoom/Amenities";
import AvailableCalendar from "@components/DetailRoom/AvailableCalendar";

interface idProps {
    id: string;
}

// useEffect(() => {
//     document.getElementsByClassName('rdrDefinedRangesWrapper')[0].style.display = 'none';
//     }, []);

export const DetailRoom: React.FC = (
    {
        // id = "",
    },
) => {
    const Router = useRouter();

    const {
        roomID,
        place,
        title,
        displayName,
        homeType,
        totalGuests,
        totalBedrooms,
        totalBathrooms,
        hasTv,
        hasKitchen,
        hasAirCon,
        hasHeating,
        hasWifi,
        price,
    } = Router.query

    const {img} = Router.query as unknown as {img: string}
   

    const star = 5;
    const rating = 0;

    const [pickDay, setPickDay] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection",
        },
    ]);

    const formattedStartDate = format(
        new Date(pickDay[0].startDate),
        "dd/MM/yyyy",
    );
    const formattedEndDate = format(new Date(pickDay[0].endDate), "dd/MM/yyyy");

    const dayNum =
        new Date(pickDay[0].endDate).getDate() -
        new Date(pickDay[0].startDate).getDate();

    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [openGuests, setOpenGuests] = useState(false);

    const guests = adults + children;

    return (
        <div>
            {/* {(search?.item ?? []).map((item) => ( */}

            <div>
                {" "}
                <StickyHeader
                    title="B???t ?????u t??m ki???m"
                    place="B???n mu???n ??i ????u"
                />{" "}
            </div>

            <div className="mx-[12%] mt-6">
                <div className="border-b border-gray-300">
                    <h2 className="font-semibold text-3xl text-black">
                        {title}
                    </h2>
                    <div className="flex mt-3 items-center">
                        <div className="flex items-center text-black">
                            <StarIcon className="h-5 text-red-500 mr-1" />
                            {star + " ?? "}
                        </div>
                        <p className="ml-2 items-center m-0 underline text-black cursor-pointer">
                            {rating + " ????nh gi??"}
                        </p>
                        <p className="m-0 text-black ml-2 "> ?? </p>
                        <p className="underline ml-2 items-center font-semibold text-black cursor-pointer">
                            {place}
                        </p>
                        <div className="flex space-x-5 flex-grow justify-end">
                            <a className="flex items-center cursor-pointer font-medium underline text-black rounded-xl hover:bg-gray-300 p-2">
                                <ShareIcon className="h-4 w-4 mr-2" />
                                Chia s???
                            </a>

                            <a className="flex items-center cursor-pointer font-medium underline text-black rounded-xl hover:bg-gray-300 p-2">
                                <HeartIcon className="h-4 w-4 mr-2" />
                                L??u
                            </a>
                        </div>
                    </div>

                    <div>
                        <div className="room__gallery mt-5 mb-10" id="anhPhong">
                            <div className="room_1st_image ">
                                <img
                                    className="room__img rounded-l-xl h-full hover:brightness-75 transition ease-out duration-200"
                                    src={img}
                                ></img>
                            </div>
                            <div>
                                <img
                                    className="room__img hover:brightness-75 transition ease-out duration-200"
                                    src="https://a0.muscache.com/im/pictures/miso/Hosting-27050494/original/00d5f582-9b71-42cb-8a4f-a2b1cb1b3e79.jpeg?im_w=720"
                                ></img>
                            </div>
                            <div>
                                <img
                                    className="room__img rounded-tr-xl  hover:brightness-75 transition ease-out duration-200"
                                    src="https://a0.muscache.com/im/pictures/55700e0e-e75d-4e29-bcee-d5f61756c070.jpg?im_w=720"
                                ></img>
                            </div>
                            <div>
                                <img
                                    className="room__img hover:brightness-75 transition ease-out duration-200"
                                    src="https://a0.muscache.com/im/pictures/miso/Hosting-27050494/original/a531748c-ce40-4c84-b02d-3c8f74a409d5.jpeg?im_w=1200"
                                ></img>
                            </div>
                            <div>
                                <img
                                    className="room__img rounded-br-xl hover:brightness-75 transition ease-out duration-200"
                                    src="https://a0.muscache.com/im/pictures/miso/Hosting-27050494/original/87052005-3f0e-4aae-89d5-06f3626d937e.jpeg?im_w=1200"
                                ></img>
                            </div>
                        </div>

                        {/* <div className="room_1st_image ">
                            <img
                                className="room__img rounded-l-xl h-full hover:brightness-75 transition ease-out duration-200"
                                src="https://a0.muscache.com/im/pictures/miso/Hosting-44284175/original/1faa6b79-2d05-4b1c-b556-121f9a59da53.jpeg?im_w=1200"
                            ></img>
                        </div>
                        <div>
                            <img
                                className="room__img hover:brightness-75 transition ease-out duration-200"
                                src="https://a0.muscache.com/im/pictures/miso/Hosting-44284175/original/1faa6b79-2d05-4b1c-b556-121f9a59da53.jpeg?im_w=1200"
                            ></img>
                        </div>
                        <div>
                            <img
                                className="room__img rounded-tr-xl  hover:brightness-75 transition ease-out duration-200"
                                src="https://a0.muscache.com/im/pictures/miso/Hosting-44284175/original/1faa6b79-2d05-4b1c-b556-121f9a59da53.jpeg?im_w=1200"
                            ></img>
                        </div>
                        <div>
                            <img
                                className="room__img hover:brightness-75 transition ease-out duration-200"
                                src="https://a0.muscache.com/im/pictures/miso/Hosting-44284175/original/1faa6b79-2d05-4b1c-b556-121f9a59da53.jpeg?im_w=1200"
                            ></img>
                        </div>
                        <div>
                            <img
                                className="room__img rounded-br-xl hover:brightness-75 transition ease-out duration-200"
                                src="https://a0.muscache.com/im/pictures/miso/Hosting-44284175/original/1faa6b79-2d05-4b1c-b556-121f9a59da53.jpeg?im_w=1200"
                            ></img>
                        </div> */}
                    </div>

                    <div className="flex">
                        <div className="flex flex-col w-[58.333333333333336%]">
                            <div className="flex flex-col pb-6 border-b border-gray-300">
                                <h1 className="font-semibold text-black text-2xl">
                                    {"To??n b??? kh??ch s???n/nh?? ??? " +
                                        
                                        " t???i " +
                                        displayName +
                                        ". Ch??? nh?? CBS"}
                                </h1>
                                <p className="font-normal flex">
                                    {totalGuests + "  kh??ch ??  "}
                                    {totalBedrooms === "0"
                                        ? ""
                                        : totalBedrooms + "  ph??ng ng??? ??  "}
                                    {totalBathrooms === "0"
                                        ? ""
                                        : totalBathrooms + "  ph??ng t???m ??  "}
                                    {hasTv == "true" ? "" : "Tivi ??  "}
                                    {hasWifi == "true" ? "" : "Wi-fi ??  "}
                                    {hasKitchen == "true" ? "" : "B???p ??  "}
                                    {hasAirCon == "true" ? "" : "??i???u h??a ??  "}
                                    {hasHeating == "true" ? "" : "M??y s?????i ??  "}
                                </p>
                            </div>
                            <div className="flex flex-col py-6 border-b border-gray-300">
                                <div className="flex mb-6">
                                    <LoginIcon className="w-6 h-6 mr-2" />
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-black m-0">
                                            T??? nh???n ph??ng
                                        </p>
                                        <p className="font-normal">
                                            B???n c?? th??? g???p nh??n vi??n tr???c c???a ?????
                                            nh???n ph??ng
                                        </p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <LocationMarkerIcon className="w-6 h-6 mr-2" />
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-black m-0">
                                            ?????a ??i???m tuy???t v???i
                                        </p>
                                        <p className="font-normal">
                                            90% kh??ch g???n ????y ???? x???p 5 sao cho
                                            v??? tr?? n??y
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="py-6 border-b border-gray-300 font-normal">
                                <p>
                                    C??n h??? xinh ?????p n??y ??? nh?? CBS n???m ??? t???ng 7
                                    c???a t??a nh?? m???i c???a ch??ng t??i - Nh?? ??? CBS-81.
                                    N?? c?? m???t ph??ng ng???, m???t ph??ng t???m v?? m???t
                                    ph??ng kh??ch m???. N?? ???????c thi???t k??? r???t ?????p.
                                    Cung c???p ?????y ????? n???i th???t v?? thi???t b??? hi???n
                                    ?????i. C???a s??? k??nh l???n cho ph??p ??nh s??ng t???
                                    nhi??n ??i v??o. S??n g??? gi??p c??n h??? d??? d??ng v???
                                    sinh.
                                </p>

                                <p>
                                    H??n n???a, v??? tr?? c???a t??a nh?? n???m trong kho???ng
                                    c??ch ??i b??? ?????n c??c c???a h??ng ti???n l???i, nh??
                                    h??ng, c???a h??ng, qu??n bar, qu??n r?????u.
                                </p>
                            </div>
                           
                            <Amenities />

                            <h2 className="text-2xl mt-8 text-black" id="addDays">
                                Ch???n ng??y nh???n ph??ng
                            </h2>
                            <p className="font-normal mt-1">
                                Th??m ng??y ??i ????? bi???t gi?? ch??nh x??c
                            </p>
                            <div className="mt-6 w-full py-6">
                                <DateRangePicker
                                    onChange={(item: { selection: any }) =>
                                        setPickDay([item.selection])
                                    }
                                    showSelectionPreview={true}
                                    moveRangeOnFirstSelection={false}
                                    months={1}
                                    ranges={pickDay}
                                    direction="horizontal"
                                    rangeColors={["#ff385c"]}
                                    startDate={new Date()}
                                    endDate={pickDay[0].endDate}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col w-1/3 ml-[8.333333333%] ">
                            <div className="sticky top-[20%]">
                                <div className="border border-gray-300 rounded-xl  shadow-cart p-6 ">
                                    <div className="flex justify-between items-center">
                                        <div className="text-2xl text-black">
                                            {"$" + price}{" "}
                                            <span className="font-normal text-lg">
                                                {" "}
                                                / ????m{" "}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-black text-sm">
                                            <StarIcon className="h-5 text-red-500 mr-1" />
                                            {star}
                                            <div className="mx-1">??</div>
                                            <div className="underline text-black">
                                                {rating} ????nh gi??
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col mt-6 border border-gray-500 rounded-xl">
                                        <div className="flex active:border-black justify-between">
                                            <div className="border-r border-gray-500 p-3 flex-grow ">
                                                <p className="text-10px font-bold m-0 text-black">
                                                    NH???N PH??NG
                                                </p>
                                                <p className="font-normal text-sm">
                                                    {formattedStartDate}
                                                </p>
                                            </div>

                                            <div className=" p-3 flex-grow ">
                                                <p className="text-10px font-bold m-0 text-black">
                                                    TR??? PH??NG
                                                </p>
                                                <p className="font-normal text-sm">
                                                    {formattedEndDate}
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            className=" border-t border-gray-500 p-3 flex justify-between cursor-pointer"
                                            onClick={() => {
                                                {
                                                    openGuests
                                                        ? setOpenGuests(false)
                                                        : setOpenGuests(true);
                                                }
                                            }}
                                        >
                                            <div className="">
                                                <p className="text-10px font-bold m-0 text-black">
                                                    KH??CH
                                                </p>

                                                <div className="font-normal text-sm">
                                                    {" "}
                                                    {guests + " kh??ch "}{" "}
                                                </div>
                                            </div>

                                            <div className=" items-center self-center">
                                                {openGuests ? (
                                                    <ChevronDownIcon className="w-6 h-6 text-black" />
                                                ) : (
                                                    <ChevronUpIcon className="w-6 h-6 text-black" />
                                                )}
                                            </div>
                                        </div>

                                        {openGuests ? (
                                            ""
                                        ) : (
                                            <div className="flex flex-col space-y-6 p-4 border-t border-gray-300 shadow-product rounded-xl">
                                                <div className="flex justify-between">
                                                    <div className="mr-6">
                                                        <h2 className="text-black">
                                                            {" "}
                                                            Ng?????i l???n{" "}
                                                        </h2>
                                                        <p className="">
                                                            T??? 13 tu???i tr??? l??n
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <PlusSmIcon
                                                            className="w-8 h-8 p-1 text-black font-normal rounded-40 border cursor-pointer"
                                                            onClick={() => {
                                                                setAdults(
                                                                    adults + 1,
                                                                );
                                                            }}
                                                        />
                                                        <div className="text-black text-xl mx-4">
                                                            {adults}
                                                        </div>
                                                        <MinusSmIcon
                                                            className="w-8 h-8 p-1 text-black font-normal rounded-40 border cursor-pointer"
                                                            onClick={() => {
                                                                setAdults(
                                                                    adults - 1,
                                                                );

                                                                adults <= 1
                                                                    ? setAdults(
                                                                          1,
                                                                      )
                                                                    : setAdults(
                                                                          adults -
                                                                              1,
                                                                      );
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex justify-between">
                                                    <div className="mr-6">
                                                        <h2 className="text-black">
                                                            {" "}
                                                            Tr??? em{" "}
                                                        </h2>
                                                        <p className="">
                                                            T??? 13 tu???i tr??? xu???ng
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <PlusSmIcon
                                                            className="w-8 h-8 p-1 text-black font-normal rounded-40 border cursor-pointer"
                                                            onClick={() => {
                                                                setChildren(
                                                                    children +
                                                                        1,
                                                                );
                                                            }}
                                                        />
                                                        <div className="text-black text-xl mx-4">
                                                            {children}
                                                        </div>
                                                        <MinusSmIcon
                                                            className="w-8 h-8 p-1 text-black font-normal rounded-40 border cursor-pointer"
                                                            onClick={() => {
                                                                setChildren(
                                                                    children -
                                                                        1,
                                                                );

                                                                children <= 0
                                                                    ? setChildren(
                                                                          0,
                                                                      )
                                                                    : setChildren(
                                                                          children -
                                                                              1,
                                                                      );
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        className="bg-gradient-to-r from-[#e61e4d] to-[#d70466] w-full rounded-xl py-3 mt-5 text-white active:bg-pink-500 hover:shadow-xl active:scale-90 transition duration-150 font-medium"
                                        onClick={() => {
                                            Router.push({
                                                pathname: "/payment/confirm",
                                                query: {
                                                    img: img,
                                                    roomID: roomID,
                                                    place: place,
                                                    startAt: pickDay[0].startDate.toISOString().replace('Z', '').concat('+00:00'),
                                                    endAt: pickDay[0].endDate.toISOString().replace('Z', '').concat('+00:00'),
                                                    guests: guests,
                                                    adults: adults,
                                                    children: children,
                                                    price: price,
                                                    startDate: formattedStartDate,
                                                    endDate: formattedEndDate,
                                                    // location: location,
                                                    rating: rating,
                                                    star: star,
                                                    title: title,
                                                    dayNum: dayNum,
                                                },
                                            });
                                        }}
                                    >
                                        Thanh to??n
                                    </button>
                                </div>

                                <div className="flex-row flex  flex-grow justify-between xl:items-center pt-4">
                                    <button className="px-4 py-2 border border-gray-500 hover:border-black hover:shadow-lg cursor-pointer active:scale-95 active:bg-gray 100 transition transform duration-100 ease-out rounded-full text-black">
                                        <a className="" href="#anhPhong">
                                            ???nh
                                        </a>
                                    </button>

                                    <button className="px-4 py-2 border border-gray-500 hover:border-black hover:shadow-lg cursor-pointer active:scale-95 active:bg-gray 100 transition transform duration-100 ease-out rounded-full text-black">
                                        <a href="#tienNghi">Ti???n nghi</a>
                                    </button>

                                    <button className="px-4 py-2 border border-gray-500 hover:border-black hover:shadow-lg cursor-pointer active:scale-95 active:bg-gray 100 transition transform duration-100 ease-out rounded-full text-black">
                                        <a href="#danhGia">????nh gi??</a>
                                    </button>

                                    <button className="px-4 py-2 border border-gray-500 hover:border-black hover:shadow-lg cursor-pointer active:scale-95 active:bg-gray 100 transition transform duration-100 ease-out rounded-full text-black">
                                        <a href="">V??? tr??</a>
                                    </button>
                                </div>

                                <div className="flex pb-10 pt-6 flex-grow justify-center">
                                    <FlagIcon className="w-6 h-6 mr-2 " />
                                    <a className="underline cursor-pointer text-sm">
                                        B??o c??o nh??/ph??ng cho thu?? n??y
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-6 flex items-center" id="danhGia">
                    <StarIcon className="h-5 text-red-500 mr-1" />
                    <h2 className="text-2xl text-black">{star}</h2>
                    <div className="mx-1 text-black text-2xl">??</div>
                    <h2 className="text-2xl text-black">
                        {rating + " ????nh gi??"}
                    </h2>
                </div>

                <div className="flex flex-col xl:flex-row justify-between xl:items-center py-6">
                    <div className="flex flex-col flex-grow space-y-3 pr-14">
                        <div className="flex justify-between items-center">
                            <div className="font-normal flex-grow">
                                M???c ????? s???ch s???
                            </div>

                            {/* <div className="h-1 bg-black rounded-full w-[20%]"></div> */}
                            <span className="text-black font-bold text-xs ml-2">
                                0
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="font-normal flex-grow">
                                Giao ti???p
                            </div>

                            {/* <div className="h-1 bg-black rounded-full w-[20%]"></div> */}
                            <span className="text-black font-bold text-xs ml-2">
                                0
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="font-normal flex-grow">
                                Nh???n ph??ng
                            </div>

                            {/* <div className="h-1 bg-black rounded-full w-[20%]"></div> */}
                            <span className="text-black font-bold text-xs ml-2">
                                0
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col flex-grow pr-8 space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="font-normal flex-grow">
                                ????? ch??nh x??c
                            </div>

                            {/* <div className="h-1 bg-black rounded-full w-[20%]"></div> */}
                            <span className="text-black font-bold text-xs ml-2">
                                0
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="font-normal flex-grow">V??? tr??</div>

                            {/* <div className="h-1 bg-black rounded-full w-[20%]"></div> */}
                            <span className="text-black font-bold text-xs ml-2">
                                0
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="font-normal flex-grow">Gi?? tr???</div>

                            {/* <div className="h-1 bg-black rounded-full w-[20%]"></div> */}
                            <span className="text-black font-bold text-xs ml-2">
                                0
                            </span>
                        </div>
                    </div>
                </div>

                {/* Comment */}
                {/* <div className="">
                    <CommentCards />
                </div> */}

                {/* <div>
                    {" "}
                    <MoreUnderline title="Hi???n th??? th??m" />{" "}
                </div> */}

                <button className="w-1/4 my-10 py-3 cursor-pointer active:scale-95 active:bg-gray 100 transition transform ease-out block border rounded-xl font-medium text-black hover:bg-gray-300  duration-200 ">
                    {/* {rating !== "0" &&
                        "Hi???n th??? t???t c??? " + rating + " ????nh gi??"} */}

                    {/* {rating === "0" && "????nh gi?? t???i ????y"} */}
                    ????nh gi?? t???i ????y
                </button>

                <div className="border-b border-gray-300"></div>

                <div className="flex flex-col py-6 border-b border-gray-300">
                    <div className="flex">
                        <img
                            src="https://media.discordapp.net/attachments/890493745982767111/988728915382128680/unknown.png"
                            className="w-16 h-16 rounded-full cursor-pointer"
                        ></img>
                        <div className="flex-grow px-4">
                            <h2 className="text-black text-2xl pt-1">
                                Ch??? nh?? CBS
                            </h2>
                            <p className="font-normal">
                                ???? tham gia v??o th??ng 11 n??m 2021
                            </p>
                        </div>
                    </div>

                    <div className="flex py-6 space-x-6">
                        <div className="flex items-center">
                            <StarIcon className="h-5 w-5 text-black mr-2" />
                            <p className="font-normal text-black">
                                11 ????nh gi??
                            </p>
                        </div>

                        <div className="flex items-center">
                            <FingerPrintIcon className="h-5 text-black mr-2" />
                            <p className="font-normal text-black">
                                ???? x??c minh danh t??nh
                            </p>
                        </div>
                    </div>

                    <p className="text-black font-normal pt-4 mb-4">
                        T??? l??? ph???n h???i: 91%
                    </p>

                    <p className="text-black font-normal">
                        Th???i gian ph???n h???i: Trong v??ng 12 gi???
                    </p>

                    <button className="w-1/4 my-10 py-3 cursor-pointer active:scale-95 active:bg-gray 100 transition transform ease-out block border rounded-xl font-medium text-black hover:bg-gray-300  duration-200 ">
                        {" "}
                        Li??n h??? v???i ch??? nh??{" "}
                    </button>

                    <div className="flex items-center">
                        <div className="mr-4">
                            {" "}
                            <AirbnbPrivacy />{" "}
                        </div>
                        <p className="font-normal text-xs text-black w-1/4">
                            ????? b???o v??? kho???n thanh to??n c???a b???n, tuy???t ?????i kh??ng
                            chuy???n ti???n ho???c li??n l???c b??n ngo??i trang web ho???c
                            ???ng d???ng Airbnb.
                        </p>
                    </div>
                </div>

                <div className="py-6 text-2xl text-black">
                    Nh???ng ??i???u c???n bi???t
                </div>

                <div className="flex pb-10">
                    <div className="flex flex-col space-y-3 w-[30%] pr-4">
                        <h3 className="text-black">N???i quy nh??</h3>

                        <div className="flex items-center">
                            <ClockIcon className="h-5 w-5 text-black mr-2" />
                            <p className="text-black font-normal">
                                Nh???n ph??ng: Sau 15:00
                            </p>
                        </div>

                        <div className="flex items-center">
                            <ClockIcon className="h-5 w-5 text-black mr-2" />
                            <p className="text-black font-normal">
                                Tr??? ph??ng: 12:00
                            </p>
                        </div>

                        <div className="flex items-center">
                            <KeyIcon className="h-5 w-5 text-black mr-2" />
                            <p className="text-black font-normal">
                                T??? nh???n ph??ng b???ng h???p kh??a
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-3 w-[35%] px-4">
                        <h3 className="text-black">Y t??? v?? an to??n</h3>

                        <div className="flex items-center">
                            <SparklesIcon className="h-6 w-8 text-black mr-2 self-start" />
                            <p className="text-black font-normal">
                                C??c bi???n ph??p an to??n trong ?????i d???ch COVID-19
                                c???a Airbnb ???????c ??p d???ng
                            </p>
                        </div>

                        <div className="flex items-center">
                            <ExclamationCircleIcon className="h-5 w-5 text-black mr-2" />
                            <p className="text-black font-normal">
                                Kh??ng c?? m??y ph??t hi???n kh?? CO
                            </p>
                        </div>

                        <div className="flex items-center">
                            <ExclamationCircleIcon className="h-5 w-5 text-black mr-2 self-start" />
                            <p className="text-black font-normal">
                                Camera an ninh/thi???t b??? ghi{" "}
                                {/* <div className="block font-semibold ">
                                    {" "}
                                    <MoreUnderline title="Hi???n th??? th??m" />{" "}
                                </div> */}
                            </p>
                        </div>

                        <div className="flex items-center">
                            <CreditCardIcon className="h-6 w-8 text-black mr-2 self-start " />
                            <p className="text-black font-normal">
                                ?????t c???c - N???u b???n g??y h?? h???i cho nh??, b???n c?? th???
                                b??? thu ph?? l??n ?????n {"$" + price + "1"}
                            </p>
                        </div>

                        {/* <MoreUnderline title="Hi???n th??? th??m" /> */}
                    </div>

                    <div className="flex flex-col space-y-3 w-[35%] pl-4">
                        <h3 className="text-black">Ch??nh s??ch h???y</h3>

                        <p className="text-black font-normal">
                            Th??m ng??y cho chuy???n ??i c???a b???n ????? nh???n th??ng tin v???
                            ch??nh s??ch h???y cho ?????t ph??ng n??y.
                        </p>

                        <a href="#addDays"><MoreUnderline title="Th??m ng??y" /></a> 
                    </div>
                </div>
            </div>
            {/* ))} */}

            <Footer />
        </div>
    );
};

export default DetailRoom;

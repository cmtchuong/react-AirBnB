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
        img,
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
    } = Router.query;

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
                    title="Bắt đầu tìm kiếm"
                    place="Bạn muốn đi đâu"
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
                            {star + " · "}
                        </div>
                        <p className="ml-2 items-center m-0 underline text-black cursor-pointer">
                            {rating + " đánh giá"}
                        </p>
                        <p className="m-0 text-black ml-2 "> · </p>
                        <p className="underline ml-2 items-center font-semibold text-black cursor-pointer">
                            {place}
                        </p>
                        <div className="flex space-x-5 flex-grow justify-end">
                            <a className="flex items-center cursor-pointer font-medium underline text-black rounded-xl hover:bg-gray-300 p-2">
                                <ShareIcon className="h-4 w-4 mr-2" />
                                Chia sẻ
                            </a>

                            <a className="flex items-center cursor-pointer font-medium underline text-black rounded-xl hover:bg-gray-300 p-2">
                                <HeartIcon className="h-4 w-4 mr-2" />
                                Lưu
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
                                    {"Toàn bộ khách sạn/nhà ở " +
                                        
                                        " tại " +
                                        displayName +
                                        ". Chủ nhà CBS"}
                                </h1>
                                <p className="font-normal flex">
                                    {totalGuests + "  khách ·  "}
                                    {totalBedrooms === "0"
                                        ? ""
                                        : totalBedrooms + "  phòng ngủ ·  "}
                                    {totalBathrooms === "0"
                                        ? ""
                                        : totalBathrooms + "  phòng tắm ·  "}
                                    {hasTv == "true" ? "" : "Tivi ·  "}
                                    {hasWifi == "true" ? "" : "Wi-fi ·  "}
                                    {hasKitchen == "true" ? "" : "Bếp ·  "}
                                    {hasAirCon == "true" ? "" : "Điều hòa ·  "}
                                    {hasHeating == "true" ? "" : "Máy sưởi ·  "}
                                </p>
                            </div>
                            <div className="flex flex-col py-6 border-b border-gray-300">
                                <div className="flex mb-6">
                                    <LoginIcon className="w-6 h-6 mr-2" />
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-black m-0">
                                            Tự nhận phòng
                                        </p>
                                        <p className="font-normal">
                                            Bạn có thể gặp nhân viên trực cửa để
                                            nhận phòng
                                        </p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <LocationMarkerIcon className="w-6 h-6 mr-2" />
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-black m-0">
                                            Địa điểm tuyệt vời
                                        </p>
                                        <p className="font-normal">
                                            90% khách gần đây đã xếp 5 sao cho
                                            vị trí này
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="py-6 border-b border-gray-300 font-normal">
                                <p>
                                    Căn hộ xinh đẹp này ở nhà CBS nằm ở tầng 7
                                    của tòa nhà mới của chúng tôi - Nhà ở CBS-81.
                                    Nó có một phòng ngủ, một phòng tắm và một
                                    phòng khách mở. Nó được thiết kế rất đẹp.
                                    Cung cấp đầy đủ nội thất và thiết bị hiện
                                    đại. Cửa sổ kính lớn cho phép ánh sáng tự
                                    nhiên đi vào. Sàn gỗ giúp căn hộ dễ dàng vệ
                                    sinh.
                                </p>

                                <p>
                                    Hơn nữa, vị trí của tòa nhà nằm trong khoảng
                                    cách đi bộ đến các cửa hàng tiện lợi, nhà
                                    hàng, cửa hàng, quán bar, quán rượu.
                                </p>
                            </div>
                           
                            <Amenities />

                            <h2 className="text-2xl mt-8 text-black" id="addDays">
                                Chọn ngày nhận phòng
                            </h2>
                            <p className="font-normal mt-1">
                                Thêm ngày đi để biết giá chính xác
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
                                                / đêm{" "}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-black text-sm">
                                            <StarIcon className="h-5 text-red-500 mr-1" />
                                            {star}
                                            <div className="mx-1">·</div>
                                            <div className="underline text-black">
                                                {rating} đánh giá
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col mt-6 border border-gray-500 rounded-xl">
                                        <div className="flex active:border-black justify-between">
                                            <div className="border-r border-gray-500 p-3 flex-grow ">
                                                <p className="text-10px font-bold m-0 text-black">
                                                    NHẬN PHÒNG
                                                </p>
                                                <p className="font-normal text-sm">
                                                    {formattedStartDate}
                                                </p>
                                            </div>

                                            <div className=" p-3 flex-grow ">
                                                <p className="text-10px font-bold m-0 text-black">
                                                    TRẢ PHÒNG
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
                                                    KHÁCH
                                                </p>

                                                <div className="font-normal text-sm">
                                                    {" "}
                                                    {guests + " khách "}{" "}
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
                                                            Người lớn{" "}
                                                        </h2>
                                                        <p className="">
                                                            Từ 13 tuổi trở lên
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
                                                            Trẻ em{" "}
                                                        </h2>
                                                        <p className="">
                                                            Từ 13 tuổi trở xuống
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
                                                    startAt: formattedStartDate,
                                                    endAt: formattedEndDate,
                                                    guests: guests,
                                                    adults: adults,
                                                    children: children,
                                                    price: price,
                                                    // location: location,
                                                    rating: rating,
                                                    star: star,
                                                    title: title,
                                                    dayNum: dayNum,
                                                },
                                            });
                                        }}
                                    >
                                        Thanh toán
                                    </button>
                                </div>

                                <div className="flex-row flex  flex-grow justify-between xl:items-center pt-4">
                                    <button className="px-4 py-2 border border-gray-500 hover:border-black hover:shadow-lg cursor-pointer active:scale-95 active:bg-gray 100 transition transform duration-100 ease-out rounded-full text-black">
                                        <a className="" href="#anhPhong">
                                            Ảnh
                                        </a>
                                    </button>

                                    <button className="px-4 py-2 border border-gray-500 hover:border-black hover:shadow-lg cursor-pointer active:scale-95 active:bg-gray 100 transition transform duration-100 ease-out rounded-full text-black">
                                        <a href="#tienNghi">Tiện nghi</a>
                                    </button>

                                    <button className="px-4 py-2 border border-gray-500 hover:border-black hover:shadow-lg cursor-pointer active:scale-95 active:bg-gray 100 transition transform duration-100 ease-out rounded-full text-black">
                                        <a href="#danhGia">Đánh giá</a>
                                    </button>

                                    <button className="px-4 py-2 border border-gray-500 hover:border-black hover:shadow-lg cursor-pointer active:scale-95 active:bg-gray 100 transition transform duration-100 ease-out rounded-full text-black">
                                        <a href="">Vị trí</a>
                                    </button>
                                </div>

                                <div className="flex pb-10 pt-6 flex-grow justify-center">
                                    <FlagIcon className="w-6 h-6 mr-2 " />
                                    <a className="underline cursor-pointer text-sm">
                                        Báo cáo nhà/phòng cho thuê này
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-6 flex items-center" id="danhGia">
                    <StarIcon className="h-5 text-red-500 mr-1" />
                    <h2 className="text-2xl text-black">{star}</h2>
                    <div className="mx-1 text-black text-2xl">·</div>
                    <h2 className="text-2xl text-black">
                        {rating + " đánh giá"}
                    </h2>
                </div>

                <div className="flex flex-col xl:flex-row justify-between xl:items-center py-6">
                    <div className="flex flex-col flex-grow space-y-3 pr-14">
                        <div className="flex justify-between items-center">
                            <div className="font-normal flex-grow">
                                Mức độ sạch sẽ
                            </div>

                            {/* <div className="h-1 bg-black rounded-full w-[20%]"></div> */}
                            <span className="text-black font-bold text-xs ml-2">
                                0
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="font-normal flex-grow">
                                Giao tiếp
                            </div>

                            {/* <div className="h-1 bg-black rounded-full w-[20%]"></div> */}
                            <span className="text-black font-bold text-xs ml-2">
                                0
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="font-normal flex-grow">
                                Nhận phòng
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
                                Độ chính xác
                            </div>

                            {/* <div className="h-1 bg-black rounded-full w-[20%]"></div> */}
                            <span className="text-black font-bold text-xs ml-2">
                                0
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="font-normal flex-grow">Vị trí</div>

                            {/* <div className="h-1 bg-black rounded-full w-[20%]"></div> */}
                            <span className="text-black font-bold text-xs ml-2">
                                0
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="font-normal flex-grow">Giá trị</div>

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
                    <MoreUnderline title="Hiển thị thêm" />{" "}
                </div> */}

                <button className="w-1/4 my-10 py-3 cursor-pointer active:scale-95 active:bg-gray 100 transition transform ease-out block border rounded-xl font-medium text-black hover:bg-gray-300  duration-200 ">
                    {/* {rating !== "0" &&
                        "Hiển thị tất cả " + rating + " đánh giá"} */}

                    {/* {rating === "0" && "Đánh giá tại đây"} */}
                    Đánh giá tại đây
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
                                Chủ nhà CBS
                            </h2>
                            <p className="font-normal">
                                Đã tham gia vào tháng 11 năm 2021
                            </p>
                        </div>
                    </div>

                    <div className="flex py-6 space-x-6">
                        <div className="flex items-center">
                            <StarIcon className="h-5 w-5 text-black mr-2" />
                            <p className="font-normal text-black">
                                11 đánh giá
                            </p>
                        </div>

                        <div className="flex items-center">
                            <FingerPrintIcon className="h-5 text-black mr-2" />
                            <p className="font-normal text-black">
                                Đã xác minh danh tính
                            </p>
                        </div>
                    </div>

                    <p className="text-black font-normal pt-4 mb-4">
                        Tỉ lệ phản hồi: 91%
                    </p>

                    <p className="text-black font-normal">
                        Thời gian phản hồi: Trong vòng 12 giờ
                    </p>

                    <button className="w-1/4 my-10 py-3 cursor-pointer active:scale-95 active:bg-gray 100 transition transform ease-out block border rounded-xl font-medium text-black hover:bg-gray-300  duration-200 ">
                        {" "}
                        Liên hệ với chủ nhà{" "}
                    </button>

                    <div className="flex items-center">
                        <div className="mr-4">
                            {" "}
                            <AirbnbPrivacy />{" "}
                        </div>
                        <p className="font-normal text-xs text-black w-1/4">
                            Để bảo vệ khoản thanh toán của bạn, tuyệt đối không
                            chuyển tiền hoặc liên lạc bên ngoài trang web hoặc
                            ứng dụng Airbnb.
                        </p>
                    </div>
                </div>

                <div className="py-6 text-2xl text-black">
                    Những điều cần biết
                </div>

                <div className="flex pb-10">
                    <div className="flex flex-col space-y-3 w-[30%] pr-4">
                        <h3 className="text-black">Nội quy nhà</h3>

                        <div className="flex items-center">
                            <ClockIcon className="h-5 w-5 text-black mr-2" />
                            <p className="text-black font-normal">
                                Nhận phòng: Sau 15:00
                            </p>
                        </div>

                        <div className="flex items-center">
                            <ClockIcon className="h-5 w-5 text-black mr-2" />
                            <p className="text-black font-normal">
                                Trả phòng: 12:00
                            </p>
                        </div>

                        <div className="flex items-center">
                            <KeyIcon className="h-5 w-5 text-black mr-2" />
                            <p className="text-black font-normal">
                                Tự nhận phòng bằng hộp khóa
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-3 w-[35%] px-4">
                        <h3 className="text-black">Y tế và an toàn</h3>

                        <div className="flex items-center">
                            <SparklesIcon className="h-6 w-8 text-black mr-2 self-start" />
                            <p className="text-black font-normal">
                                Các biện pháp an toàn trong đại dịch COVID-19
                                của Airbnb được áp dụng
                            </p>
                        </div>

                        <div className="flex items-center">
                            <ExclamationCircleIcon className="h-5 w-5 text-black mr-2" />
                            <p className="text-black font-normal">
                                Không có máy phát hiện khí CO
                            </p>
                        </div>

                        <div className="flex items-center">
                            <ExclamationCircleIcon className="h-5 w-5 text-black mr-2 self-start" />
                            <p className="text-black font-normal">
                                Camera an ninh/thiết bị ghi{" "}
                                {/* <div className="block font-semibold ">
                                    {" "}
                                    <MoreUnderline title="Hiển thị thêm" />{" "}
                                </div> */}
                            </p>
                        </div>

                        <div className="flex items-center">
                            <CreditCardIcon className="h-6 w-8 text-black mr-2 self-start " />
                            <p className="text-black font-normal">
                                Đặt cọc - Nếu bạn gây hư hại cho nhà, bạn có thể
                                bị thu phí lên đến {"$" + price + "1"}
                            </p>
                        </div>

                        {/* <MoreUnderline title="Hiển thị thêm" /> */}
                    </div>

                    <div className="flex flex-col space-y-3 w-[35%] pl-4">
                        <h3 className="text-black">Chính sách hủy</h3>

                        <p className="text-black font-normal">
                            Thêm ngày cho chuyến đi của bạn để nhận thông tin về
                            chính sách hủy cho đặt phòng này.
                        </p>

                        <a href="#addDays"><MoreUnderline title="Thêm ngày" /></a> 
                    </div>
                </div>
            </div>
            {/* ))} */}

            <Footer />
        </div>
    );
};

export default DetailRoom;

import React, { useRef, useState } from "react";
import { Login } from "@components/login";
import { useOnClickOutside } from "usehooks-ts";
import { VerifyIcon } from "@components/icons";
import { CheckIcon, ChevronLeftIcon, StarIcon } from "@heroicons/react/solid";
import TitleDefaultMobile from "@components/DetailRoom/TitleDefaultMobile";
import NavMobile from "@components/DetailRoom/NavMobile";
import StickyFooter from "@components/DetailRoom/StickyFooter";
import ImageMobile from "@components/DetailRoom/ImageMobile";
import OverviewMobile from "@components/DetailRoom/OverviewMobile";
import Description from "@components/DetailRoom/Description";
import Amenities from "@components/DetailRoom/Amenities";
import ReviewMobile from "@components/DetailRoom/ReviewMobile";
import HostProfile from "@components/DetailRoom/HostProfile";
import HomePoliciesMobile from "@components/DetailRoom/HomePoliciesMobile";
import SafetyPoliciesMobile from "@components/DetailRoom/SafetyPoliciesMobile";
import CancellationPoliciesMobile from "@components/DetailRoom/CancellationPoliciesMobile";
import AvailableCalendar from "@components/DetailRoom/AvailableCalendar";

import { Footer } from "@components/footer";
import { useRouter } from "next/router";
import { addDays, format } from "date-fns";
import { DateRangePicker } from "react-date-range";

export const RepoMobile: React.FC = () => {
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
        star,
        rating,
        price,
    } = Router.query;

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

    return (
        <div>
            <div className="mx-[5%]">
                <NavMobile />
            </div>

            <ImageMobile />

            <div className="mx-[5%]">
                <TitleDefaultMobile />

                <OverviewMobile />

                <Description />

                <Amenities />

                {/* <AvailableCalendar /> */}
                <h2 className="text-2xl mt-8 text-black">
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

                <ReviewMobile />

                <HostProfile />

                <HomePoliciesMobile />

                <SafetyPoliciesMobile />

                <CancellationPoliciesMobile />
            </div>

            <Footer />

            {/* <StickyFooter /> */}
            <div className="sticky bottom-0 z-10 w-full px-[5%] py-5 bg-white border border-gray-300">
                <div className="flex justify-between">
                    <div className="flex flex-col space-y-1">
                        <div className="text-xl text-black">
                            {"$" + price}{" "}
                            <span className="font-normal text-lg"> / đêm </span>
                        </div>

                        <div className="">
                            <span className="font-normal text-lg">
                                {formattedStartDate + " - "}
                            </span>
                            <span className="font-normal text-lg">
                                {formattedEndDate}
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="bg-gradient-to-r from-[#e61e4d] to-[#d70466] rounded-xl p-3 text-white active:bg-pink-500 hover:shadow-xl active:scale-90 transition duration-150 font-medium"
                        onClick={() => {
                            Router.push({
                                pathname: "/payment/confirm",
                                query: {
                                    img: img,
                                    roomID: roomID,
                                    place: place,
                                    startAt: pickDay[0].startDate.toISOString().replace('Z', '').concat('+00:00'),
                                    endAt: pickDay[0].endDate.toISOString().replace('Z', '').concat('+00:00'),
                                    guests: 1,
                                    adults: 1,
                                    children: 0,
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
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RepoMobile;

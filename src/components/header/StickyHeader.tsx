import React, { useRef } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { Logo } from "@components";
import { Button } from "@components/button";
import { AirbnbIcon, GlobeIcon, MenuIcon, UserIcon } from "@components/icons";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import { Menu } from "@components/menu/Menu";
import Search from "@components/search";
import { MenuUser } from "@components/menu/MenuUser";
import { getCookie } from "cookies-next";
import MenuMobile from "@components/menu/MenuMobile";
import MenuMobileUser from "@components/menu/MenuMobileUser";
import { Modal, useModal, Text } from "@nextui-org/react";
import { LanguageModal } from "@components/modal/language";
import { CurrencyModal } from "@components/modal/currency";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
    title?: string;
    place?: string;
}

export const StickyHeader: React.FC<Props> = ({
    title = "Bắt đầu tìm kiếm",
    place = "Bạn sắp đi đâu?",
}) => {
    const [state, setState] = useState("");
    const [stateMenu, setStateMenu] = useState(false);
    const [stateSearch, setStateSearch] = useState(false);
    const [language, setLanguage] = useState(true);
    const [currency, setCurrency] = useState(false);
    const [isSelect, setIsSelect] = useState("Language");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
    };

    const value = getCookie("isLoggedIn");

    const { setVisible, bindings } = useModal();

    const ref = useRef(null);

    const handleClickOutside = () => {
        setStateSearch(false);
        
    };

    const handleClickInside = () => {
        // Your custom logic here
      
    };

    useOnClickOutside(ref, handleClickOutside);

    return (
        <div className="sticky top-0 z-10">
            <div className=" grid grid-cols-3 bg-white shadow-md py-3 lg:px-20 px-10 relative">
                <div className=" flex items-center h-10  my-auto ">
                    <a className="" href="/">
                        <AirbnbIcon />
                    </a>
                </div>

                <div className="items-center px-5 justify-center md:flex hidden">
                    <Button
                        type="button"
                        className="text-left"
                        onClick={() => {
                            stateSearch
                                ? setStateSearch(false)
                                : setStateSearch(true);
                        }}
                    >
                        <div className="px-4 flex md:justify-between items-center justify-center">
                            <p className="hidden md:inline-flex">{title}</p>
                            <SearchIcon className="h-8 bg-red-500 text-white rounded-full cursor-pointer p-2 md:mx-2 " />
                        </div>
                    </Button>
                </div>

                <div className="flex items-center space-x-4 justify-end col-span-2 md:col-span-1">
                    <div className="relative flex items-center">
                        <a
                            className="p-3 rounded-22 hover:bg-gray-100 hidden md:inline"
                            href="https://www.airbnb.com.vn/host/homes"
                        >
                            Trở thành chủ nhà
                        </a>
                        <a
                            className="hover:bg-gray-100 rounded-22 p-3 m-2"
                            onClick={() => {
                                setVisible(true);
                            }}
                        >
                            <GlobeIcon />
                        </a>

                        <div className="block">
                            <Button
                                variant="flat"
                                className="border-gray-500 border hover:shadow-cart p-2 flex items-center space-x-3 rounded-full transition duration-150 hover:opacity-100 "
                                onClick={() => {
                                    stateMenu
                                        ? setStateMenu(false)
                                        : setStateMenu(true);
                                }}
                            >
                                <MenuIcon className="h-6" />
                                {!value && <UserIcon className="h-6" />}

                                {value && (
                                    <img
                                        src="https://a0.muscache.com/defaults/user_pic-225x225.png?v=3"
                                        className="rounded-full w-[28px] h-[28px] block mx-auto"
                                    ></img>
                                )}
                            </Button>

                            <div className="hidden md:block">
                                {!value && stateMenu && <Menu />}

                                {value && stateMenu && <MenuUser />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" md:hidden">
                {!value && stateMenu && <MenuMobile />}

                {value && stateMenu && <MenuMobileUser />}
            </div>

            {stateSearch && (
                <div ref={ref}>
                    {" "}
                    <Search place={place} />{" "}
                </div>
            )}

            <Modal
                scroll
                closeButton
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                width="1000px"
                className=""
                {...bindings}
            >
                <Modal.Header className="block">
                    <div className="flex text-left items-start border-b border-gray-300">
                        {isSelect === "Language" ? (
                            <h2
                                className="text-black text-base px-4 py-4 hover:bg-gray-300 border-b border-black"
                                onClick={() => {
                                    setLanguage(true);
                                    setCurrency(false);
                                    setIsSelect("Language");
                                }}
                            >
                                Ngôn ngữ và khu vực
                            </h2>
                        ) : (
                            <h2
                                className=" text-base px-4 py-4 hover:bg-gray-300"
                                onClick={() => {
                                    setLanguage(true);
                                    setCurrency(false);
                                    setIsSelect("Language");
                                }}
                            >
                                Ngôn ngữ và khu vực
                            </h2>
                        )}

                        {isSelect === "Currency" ? (
                            <h2
                                className="text-black text-base px-4 py-4 hover:bg-gray-300 border-b border-black"
                                onClick={() => {
                                    setLanguage(false);
                                    setCurrency(true);
                                    setIsSelect("Currency");
                                }}
                            >
                                Tiền tệ
                            </h2>
                        ) : (
                            <h2
                                className=" text-base px-4 py-4 hover:bg-gray-300"
                                onClick={() => {
                                    setLanguage(false);
                                    setCurrency(true);
                                    setIsSelect("Currency");
                                }}
                            >
                                Tiền tệ
                            </h2>
                        )}
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {language ? <LanguageModal /> : <CurrencyModal />}
                </Modal.Body>
            </Modal>
        </div>
    );
};

import React, { useRef, useState } from "react";
import { Login } from "@components/login";
import { useOnClickOutside } from "usehooks-ts";

export const Menu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const ref = useRef(null);

    const handleClickOutside = () => {
        // Your custom logic here
        setIsOpen(false);
        

    };

    const handleClickInside = () => {
        setIsOpen(true);
        
    };

  
    useOnClickOutside(ref, handleClickOutside);

    return (
        <div className="" >
            {isOpen && (
                <div
                    className="bg-white w-4/5 absolute top-16 rounded-xl py-3 right-0 opacity-100  z-50 items-right border border-gray-300 shadow-subMenu"
                    ref={ref}
                >
                    <ul className="space-y-3 font-normal">
                        <li className="font-bold hover:bg-gray-300 py-1 px-5">
                            <a href="/register">Đăng ký</a>
                        </li>
                        <li className="hover:bg-gray-300 py-1 px-5">
                            <a href="/login">Đăng nhập</a>
                        </li>
                        <hr className="text-gray-500"></hr>
                        <li className="hover:bg-gray-300 py-1 px-5">
                            <a href="https://www.airbnb.com.vn/host/homes">
                                Cho thuê nhà
                            </a>
                        </li>
                        <li className="hover:bg-gray-300 py-1 px-5">
                            <a href="https://www.airbnb.com.vn/host/experiences?from_nav=1">
                                Tổ chức trải nghiệm
                            </a>
                        </li>
                        <li className="hover:bg-gray-300 py-1 px-5">
                            <a href="https://www.airbnb.com.vn/help">
                                Trợ giúp
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Menu;

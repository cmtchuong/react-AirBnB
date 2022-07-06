/* eslint-disable */
import { PlusCircleIcon } from "@heroicons/react/solid";
import React, { useRef, useState } from "react";

import { Table, Tag, Space, Button, Input } from "antd";
import type { ColumnsType, ColumnType } from "antd/lib/table";
import "antd/dist/antd.css";

import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import type { FilterConfirmProps } from "antd/lib/table/interface";

import Highlighter from "react-highlight-words";
import http from "@utils/http";
import { API_ENDPOINTS } from "@utils/apiEndpoints";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { Loading, Modal, useModal } from "@nextui-org/react";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

import { useForm } from "react-hook-form";
import {getCookie} from "cookies-next"
import { stringify } from "querystring";



type User = {
    password: string;
    confirmPassword?: string;
    name: string;
    email: string;
    birthday: string;
    gender: boolean;
    phoneNumber: number;
    address: string;
    type: string;
};

type DataIndex = keyof RootObject;

export interface RootObject {
    tickets: string[];
    deleteAt: boolean;
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    type: string;
    __v: number;
    avatar: string;
    birthday?: string;
    gender?: boolean;
}

const userId = getCookie("userId")

const getUsers = async () => {
    const response = await http.get(
        `https://airbnb.cybersoft.edu.vn${API_ENDPOINTS.USER}${userId}`,
    );
    return response.data;
};

export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery<RootObject>("info", getUsers);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

export const Users: React.FC = () => {
    const { setVisible, bindings } = useModal();
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<User>();

    const newPassword = useRef({});
    newPassword.current = watch("password", "");

    const { data, isLoading, isFetching } = useQuery<RootObject[]>(
        "infoRoom",
        getUsers,
    );
   

    if (!data) {
        return <p className="p-6">Dữ liệu không tìm thấy :)</p>;
    }

    if (isLoading) return <Loading type="points" />;

    const dataFetch: RootObject[] = [
        {
            tickets: [],
            deleteAt: false,
            _id: "616915dbefe193001c0a5a6d",
            name: "Nguyễn Phong Kha",
            email: "kha9x0159@gmail.com",
            password:
                "$2a$10$WXyjr1nLgDZ.mhOAGzuV3OeGGnI0INQ1i0P/L3WeDGQ4bGzoP7cLG",
            phone: "0909876987",
            address: "191A Chường Trinh Quận 12",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1649515665823_minions1.jpg",
            birthday: "2019-06-04T00:00:00.000Z",
            gender: true,
        },
        {
            tickets: [],
            deleteAt: false,
            _id: "616a9a82efe193001c0a5de5",
            name: "Hoàng Minh",
            email: "hoangminh12111@gmail.com",
            password:
                "$2a$10$IJ7el.7awJOA7Ts.NpFU5eYqSrI9qaDsybA67h7pih72u8qhrNY0C",
            phone: "0909876987",
            birthday: "1998-05-11T00:00:00.000Z",
            gender: true,
            address: "Quận 1 TPHCM",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1644665561133_tai-anh-anime-ve-lam-avatar10.jpg",
        },
        {
            tickets: ["61723e9befe193001c0a7a81", "6172b870efe193001c0a7d7a"],
            deleteAt: false,
            _id: "616a9e48efe193001c0a5e16",
            name: "Sonnna",
            email: "dsmama96@gmail.com",
            password:
                "$2a$10$TfNcvWZVeUd4eQuCX3/I7uHd2//jMb.pgRhuSIYhsqdlo/a8J/6g6",
            phone: "0901461096",
            address: "Quan 9 VietNam",
            __v: 2,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1655883536316_dlwlrma_2___B6XY7BrgOii___.jpg",
            type: "CLIENT",
            birthday: "2022-06-15T00:00:00.000Z",
            gender: false,
        },
        {
            tickets: [
                "6172b922efe193001c0a7d81",
                "6172b957efe193001c0a7d86",
                "6172b95befe193001c0a7d8a",
                "61737431efe193001c0a8016",
                "61737437efe193001c0a801a",
                "6173743aefe193001c0a801e",
                "6173743cefe193001c0a8022",
                "6173748fefe193001c0a802c",
                "617374bfefe193001c0a8036",
                "6173755befe193001c0a8048",
                "617375f5efe193001c0a8054",
                "61737630efe193001c0a8066",
                "61737658efe193001c0a8071",
                "61737674efe193001c0a8079",
                "617376a7efe193001c0a8083",
                "61737806efe193001c0a80a5",
                "6173783aefe193001c0a80b5",
                "6173788cefe193001c0a80bc",
                "6173789aefe193001c0a80c7",
                "617378d1efe193001c0a80d2",
                "617378faefe193001c0a80e2",
                "61737927efe193001c0a80ea",
                "617d440840651d001c3a066d",
            ],
            deleteAt: false,
            _id: "616d423cefe193001c0a6536",
            name: "Lã Văn Tuấn Phát",
            email: "lavantuanphat15@gmail.com",
            password:
                "$2a$10$I2seMYoy3fV84s6J6cyU7ugCHklkGL50y557yWLOS.qC/oqYZb2Gy",
            phone: "778984437",
            birthday: "1996-10-15T00:00:00.000Z",
            gender: true,
            address: "14/13/50 Thân Nhân Trung",
            type: "CLIENT",
            __v: 23,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1635599427517_logo.png",
        },
        {
            tickets: [],
            deleteAt: false,
            _id: "61750657efe193001c0a8bb2",
            name: "Black Pink",
            email: "blackpink@gmail.com",
            password:
                "$2a$10$2ygXIGwYn4ZOvtZ2PjO0fOSeAiOcKpZDEVjZU6M1baBfvDAcHgIhG",
            phone: "0909876987",
            birthday: "1998-05-11T00:00:00.000Z",
            gender: true,
            address: "Quận 1 TPHCM",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1635059433710_anh-avatar-dep-21.jpg",
        },
        {
            tickets: [],
            deleteAt: false,
            _id: "6175082fefe193001c0a8c06",
            name: "Obama",
            email: "obama@gmail.com",
            password:
                "$2a$10$Il6rgHf/rt9..DMnc9Ror.VodkAv0gSFcE0Aj99WOjU05hE1bIBy6",
            phone: "0909876987",
            birthday: "1998-05-11T00:00:00.000Z",
            gender: true,
            address: "Quận 1 TPHCM",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1635059785794_anh-dai-dien-731x1024.jpg",
        },
        {
            tickets: [],
            deleteAt: false,
            _id: "61750caaefe193001c0a8ccf",
            name: "Trấn Thành",
            email: "tranthanh@gmail.com",
            password:
                "$2a$10$9IVeUFDVqO0k4GCPgtBtJeY5i0Ef2W7ea1FgxN6a2AUp/U/K8t/xu",
            phone: "0909876987",
            birthday: "1998-05-11T00:00:00.000Z",
            gender: true,
            address: "Quận 1 TPHCM",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1635061002779_thanh-128 (1).png",
        },
        {
            tickets: [
                "6193830dd1aba6001cefda0d",
                "6193ad18d1aba6001cefdbfe",
                "6193ae2bd1aba6001cefdc50",
                "6193b1bed1aba6001cefdcda",
                "6193b3a7d1aba6001cefdd0d",
                "6193c766d1aba6001cefdee0",
                "61946a97d1aba6001cefdf99",
                "6194706fd1aba6001cefe014",
                "6195be14d1aba6001cefe99e",
                "6195c639d1aba6001cefe9e7",
                "61960823d1aba6001cefecde",
                "61961cd1d1aba6001cefeee9",
                "61961daad1aba6001cefef07",
                "61961dd0d1aba6001cefef18",
                "61961dffd1aba6001cefef37",
                "61961eced1aba6001cefef75",
                "61961eead1aba6001cefef86",
                "619620e4d1aba6001ceff000",
                "619669a1d1aba6001ceff238",
                "61988e48d1aba6001ceff624",
                "619cba8cd1aba6001cf00c00",
                "619d9d42d1aba6001cf00da6",
                "619d9ecad1aba6001cf00dfa",
                "619d9f3ed1aba6001cf00e15",
                "619dc149d1aba6001cf00f0f",
                "619dc9bbd1aba6001cf00f84",
                "619effa1d1aba6001cf01353",
                "619effd1d1aba6001cf0135b",
                "619f5a8cd1aba6001cf0194d",
                "61a04727d1aba6001cf01dbb",
                "61a08c44d1aba6001cf0242c",
            ],
            deleteAt: false,
            _id: "619382bfd1aba6001cefda05",
            name: "Nguyễn Thúy Anh",
            email: "anhthuy@gmail.com",
            password:
                "$2a$10$1Y8kJ2bYTDYvWeJNC/JrhexfrTrBmEDrHJHi9oSxQNhxTintPduoe",
            phone: "123456",
            birthday: "1996-02-22T00:00:00.000Z",
            gender: false,
            address: "Quốc lộ 1A, TP. Thủ Đức",
            type: "ADMIN",
            __v: 31,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1637911653494_dich.jpg",
        },
        {
            tickets: ["61966a69d1aba6001ceff25b"],
            deleteAt: false,
            _id: "61966a4fd1aba6001ceff258",
            name: "Mi Nguyen",
            email: "nguyenmi@gmail.com",
            password:
                "$2a$10$eT9EIxgaJGG05t2Wi/9CBu75EcIHBbL0Ve9bh/fvVqjfWT4HOyp7S",
            phone: "2345671209",
            birthday: "2021-11-04T00:00:00.000Z",
            gender: false,
            address: "Ho Chi Minh City",
            type: "CLIENT",
            __v: 1,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1637247727452_bcf7dff2ly1gronwhn379j20u01721-4648-6738-1624263784.jpg",
        },
        {
            tickets: ["6197666dd1aba6001ceff3db"],
            deleteAt: false,
            _id: "61976644d1aba6001ceff3cd",
            name: "Trần Đức Nghĩa",
            email: "ducnghia@gmail.com",
            password:
                "$2a$10$5x3oq13OB9NV/5BY2oVzIuGOotWOOAYh66tw1KIWFl6P7pRJRc1oC",
            phone: "0357911329",
            birthday: "2021-11-03T00:00:00.000Z",
            gender: true,
            address: "Quốc lộ 1A",
            type: "CLIENT",
            __v: 1,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1637312126419_6c90ff0f8dcf795a96d90b5e029c028c.jpg",
        },
        {
            tickets: [
                "619dc900d1aba6001cf00f40",
                "619dc978d1aba6001cf00f68",
                "619dca46d1aba6001cf00fbf",
                "619ee73cd1aba6001cf0128e",
                "619f0073d1aba6001cf0137c",
                "619f0276d1aba6001cf0138d",
                "619f03ffd1aba6001cf013c3",
                "619f06b3d1aba6001cf013f6",
            ],
            deleteAt: false,
            _id: "619dc8e6d1aba6001cf00f3d",
            name: "Diễm Mi",
            email: "diemmi@gmail.com",
            password:
                "$2a$10$1ourhTZpsiR/PmP2237kneKa864YxEhOuJrRiQKvhebuLhL4V810W",
            phone: "123455",
            birthday: "2000-05-25T00:00:00.000Z",
            gender: false,
            address: "Quốc lộ 1A",
            type: "ADMIN",
            __v: 8,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1637812527097_d391ddf94a88467b912e471ca52dd0d9.jpg",
        },
        {
            tickets: ["619f2ce1d1aba6001cf01610", "619f2d56d1aba6001cf0164c"],
            deleteAt: false,
            _id: "619f2cc4d1aba6001cf0160d",
            name: "Hồng Quân",
            email: "quannguyen@gmail.com",
            password:
                "$2a$10$7xNqI.fSMLkzDUjuKPOEs.5xYhrH5TmpIKrZfROp3hRnJOTZ1WfCG",
            phone: "0357911329",
            birthday: "2021-02-18T00:00:00.000Z",
            gender: false,
            address: "Quốc lộ 1A, TP. Dĩ An",
            type: "CLIENT",
            __v: 2,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1637821687824_qrrrr.jpg",
        },
        {
            tickets: [
                "61a37867d1aba6001cf0307b",
                "61a37933d1aba6001cf0307f",
                "61a379cad1aba6001cf030a9",
                "61a37a69d1aba6001cf030c5",
                "61a37a73d1aba6001cf030d1",
                "61a438f1d1aba6001cf033f2",
                "61a4a331d1aba6001cf03945",
                "61a4a368d1aba6001cf0394f",
                "61a4a376d1aba6001cf0395b",
                "61a4a3fcd1aba6001cf0397c",
                "61a4bc37d1aba6001cf039f5",
                "61a4bd61d1aba6001cf03a0f",
                "61a6297ed1aba6001cf04135",
                "61a869c0d1aba6001cf0976e",
                "61a87c3bd1aba6001cf0988c",
                "61a89f58d1aba6001cf099eb",
                "62258d95fee2fc001cd7e06a",
            ],
            deleteAt: false,
            _id: "619f3179d1aba6001cf01695",
            name: "Hiệp Nguyễn",
            email: "hiep@gmail.com",
            password:
                "$2a$10$iFdSV/krck7bmNkXdNSj3.LNdDLyAbZaU9QhWrrc6V7Acd8lo0Qwa",
            phone: "12345678",
            birthday: "2021-11-25T00:00:00.000Z",
            gender: true,
            address: "222/28 BĐT",
            type: "CLIENT",
            __v: 17,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1638185753993_bg-home.jpg",
        },
        {
            tickets: [],
            deleteAt: false,
            _id: "61c5dd62d1aba6001cf0cbb9",
            name: "Man Ng",
            email: "luvzk12345@gmail.com",
            password:
                "$2a$10$QxaJ9IsIvClezV25QvrQwO9Quo1R79rrqSo.bbtVV/uoNu8HMWjBS",
            phone: "0855126790",
            birthday: "1998-02-11T00:00:00.000Z",
            gender: true,
            address: "abc",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1640357353209_avatar.png",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "61c91042d1aba6001cf0da27",
            name: "La Thuy",
            email: "thuy@gmail.com",
            password:
                "$2a$10$IJ3G25KTTEoTsEmqwFvONuZhpNDbhj3bJCXcVJYo0sEPrUSqKGoCC",
            phone: "0934657867",
            birthday: "1998-05-11T00:00:00.000Z",
            gender: true,
            address: "An Giang",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1655977344560_MaTocDo.jpg",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "61caf8edfee2fc001ccda5e3",
            name: "Thanh Tu admin",
            email: "thanhtu_admin@gmail.com",
            password:
                "$2a$10$kovHNK71L24TfvAVkPApPeohWU/9WmtObtH1kzkpS7NBMvQ4GXhyu",
            phone: "0934657867",
            birthday: "1998-05-15T00:00:00.000Z",
            gender: true,
            address: "Ho Chi Minh",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1647171056107_testimonial-6.jpg",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "61cc3ec4fee2fc001ccdf6bd",
            name: "thinh a",
            email: "gaoerw@gmail.com",
            password:
                "$2a$10$84Tui52nkwP7b0gYq.NVVOmTb6WR/b/3HqesFancdKgXHRQ55VP.u",
            phone: "09124527875",
            birthday: "2021-12-15T00:00:00.000Z",
            gender: true,
            address: "12312as ba",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1640777265074_dau.jpg",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "61cd87b8fee2fc001ccf7277",
            name: "Đinh Thanh Tú",
            email: "thanhtu_client@gmail.com",
            password:
                "$2a$10$MWbkx3gM.Ikb0XfOph064.T8dwdingnKWpCEvZ5S81eIlU9FxWyiK",
            phone: "0919216988",
            birthday: "2008-07-18T00:00:00.000Z",
            gender: true,
            address: "18/1E đường 1B",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1645109398739_testimonial-6.jpg",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "61d163c9fee2fc001ccf8a5c",
            name: "Mai Thanh Thu",
            email: "tranthu@gmail.com",
            password:
                "$2a$10$3XFmFmdQrKXP0ppARC.XBehjhsbYCVrgoBXTwxoJenAEejqbFIeIO",
            phone: "90321456",
            birthday: "2022-01-02T00:00:00.000Z",
            gender: false,
            address: "360 Bui Dinh Tuy, Q3, Tp.HCM",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1641115331526_IMG_8463.jpg",
        },

        {
            tickets: [
                "61def8f4fee2fc001cd77413",
                "61defaa6fee2fc001cd7743f",
                "61defbe1fee2fc001cd7744f",
                "61df00defee2fc001cd7750d",
                "61df00edfee2fc001cd7751a",
            ],
            deleteAt: false,
            _id: "61d85055fee2fc001cd12cea",
            name: "tunght994",
            email: "tunght994@gmail.com",
            password:
                "$2a$10$MYmOZNyRnUw.Xqd8W.QO.O4G28E0WiqzFp6ndBxoql9Hvg9lNSaPi",
            phone: "769881885",
            birthday: "1992-03-12T00:00:00.000Z",
            gender: true,
            address: "10 dang lo , phuong 7 , quan tan binh",
            type: "CLIENT",
            __v: 5,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1641890058590_postcard-left.png",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "61d85999fee2fc001cd12d10",
            name: "thao@gmail.com",
            email: "dovanthao@gmail.com",
            password:
                "$2a$10$Vuh8iGX5hg4Fb0bSPFmqTeaDApOukELIE1BxneuOXBn8lHO7pB4wy",
            phone: "232323232",
            birthday: "2222-02-22T00:00:00.000Z",
            gender: true,
            address: "2",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1641889380316_logo.png",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "61dd419bfee2fc001cd711f2",
            name: "tungh992@gmail.com",
            email: "tungh992@gmail.com",
            password:
                "$2a$10$JuQwsR7aAZVAlB/cK7HZb.VPu9nEceyEM.ppulm1TyTKbMI6rnT/2",
            phone: "989333574",
            birthday: "2222-02-12T00:00:00.000Z",
            gender: true,
            address: "10 dang lo",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1641890210756_postcard-right.png",
        },

        {
            tickets: ["61e2fc26fee2fc001cd77d1f"],
            deleteAt: false,
            _id: "61e2fb74fee2fc001cd77d08",
            name: "demo123",
            email: "demo@gmail.com",
            password:
                "$2a$10$C819.V06Qwvic6W2jxUwGuLd3dqv449Qa8knrFWk5b0D7TDU.UC7W",
            phone: "123123123",
            birthday: "2022-01-15T00:00:00.000Z",
            gender: true,
            address: "1 testing",
            type: "CLIENT",
            __v: 1,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1642265578598_logo (1).png",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "62409d46fee2fc001cd8bfa0",
            name: "phitn",
            email: "phitn@gmail.com",
            password:
                "$2a$10$NlIwos2qR7TXf7H7rQFmMO0ZVGH3kYM7uPFmIfSPAP6KbGx8eS3eO",
            phone: "0935554848",
            birthday: "2022-01-03T00:00:00.000Z",
            gender: true,
            address: "Tuổi trẻ tower, 60A Hoàng Văn Thụ",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1649232619364_Screenshot_1.png",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "624c6e55fee2fc001cda022a",
            name: "Hoàng Quý Đạt",
            email: "dat@gmail.com",
            password:
                "$2a$10$aZ9piNoSw2L2fimUFjK/re0h6cZQNO2d2rWJLRSAbjT08C2uXKFoC",
            phone: "0777787399",
            birthday: "1997-10-29T00:00:00.000Z",
            gender: true,
            address: "120/33a Tôn Thất Hiệp",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1649565884368_Screenshot from 2022-04-05 23-32-59.png",
        },
        {
            tickets: [],
            deleteAt: false,
            _id: "624c6e9cfee2fc001cda022e",
            name: "Hoàng Quý Đạt",
            email: "dat@gmail.com",
            password:
                "$2a$10$Rj.JrOpqUgXPSwlTRqr4aucpEIXBbMi8vKsEvm28RmCmwu5h5bZG.",
            phone: "0777787399",
            birthday: "1997-10-29T00:00:00.000Z",
            gender: true,
            address: "120/33a Tôn Thất Hiệp",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1649577989699_Handy-Checklist-for-Linux-Commands (1).png",
        },
        {
            tickets: [],
            deleteAt: false,
            _id: "624c6ec4fee2fc001cda0232",
            name: "Hoàng Quý Đạt",
            email: "dat9797@gmail.com",
            password:
                "$2a$10$T2q34xgwavjnKdLMgwzqfe88J9ZFVjAYDEIuB6z2dZkDUIseuqNwi",
            phone: "0777787399",
            birthday: "1997-10-29T00:00:00.000Z",
            gender: true,
            address: "120/33a Tôn Thất Hiệp",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1649176995086_95291204_1612156812268904_6759188160556564480_n.jpg",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "624d38bdfee2fc001cda069b",
            name: "Hoàng Quý Đạt",
            email: "dat9898@gmail.com",
            password:
                "$2a$10$Oh9DL3ThoRFpvFrAzLaMYe5NeboAi1THwJeEwgZHNtaIa/aayVOCO",
            phone: "0777787399",
            birthday: "1997-05-04T00:00:00.000Z",
            gender: true,
            address: "120/33a Tôn Thất Hiệp",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1649228670535_lofi-chillhop-raccoon-night-camping.jpg",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "62513b44fee2fc001cda27e5",
            name: "Hoang Ai",
            email: "hoangai161",
            password:
                "$2a$10$AsXk37e61SiEtosuskkF3uaSRPME6GFLpYLStPwLWTAkSepet1R/i",
            phone: "0123456",
            birthday: "1999-12-24T00:00:00.000Z",
            gender: false,
            address: "12 Hoang Dieu",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1649832715775_photo (3).jpg",
        },
        {
            tickets: [],
            deleteAt: false,
            _id: "62513c7cfee2fc001cda27e8",
            name: "Pham Sang",
            email: "sang135",
            password:
                "$2a$10$h2H3hLECk4UnU/CazwtTauX0cGnEHw2VhlxSnb/ZDcc.dhiZ9xwUK",
            phone: "0948881317",
            birthday: "2001-11-06T00:00:00.000Z",
            gender: true,
            address: "123 abc",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1649861010651_photo (2).jpg",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "6252ee3efee2fc001cdb1fea",
            name: "dat",
            email: "dat9797@gmail.com",
            password:
                "$2a$10$Kyou.Okme6KV.DVOdHt4se6gHjCt4uiq7lLZiUi6MieFgj5tjYAIq",
            phone: "0934657867",
            birthday: "1890-11-05T00:00:00.000Z",
            gender: true,
            address: "TPhcm",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1649603293330_Handy-Checklist-for-Linux-Commands (1).png",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "6252f192fee2fc001cdb2021",
            name: "dat",
            email: "dat90@gmail.com",
            password:
                "$2a$10$ZIIcNja3GOsJt89U.EYMh.OyuQlksvyorAtMClD1Vmp/8s1SpI2vO",
            phone: "0934657867",
            birthday: "1890-11-05T00:00:00.000Z",
            gender: true,
            address: "TPhcm",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1649602992655_Handy-Checklist-for-Linux-Commands (1).png",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "6256dabafee2fc001cdb40a9",
            name: "Thái Đặng",
            email: "thai111@gmail.com",
            password:
                "$2a$10$7Ah99dos19hwSmVxT.OsFOJyijaRXFl4ggCna84IsUgV3zjaQFp52",
            phone: "0900900909",
            birthday: "1992-01-04T00:00:00.000Z",
            gender: true,
            address: "Gò Vấp",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1649859912010_278176742_3243223706003738_7620145527974045528_n.png",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "6256f266fee2fc001cdb413f",
            name: "demo123",
            email: "demo123@gmail.com",
            password:
                "$2a$10$wURwlSy4Zir9vzXdJlyrquyJ3McRD6ao9S84Jn1tdZ1Gn68y4yyEW",
            phone: "0777787399",
            birthday: "1997-10-29T00:00:00.000Z",
            gender: true,
            address: "120/330a Tôn Thất Hiệp",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1649865363273_278176742_3243223706003738_7620145527974045528_n.png",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "6256ffb6fee2fc001cdb48ef",
            name: "dat",
            email: "dat97@gmail.com",
            password:
                "$2a$10$jU..2ANIVvZkq7O.fB/RQe11o3lhb27wplBrHM/r4itaWld64lhsW",
            phone: "0934657867",
            birthday: "1890-11-05T00:00:00.000Z",
            gender: true,
            address: "TPhcm",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1649868825787_278176742_3243223706003738_7620145527974045528_n.png",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "62571689fee2fc001cdb4996",
            name: "dathoang",
            email: "dathoang@gmail.com",
            password:
                "$2a$10$3DbYLjM/2hQj4opVBOdo6.quQ/ihjo2R6LIVW5uBjTKEGIxxRPGAm",
            phone: "0777787399",
            birthday: "1890-11-05T00:00:00.000Z",
            gender: true,
            address: "TPhcm",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1649875047462_endgame.png",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "6257c988fee2fc001cdb4dac",
            name: "Nguyễn Phong Kha",
            email: "kha9x0159@gmail.com",
            password:
                "$2a$10$g2tZe0Qf4W9kAB5oH1LH7.4ej6lyOfkx3WpeC7XCa5DS2D69MS/ve",
            phone: "0909876987",
            birthday: "1998-05-11T00:00:00.000Z",
            gender: true,
            address: "191A Chường Trinh Quận 12",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1650794662900_oppo-9svwLNfE2Ts-unsplash.jpg",
        },
        {
            tickets: [],
            deleteAt: false,
            _id: "6257ccb1fee2fc001cdb4dcc",
            name: "mlem",
            email: "mlem@gmail.com",
            password:
                "$2a$10$TVZCK./jys/BI1t1u.nquOWMFS6MMWNbyUbzVNhgHKXMwdC75bNdW",
            phone: "0898480642",
            birthday: "2022-01-04T00:00:00.000Z",
            gender: true,
            address: "mlem",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1649921272057_277975511_1401366140336637_3568101918912636458_n.jpg",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "62581dbdfee2fc001cdb4eff",
            name: "dathoang123456",
            email: "dathoang123456@gmail.com",
            password:
                "$2a$10$WMYQ9xinRiSo5Dv2QTMKO.GEHFiiWj9LPKy96I64c7ROoG.nQD2T2",
            phone: "0777787399",
            birthday: "1890-11-05T00:00:00.000Z",
            gender: true,
            address: "TPhcm",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1651327015383_endgame.png",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "625979c6fee2fc001cdb54a8",
            name: "ý",
            email: "nhuy@gmail.com",
            password:
                "$2a$10$8T5XAXW1BD.PgyyfBesTruOxt2JSrdfdkavWCBoWwetYl1K64BdJ.",
            phone: "123",
            birthday: "2022-04-11T00:00:00.000Z",
            gender: false,
            address: "540 nguyễn kiệm",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1651393570730_avenger.jpg",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "62597a7cfee2fc001cdb54b3",
            name: "ý",
            email: "nhuy@gmail.com",
            password:
                "$2a$10$irxXoYzxO4i4DvcPEcX70e9dtNBq1r9LYRHA133kN.boxI/ArAv7.",
            phone: "123",
            birthday: "2022-04-11T00:00:00.000Z",
            gender: false,
            address: "540 nguyễn kiệm",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1650965409602_download (1).jpg",
        },

        {
            tickets: [
                "6260131cfee2fc001cdb7e76",
                "626017e3fee2fc001cdb7e9e",
                "626017e9fee2fc001cdb7ea2",
                "626017eafee2fc001cdb7ea6",
                "626017ecfee2fc001cdb7eaa",
                "626017edfee2fc001cdb7eae",
                "62610074fee2fc001cdb7f1a",
                "626104a2fee2fc001cdb7f2a",
                "626104affee2fc001cdb7f2e",
                "62610503fee2fc001cdb7f38",
                "626105c1fee2fc001cdb7f42",
                "626105f6fee2fc001cdb7f4c",
                "6261061afee2fc001cdb7f50",
                "6261069ffee2fc001cdb7f5a",
                "62610ebffee2fc001cdb806b",
                "6261156bfee2fc001cdb80a6",
                "626b7fe3fee2fc001cdbc290",
            ],
            deleteAt: false,
            _id: "626012b6fee2fc001cdb7e6a",
            name: "tidun Admin",
            email: "tidunAdmin@",
            password:
                "$2a$10$eJmowCgOBRoRpik0nnQ22O3FMaRUXeMaExydeQuzkLAxlITVmbQpi",
            phone: "0934657867",
            birthday: "1998-05-11T00:00:00.000Z",
            gender: true,
            address: "An Giang",
            type: "ADMIN",
            __v: 17,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1651484927753_minions1.jpg",
        },

        {
            tickets: [
                "627412e6fee2fc001cdc75ac",
                "6274130afee2fc001cdc75b0",
                "62741594fee2fc001cdc75b6",
                "62741697fee2fc001cdc75ba",
                "627416c1fee2fc001cdc75c2",
                "627416cffee2fc001cdc75c6",
                "627416f3fee2fc001cdc75ca",
                "6274173cfee2fc001cdc75ce",
                "62741743fee2fc001cdc75d2",
                "62741744fee2fc001cdc75d6",
                "6274bab0fee2fc001cdcef3a",
                "627554e6fee2fc001cdcf58a",
                "62788837fee2fc001cdd77f4",
            ],
            deleteAt: false,
            _id: "626979f0fee2fc001cdbb773",
            name: "Đ121333",
            email: "test123@gmail.com",
            password:
                "$2a$10$EH7kVLNz64/SM5DPepsHZO.6Gpcxmg9dl3TUTjJgxY48GOdyf.xYG",
            phone: "31212123",
            birthday: "2022-04-01T00:00:00.000Z",
            gender: true,
            address: "HN",
            type: "CLIENT",
            __v: 13,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1653019767747_1032801.jpg",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "626d52e3fee2fc001cdbedcf",
            name: "dathoang123456789",
            email: "dathoang123456789@gmail.com",
            password:
                "$2a$10$2Q46avNmS6DsF9JZFGEVbOVerlCmfVR8K/xBJPCG7y3FaFpp2Qci.",
            phone: "0777787399",
            birthday: "1890-11-05T00:00:00.000Z",
            gender: true,
            address: "TPhcm",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1651393065540_Screenshot from 2022-04-18 21-38-04.png",
        },

        {
            tickets: ["626fa8b0fee2fc001cdc005b"],
            deleteAt: false,
            _id: "626f9300fee2fc001cdbfe44",
            name: "nguyen tran dong",
            email: "dong sun 123",
            password:
                "$2a$10$hqL1CCqI7b7MQx89IbyQWusJX.YCUm54YZqrRShdVeZfvhZPqa82q",
            phone: "12324560987",
            birthday: "1154-01-01T00:00:00.000Z",
            gender: true,
            address: "abcd Ho Chi Minh",
            type: "CLIENT",
            __v: 1,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1651484762148_RS14555_RS14483_iStock-104669275-WAVE-712.jpg",
        },
        {
            tickets: [],
            deleteAt: false,
            _id: "626fa4eefee2fc001cdbffc8",
            name: "dongsun new",
            email: "dong Sun2",
            password:
                "$2a$10$8eCpP.CeGnmrXLf9J25biutzQ81wgeznkVk2WsdzUw8COOMA/LIR2",
            phone: "012365485",
            gender: false,
            address: "4435 Ho Chi Minh",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1651483921700_minions1.jpg",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "6270f438fee2fc001cdc0bd9",
            name: "dathoang123456789",
            email: "dathoang123456789@gmail.com",
            password:
                "$2a$10$4OZOPQhzMqwlDumNlg9jUOODclhm.6OK4I5jbTxfdQmeiO0qrSQbi",
            phone: "0777787399",
            birthday: "1890-11-05T00:00:00.000Z",
            gender: true,
            address: "TPhcm",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1651569826898_endgame.png",
        },

        {
            tickets: [
                "62726b11fee2fc001cdc47a5",
                "62726b23fee2fc001cdc47a9",
                "627b09a0fee2fc001cddf14c",
                "627b09a6fee2fc001cddf150",
                "627b0dc4fee2fc001cddf448",
            ],
            deleteAt: false,
            _id: "62726ad0fee2fc001cdc4772",
            name: "quang",
            email: "dangquang040297@gmail.com",
            password:
                "$2a$10$zeLoR6PZwmunqX6bW828VOmVHlvu8A8iOGZuS2fTCAbXYthGOcYfu",
            phone: "0703237256",
            birthday: "1997-02-04T00:00:00.000Z",
            gender: false,
            address: "29m ba diem",
            type: "CLIENT",
            __v: 5,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1651666191017_Screenshot from 2022-05-03 08-43-55.png",
        },
        {
            tickets: [],
            deleteAt: false,
            _id: "62726d98fee2fc001cdc4903",
            name: "test321",
            email: "test@gmail.com",
            password:
                "$2a$10$dV.F8g7xs864IMbov83cjuklPZ/XPNnUlAEuOBXTffZLJbtIdEHIK",
            phone: "0777787399",
            birthday: "2022-05-24T00:00:00.000Z",
            gender: true,
            address: "120/33a Tôn Thất Hiệp F13,Q11",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1651666349135_Screenshot from 2022-05-01 23-06-26.png",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "62744f5bfee2fc001cdc7869",
            name: "datdemo",
            email: "datdemo97@gmail.com",
            password:
                "$2a$10$dWZ7VSIlXVz/m8B3zfF6meyd0/HbaZ5SnTVQ.axt2Ois8bKiaGS8m",
            phone: "0777787399",
            birthday: "1890-11-05T00:00:00.000Z",
            gender: true,
            address: "TPhcm",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1651790526189_Screenshot from 2022-05-03 11-23-06.png",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "6274588efee2fc001cdc7a1a",
            name: "dat hoang",
            email: "dathoang97852@gmail.com",
            password:
                "$2a$10$4h/cuS1e3O5kLNyY0weGyuHeYfJlKpCebQWmvkIX4BKuqR2XsCMXi",
            phone: "0777787399",
            birthday: "1997-10-29T00:00:00.000Z",
            gender: false,
            address: "120/33a Tôn Thất Hiệp",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1651792057106_endgame.png",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "62745bf4fee2fc001cdc7aa3",
            name: "dat hoang",
            email: "dathoang979779@gmail.com",
            password:
                "$2a$10$R6.hY0bAHF1b9qI5EPsMhuzLy521nSPgReUbZwv/NuBdqRp2L2rzy",
            phone: "0777787399",
            birthday: "1890-11-05T00:00:00.000Z",
            gender: true,
            address: "TPhcm",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1651792899852_endgame.png",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "62745ea3fee2fc001cdc7c12",
            name: "dat",
            email: "dathoang9797@gmail.com",
            password:
                "$2a$10$0gMKNorgDrwA1FYJ0dqMneOu/bCuxmmyJdsTjUDW17I/GGxuu.3qa",
            phone: "0777787399",
            birthday: "1997-10-29T00:00:00.000Z",
            gender: false,
            address: "120/33a Tôn Thất Hiệp",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1651793639402_endgame.png",
        },

        {
            tickets: ["62746679fee2fc001cdc7d08", "6274ae4efee2fc001cdc8214"],
            deleteAt: false,
            _id: "62745ffcfee2fc001cdc7c8b",
            name: "dat hoang",
            email: "dathoang97123@gmail.com",
            password:
                "$2a$10$CyGtD3CZ8u4NIkZCnP6jYecwfTA3uzpdRduKR47fh34dOQki3J3cq",
            phone: "0777787399",
            birthday: "1997-10-29T00:00:00.000Z",
            gender: true,
            address: "120/33a Tôn Thất Hiệp",
            type: "CLIENT",
            __v: 2,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1651793982665_endgame.png",
        },

        {
            tickets: [
                "62789063fee2fc001cdd7a79",
                "62789076fee2fc001cdd7a85",
                "62789100fee2fc001cdd7abc",
                "62789120fee2fc001cdd7ac8",
                "62789132fee2fc001cdd7ad4",
                "6278915dfee2fc001cdd7af4",
                "6278f72cfee2fc001cdd8af2",
            ],
            deleteAt: false,
            _id: "6274bc4cfee2fc001cdcefe3",
            name: "test Dathoang",
            email: "testDathoang97@gmail.com",
            password:
                "$2a$10$L/U3h4qCzLqXxYxdeQLihOKR7fgmfF1bj5im9sbfQBwMasXCIUucW",
            phone: "0777787399",
            birthday: "1890-11-05T00:00:00.000Z",
            gender: true,
            address: "TPhcm",
            type: "CLIENT",
            __v: 7,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1652094899843_testt.png",
        },

        {
            tickets: [
                "627e36befee2fc001cf2f157",
                "62801131fee2fc001cf3af76",
                "6280123afee2fc001cf3af85",
                "62801241fee2fc001cf3af91",
                "62801257fee2fc001cf3af99",
                "6280130dfee2fc001cf3afa3",
                "628014d0fee2fc001cf3afc1",
                "628213cdfee2fc001cf466eb",
                "628213e0fee2fc001cf466ef",
                "628663a4fee2fc001cf556ea",
                "62866518fee2fc001cf5578f",
                "6286656dfee2fc001cf557b8",
                "628665f9fee2fc001cf557bf",
                "6288ec30fee2fc001cf61aa3",
                "628d199ffee2fc001cf6a1ff",
                "628d29b8fee2fc001cf6a244",
                "628d2b3ffee2fc001cf6a2b1",
                "628d2bb3fee2fc001cf6a308",
                "628d2bb7fee2fc001cf6a30f",
                "62a1c8aefee2fc001cf90f3b",
                "62a1c960fee2fc001cf914a1",
                "62a224a1fee2fc001cf925e9",
                "62a9b601fee2fc001cf9d8c7",
                "62a9b611fee2fc001cf9d8e1",
                "62a9b631fee2fc001cf9d915",
                "62a9b640fee2fc001cf9d931",
                "62a9b651fee2fc001cf9d94d",
                "62a9ddd3fee2fc001cf9e12a",
            ],
            deleteAt: false,
            _id: "6274db90fee2fc001cdcf126",
            email: "dsmama96@gmail.com",
            password:
                "$2a$10$kAxCYLY8spts5PUomWGbMe9/MGM35hmWtZFmAO3v5Pjt3ZxCVvCiy",
            phone: "0901461096",
            type: "CLIENT",
            __v: 28,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1654777622588_phim-cua-park-bo-young-parkboyoungzone.jpg",
            address: "191A Chường Trinh Quận 123",
            birthday: "1998-05-10T17:00:00.000Z",
            gender: true,
            name: "Đình Sơn",
        },

        {
            tickets: [
                "627ad45efee2fc001cdde4ae",
                "627addfdfee2fc001cdde5de",
                "627ade0cfee2fc001cdde5eb",
                "627ade5dfee2fc001cdde5f4",
                "627ade66fee2fc001cdde5f8",
                "627ade73fee2fc001cdde605",
                "627ade95fee2fc001cdde612",
                "627adeaefee2fc001cdde61b",
                "627adee5fee2fc001cdde61f",
                "627adef3fee2fc001cdde623",
                "627adef7fee2fc001cdde627",
                "627adfabfee2fc001cdde630",
                "627ae6e6fee2fc001cdde652",
                "627ae9f6fee2fc001cdde663",
                "627aea39fee2fc001cdde670",
            ],
            deleteAt: false,
            _id: "627ad422fee2fc001cdde476",
            name: "test321",
            email: "test321@gmail.com",
            password:
                "$2a$10$rmNDbx0/LOKrILUVQEelN.nng8va.bqRacYYejyDXcuOfHaatSrBW",
            phone: "0777787399",
            birthday: "2022-05-03T00:00:00.000Z",
            gender: true,
            address: "120/33a Tôn Thất Hiệp",
            type: "CLIENT",
            __v: 15,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1652216889660_hero-img-one.jpg",
        },

        {
            tickets: [
                "627e314efee2fc001cf2f09d",
                "627e32cbfee2fc001cf2f0c0",
                "627e3731fee2fc001cf2f185",
                "627e3756fee2fc001cf2f1a3",
                "627e3793fee2fc001cf2f1cc",
                "627f78defee2fc001cf39ca5",
            ],
            deleteAt: false,
            _id: "627baf32fee2fc001cf2c745",
            name: "spiderman",
            email: "spiderman@gmail.com",
            password:
                "$2a$10$u98saDCj4tCU98hhjmLCUOHF140YcrEzQFJ.Vegc/Y.1yqSn/3H8q",
            phone: "0934657867",
            birthday: "1998-05-11T00:00:00.000Z",
            gender: true,
            address: "An Giang",
            type: "ADMIN",
            __v: 6,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1652436955251_noface.jpg",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "627f83d6fee2fc001cf39e2f",
            name: "noname511",
            email: "noname5@gmail.com",
            password:
                "$2a$10$Xl70Bx3bZ209bWY/QtAiXuKBNtt2Ox00/bLM498Y8TayjSO5I/Kf2",
            phone: "0123123",
            birthday: "2022-05-14T00:00:00.000Z",
            gender: true,
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1652524014336_IMG_20190101_103108.jpg",
            address: "HCM123",
        },

        {
            tickets: [
                "628a05f6fee2fc001cf62d34",
                "628a0650fee2fc001cf62d41",
                "628d19e1fee2fc001cf6a21d",
            ],
            deleteAt: false,
            _id: "627fc4cefee2fc001cf3a4d4",
            name: "Mama",
            email: "mama96@gmail.com",
            password:
                "$2a$10$LIp97LiP/OjJLOeb3g8Kgusyuyp9R/FkODpL9gYEXD2t8JfBXJ8NW",
            phone: "0909876987",
            birthday: "1998-05-11T00:00:00.000Z",
            gender: true,
            address: "191A Chường Trinh Quận 12",
            type: "CLIENT",
            __v: 3,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1655910741800_dlwlrma_1___B6XY7BrgOii___.jpg",
        },

        {
            tickets: [
                "62a6b6e7fee2fc001cf991c7",
                "62a7f600fee2fc001cf9a534",
                "62a7f639fee2fc001cf9a573",
                "62a9e3f6fee2fc001cfa5fb7",
                "62ab36bffee2fc001cfa794d",
                "62afe059fee2fc001cfabe6f",
                "62afe95dfee2fc001cfac0d7",
                "62b31a0dfee2fc001cfb356e",
                "62b31ba4fee2fc001cfb3783",
            ],
            deleteAt: false,
            _id: "6283de20fee2fc001cf4fc1e",
            name: "Do Van Nhat",
            email: "dovannhatdn94@gmail.com",
            password:
                "$2a$10$tFdp6VM/5JuJPHxD2i89Ve4TqqIwXi2o2KCP2WRUS7cacoagRyJMq",
            phone: "0905560731",
            birthday: "1994-10-01T00:00:00.000Z",
            gender: true,
            address: "211/42 Nguyễn Văn Thoại",
            type: "CLIENT",
            __v: 9,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1655971485496_Milk Cats.jpg",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "628b36d3fee2fc001cf63b29",
            name: "test Dathoang",
            email: "testadminDathoang97@gmail.com",
            password:
                "$2a$10$Xa5Dp0zKZVs9yn4W6gkj1O8W1f3hWC.HKgj5si2.jhXETZGcew8lC",
            phone: "0777787399",
            birthday: "1890-11-05T00:00:00.000Z",
            gender: true,
            address: "TPhcm",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1653290910555_95291204_1612156812268904_6759188160556564480_n.jpg",
        },

        {
            tickets: ["628b377bfee2fc001cf63b6b"],
            deleteAt: false,
            _id: "628b374ffee2fc001cf63b34",
            name: "testuser9797@gmail.com",
            email: "testuser9797@gmail.com",
            password:
                "$2a$10$JaiZiIhtET/IWwHXyaDD1OrKVs5DQxdQGw64r5vkNb4wzw/g20jhe",
            phone: "0777787399",
            birthday: "1997-10-29T00:00:00.000Z",
            gender: true,
            address: "120/33a Tôn Thất Hiệp F13,Q11",
            type: "CLIENT",
            __v: 1,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1653290859978_cinema_ticket_booking_dark.png",
        },

        {
            tickets: ["628b9191fee2fc001cf64cda"],
            deleteAt: false,
            _id: "628b9161fee2fc001cf64c7e",
            name: "testdat97",
            email: "testdat97@gmail.com",
            password:
                "$2a$10$it/k6WNEijmXQoIal0EI4u8wLOBpVmCgwN146kJlbUIBHvcvXjKwe",
            phone: "0777787399",
            birthday: "1997-10-29T00:00:00.000Z",
            gender: true,
            address: "120/33a Tôn Thất Hiệp F13,Q11",
            type: "CLIENT",
            __v: 1,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1653313909022_cinema_ticket_booking_dark.png",
        },

        {
            tickets: ["628b9390fee2fc001cf64eae"],
            deleteAt: false,
            _id: "628b933efee2fc001cf64e56",
            name: "Hoang Quy Dat",
            email: "hoangquydat@gmail.com",
            password:
                "$2a$10$V7ORYizjwNCJjKEeCZ9xHu2wT7a2z7zbCoC71cJh0uH6UcPDDv3ka",
            phone: "0777787399",
            birthday: "1997-10-29T00:00:00.000Z",
            gender: true,
            address: "120/33a Tôn Thất Hiệp F13,Q11",
            type: "CLIENT",
            __v: 1,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1653314419455_95291204_1612156812268904_6759188160556564480_n.jpg",
        },
        {
            tickets: [],
            deleteAt: false,
            _id: "628b93c1fee2fc001cf64f00",
            name: "test Dathoang",
            email: "testAdminDathoang9797@gmail.com",
            password:
                "$2a$10$XYSI4GoKsr/0eT7iXvLJWuFwPI/bIH/hgmYB4x02DLWfq//wH5yPm",
            phone: "0777787399",
            birthday: "1890-11-05T00:00:00.000Z",
            gender: true,
            address: "TPhcm",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1653314515414_95291204_1612156812268904_6759188160556564480_n.jpg",
        },

        {
            tickets: [
                "62a15655fee2fc001cf90842",
                "62a158d4fee2fc001cf90855",
                "62a158e3fee2fc001cf90859",
                "62a160ebfee2fc001cf908a5",
                "62a161b0fee2fc001cf908d2",
                "62a161bbfee2fc001cf908d6",
                "62a161c7fee2fc001cf908da",
                "62a16316fee2fc001cf9091e",
                "62a1656afee2fc001cf90979",
                "62a165b8fee2fc001cf90982",
                "62a165c1fee2fc001cf9098c",
                "62a1785bfee2fc001cf90aa5",
                "62a17974fee2fc001cf90ab6",
                "62a17a67fee2fc001cf90ac6",
                "62a17a9efee2fc001cf90ad5",
                "62a17aa4fee2fc001cf90ad9",
                "62a17abbfee2fc001cf90ae3",
                "62a17b28fee2fc001cf90af4",
                "62a17d03fee2fc001cf90b38",
                "62a17d13fee2fc001cf90b44",
                "62a17d17fee2fc001cf90b48",
                "62a17d83fee2fc001cf90b5e",
                "62a17d93fee2fc001cf90b6a",
                "62a18f05fee2fc001cf90cd8",
                "62a1930dfee2fc001cf90d2a",
                "62b14e9efee2fc001cfade72",
                "62b17620fee2fc001cfadfad",
            ],
            deleteAt: false,
            _id: "629091b1fee2fc001cf7588a",
            name: "hieuhien123",
            email: "hieuhien@gmail.com",
            password:
                "$2a$10$TPtLbFe2oarjmui5rj/oeeAMFUdMBW4Kr/Ax2AcLQiNrPQNbtDFy.",
            phone: "000000",
            birthday: "2022-04-30T17:00:00.000Z",
            gender: true,
            address: "cmt8",
            type: "ADMIN",
            __v: 27,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1654227151940_535-536x354.jpg",
        },
        {
            tickets: [],
            deleteAt: false,
            _id: "62949348fee2fc001cf7f6fa",
            name: "123123123",
            email: "123123123",
            password:
                "$2a$10$h4OpFlRZIODOh8rXimdUNeDihkG24HHLMO4.LxlVaa.mOVQ1rFaFy",
            phone: "123123123",
            birthday: "1970-01-02T10:12:03.123Z",
            gender: true,
            address: "123123123",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1654322358797_DAR_ape.png",
        },
        {
            tickets: ["6294a337fee2fc001cf7fd98"],
            deleteAt: false,
            _id: "6294a2edfee2fc001cf7fc87",
            name: "Johny Vu",
            email: "johnyvu@gmail.com",
            password:
                "$2a$10$VmThjd8ZLtcqudxrQ9.NruV7KZdImrHcGCKem82RJEJ06KANPwOWu",
            phone: "0123123123",
            birthday: "2022-05-24T00:00:00.000Z",
            gender: true,
            address: "Dong Nai",
            type: "CLIENT",
            __v: 1,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1653908247528_sunwukong.jpg",
        },
        {
            tickets: [
                "62a4bc3dfee2fc001cf96e85",
                "62a6097efee2fc001cf98ada",
                "62a60c12fee2fc001cf98b1a",
                "62a60c99fee2fc001cf98b24",
                "62a60d8efee2fc001cf98b42",
                "62a60eeafee2fc001cf98b8d",
            ],
            deleteAt: false,
            _id: "62a4bc1ffee2fc001cf96e7b",
            name: "Do Duy Thinh",
            email: "thinhtest@gmail.com",
            password:
                "$2a$10$qhUDqmz/Xig6SCdcqZYRue5.i.vge7GhYP67GCruK1cSQFyU.tMEu",
            phone: "0968179530",
            birthday: "1999-09-19T00:00:00.000Z",
            gender: true,
            address: "HCM",
            type: "CLIENT",
            __v: 6,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1654963296131_736879.png",
        },
        {
            tickets: [
                "62a5618ffee2fc001cf97f6e",
                "62a56196fee2fc001cf97f72",
                "62a56199fee2fc001cf97f76",
            ],
            deleteAt: false,
            _id: "62a55ebffee2fc001cf97b49",
            name: "Tran Ngoc Bao Binh",
            email: "tranngocbaobinh@gmail.com",
            password:
                "$2a$10$jfmfi8FTjEC3QI1KQCIGLuyNX7dbfAEEtu23h9hh3AmU1N/Z8xIce",
            phone: "0123456789",
            birthday: "2022-06-14T00:00:00.000Z",
            gender: true,
            address: "123",
            type: "CLIENT",
            __v: 3,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1655004985750_heroImgOne.d825d7d1a6d9c90b5df1.jpg",
        },

        {
            tickets: [
                "62aa087dfee2fc001cfa613e",
                "62aa0b92fee2fc001cfa61ab",
                "62af58bcfee2fc001cfab38d",
                "62af58d4fee2fc001cfab3b1",
            ],
            deleteAt: false,
            _id: "62aa0839fee2fc001cfa6123",
            name: "Do Duy Thinh",
            email: "thinhtest1@gmail.com",
            password:
                "$2a$10$M02nKs6ag1gvAUxyOQAHnu7ZqDj49c2VE9rmOqpUg1IZV0jNWtQq2",
            phone: "0968179530",
            birthday: "1999-09-19T00:00:00.000Z",
            gender: true,
            address: "HCM",
            type: "CLIENT",
            __v: 4,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1655310434178_1118057.png",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "62ab4aa4fee2fc001cfa7b0d",
            name: "Do Duy Thinh",
            email: "testadmin1999@gmail.com",
            password:
                "$2a$10$ZEttYK6z/RySUSCa4ptuEuVqI9k3WcGIfeEiqkPkTr7pTht1kRXpG",
            phone: "0968179530",
            birthday: "1999-09-19T00:00:00.000Z",
            gender: true,
            address: "HCM",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1655655551720_973123.jpg",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "62ae881ffee2fc001cfa9cf0",
            name: "Trung Tam Thuong Mai",
            email: "babygirl@gmail.com",
            password:
                "$2a$10$VQ1TRqYb1dx53CoeoYMAp.xyvOBIvNdW1NTyLWdc.2Uo1iFu7eM8S",
            phone: "21341241241",
            birthday: "2022-06-09T00:00:00.000Z",
            gender: true,
            address: "1 Ba Dingh",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1655693249175_trai_nghiem_thuc_te.jpg",
        },

        {
            tickets: ["62b41e4bfee2fc001cfb5d1b"],
            deleteAt: false,
            _id: "62b31fa4fee2fc001cfb3a16",
            name: "hainamtest",
            email: "hainamkt123@gmail.com",
            password:
                "$2a$10$BhlfaJOQZuGryUAREPIVSeuqHI01gdv5J69tVa4QEru15M40xF3U2",
            phone: "091648536",
            birthday: "1994-12-27T00:00:00.000Z",
            gender: true,
            address: "89 phong hoa",
            type: "CLIENT",
            __v: 1,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1655974437163_14232427_656318951192600_1952639165739731918_n.jpg",
        },
        {
            tickets: ["62b3f171fee2fc001cfb53a0"],
            deleteAt: false,
            _id: "62b328e3fee2fc001cfb3d70",
            name: "Linh",
            email: "dovanlinh@gmail.com",
            password:
                "$2a$10$9HF3adPclaQBCbuy6YIEk.4gkMmIeHYTqxLnw3sKyCBtsjeLd01aO",
            phone: "123456",
            birthday: "1994-10-01T00:00:00.000Z",
            gender: true,
            address: "211/42 Nguyễn Văn Thoại",
            type: "CLIENT",
            __v: 1,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1655909401883_Milk Cats.jpg",
        },
        {
            tickets: [],
            deleteAt: false,
            _id: "62b429b0fee2fc001cfb63e8",
            name: "ngocthach",
            email: "ngocthach@gmail.com",
            password:
                "$2a$10$1chxdSDIAKPOJ1rYdozcAuXomjHK4kXoQ5jePUKTLezmzLLJBGWX6",
            phone: "0913468536",
            birthday: "2000-05-15T00:00:00.000Z",
            gender: true,
            address: "Admin",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1655989953963_ironman.jpg",
        },
        {
            tickets: [],
            deleteAt: false,
            _id: "62b43616fee2fc001cfb6605",
            name: "admintest",
            email: "admintest123@gmail.com",
            password:
                "$2a$10$mRMgPvoqCTQDQJajvjiQ7uyR1nPrdp40X2nf01C5u9wcNS927LBR2",
            phone: "0265489813",
            birthday: "1992-11-30T00:00:00.000Z",
            gender: true,
            address: "admin",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1655979098142_DeMaiTinh.jpg",
        },

        {
            tickets: [],
            deleteAt: false,
            _id: "62b43ea2fee2fc001cfb67e5",
            name: "Việt Cường",
            email: "vietcuong@gmail.com",
            password:
                "$2a$10$7odjq7W7fviss4A0o43NeuDZew8R3FBBdutBRhWCrZqWn2zlntaRW",
            phone: "0265413978",
            birthday: "1986-11-24T00:00:00.000Z",
            gender: true,
            address: "admin",
            type: "ADMIN",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1655980679501_loki.jpg",
        },
        {
            tickets: [],
            deleteAt: false,
            _id: "62b442f6fee2fc001cfb687e",
            name: "test",
            email: "nguoidung@gmail.com",
            password:
                "$2a$10$B7bf6LKVoacp/YZo8sI6Be6H9mp3.fj5TxlNIXz0WT60K7gk5Uh46",
            phone: "0258741369",
            birthday: "1994-08-15T00:00:00.000Z",
            gender: true,
            address: "86 quang trung",
            type: "CLIENT",
            __v: 0,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1655980837972_Dune.jpg",
        },
        {
            tickets: ["62b463a4fee2fc001cfb6b8e"],
            deleteAt: false,
            _id: "62b460effee2fc001cfb6b64",
            name: "Hồ Thanh Sơn",
            email: "thanhson@gmail.com",
            password:
                "$2a$10$xtBuIPZ8l4SzVG6pJh69NeKdEINYrPsxv6ygFwrJqJc8Ohuvax/ZS",
            phone: "113113",
            birthday: "1998-08-11T00:00:00.000Z",
            gender: true,
            address: "Da Nang",
            type: "CLIENT",
            __v: 1,
            avatar: "https://airbnb.cybersoft.edu.vn/public/images/avatar/1655988615405_133881432_1019863125200088_1784521994097247833_n.jpg",
        },
    ];

    const onSubmit = (d) => {
        alert(JSON.stringify(d));
    };

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (
        dataIndex: DataIndex,
    ): ColumnType<RootObject> => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Tìm ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(
                            selectedKeys as string[],
                            confirm,
                            dataIndex,
                        )
                    }
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(
                                selectedKeys as string[],
                                confirm,
                                dataIndex,
                            )
                        }
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const columns: ColumnsType<RootObject> = [
        {
            title: "Id",
            dataIndex: "_id",
            key: "_id",
            width: "20%",

            ...getColumnSearchProps("_id"),
            render: (id) => <p className="font-semibold w-[100px]">{id}</p>,
        },

        {
            title: "Họ tên",
            dataIndex: "name",
            key: "name",
            width: "30%",
            ...getColumnSearchProps("name"),
            render: (name) => <a>{name}</a>,
        },

        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            width: "20%",
            render: (avatar) => (
                <Space size="middle">
                    <img src={avatar} alt="image" width="50px" height="50px" />
                    <a>Đổi</a>
                </Space>
            ),
        },

        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "20%",
            ...getColumnSearchProps("email"),
            render: (email) => (
                <p className="font-semibold w-[100px]">{email}</p>
            ),
        },

        {
            title: "SĐT",
            dataIndex: "phone",
            key: "phone",
            width: "20%",
            ...getColumnSearchProps("phone"),
        },

        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            width: "20%",
            ...getColumnSearchProps("address"),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ["descend", "ascend"],
            render: (address) => (
                <p className="font-semibold w-[150px]">{address}</p>
            ),
        },

        {
            title: "Vai trò",
            key: "type",
            dataIndex: "type",
            width: "20%",
            ...getColumnSearchProps("type"),
            render: (type) => <p className="p-4 font-semibold">{type}</p>,
        },

        {
            title: "",
            key: "action",
            width: "30%",
            render: (_, record) => (
                <Space size="middle" className="w-[180px]">
                    <a>Chi tiết</a>
                    <a>Chỉnh sửa</a>
                    <a>Xóa</a>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="flex p-6 ">
                <PlusCircleIcon className="w-6 h-6 mr-2 cursor-pointer" />
                <span
                    className="text-lg text-black hover:underline cursor-pointer"
                    onClick={() => {
                        setVisible(true);
                    }}
                >
                    Thêm quản trị viên
                </span>
            </div>

            <div className="pb-10">
                <Table columns={columns} dataSource={dataFetch} />
            </div>

            <Modal
                scroll
                closeButton
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                width="700px"
                className=""
                {...bindings}
            >
                <Modal.Header className="block text-xl">
                    Thêm quản trị viên
                </Modal.Header>
                <Modal.Body>
                    <form className="form p-6" onSubmit={onSubmit}>
                        <div className="flex flex-col justify-between ">
                            <label className="pb-4">
                                <div className="">
                                    <div>
                                        <p className="text-base">Email</p>
                                    </div>
                                    <div className="rounded-lg ">
                                        <input
                                            {...register("email", {
                                                required:
                                                    "Email không được để trống",
                                                pattern: {
                                                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message:
                                                        "Email không đúng định dạng",
                                                },
                                            })}
                                            required
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="abc@gmail.com"
                                            className=" text-base w-full  border border-gray-500 md:text-left text-center p-4 focus:border-black focus:border-2"
                                        ></input>
                                    </div>
                                    {errors.email && (
                                        <div className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                            <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                            {errors.email.message}
                                        </div>
                                    )}
                                </div>
                            </label>

                            <label className="pb-4">
                                <div className="">
                                    <div>
                                        <p className="text-base">Mật khẩu</p>
                                    </div>
                                    <div className="rounded-lg">
                                        <input
                                            {...register("password", {
                                                required:
                                                    "Bạn chưa nhập mật khẩu",
                                                minLength: {
                                                    value: 8,
                                                    message:
                                                        "Mật khẩu phải có ít nhất 8 ký tự",
                                                },

                                                pattern: {
                                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/i,
                                                    message:
                                                        "Mật khẩu phải có ít nhất 1 kí tự in hoa, 1 kí tự thường, 1 kí tự số và 1 kí tự đặc biệt",
                                                },
                                            })}
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder=""
                                            required
                                            className="text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black"
                                        ></input>
                                    </div>
                                    {errors.password && (
                                        <div className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                            <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                            {errors.password.message}
                                        </div>
                                    )}
                                </div>
                            </label>

                            <label className="pb-4">
                                <div className="">
                                    <div>
                                        <p className="text-base">
                                            Nhập lại mật khẩu
                                        </p>
                                    </div>
                                    <div className="rounded-lg">
                                        <input
                                            {...register("confirmPassword", {
                                                required:
                                                    "Bạn chưa nhập mật khẩu xác nhận",
                                                validate: (value) =>
                                                    value ===
                                                        newPassword.current ||
                                                    "Mật khẩu xác nhận phải giống mật khẩu đặt trước đó",
                                            })}
                                            required
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder=""
                                            className=" text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black "
                                        ></input>
                                    </div>
                                    {errors.confirmPassword && (
                                        <div className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                            <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                            {errors.confirmPassword.message}
                                        </div>
                                    )}
                                </div>
                            </label>

                            <label className="pb-4">
                                <div className="">
                                    <div>
                                        <p className="text-base">Họ tên</p>
                                    </div>
                                    <div className="rounded-lg">
                                        <input
                                            {...register("name", {
                                                required: "Bạn chưa nhập tên",

                                                pattern: {
                                                    value: /^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i,
                                                    message:
                                                        "Tên không được chứa ký tự đặc biệt và số",
                                                },
                                            })}
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Trần Văn A"
                                            className=" text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black "
                                        ></input>
                                    </div>
                                    {errors.name && (
                                        <div className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                            <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                            {errors.name.message}
                                        </div>
                                    )}
                                </div>
                            </label>

                            <div className="flex pb-4">
                                <label className="pb-4  flex-grow">
                                    <div className="">
                                        <div>
                                            <p className="text-base">
                                                Ngày sinh
                                            </p>
                                        </div>
                                        <div className="rounded-lg">
                                            <input
                                                {...register("birthday", {
                                                    required:
                                                        "Ngày sinh không được để trống",
                                                    pattern: {
                                                        value: /\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])*/,
                                                        message:
                                                            "Ngày sinh chưa đúng định dạng",
                                                    },
                                                })}
                                                required
                                                id="birthday"
                                                name="birthday"
                                                type="text"
                                                placeholder="2001/1/21"
                                                className=" text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black "
                                            ></input>
                                        </div>
                                        {errors.birthday && (
                                            <div className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                                <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                                {errors.birthday.message}
                                            </div>
                                        )}
                                    </div>
                                </label>

                                <label className="pb-4 flex-grow">
                                    <div className="">
                                        <div>
                                            <p className="text-base">
                                                Giới tính{" "}
                                            </p>
                                        </div>
                                        <div className="rounded-lg flex justify-between">
                                            <select
                                                {...register("gender")}
                                                className=" text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black "
                                            >
                                                <option value="true">
                                                    Nam
                                                </option>
                                                <option value="false">
                                                    Nữ
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            <label className="pb-4 flex-grow">
                                <div className="">
                                    <div>
                                        <p className="text-base">Địa chỉ </p>
                                    </div>
                                    <div className="rounded-lg">
                                        <input
                                            {...register("address", {
                                                required:
                                                    "Bạn chưa điền địa chỉ",
                                            })}
                                            required
                                            id="address"
                                            name="address"
                                            type="text"
                                            placeholder="12/3 Đường A, Phường B, Quận C, Thành Phố D"
                                            className=" text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black "
                                        ></input>
                                    </div>
                                    {errors.address && (
                                        <div className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                            <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                            {errors.address.message}
                                        </div>
                                    )}
                                </div>
                            </label>

                            <label className="pb-4">
                                <div className="">
                                    <div>
                                        <p className="text-base">
                                            Số điện thoại
                                        </p>
                                    </div>
                                    <div className="rounded-lg">
                                        <input
                                            {...register("phoneNumber", {
                                                required:
                                                    "Số điện thoại không được để trống",

                                                pattern: {
                                                    value: /^[0-9]*$/,
                                                    message:
                                                        "Số điện thoại không đúng định dạng",
                                                },

                                                maxLength: {
                                                    value: 10,
                                                    message:
                                                        "Số điện thoại phải có 10 số",
                                                },

                                                minLength: {
                                                    value: 10,
                                                    message:
                                                        "Số điện thoại phải có 10 số",
                                                },
                                            })}
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="tel"
                                            placeholder="0123456789"
                                            className=" text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black "
                                        ></input>
                                    </div>
                                    {errors.phoneNumber && (
                                        <div className="text-red-800 font-medium text-xs my-4 p-2 border border-red-500 bg-red-300 w-max rounded-lg flex">
                                            <ExclamationCircleIcon className="w-4 h-4 mr-1 self-center" />
                                            {errors.phoneNumber.message}
                                        </div>
                                    )}
                                </div>
                            </label>

                            {/* <label className="pb-4 flex-grow">
                                        <div className="">
                                            <div>
                                                <p className="text-base">
                                                    vị trí{" "}
                                                    
                                                </p>
                                            </div>
                                            <div className="rounded-lg flex justify-between">
                                            <input
                                                {...register("type", {
                                                    required:
                                                        "Bạn chưa điền vị trí",
                                                })}
                                                required
                                                id="type"
                                                name="type"
                                                type="text"
                                                placeholder="12/3 Đường A, Phường B, Quận C, Thành Phố D"
                                                className=" text-base w-full  border border-gray-500 md:text-left text-center p-4 active:outline-black "
                                            ></input>
                                            </div>
                                        </div>
                                    </label> */}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-[#e61e4d] to-[#d70466] w-full rounded-xl py-3 mt-5 text-white active:bg-pink-500 hover:shadow-xl active:scale-90 transition duration-150 font-semibold"
                                onClick={onSubmit}
                            >
                                {isLoading ? (
                                    <Loading type="default" color="white" />
                                ) : (
                                    "Xác nhận"
                                )}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Users;

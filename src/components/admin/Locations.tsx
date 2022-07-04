import { PlusCircleIcon } from "@heroicons/react/solid";
import React, { useRef, useState } from "react";

import { Table, Tag, Space, Button, Input } from "antd";
import type { ColumnsType, ColumnType } from "antd/lib/table";
import "antd/dist/antd.css";

import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import type { FilterConfirmProps } from "antd/lib/table/interface";

import Highlighter from "react-highlight-words";

interface DataType {
    deleteAt: boolean;
    _id: string;
    name: string;
    province: string;
    country: string;
    valueate?: number;
    __v: number;
    image: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: "Id",
        dataIndex: "locationId",
        key: "locationId",
    },
    {
        title: "Địa điểm",
        dataIndex: "name",
        key: "name",
        // render: (text) => <a>{text}</a>,
    },
    {
        title: "Phường",
        dataIndex: "province",
        key: "province",
        // render: (text) => <a>{text}</a>,
    },
    {
        title: "Khu vực",
        dataIndex: "country",
        key: "country",
    },
    {
        title: "Hình ảnh",
        key: "image",
        dataIndex: "image",
        render: (image) => (
            <Space size="middle">
                <img src={image} alt="image" width="50px" height="50px" />
                <a>Chỉnh sửa</a>
            </Space>
        ),
    },

    {
        title: "",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <a>Chi tiết</a>
                <a>Chỉnh sửa</a>
                <a>Xóa</a>
            </Space>
        ),
    },
];

type DataIndex = keyof DataType;

const data: DataType[] = [
    {
        "deleteAt": false,
        "_id": "6169521befe193001c0a5b33",
        "name": "Khu phố tây Trần Phú",
        "province": "Nha Trang",
        "country": "Việt Nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1655979477442_1655326528372_1636703587023_ve-dep-bien-nha-trang.jpg"
    },
    {
        "deleteAt": false,
        "_id": "616952c3efe193001c0a5b46",
        "name": "Bến Ninh Kiều",
        "province": "Thành phố Đà Nẵng",
        "country": "Việt Nam",
        "valueate": 10,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1651304740121_1636703505621_cantho.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61695375efe193001c0a5b4c",
        "name": "Biển Long Hải",
        "province": "Tỉnh Bà Rịa - Vũng Tàu",
        "country": "Việt Nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1652953227313_a.jpg"
    },
    {
        "deleteAt": false,
        "_id": "616953dfefe193001c0a5b4e",
        "name": "Đảo Phú Quốc",
        "province": "Phú Quốc",
        "country": "viet nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1636703654156_phuquoc.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61695437efe193001c0a5b51",
        "name": "Cầu Sông Hàn",
        "province": "Đà Nẵng",
        "country": "viet nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1651290776928_shutterstock-1169930359-4299-1593590420.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61697f49efe193001c0a5b67",
        "name": "Quảng Trường Lâm Viên 789",
        "province": "Đà Lạt",
        "country": "Việt Nam",
        "valueate": 10,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1634304504284_quangtruonglamvien.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61697f97efe193001c0a5b69",
        "name": "Chùa Cầu Hội An",
        "province": "Hội An",
        "country": "viet nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1651291378053_40692162_9381807_image_a_23_1616-1616460198504.jpg"
    },
    {
        "deleteAt": false,
        "_id": "617f80c5df826c001ce750c9",
        "name": "Hồ Hoàn Kiếm",
        "province": "Hà Nội",
        "country": "Việt Nam",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1635746036454_hanoi.jpg"
    },
    {
        "deleteAt": false,
        "_id": "617fd692df826c001ce757fa",
        "name": "Khu du lịch sinh thái Hồng Hào",
        "province": "Bến tre",
        "country": "viet nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1640955482246_matsumoto-castle-wallpaper-(5)-by-twalls.jpg"
    },
    {
        "deleteAt": false,
        "_id": "617fe8acd1aba6001cef4901",
        "name": "Khu du lịch Suối Mơ",
        "province": "Vũng Tàu",
        "country": "viet nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1651485134187_jrr5g9zaruof4j1ue3we.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61837feed1aba6001cef59e9",
        "name": "Khu du lịch sinh thái Hồng Hào",
        "province": "Vinh Long",
        "country": "viet nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1652754589804_phuQuoc.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61838412d1aba6001cef59fd",
        "name": "Khu du lịch sinh thái Hồng Hào",
        "province": "Vĩnh Long",
        "country": "Việt Nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1655326916908_khudulichhoanghao-vinhlong.jpg"
    },
    {
        "deleteAt": false,
        "_id": "618bbe02d1aba6001cefaea0",
        "name": "Thành phố Vĩnh Long",
        "province": "Vĩnh Lộc",
        "country": "VN",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1640955435783_20179921395_5031bdeee5_o.jpg"
    },
    {
        "deleteAt": false,
        "_id": "618ce851d1aba6001cefb293",
        "name": "Khu du lịch sinh thái Tam Bình",
        "province": "Vĩnh Long",
        "country": "viet nam",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1641022899942_osaka-castle-wallpapers-(8)-by-twalls.jpg"
    },
    {
        "deleteAt": false,
        "_id": "618e0ed6d1aba6001cefb731",
        "name": "Vịnh Vĩnh Hy",
        "province": "Ninh Thuận",
        "country": "VN",
        "valueate": 10,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1636702668612_ninhthuan.jpg"
    },
    {
        "deleteAt": false,
        "_id": "618e0edbd1aba6001cefb734",
        "name": "Vịnh Vĩnh Hy",
        "province": "Ninh Thuận",
        "country": "Việt Nam",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1641022891498_osaka-castle-wallpapers-(5)-by-twalls.jpg"
    },
    {
        "deleteAt": false,
        "_id": "618e0f6ed1aba6001cefb73e",
        "name": "Khu du lịch Làng Bè",
        "province": "Tiền Giang",
        "country": "Việt Nam",
        "valueate": 8.5,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1653290111395_cinema_ticket_booking_dark.png"
    },
    {
        "deleteAt": false,
        "_id": "618e0f99d1aba6001cefb744",
        "valueate": 8,
        "country": "Việt Nam",
        "province": "Tiền Giang",
        "name": "Khu du lịch Cái Bè",
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1641022906974_tokyo-wallpapers-(10)-by-twalls.jpg"
    },
    {
        "deleteAt": false,
        "_id": "618e103fd1aba6001cefb74d",
        "province": "Bình Định",
        "name": "Khu du lịch Kỳ co",
        "country": "Việt Nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1636703862899_eo-gio-bay.jpg"
    },
    {
        "deleteAt": false,
        "_id": "618e2e8bd1aba6001cefb9f4",
        "name": "Khu du lịch sinh thái Tam Bình",
        "province": "Vĩnh Long",
        "country": "viet nam",
        "valueate": 10,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1641022921454_tokyo-wallpapers-(8)-by-twalls.jpg"
    },
    {
        "deleteAt": false,
        "_id": "618e3333d1aba6001cefba78",
        "name": "gg",
        "province": "ggg",
        "country": "66666",
        "valueate": 99,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1636709187355_0e25fd2198c569dc4c406a510b0a59c3.jpg"
    },
    {
        "deleteAt": false,
        "_id": "618e6cb2d1aba6001cefbb54",
        "name": "Bản Cát Cát",
        "province": "SaPa",
        "country": "VN",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1636724167711_chup-anh-sapa.jpg"
    },
    {
        "deleteAt": false,
        "_id": "618e71a4d1aba6001cefbb86",
        "name": "f",
        "province": "ffggggggggggg",
        "country": "ff",
        "valueate": 7,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1636725175266_0e25fd2198c569dc4c406a510b0a59c3.jpg"
    },
    {
        "deleteAt": false,
        "_id": "618e73a4d1aba6001cefbba7",
        "name": "d",
        "country": "d",
        "province": "dyyy",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1636725688882_0e25fd2198c569dc4c406a510b0a59c3.jpg"
    },
    {
        "deleteAt": false,
        "_id": "618f60cdd1aba6001cefbf49",
        "name": "Vịnh Hạ Long",
        "province": "Quảng Ninh",
        "country": "VN",
        "valueate": 10,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1636786530840_halongg.jpg"
    },
    {
        "deleteAt": false,
        "_id": "619078d5d1aba6001cefc1ce",
        "province": "Kiên Giang",
        "country": "VN",
        "valueate": 10,
        "name": "Quần đảo Nam Du",
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1636858118366_nam_du_islands.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61987fe2d1aba6001ceff60d",
        "name": "Khu du lịch sinh thái Hồng Hào",
        "province": "Bến tre",
        "country": "viet nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1641022834618_osaka-castle-wallpapers-(8)-by-twalls.jpg"
    },
    {
        "deleteAt": false,
        "_id": "619f0830d1aba6001cf01409",
        "name": "TP. trà vinh",
        "province": "Trà vinh",
        "country": "VN",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1637812301244_halongg.jpg"
    },
    {
        "deleteAt": false,
        "_id": "619f0861d1aba6001cf01415",
        "name": "TP. trà vinh",
        "province": "Trà vinh",
        "country": "VN",
        "valueate": 10,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1641022845413_yokohama-wallpaper-(13)-by-twalls.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61a08cffd1aba6001cf02484",
        "name": "ttt",
        "province": "ttt",
        "country": "ttt",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1637911817789_0e25fd2198c569dc4c406a510b0a59c3.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61a3abb8d1aba6001cf03343",
        "name": "Núi Bà Đen",
        "province": "Bà Rịa",
        "country": "Việt Nam",
        "valueate": 7,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1641022856226_tokyo-wallpapers-(30)-by-twalls.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61a57606d1aba6001cf03ee4",
        "name": "ben long chau",
        "province": "chau long",
        "country": "vn",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1641022813212_tokyo-wallpapers-(29)-by-twalls.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61a6250bd1aba6001cf040ed",
        "__v": 0,
        "country": "3",
        "name": "2",
        "province": "2",
        "valueate": 8,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1641022751995_osaka-castle-wallpapers-(3)-by-twalls.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61a63934d1aba6001cf04243",
        "name": "minhlongtranthi",
        "province": "Bà Rịa",
        "country": "Việt Nam",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1641022797883_tokyo-wallpapers-(20)-by-twalls.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61a63b27d1aba6001cf0428b",
        "name": "long tan",
        "province": "chau long",
        "country": "Việt Nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1641022784150_tokyo-wallpapers-(11)-by-twalls.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61a63dbcd1aba6001cf042dd",
        "name": "minhlongtranthi",
        "province": "Bà Rịa",
        "country": "Việt Nam",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1641022776303_tokyo-wallpapers-(6)-by-twalls.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61c5df62d1aba6001cf0cbfc",
        "name": "HCC",
        "province": "Hồ Chí Minh",
        "country": "Vietnam",
        "valueate": 1,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1641022743474_matsumoto-castle-wallpaper-(5)-by-twalls.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61cd4c69fee2fc001ccf709c",
        "name": "Ben Ninh Kieu",
        "province": "Can Tho",
        "country": "Viet Nam",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1640923785813_ben ninh kieu.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61cd4dfcfee2fc001ccf709e",
        "name": "Dam Doi",
        "province": "Ca Mau",
        "country": "Viet Nam",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1655969188744_Dune.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61cddd99fee2fc001ccf74d8",
        "name": "Hà Nội",
        "province": "Hà Nội",
        "country": "Việt Nam",
        "valueate": 10,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1655988321352_hanoi.jpg",
        "__v": 0
    },
    {
        "deleteAt": false,
        "_id": "61cde1e2fee2fc001ccf74e7",
        "name": "Hà Nội",
        "province": "Hà Nội",
        "country": "Việt Nam",
        "valueate": 10,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1640882681019_15092021vthuy556.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61cde2dbfee2fc001ccf74ed",
        "name": "Vĩnh Long",
        "province": "Vĩnh Long",
        "country": "Việt Nam",
        "valueate": 7,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1640956330755_matsumoto-castle-wallpaper-(3)-by-twalls.jpg"
    },
   
   
    {
        "deleteAt": false,
        "_id": "61cdf84dfee2fc001ccf75a7",
        "name": "Bãi biển Long Biên",
        "province": "Long Biên",
        "country": "Việt Nam",
        "valueate": 10,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1640956395683_osaka-castle-wallpapers-(6)-by-twalls.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61cdf8e0fee2fc001ccf75c1",
        "name": "Hồ Tây",
        "province": "Hà Nội",
        "country": "Việt Nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1640930941657_ho tay.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61cdf980fee2fc001ccf75ce",
        "name": "Long biên",
        "province": "Hà Nội",
        "country": "Việt Nam",
        "valueate": 1,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1640888783764_15092021vthuy556.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61ce9cacfee2fc001ccf768e",
        "name": "Bien Long Hai",
        "province": "Ba Ria - Vung Tau",
        "country": "Viet Nam",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1655968350945_DoctorStrange2.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61cf018afee2fc001ccf7d1d",
        "name": "Chua Cau",
        "province": "Hoi An",
        "country": "Viet Nam",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1640956323206_matsumoto-castle-wallpaper-(2)-by-twalls.jpg"
    },
   
    {
        "deleteAt": false,
        "_id": "61d96168fee2fc001cd133f6",
        "name": "Khu du lịch sinh thái Ngọc Ánh gitoe",
        "province": "Bến tre uitil",
        "country": "Việt Nam",
        "valueate": 10,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1642055786522_1636703587023_ve-dep-bien-nha-trang.jpg",
        "__v": 0
    },
    {
        "deleteAt": false,
        "_id": "61dfb234fee2fc001cd77761",
        "name": "Đinh Thanh Tú",
        "province": "can tho",
        "country": "viet nam",
        "valueate": 8,
        "image": "",
        "__v": 0
    },
   
    {
        "deleteAt": false,
        "_id": "61f3fc52fee2fc001cd790fc",
        "name": "Cửu Long Hotel",
        "province": "Vĩnh Long",
        "country": "Viet Nam",
        "valueate": 10,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1644564898356_hoi an.jpg"
    },
    {
        "deleteAt": false,
        "_id": "61f5f9bafee2fc001cd79394",
        "name": "test vi tri",
        "province": "dong thap",
        "country": "viet nam",
        "valueate": 8,
        "image": "",
        "__v": 0
    },
    {
        "deleteAt": false,
        "_id": "62032e97fee2fc001cd7a33b",
        "name": "Phu Quoc",
        "province": "Kien giang",
        "country": "Viet Nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1644379404072_phu quoc.jpg"
    },
    {
        "deleteAt": false,
        "_id": "62032ec9fee2fc001cd7a33e",
        "name": "Vinh Ha Long",
        "province": "Quang Ninh",
        "country": "Viet Nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1644379431495_vinh ha long.jpg"
    },
    {
        "deleteAt": false,
        "_id": "6203322bfee2fc001cd7a36f",
        "name": "Hoi An",
        "province": "Quang Nam",
        "country": "Viet Nam",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1644379454341_hoi an.jpg"
    },
    {
        "deleteAt": false,
        "_id": "62033264fee2fc001cd7a372",
        "name": "Phong Nha - Ke Bang",
        "province": "Quang Binh",
        "country": "Viet Nam",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1644379486605_phong nha.jpg"
    },
    {
        "deleteAt": false,
        "_id": "62033284fee2fc001cd7a375",
        "name": "Hồ Tây",
        "province": "Ha Noi",
        "country": "Viet Nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1644379490495_ho tay.jpg"
    },
    {
        "deleteAt": false,
        "_id": "620332a6fee2fc001cd7a378",
        "name": "Bán đảo Sơn Trà",
        "province": "Da Nang",
        "country": "Viet Nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1644379496758_long hai.jpg"
    },
    {
        "deleteAt": false,
        "_id": "620332c6fee2fc001cd7a37c",
        "name": "Côn Đảo",
        "province": "Ba Ria Vung Tau",
        "country": "Viet Nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1644379512593_ben ninh kieu.jpg"
    },
    {
        "deleteAt": false,
        "_id": "620332e9fee2fc001cd7a37f",
        "name": "Tháp bà Ponagar",
        "province": "Khanh Hoa",
        "country": "Viet Nam",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1644379560324_ponaga.jpg"
    },
    {
        "deleteAt": false,
        "_id": "62033302fee2fc001cd7a382",
        "name": "Đại Nội Huế",
        "province": "Hue",
        "country": "Viet Nam",
        "valueate": 7,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1644379534201_hue.jpg"
    },
    {
        "deleteAt": false,
        "_id": "62033320fee2fc001cd7a385",
        "name": "Da Lat",
        "province": "Lam Dong",
        "country": "Viet Nam",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1644379590574_ho tay.jpg"
    },
    {
        "deleteAt": false,
        "_id": "62033343fee2fc001cd7a388",
        "name": "Sapa",
        "province": "Lao Cai",
        "country": "Viet Nam",
        "valueate": 9,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1652992061453_canTho.jpg"
    },
   
    {
        "deleteAt": false,
        "_id": "621fa464fee2fc001cd7d957",
        "name": "Khu du lịch sinh thái HồngB",
        "province": "Bến tre",
        "country": "viet nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1646304132300_244480267_151595607189983_2652075154215393942_n.jpg"
    },
    
  
    {
        "deleteAt": false,
        "_id": "625d1378fee2fc001cdb62b9",
        "name": "Khu du lịch sinh thái Hồng Hào",
        "province": "Bến tre",
        "country": "viet nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1650869766546_Screenshot from 2022-04-24 10-56-34.png"
    },
    {
        "deleteAt": false,
        "_id": "625e5d9bfee2fc001cdb69e6",
        "name": "Vien bao tang",
        "province": "thanh pho ho chi minh",
        "country": "viet nam",
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1651535369176_endgame.png"
    },
   
    {
        "deleteAt": false,
        "_id": "6274d73cfee2fc001cdcf0cd",
        "name": "Mũi Né",
        "province": "Bình Thuận",
        "country": "Việt Nam",
        "valueate": 10,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1651824450763_1.jpg"
    },
   
    {
        "deleteAt": false,
        "_id": "6275e5a2fee2fc001cdd1b86",
        "name": "Hòn Rơm",
        "province": "Phan Thiết",
        "country": "Việt Nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1651911136871_2.jpg"
    },
   
    {
        "deleteAt": false,
        "_id": "62768ea8fee2fc001cdd3bd6",
        "name": "Mũi né",
        "country": "Vietnam",
        "province": "Binh Thuan",
        "valueate": 0,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1655968064553_MaTocDo.jpg"
    },
   
    {
        "deleteAt": false,
        "_id": "627bb4cefee2fc001cf2c782",
        "name": "Mũi né",
        "province": "Bình Thuận",
        "country": "Việt Nam",
        "valueate": 10,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1652274395117_1.jpg"
    },
    {
        "deleteAt": false,
        "_id": "6281e936fee2fc001cf44e49",
        "name": "Khu du lịch sinh thái Hồng Hào",
        "province": "Bến tre",
        "country": "viet nam",
        "valueate": 8,
        "__v": 0,
        "image": "https://airbnb.cybersoft.edu.vn/public/temp/1655980970068_hulk.jpg"
    }
];

export const Users: React.FC = () => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);

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
    ): ColumnType<DataType> => ({
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

    const columns: ColumnsType<DataType> = [
        {
            title: "Id",
            dataIndex: "_id",
            key: "locationId",
            width: "20%",

            ...getColumnSearchProps("_id"),
            render: (_id) => (
                <p className="font-semibold w-[100px]">{_id}</p>
            ),
        },

        {
            title: "Tên phòng",
            dataIndex: "name",
            key: "name",
            width: "30%",
            ...getColumnSearchProps("name"),
            render: (name) => <a>{name}</a>,
        },

        {
            title: "Hình ảnh",
            dataIndex: "image",
            key: "image",
            width: "20%",
            render: (image) => (
                <Space size="middle">
                    <img src={image} alt="image" width="50px" height="50px" />
                    <a>Đổi</a>
                </Space>
            ),
        },

        {
            title: "Địa chỉ",
            dataIndex: "province",
            key: "province",
            width: "20%",
            ...getColumnSearchProps("province"),
            sorter: (a, b) => a.province.length - b.province.length,
            sortDirections: ["descend", "ascend"],
            render: (province) => (
                <p className="font-semibold w-[150px]">{province}</p>
            ),
        },

        {
            title: "Khu vực",
            dataIndex: "country",
            key: "country",
            width: "20%",
            ...getColumnSearchProps("country"),
            sorter: (a, b) => a.country.length - b.country.length,
            sortDirections: ["descend", "ascend"],
            render: (country) => (
                <p className="font-semibold w-[150px]">{country}</p>
            ),
        },

        {
            title: "",
            key: "action",
            width: "20%",
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
            <div className="flex p-6 cursor-pointer">
                <PlusCircleIcon className="w-6 h-6 mr-2" />
                <span className="text-lg text-black hover:underline">
                    Thêm vị trí
                </span>
            </div>

            <div className="pb-10">
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default Users;

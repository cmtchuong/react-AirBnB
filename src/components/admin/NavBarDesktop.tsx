import { AirbnbIcon } from "@components/icons";

import React, { useState } from "react";
import { createStyles, Navbar, Group, Code } from "@mantine/core";
import {
    BrandAirbnb,
    UserCircle,
    Home,
    Location,
    SwitchHorizontal,
    Logout,
    CaretDown,
} from "tabler-icons-react";
import { Router, useRouter } from "next/router";
import { User } from "@nextui-org/react";
import Users from "@components/admin/Users";
import Locations from "@components/admin/Locations";
import Rooms from "@components/admin/Rooms";
import AdminDashBoard from "@components/admin/AdminDashBoard";
import { PlusCircleIcon } from "@heroicons/react/solid";
import http from "@utils/http";
import { API_ENDPOINTS } from "@utils/apiEndpoints";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { Loading } from "@nextui-org/react";
import { removeCookies } from "cookies-next";

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef("icon");
    return {
        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${
                theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[2]
            }`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${
                theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[2]
            }`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            fontSize: theme.fontSizes.sm,
            color:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[1]
                    : theme.colors.gray[7],
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            "&:hover": {
                backgroundColor:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                color: theme.colorScheme === "dark" ? theme.white : theme.black,

                [`& .${icon}`]: {
                    color:
                        theme.colorScheme === "dark"
                            ? theme.white
                            : theme.black,
                },
            },
        },

        linkIcon: {
            ref: icon,
            color:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[2]
                    : theme.colors.gray[6],
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            "&, &:hover": {
                backgroundColor:
                    theme.colorScheme === "dark"
                        ? theme.fn.rgba(theme.colors.pink[0], 0.25)
                        : theme.colors.pink[1],
                color:
                    theme.colorScheme === "dark"
                        ? theme.white
                        : theme.colors.pink[6],
                [`& .${icon}`]: {
                    color: theme.colors.pink[6],
                },
            },
        },
    };
});

const dataNav = [
    { link: "#", label: "Trang chủ", icon: BrandAirbnb },
    { link: "#users", label: "Quản lý người dùng", icon: UserCircle },
    { link: "#location", label: "Quản lý vị trí", icon: Location },
    { link: "#rooms", label: "Quản lý phòng", icon: Home },
];

export interface RootObject {
    tickets: any[];
    deleteAt: boolean;
    _id: string;
    name: string;
    email: string;

    phone: string;
    gender: boolean;
    address: string;
    type: boolean;
    __v: number;
    avatar: string;
    birthday: string;
}

const getUsers = async () => {
    const response = await http.get(
        `https://airbnb.cybersoft.edu.vn${API_ENDPOINTS.USER}616915dbefe193001c0a5a6d`,
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

export const AdminCenter: React.FC = () => {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState("Billing");
    const [tab, setTab] = useState("#");
    const Router = useRouter();

    const { data, isLoading, isFetching } = useQuery<RootObject>(
        "info",
        getUsers,
    );
    console.log(data);

    if (isLoading) {
        return (
            <div className="p-4 mx-[25%]">
                {" "}
                <Loading />{" "}
            </div>
        );
    }

    if (!data) {
        return <p className="">Dữ liệu không tìm thấy :)</p>;
    }

    const links = dataNav.map((item) => (
        <a
            className={cx(classes.link, {
                [classes.linkActive]: item.label === active,
            })}
            href={"/admin" + item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setTab(item.link);
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <div className="flex">
            <Navbar
                height={700}
                width={{ sm: 300 }}
                p="md"
                className="sticky top-0"
            >
                <Navbar.Section grow>
                    <Group className={classes.header} position="apart">
                        <div className="mx-auto">
                            {" "}
                            <AirbnbIcon />{" "}
                        </div>
                    </Group>
                    {links}
                </Navbar.Section>

                <Navbar.Section className={classes.footer}>
                    <a
                        href="#"
                        className={classes.link}
                        onClick={(event) => event.preventDefault()}
                    >
                        <SwitchHorizontal className={classes.linkIcon} />
                        <span>Cập nhật thông tin</span>
                    </a>

                    <a
                        href="/"
                        className={classes.link}
                        onClick={() => {
                            removeCookies("isLoggedIn");
                            removeCookies("userId");
                        }}
                    >
                        <Logout className={classes.linkIcon}  />
                        <span>Đăng xuất</span>
                    </a>

                    <p className="text-center text-sm font-semibold mt-2">
                        {" "}
                        © 2022 cmtz, Inc.{" "}
                    </p>
                </Navbar.Section>
            </Navbar>

            <div className="flex-grow px-6">
                <div className="w-full justify-end p-6 border-b border-gray-300 flex z-30 bg-white sticky top-0">
                    <User
                        src={data.avatar}
                        name={data.name}
                        altText="A"
                        description="Admin"
                        pointer
                        onClick={() => {
                            Router.push("/user");
                        }}
                        className="mr-4 object-cover"
                    />
                </div>

                {tab === "#" && (
                    <div>
                        <AdminDashBoard />
                    </div>
                )}

                {tab === "#users" && (
                    <div>
                        <Users />
                    </div>
                )}

                {tab === "#location" && (
                    <div>
                        <Locations />
                    </div>
                )}

                {tab === "#rooms" && (
                    <div>
                        <Rooms />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCenter;

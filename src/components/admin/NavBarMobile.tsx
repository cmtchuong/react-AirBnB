import React, { useState } from "react";
import {
    Navbar,
    Center,
    Tooltip,
    UnstyledButton,
    createStyles,
    Group,
} from "@mantine/core";
import {
    Icon as TablerIcon,
    BrandAirbnb,
    Home,
    Location,
    UserCircle,
    SwitchHorizontal,
    Logout,
    UserSearch,
} from "tabler-icons-react";
import { AirbnbOnlyIcon } from "@components/icons";
import { User } from "@nextui-org/react";
import Users from "@components/admin/Users";
import Locations from "@components/admin/Locations";
import Rooms from "@components/admin/Rooms";

const useStyles = createStyles((theme) => ({
    link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[0],
        },
    },

    active: {
        "&, &:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.fn.rgba(theme.colors.pink[0], 0.25)
                    : theme.colors.pink[1],
            color: theme.colors.pink[6],
        },
    },
}));

interface NavbarLinkProps {
    icon: TablerIcon;
    label: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    const { classes, cx } = useStyles();
    return (
        <Tooltip
            label={label}
            position="right"
            withArrow
            transitionDuration={0}
        >
            <UnstyledButton
                onClick={onClick}
                className={cx(classes.link, { [classes.active]: active })}
            >
                <Icon />
            </UnstyledButton>
        </Tooltip>
    );
}

const mockdata = [
    { link: "#", icon: BrandAirbnb, label: "Trang chủ" },
    { link: "#users", icon: UserCircle, label: "Quản lý người dùng" },
    { link: "#location", icon: Location, label: "Quản lý vị trí" },
    { link: "#rooms", icon: Home, label: "Quản lý phòng" },
];

export const AdminCenter: React.FC = () => {
    const [active, setActive] = useState(2);
    const { classes, cx } = useStyles();
    const [tab, setTab] = useState("#");

    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => {
                setActive(index);
                setTab(link.link);
            }}
        />
    ));

    return (
        <div className="flex">
            <Navbar height={750} width={{ base: 80 }} p="md">
                <Center>
                    <div className="ml-[70px]">
                        {" "}
                        <AirbnbOnlyIcon />{" "}
                    </div>
                </Center>
                <Navbar.Section grow mt={50}>
                    <Group direction="column" align="center" spacing={0}>
                        {links}
                    </Group>
                </Navbar.Section>
                <Navbar.Section>
                    <Group direction="column" align="center" spacing={0}>
                        <NavbarLink
                            icon={SwitchHorizontal}
                            label="Thay đổi tài khoản"
                        />
                        <NavbarLink icon={Logout} label="Đăng xuất" />
                    </Group>
                </Navbar.Section>
            </Navbar>

            <div className="flex-grow">
                <div className="w-full justify-end py-6 px-3 border-b border-gray-300 flex relative">
                    <User
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        name="Ariana Wattson"
                        altText="A"
                        description="Admin"
                        pointer
                        className="mr-4"
                    />
                </div>

                {tab === "#" && (
                    <div>
                        <h1>Admin</h1>
                    </div>
                )}

                {tab === "#users" && (
                    <div>
                       <Users />
                    </div>
                )}

                {tab === "#location" && (
                    <div>
                        <Location />
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

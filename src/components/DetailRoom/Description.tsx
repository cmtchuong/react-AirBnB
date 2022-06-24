import React, { useRef, useState } from "react";
import { Login } from "@components/login";
import { useOnClickOutside } from "usehooks-ts";
import { VerifyIcon } from "@components/icons";
import { CheckIcon, StarIcon } from "@heroicons/react/solid";
import { MoreUnderline } from "@components/moreUnderline";
import { Modal, useModal, Text } from "@nextui-org/react";

export const Payment: React.FC = () => {
    const { setVisible, bindings } = useModal();
    return (
        <div>
            <div className="py-6 border-b border-gray-300 font-normal">
                <p className="text__description">
                    Căn hộ xinh đẹp này ở nhà CBS nằm ở tầng 7 của tòa nhà mới
                    của chúng tôi - Nhà ở CBS-81. Nó có một phòng ngủ, một phòng
                    tắm và một phòng khách mở. Nó được thiết kế rất đẹp. Cung
                    cấp đầy đủ nội thất và thiết bị hiện đại. Cửa sổ kính lớn
                    cho phép ánh sáng tự nhiên đi vào. Sàn gỗ giúp căn hộ dễ
                    dàng vệ sinh.
                    <p>
                        Hơn nữa, vị trí của tòa nhà nằm trong khoảng cách đi bộ
                        đến các cửa hàng tiện lợi, nhà hàng, cửa hàng, quán bar,
                        quán rượu.
                    </p>
                </p>

                <div
                    className="block font-semibold "
                    onClick={() => {
                        setVisible(true);
                    }}
                >
                    {" "}
                    <MoreUnderline title="Hiển thị thêm" />{" "}
                </div>
            </div>
            <Modal
                scroll
                closeButton
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                fullScreen
                {...bindings}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18} className="font-semibold">
                        Giới thiệu về chỗ ở này
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Text id="modal-description">
                    Căn hộ xinh đẹp này ở nhà CBS nằm ở tầng 7 của tòa nhà mới
                    của chúng tôi - Nhà ở CBS-81. Nó có một phòng ngủ, một phòng
                    tắm và một phòng khách mở. Nó được thiết kế rất đẹp. Cung
                    cấp đầy đủ nội thất và thiết bị hiện đại. Cửa sổ kính lớn
                    cho phép ánh sáng tự nhiên đi vào. Sàn gỗ giúp căn hộ dễ
                    dàng vệ sinh.
                    <p>
                        Hơn nữa, vị trí của tòa nhà nằm trong khoảng cách đi bộ
                        đến các cửa hàng tiện lợi, nhà hàng, cửa hàng, quán bar,
                        quán rượu.
                    </p>
                    </Text>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Payment;

import React, {  } from "react";
import { Modal, useModal } from "@nextui-org/react";
import { EmojiHappyIcon, EmojiSadIcon } from "@heroicons/react/outline";

export const Payment: React.FC = () => {
    const { setVisible, bindings } = useModal();
    return (
        <div className="text-xs py-6 font-normal ">
            <span>Bằng việc chọn nút bên dưới, tôi đồng ý với </span>
            <span
                className="text-black underline font-semibold"
                onClick={() => {
                    setVisible(true);
                }}
            >
                <a>Nội quy nhà của chủ nhà, </a>
                <Modal
                    scroll
                    closeButton
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    width="600px"
                    className=""
                    {...bindings}
                >
                    <Modal.Header className="block border-b border-gray-300">
                        <h2 className="text-black font-semibold text-xl pb-4">
                            Nội quy nhà
                        </h2>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="py-6  flex-col space-y-3">
                            <div className="flex items-center">
                                <EmojiHappyIcon className="w-6 h-6 mr-2" />
                                <p>Phù hợp với trẻ nhỏ và em bé</p>
                            </div>

                            <div className="flex items-center">
                                <EmojiSadIcon className="w-6 h-6 mr-2" />
                                <p>Không thú cưng</p>
                            </div>

                            <div className="flex items-center">
                                <EmojiSadIcon className="w-6 h-6 mr-2" />
                                <p>Không được tổ chức tiệc hoặc sự kiện</p>
                            </div>

                            <div className="flex items-center">
                                <EmojiSadIcon className="w-6 h-6 mr-2" />
                                <p>Không hút thuốc</p>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </span>
            <span className="text-black underline font-semibold">
                <a href="https://www.airbnb.com.vn/help/article/2839/what-are-the-health-and-safety-guidelines-for-hosts-and-guests-on-airbnb">
                    Các yêu cầu về an toàn trong đại dịch COVID-19 của Airbnb{" "}
                </a>
            </span>
            <span> và </span>
            <span className="text-black underline font-semibold">
                <a href="https://www.airbnb.com.vn/terms/guest_refund_policy">
                    Chính sách hoàn tiền cho khách
                </a>
            </span>
        </div>
    );
};

export default Payment;

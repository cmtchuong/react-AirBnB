import React from "react";

export const HistoryTrip: React.FC = () => {
    return (
        <div className="mx-20">
            <div className="py-6 border-b border-gray-300">
                <h2 className="text-black text-3xl">Chuyến đi</h2>
            </div>

            <div className="py-6 border-b border-gray-300">
                <h2 className="text-black text-2xl mb-2">
                    Chưa có chuyến đi nào được đặt... vẫn chưa!
                </h2>
                <p className="font-normal">
                    Đã đến lúc phủi bụi hành lý và bắt đầu chuẩn bị cho chuyến
                    phiêu lưu tiếp theo của bạn rồi
                </p>

                <button className=" py-3 px-6 mb-10 mt-6  cursor-pointer active:scale-95 active:bg-gray 100 transition transform ease-out block border rounded-xl font-medium text-black hover:bg-gray-300  duration-200 ">
                    {" "}
                    Bắt đầu tìm kiếm{" "}
                </button>
            </div>

            <div className="py-6">
            <span className="font-normal"> Bạn không tìm thấy đặt phòng/đặt chỗ của mình ở đây? </span>
            <span className="text-black underline cursor-pointer">Truy cập Trung tâm trợ giúp</span>
            </div>
        </div>
    );
};

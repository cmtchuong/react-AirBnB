import React from "react";
import Image from "next/image";


import comment from "@public/comment.json";
import { useRouter } from "next/router";
import { API_ENDPOINTS } from "@utils/apiEndpoints";

import { Loading } from "@nextui-org/react";
import http from "@utils/http";


// interface infoProps {
//     img?: string;
//     name: string;
//     date?: string;
//     comment: string;

// }

const getInfoRooms = async () => {
    // await (
    //     await http.get(
    //         `https://airbnb.cybersoft.edu.vn${API_ENDPOINTS.SEARCH}`,
    //     )
    // ).data.json();
    const response = await http.get(
        `https://airbnb.cybersoft.edu.vn${API_ENDPOINTS.GET_ROOMS}`,
    );

    return response.data;
};


export const CommentCards: React.FC = () =>
    
    {
        
        return (
            <div className="grid grid-cols-2 gap-14 mt-6">
                {(comment?.item ?? []).map((item) => (
                    <div className="">
                    <div>
                        <div className="flex">
                            <div className="">
                                <Image src={item.img} 
                                width={56} height={56}
                                className="rounded-full cursor-pointer" />
                                
                                
                            </div>
                            <div className="ml-4 pt-1">
                                <h2 className="text-black ">{item.name}</h2>
                                <p className="text-gray-600 text-sm font-normal">{item.date}</p>
                            </div>
                        </div>

                        <div>
                            <p className="font-normal pr-10 text-black">{item.comment}</p>
                        </div>
                       
                    </div>
                    </div>
                ))}
            </div>
        );
    };

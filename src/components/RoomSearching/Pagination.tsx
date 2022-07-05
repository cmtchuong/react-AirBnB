/* eslint-disable */
import React, { useEffect, useState } from "react";

import Pagination from "react-paginate";

import { useRouter } from "next/router";

interface Props {
    Pagination: any;
    OnChangePage: boolean;
}

export const Pag: React.FC<Props> = ({}) => {
    const router = useRouter();

    




    // function handlePageChange(data: { selected: any }) {
        
    //     router.push({
    //         pathname: `/rooms?page=${offset}`,
    //         query: {
    //             location: location,
    //             startDate: startDate,
    //             endDate: endDate,
    //             guests: guests,
    //             page: offset,
    //         },
    //     });
    // }

    const { location, title, guests, startDate, endDate, page } = router.query;

    return <div className="text-center py-10">



    </div>;
};

export default Pag;

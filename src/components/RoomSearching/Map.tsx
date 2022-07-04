import * as React from "react";
import { useState } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export const Map: React.FC = () => {

    const [viewState, setViewState] = useState({
       
        latitude: 10.823984,
        longitude: 106.633891,
        zoom: 11,

    });
    return (
        <ReactMapGL
            mapStyle={"mapbox://styles/cmtckuong123/cl2ladcr6002014pehf3rd1vs/draft"}
            mapboxAccessToken={process.env.mapbox_key}
            attributionControl= {false}
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}

        ></ReactMapGL>
    );
};

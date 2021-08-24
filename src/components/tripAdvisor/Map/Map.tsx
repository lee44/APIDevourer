import React, { useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "./map.css";
import { useTripContext } from "../../../context/TripStateProvider";

function Maps() {
	const context = useTripContext();
	const mapRef = React.useRef<google.maps.Map<Element> | null>(null);
	const containerStyle = {
		width: "100%",
		height: "93vh",
	};

	const onLoaded = (map: google.maps.Map<Element>) => {
		mapRef.current = map;
	};

	return (
		<div className={"map-container"}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={context.coords}
				zoom={10}
				onLoad={onLoaded}
				onBoundsChanged={() => {
					// context.setBounds({
					// 	ne: mapRef.current?.getBounds()?.getNorthEast(),
					// 	sw: mapRef.current?.getBounds()?.getSouthWest(),
					// });
				}}
			></GoogleMap>
		</div>
	);
}

export default Maps;

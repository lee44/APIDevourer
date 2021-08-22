import React, { useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "./map.css";
import { useTripContext } from "../../../context/TripStateProvider";

function Maps() {
	const context = useTripContext();
	const refMap = React.useRef<google.maps.Map<Element> | null>(null);

	const containerStyle = {
		width: "100%",
		height: "93vh",
	};

	return (
		<div className={"map-container"}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={context.coords}
				zoom={10}
				onBoundsChanged={() => {}}
			></GoogleMap>
		</div>
	);
}

export default Maps;

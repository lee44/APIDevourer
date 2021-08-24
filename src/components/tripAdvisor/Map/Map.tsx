import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
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
				zoom={14}
				onLoad={onLoaded}
				onBoundsChanged={() => {
					// context.setBounds({
					// 	ne: mapRef.current?.getBounds()?.getNorthEast(),
					// 	sw: mapRef.current?.getBounds()?.getSouthWest(),
					// });
				}}
			>
				{context.places.map((place, index) => {
					if (place.latitude && place.longitude) {
						return <Marker key={index} animation={google.maps.Animation.DROP} position={{ lat: Number(place.latitude), lng: Number(place.longitude) }} />;
					}
				})}
			</GoogleMap>
		</div>
	);
}

export default Maps;

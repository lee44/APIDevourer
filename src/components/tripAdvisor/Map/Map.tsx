import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import "./map.css";
import { useTripContext } from "../../../context/TripStateProvider";

function Maps() {
	const { coords, places, setBounds } = useTripContext();
	const [loaded, setLoaded] = useState(false);
	const [infoWindowLatLng, setinfoWindowLatLng] = useState<google.maps.LatLng>();
	const mapRef = React.useRef<google.maps.Map<Element> | null>(null);
	const containerStyle = {
		width: "100%",
		height: "93vh",
	};

	const elRefs = React.useRef([]);
	const arrLength = places.length;
	if (elRefs.current.length !== arrLength) {
		// add or remove refs
		elRefs.current = Array(arrLength)
			.fill(null)
			.map((_, i) => elRefs.current[i] || React.createRef());
	}

	const onLoaded = (map: google.maps.Map<Element>) => {
		mapRef.current = map;
	};

	const handleClick = (e: google.maps.MapMouseEvent) => {
		setinfoWindowLatLng(e.latLng);
	};

	return (
		<div className={"map-container"}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={coords}
				zoom={14}
				onLoad={onLoaded}
				onBoundsChanged={() => {
					if (!loaded) {
						setBounds({
							ne: mapRef.current?.getBounds()?.getNorthEast(),
							sw: mapRef.current?.getBounds()?.getSouthWest(),
						});
						setLoaded(true);
					}
				}}
				onDragEnd={() => {
					setBounds({
						ne: mapRef.current?.getBounds()?.getNorthEast(),
						sw: mapRef.current?.getBounds()?.getSouthWest(),
					});
				}}
			>
				{places.map((place, index) => {
					if (place.latitude && place.longitude) {
						return (
							<Marker
								key={index}
								onClick={(e) => handleClick(e)}
								animation={google.maps.Animation.DROP}
								position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
							></Marker>
						);
					}
				})}
				{infoWindowLatLng && (
					<InfoWindow
						position={infoWindowLatLng}
						options={{ pixelOffset: { width: 0, height: -43 } as google.maps.Size }}
						onCloseClick={() => setinfoWindowLatLng(undefined)}
					>
						<div>InfoWindow</div>
					</InfoWindow>
				)}
			</GoogleMap>
		</div>
	);
}

export default Maps;

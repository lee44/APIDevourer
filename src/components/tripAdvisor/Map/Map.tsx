import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import "./map.css";
import { Place, useTripContext } from "../../../context/TripStateProvider";
import { MdStar } from "react-icons/md";

function Maps() {
	const { coords, places, setBounds } = useTripContext();
	const [loaded, setLoaded] = useState(false);
	const [infoWindowLatLng, setinfoWindowLatLng] = useState<google.maps.LatLng>();
	const [infoWindowDetails, setInfoWindowDetails] = useState<Place>();
	const mapRef = React.useRef<google.maps.Map<Element> | null>(null);
	const containerStyle = {
		width: "100%",
		height: "93vh",
	};

	// This snippet creates an array of useRef that will be pointing to each place
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

	const handleClick = (e: google.maps.MapMouseEvent, place: Place) => {
		setinfoWindowLatLng(e.latLng);
		setInfoWindowDetails(place);
	};

	let timer: NodeJS.Timeout;

	return (
		<div className={"map-container"}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={coords}
				zoom={14}
				onLoad={onLoaded}
				onBoundsChanged={() => {
					clearTimeout(timer);
					timer = setTimeout(() => {
						console.log("Bounds Changed");
						setBounds({
							ne: mapRef.current?.getBounds()?.getNorthEast(),
							sw: mapRef.current?.getBounds()?.getSouthWest(),
						});
					}, 2000);
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
								onClick={(e) => handleClick(e, place)}
								onMouseOver={(e) => handleClick(e, place)}
								onMouseOut={(e) => setinfoWindowLatLng(undefined)}
								animation={google.maps.Animation.DROP}
								position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
							></Marker>
						);
					}
					return;
				})}
				{infoWindowLatLng && (
					<InfoWindow
						position={infoWindowLatLng}
						options={{ pixelOffset: { width: 0, height: -43 } as google.maps.Size }}
						onCloseClick={() => setinfoWindowLatLng(undefined)}
					>
						<div>
							<div className="infoWindow-title">{infoWindowDetails?.name}</div>
							<div>
								{infoWindowDetails?.rating} <MdStar className="star" />
							</div>
						</div>
					</InfoWindow>
				)}
			</GoogleMap>
		</div>
	);
}

export default Maps;

import React from "react";
import GoogleMapReact from "google-map-react";
import "./map.css";

function Maps() {
	const defaultProps = {
		center: {
			lat: 34.0522,
			lng: -118.2437,
		},
		zoom: 11,
	};

	return (
		<div className={"map-container"}>
			<GoogleMapReact
				bootstrapURLKeys={
					{
						key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
					} as GoogleMapReact.BootstrapURLKeys
				}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
			></GoogleMapReact>
		</div>
	);
}

export default Maps;

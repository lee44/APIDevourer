import React, { useEffect } from "react";
import { Place, useTripContext } from "../../../context/TripStateProvider";
import { getPlacesData } from "../API/travelAdvisorAPI";
import PlaceDetail from "../PlaceDetail/PlaceDetail";
import "./placelist.css";

function PlaceList() {
	const { type, bounds, places, setPlaces } = useTripContext();

	useEffect(() => {
		if (bounds.sw && bounds.ne) {
			console.log("getPlacesData called");
			getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
				setPlaces(data);
			});
		}
	}, [bounds, setPlaces, type]);

	return (
		<>
			{places.map((place: Place, index) => {
				return place.name ? (
					<div key={index} className="place-detail-spacing">
						<PlaceDetail place={place}></PlaceDetail>
					</div>
				) : (
					""
				);
			})}
		</>
	);
}

export default PlaceList;

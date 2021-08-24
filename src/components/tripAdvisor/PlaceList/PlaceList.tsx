import React, { useEffect } from "react";
import { Place, useTripContext } from "../../../context/TripStateProvider";
import { getPlacesData } from "../API/travelAdvisorAPI";
import PlaceDetail from "../PlaceDetail/PlaceDetail";

function PlaceList() {
	const { type, bounds, places, setPlaces } = useTripContext();

	useEffect(() => {
		if (bounds.sw && bounds.ne) {
			getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
				// console.log(data);
				setPlaces(data);
			});
		}
	}, [bounds, setPlaces, type]);

	return (
		<>
			{places.map((place: Place, index) => {
				return place.name ? (
					<>
						<PlaceDetail key={index} place={place}></PlaceDetail>
						<div className="place-detail-spacing"></div>
					</>
				) : (
					""
				);
			})}
		</>
	);
}

export default PlaceList;

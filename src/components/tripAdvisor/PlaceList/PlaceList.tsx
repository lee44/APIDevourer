import React, { useEffect } from "react";
import { useTripContext } from "../../../context/TripStateProvider";
import { getPlacesData } from "../API/travelAdvisorAPI";

function PlaceList() {
	const { type, bounds } = useTripContext();

	useEffect(() => {
		if (bounds.sw && bounds.ne) {
			getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
				console.log(data);
			});
		}
	}, [bounds]);

	return <div></div>;
}

export default PlaceList;

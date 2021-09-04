import React, { MutableRefObject, Ref, RefObject, useEffect, useState } from "react";
import { Place, useTripContext } from "../../../context/TripStateProvider";
import { getPlacesData } from "../API/travelAdvisorAPI";
import PlaceDetail from "../PlaceDetail/PlaceDetail";
import "./placelist.css";

function PlaceList() {
	const { type, bounds, places, childClicked, setChildClicked, setPlaces } = useTripContext();

	// This snippet creates an array of useRef that will be pointing to each place
	const [elRefs, setElRefs] = useState<MutableRefObject<HTMLDivElement>[]>([]);

	useEffect(() => {
		// When places changes, this will create a new array containing the old Refs + new ones
		setElRefs((refs) =>
			Array(places.length)
				.fill(null)
				.map((_, i) => refs[i] || React.createRef())
		);
	}, [places]);

	useEffect(() => {
		if (bounds.sw && bounds.ne) {
			getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
				console.log("Getting Places Data");
				setPlaces(data);
				setChildClicked(undefined);
			});
		}
	}, [bounds, setPlaces, type]);

	return (
		<>
			{places.map((place: Place, index) => {
				return place.name ? (
					<div key={index} className="place-detail-spacing">
						<PlaceDetail place={place} selected={childClicked === index} refProp={elRefs[index]}></PlaceDetail>
					</div>
				) : (
					""
				);
			})}
		</>
	);
}

export default PlaceList;

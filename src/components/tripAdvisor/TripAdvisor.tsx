import React, { useEffect } from "react";
import Map from "./Map/Map";
import PlaceList from "./PlaceList/PlaceList";
import { Container, Row, Col } from "react-bootstrap";
import { useTripContext } from "../../context/TripStateProvider";
import { getPlacesData } from "./API/travelAdvisorAPI";

function TripAdvisor() {
	const context = useTripContext();

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
			context.setCoords({ lat: latitude, lng: longitude });
		});
	}, []);

	return (
		<Container fluid>
			<Row>
				<Col sm={4} className="my-1">
					<PlaceList />
				</Col>
				<Col sm={8} className="my-1">
					<Map />
				</Col>
			</Row>
		</Container>
	);
}

export default TripAdvisor;

import React, { useEffect } from "react";
import Map from "./Map/Map";
import PlaceList from "./PlaceList/PlaceList";
import { Container, Row, Col } from "react-bootstrap";
import { useTripContext } from "../../context/TripStateProvider";
import "./tripadvisor.css";

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
				<Col xs={{ span: 12, order: "last" }} xl={{ span: 4, order: "first" }} xxl={{ span: 3, order: "first" }} className="my-1">
					<div className="place-list-container">
						<PlaceList />
					</div>
				</Col>
				<Col xs={{ span: 12, order: "first" }} xl={{ span: 8, order: "last" }} xxl={{ span: 9, order: "first" }} className="my-1">
					<Map />
				</Col>
			</Row>
		</Container>
	);
}

export default TripAdvisor;

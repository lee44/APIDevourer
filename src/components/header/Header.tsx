import "./header.css";
import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useTripContext } from "../../context/TripStateProvider";
import { StandaloneSearchBox } from "@react-google-maps/api";

function Header() {
	const context = useTripContext();
	const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>({} as google.maps.places.SearchBox);

	const onLoad = (ref: google.maps.places.SearchBox) => {
		setSearchBox(ref);
	};

	const onPlacesChanged = () => {
		context.setCoords({
			lat: searchBox.getPlaces()[0].geometry?.location.lat()!,
			lng: searchBox.getPlaces()[0].geometry?.location.lng()!,
		});
		console.log("New Location Entered", context.coords);
	};

	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="#home">TripAdvisor</Navbar.Brand>
				<Nav>
					<div className="autocomplete">
						<StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
							<input type="text" placeholder="Enter Location" />
						</StandaloneSearchBox>
					</div>
				</Nav>
			</Container>
		</Navbar>
	);
}

export default Header;

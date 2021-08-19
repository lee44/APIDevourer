import "./header.css";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useTripContext } from "../../context/TripStateProvider";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

function Header() {
	const context = useTripContext();

	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="#home">APIDevourer</Navbar.Brand>
				<Nav className="me-auto">
					<LinkContainer to="/">
						<Nav.Link>Home</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/sports">
						<Nav.Link>Sports</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/tripadvisor">
						<Nav.Link>Trip Advisor</Nav.Link>
					</LinkContainer>
				</Nav>
				<Nav>
					<ReactGoogleAutocomplete
						apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
						onPlaceSelected={(place) => {
							geocodeByAddress(place.formatted_address!)
								.then((results) => getLatLng(results[0]))
								.then(({ lat, lng }) => context.setCoords({ lat, lng }));
						}}
					></ReactGoogleAutocomplete>
				</Nav>
			</Container>
		</Navbar>
	);
}

export default Header;

import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getPlacesData } from '../API/travelAdvisorAPI';
import Maps from '../components/Map/Map';
import PlaceList from '../components/PlaceList/PlaceList';
import { useTripContext } from '../context/TripStateProvider';
import './tripadvisor.css';

function TripAdvisor() {
	const { type, bounds, setIsLoading, setCoords, setChildClicked, setPlaces } = useTripContext();

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
			setCoords({ lat: latitude, lng: longitude });
		});
	}, []);

	useEffect(() => {
		setIsLoading(true);
		if (bounds.sw && bounds.ne) {
			getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
				console.log('Getting Places Data');
				setPlaces(data);
				setChildClicked(undefined);
				setIsLoading(false);
			});
		}
	}, [bounds]);

	return (
		<Container fluid>
			<Row>
				<Col sm={{ span: 12, order: 'last' }} md={{ span: 4, order: 'first' }} lg={{ span: 3, order: 'first' }} xl={{ span: 2, order: 'first' }} className='px-0'>
					<div className='place-list-container'>
						<PlaceList />
					</div>
				</Col>
				<Col sm={{ span: 12, order: 'first' }} md={{ span: 8, order: 'last' }} lg={{ span: 9, order: 'first' }} xl={{ span: 10, order: 'first' }} className='px-0'>
					<Maps />
				</Col>
			</Row>
		</Container>
	);
}

export default TripAdvisor;

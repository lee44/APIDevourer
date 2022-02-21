import React, { MutableRefObject, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Place, useTripContext } from '../../context/TripStateProvider';
import PlaceDetail from '../PlaceDetail/PlaceDetail';
import './placelist.css';

function PlaceList() {
	const { places, childClicked, isLoading } = useTripContext();

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

	return (
		<>
			{isLoading ? (
				<div className='spinner-container'>
					<Spinner animation='border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				</div>
			) : (
				places.map((place: Place, index) => {
					return place.name ? (
						<div key={index} className='place-detail-spacing'>
							<PlaceDetail place={place} selected={childClicked === index} refProp={elRefs[index]}></PlaceDetail>
						</div>
					) : (
						''
					);
				})
			)}
		</>
	);
}

export default PlaceList;

import React from 'react';
import { Card } from 'react-bootstrap';
import { MdStar } from 'react-icons/md';
import { Place } from '../../context/TripStateProvider';
import './placedetail.css';

const PlaceDetail: React.FC<{ place: Place; selected: boolean; refProp: React.MutableRefObject<HTMLDivElement> }> = ({ place, selected, refProp }) => {
	if (selected) {
		refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		console.log('ScrollIntoView Called');
	}
	return (
		<Card ref={refProp}>
			<Card.Img variant='top' className='card-img' src={place?.photo?.images?.original?.url} />
			<Card.Body>
				<Card.Title>
					<Card.Link className='href' href={place.website}>
						{place.name}
					</Card.Link>
				</Card.Title>
				<Card.Subtitle>
					{place.rating} <MdStar className='star' /> | ({place.num_reviews}) | {place.price_level}
				</Card.Subtitle>
				<Card.Text>{place.address_obj.street1 + ', ' + place.address_obj.city}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default React.memo(PlaceDetail);

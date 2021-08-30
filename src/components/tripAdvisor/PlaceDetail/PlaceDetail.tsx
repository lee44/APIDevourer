import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Place } from "../../../context/TripStateProvider";
import "./placedetail.css";
import { MdEmail, MdStar } from "react-icons/md";

const PlaceDetail: React.FC<{ place: Place }> = ({ place }) => {
	return (
		<Card>
			<Card.Img variant="top" className="card-img" src={place.photo.images.original.url} />
			<Card.Body>
				<Card.Title>
					<Card.Link className="href" href={place.website}>
						{place.name}
					</Card.Link>
					{/* <span>{place.open_now_text}</span> */}
				</Card.Title>
				<Card.Subtitle>
					{place.rating} <MdStar className="star" /> | ({place.num_reviews}) | {place.price_level}
				</Card.Subtitle>
				<Card.Text>{place.address_obj.street1 + ", " + place.address_obj.city}</Card.Text>
				{/* <Card.Text>{place.description}</Card.Text> */}
			</Card.Body>
			{/* <ListGroup className="list-group-flush">
				<ListGroupItem>
					<MdEmail></MdEmail>
					{place.email}
				</ListGroupItem>
			</ListGroup> */}
		</Card>
	);
};

export default PlaceDetail;

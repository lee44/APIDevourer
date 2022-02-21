import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import React, { useState } from 'react';
import { MdStar } from 'react-icons/md';
import { Place, useTripContext } from '../../context/TripStateProvider';
import './map.css';

function Maps() {
	const { coords, places, setBounds, setChildClicked } = useTripContext();
	const [infoWindowLatLng, setinfoWindowLatLng] = useState<google.maps.LatLng>();
	const [infoWindowDetails, setInfoWindowDetails] = useState<Place>();
	const mapRef = React.useRef<google.maps.Map<Element> | null>(null);
	const containerStyle = {
		width: '100%',
		height: '93vh',
	};

	const onLoaded = (map: google.maps.Map<Element>) => {
		mapRef.current = map;
	};

	const handleMouseClick = (e: google.maps.MapMouseEvent, place: Place, index: Number | undefined) => {
		setinfoWindowLatLng(e.latLng);
		setInfoWindowDetails(place);
		setChildClicked(index);
	};

	const handleMouseOver = (e: google.maps.MapMouseEvent, place: Place) => {
		setinfoWindowLatLng(e.latLng);
		setInfoWindowDetails(place);
	};

	let timer: NodeJS.Timeout;

	return (
		<div className={'map-container'}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={coords}
				zoom={14}
				options={{ fullscreenControl: false }}
				onLoad={onLoaded}
				onBoundsChanged={() => {
					clearTimeout(timer);
					timer = setTimeout(() => {
						console.log('Bounds Changed');
						setBounds({
							ne: mapRef.current?.getBounds()?.getNorthEast(),
							sw: mapRef.current?.getBounds()?.getSouthWest(),
						});
					}, 2000);
				}}
			>
				{places.map((place, index) => {
					if (place.latitude && place.longitude) {
						return (
							<Marker
								key={index}
								onClick={(e) => handleMouseClick(e, place, index)}
								onMouseOver={(e) => handleMouseOver(e, place)}
								onMouseOut={(e) => setinfoWindowLatLng(undefined)}
								animation={google.maps.Animation.DROP}
								position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
							></Marker>
						);
					}
					return;
				})}
				{infoWindowLatLng && (
					<InfoWindow
						position={infoWindowLatLng}
						options={{ pixelOffset: { width: 0, height: -43 } as google.maps.Size /*, disableAutoPan: true*/ }}
						onCloseClick={() => setinfoWindowLatLng(undefined)}
					>
						<div>
							<div className='infoWindow-title'>{infoWindowDetails?.name}</div>
							<div>
								{infoWindowDetails?.rating} <MdStar className='star' />
							</div>
						</div>
					</InfoWindow>
				)}
			</GoogleMap>
		</div>
	);
}

export default Maps;

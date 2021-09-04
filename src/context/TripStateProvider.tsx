import React, { useState, useContext } from "react";

export type Place = {
	location_id: string;
	address_obj: { city: string; street1: string };
	category: { key: string; name: string };
	cuisine: [{ key: string; name: string }];
	description: string;
	distance: string;
	email: string;
	latitude: string;
	longitude: string;
	open_now_text: string;
	phone: string;
	photo: { images: { original: { url: string } } };
	name: string;
	rating: string;
	num_reviews: string;
	price_level: string;
	ranking: string;
	website: string;
};

//TripContextState is a type that ensures any instances must have the following properties
type TripContextData = {
	type: string;
	rating: string;
	coords: google.maps.LatLngLiteral;
	bounds: { ne: google.maps.LatLng | undefined; sw: google.maps.LatLng | undefined };
	filteredPlaces: Place[]; //array of Place objects;
	places: Place[];
	autoComplete: string;
	childClicked: Number | undefined;
	isLoading: boolean;
	setType: React.Dispatch<React.SetStateAction<string>>;
	setRating: React.Dispatch<React.SetStateAction<string>>;
	setCoords: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>;
	setBounds: React.Dispatch<React.SetStateAction<{ ne: google.maps.LatLng | undefined; sw: google.maps.LatLng | undefined }>>;
	setFilteredPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
	setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
	setAutoComplete: React.Dispatch<React.SetStateAction<string>>;
	setChildClicked: React.Dispatch<React.SetStateAction<Number | undefined>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
// initialState is an instance of TripContextState, therefore must have all properties in TripContextData
const initialState: TripContextData = {
	type: "",
	rating: "",
	coords: { lat: 0, lng: 0 },
	bounds: { ne: undefined, sw: undefined },
	filteredPlaces: [],
	places: [],
	autoComplete: "",
	childClicked: undefined,
	isLoading: false,
	setType: () => null,
	setRating: () => null,
	setCoords: () => null,
	setBounds: () => null,
	setFilteredPlaces: () => null,
	setPlaces: () => null,
	setAutoComplete: () => null,
	setChildClicked: () => null,
	setIsLoading: () => null,
};

const TripContext = React.createContext(initialState);

const TripStateProvider = ({ children }: { children: React.ReactNode }) => {
	const [type, setType] = useState("restaurants");
	const [rating, setRating] = useState("");

	const [coords, setCoords] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
	const [bounds, setBounds] = useState<TripContextData["bounds"]>({ ne: undefined, sw: undefined });

	// const [weatherData, setWeatherData] = useState([]);
	const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
	const [places, setPlaces] = useState<Place[]>([]);

	const [autoComplete, setAutoComplete] = useState("");
	const [childClicked, setChildClicked] = useState<Number | undefined>();
	const [isLoading, setIsLoading] = useState(false);

	return (
		<TripContext.Provider
			value={{
				type,
				rating,
				coords,
				bounds,
				filteredPlaces,
				places,
				autoComplete,
				childClicked,
				isLoading,
				setType,
				setCoords,
				setRating,
				setBounds,
				setFilteredPlaces,
				setPlaces,
				setAutoComplete,
				setChildClicked,
				setIsLoading,
			}}
		>
			{children}
		</TripContext.Provider>
	);
};

export const useTripContext = () => {
	return useContext(TripContext);
};

export { TripContext, TripStateProvider };

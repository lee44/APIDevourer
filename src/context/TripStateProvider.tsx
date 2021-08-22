import React, { useState, useContext } from "react";

type Place = {
	city: string;
};

//TripContextState is a type that ensures any instances must have the property, places
type TripContextData = {
	type: string;
	rating: string;
	coords: google.maps.LatLngLiteral;
	bounds: object;
	filteredPlaces: Place[]; //array of Place objects;
	places: Place[]; //array of Place objects
	autoComplete: string;
	childClicked: null;
	isLoading: boolean;
	setType: React.Dispatch<React.SetStateAction<string>>;
	setRating: React.Dispatch<React.SetStateAction<string>>;
	setCoords: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>;
	setBounds: React.Dispatch<React.SetStateAction<{}>>;
	setFilteredPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
	setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
	setAutoComplete: React.Dispatch<React.SetStateAction<string>>;
	setChildClicked: React.Dispatch<React.SetStateAction<null>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
// initialState is an instance of TripContextState, therefore must have all properties in Trip
const initialState: TripContextData = {
	type: "",
	rating: "",
	coords: { lat: 0, lng: 0 },
	bounds: {},
	filteredPlaces: [],
	places: [],
	autoComplete: "",
	childClicked: null,
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
	const [type, setType] = useState("Restaurant");
	const [rating, setRating] = useState("");

	const [coords, setCoords] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
	const [bounds, setBounds] = useState({});

	const [weatherData, setWeatherData] = useState([]);
	const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
	const [places, setPlaces] = useState<Place[]>([]);

	const [autoComplete, setAutoComplete] = useState("");
	const [childClicked, setChildClicked] = useState(null);
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

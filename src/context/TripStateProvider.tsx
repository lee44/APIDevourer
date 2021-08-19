import React, { useState, useContext } from "react";

type Place = {
	city: string;
};
//TripContextState is a type that ensures any instances must have the property, places
type TripContextData = {
	type: string;
	rating: string;
	coords: object;
	bounds: object;
	filteredPlaces: Place[]; //array of Place objects;
	places: Place[]; //array of Place objects
	autoComplete: React.SyntheticEvent<HTMLInputElement, Event> | undefined;
	childClicked: null;
	isLoading: boolean;
	setType: React.Dispatch<React.SetStateAction<string>>;
	setRating: React.Dispatch<React.SetStateAction<string>>;
	setCoords: React.Dispatch<React.SetStateAction<{}>>;
	setBounds: React.Dispatch<React.SetStateAction<{}>>;
	setFilteredPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
	setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
	setAutoComplete: React.Dispatch<React.SetStateAction<React.SyntheticEvent<HTMLInputElement, Event> | undefined>>;
	setChildClicked: React.Dispatch<React.SetStateAction<null>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
// initialState is an instance of TripContextState, therefore must have all properties in Trip
const initialState: TripContextData = {
	type: "Restaurants",
	rating: "",
	coords: {},
	bounds: {},
	filteredPlaces: [],
	places: [],
	autoComplete: undefined,
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
	const [type, setType] = useState("");
	const [rating, setRating] = useState("");

	const [coords, setCoords] = useState({});
	const [bounds, setBounds] = useState({});

	const [weatherData, setWeatherData] = useState([]);
	const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
	const [places, setPlaces] = useState<Place[]>([]);

	const [autoComplete, setAutoComplete] = useState<React.SyntheticEvent<HTMLInputElement, Event> | undefined>();
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

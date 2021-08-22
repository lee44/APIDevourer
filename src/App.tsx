import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header";
import TripAdvisor from "./components/tripAdvisor/TripAdvisor";
import { TripStateProvider } from "./context/TripStateProvider";

function App() {
	return (
		<TripStateProvider>
			<Router>
				<Header />
				<Switch>
					<Route path="/">
						<TripAdvisor />
					</Route>
				</Switch>
			</Router>
		</TripStateProvider>
	);
}

export default App;

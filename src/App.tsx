import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Nav/Header';
import { TripStateProvider } from './context/TripStateProvider';
import TripAdvisor from './pages/TripAdvisor';

function App() {
	return (
		<TripStateProvider>
			<Router>
				<Header />
				<Switch>
					<Route path='/'>
						<TripAdvisor />
					</Route>
				</Switch>
			</Router>
		</TripStateProvider>
	);
}

export default App;

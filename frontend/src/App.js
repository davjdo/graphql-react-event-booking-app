import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Redirect from="/" to="/auth" exact />
					<Route path="/auth" component={AuthPage} />
					<Route path="/events" component={EventsPage} />
					<Route path="/bookings" component={BookingsPage} />
				</Switch>
			</Router>
		);
	}
}

export default App;

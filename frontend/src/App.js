import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';
import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<Fragment>
					<MainNavigation />
					<main className="main-content">
						<Switch>
							<Redirect from="/" to="/auth" exact />
							<Route path="/auth" component={AuthPage} />
							<Route path="/events" component={EventsPage} />
							<Route path="/bookings" component={BookingsPage} />
						</Switch>
					</main>
				</Fragment>
			</Router>
		);
	}
}

export default App;

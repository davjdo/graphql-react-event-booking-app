import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';
import './App.css';

class App extends Component {
	state = {
		token: null,
		userId: null
	};

	login = (token, userId, tokenExpiration) => {
		this.setState({ token: token, userId: userId });
	};

	logout = () => {
		this.setState({ token: null, userId: null });
	};

	render() {
		return (
			<Router>
				<Fragment>
					<AuthContext.Provider
						value={{
							token: this.state.token,
							userId: this.state.userId,
							login: this.login,
							logout: this.logout
						}}
					>
						<MainNavigation />
						<main className="main-content">
							<Switch>
								{this.state.token && <Redirect from="/" to="/events" exact />}
								{this.state.token && <Redirect from="/auth" to="/events" exact />}
								{!this.state.token && <Route path="/auth" component={AuthPage} />}
								<Route path="/events" component={EventsPage} />
								{this.state.token && <Route path="/bookings" component={BookingsPage} />}
								{!this.state.token && <Redirect to="/auth" exact />}
							</Switch>
						</main>
					</AuthContext.Provider>
				</Fragment>
			</Router>
		);
	}
}

export default App;

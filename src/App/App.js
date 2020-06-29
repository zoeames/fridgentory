import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Categories from '../components/pages/Categories/Categories';
import Items from '../components/pages/Items/Items';

import fbConnection from '../helpers/data/connection';

fbConnection();

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  const routeChecker = (props) => (authenticated === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/categories', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  const routeChecker = (props) => (authenticated === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authenticated: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authenticated: true });
      } else {
        this.setState({ authenticated: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authenticated={authenticated}/>
            <div className="row">
              <Switch>
                <PrivateRoute path='/home' component={Home} authenticated={authenticated} />
                <PrivateRoute path='/categories' component={Categories} authenticated={authenticated} />
                <PrivateRoute path='/items' component={Items} authenticated={authenticated} />
                <PublicRoute path='/auth' component={Auth} authenticated={authenticated} />
                <Redirect from="*" to="/home"/>
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

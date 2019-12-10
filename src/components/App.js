import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
//import { MuiThemeProvider as V0MuiThemeProvider} from 'material-ui';
import Header from './Header';
import PostListContainer from './PostListContainer';
import PostContainer from './PostContainer';
import store from '../redux/store';
import './../style.scss';


const theme = createMuiTheme({
  /* theme for v1.x */
 });

export default class App extends PureComponent {
  _redirectToHome() {
    return <Redirect to="/" />;
  }

 

  render() {
    return (
     
      <Provider store={store}>
        <MuiThemeProvider  theme={theme}>
          <Router>
            <div>
              <Helmet>
                <title>Fajna stronka</title>
              </Helmet> 
              <Header />
              <Switch>
                <Route exact path="/" component={PostListContainer} />
                <Route path="/posts/:id/:slug" component={PostContainer} />

                 <Route render={this._redirectToHome} />
              </Switch>
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

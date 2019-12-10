import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createBrowserHistory as createHistory } from 'history'


export const history = createHistory();

export const height = 64;

export class Header extends PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func,
      length: PropTypes.number,
      push: PropTypes.func,
    }).isRequired,
  };


  _handleClick = () => {
    const { history: { goBack, length, push } } = this.props;
    length < 4 ? push('/') : goBack();
  };

  render() {
    const { location: { pathname } } = this.props;
    const isPost = pathname.indexOf('/posts/') !== -1;

    return (
        <AppBar position="fixed">
          <Toolbar>
            {
              isPost ? (
                <IconButton onClick={this._handleClick} edge="start"  style={{ color: 'white' }} >
                <ArrowBackIcon />
              </IconButton>
              ) : null
            }
            <Typography variant="h6"  >
            Landingi Blog Test
            </Typography>
          </Toolbar>
        </AppBar>
    );
  }
}



const HeaderWithRouter = withRouter(Header);
export default HeaderWithRouter;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { getFullYear } from '../helpers/utilities';
import Comments from './Comments';
import Container from '@material-ui/core/Container';

const footerHeight = 50;
const contentStyle = {
//  minHeight: `calc(100vh - ${headerHeight + footerHeight}px)`,
};
const footerStyle = {
  padding: 16,
}

const contenerStyle = {
  padding: 0,
  position: 'absolute',
  bottom: 0,
  width: '100%',
  boxSizing:'border-box'
}
const paperStyle = { 
  padding: '16px 0px 0px 0px',
  marginTop: 64,
};
const commentsStyle = { 
  padding: 16,
};

export default class Post extends PureComponent {
  static propTypes = {
    fetchPost: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    post: PropTypes.shape({
      content: PropTypes.string,
      date: PropTypes.instanceOf(Date),
      title: PropTypes.string,
    }),
    slug: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { fetchPost, id, post, slug } = this.props;
    if (!post) {
      fetchPost(id, slug);
    }
  }

  _renderProgress = () => {
    return (
      <div style={{ ...paperStyle, textAlign: 'center' }}>
        <br />
        <CircularProgress size={80} thickness={6} />
      </div>
    );
  };

  _renderPost = () => { 
    const { title, date, content } = this.props.post;
    return (
      <Container maxWidth="md">
          <Paper elevation={0} style={paperStyle}>
            <article >
              <h1>{title}</h1>
              <time dateTime={date}>{moment(date).fromNow()}</time>
              <br />
              <br />
              <Divider />
              {content && content
                .split('\n')
                .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </article>
            <Divider />
          </Paper>
      </Container>
    );
  };

  render() {
    return (
      <div>
        <div style={contentStyle}>
          {this.props.post ? this._renderPost() : this._renderProgress()}
        </div>

        <div style={commentsStyle}>
            <Comments
                id={this.props.post._id}
                comments={this.props.post.comments}
              />
        </div>
        <div style={contenerStyle}>
            <Divider />
            <Paper elevation={0} style={footerStyle}>
              <footer >Landingi Blog Test {getFullYear()}</footer>
            </Paper>
        </div>
      </div>
    );
  }
}



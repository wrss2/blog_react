import React, { Component } from 'react';
import moment from "moment";

import CommentForm from "./CommentForm";
import Container from '@material-ui/core/Container';

export default class Comments extends Component {




  renderCommentForm = () => {
      return <CommentForm id={this.props.id} />;
  };


  renderComments = () => {
    let listItems = [];
    let list = <ul>{listItems}</ul>

    if (this.props.comments) {
      let list = <ul>{listItems}</ul>
      sortCommensByDate(this.props.comments).map(comment => {
          listItems.push(
            <li  key={comment._id}>
              <p className="text-muted mb-1">
                Opublikowany przez {comment.createdBy} w {" "}
                {moment(comment.date).format("MM-DD-YY [at] HH:mm")}
              </p>
              <p >{comment.comment}</p>
            </li>
          )      
      });
      
    } else {
      list = (<div>
              <p>Bądź pierwszy i skomentuj...</p>
            </div>)
    }

    return list
  };




  render() {
    return (
      <Container maxWidth="md">
            <article>           
              <div>
                {this.renderCommentForm()}
              </div>
              <div style={{clear: 'both'}}>
                  {this.renderComments()}
              </div>
            </article>
      </Container>

    )
  }
}

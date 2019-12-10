import React, { Component } from 'react';
import { connect } from "react-redux";
import { startAddComment } from "../redux/actions";
import Button from '@material-ui/core/Button'
import {styles} from "../style.scss";


const formElement =  {
  display: 'block',
  width: '100%',
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.5',
  color: '#495057',
  backgroundColor: '#fff',
  backgroundClip: 'padding-box',
  border: '1px solid #ced4da',
  borderRadius: '0.25rem',
  transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  marginBottom: '10px'
}

export class CommentForm  extends Component {
      constructor(props) {
        super(props);

        this.state = {
          comment: "",
          error: ""
        };
      }




      onCommentChange = e => {
        this.setState({ comment: e.target.value });
      };
      renderError = () => {
        if (this.state.error) {
          return <div className="error-msg text-danger">{this.state.error}</div>;
        }
      };
      onSubmit = e => {
        e.preventDefault();

        const { comment } = this.state;
        if (comment.length > 300) {
          this.setState({ error: "Komentarz musi mieć maksylanie 300 znaków." });
        } else {
          this.setState({ error: "" });
          this.props.startAddComment(this.props.id, this.state.comment);
          this.setState({ comment: "" });
        }
      };
      render() {
        return (
          // <Container maxWidth="md">
          <div>
              <h1>Komentarze</h1>
                  {this.renderError()}
                  <form  onSubmit={this.onSubmit}>
                    <div>
                      <textarea 
                        style={formElement}
                        id="comment-textarea"
                        placeholder="Zostaw komentarz..."
                        onChange={this.onCommentChange}
                        maxLength={300}
                        rows="5"
                        value={this.state.comment}
                      />
                      <Button style={{float: 'right'}}  variant="contained" color="primary"  >Skomentuj</Button>
                    </div>
                  </form>
            </div>
        );
      }
}



const mapDispatchToProps = dispatch => ({
  startAddComment: (id, comment) => dispatch(startAddComment(id, comment))
});

export default connect(
  null,
  mapDispatchToProps
)(CommentForm);
import faker from 'faker';
import { capitalizeWords } from '../helpers/utilities';
import axios from "axios";

const {
  date: { past, recent },
  lorem: { paragraph, paragraphs, slug, words },
  random: { uuid },
} = faker;

export const FETCH_POSTS = 'FETCH_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

const recentDates = Array(50)
  .fill()
  .map(() => recent())
  .sort((date1, date2) => {
    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
    return 0;
  });

export const receivePosts = (count = 1, options = {}) => {
  const posts = Array(count)
    .fill()
    .map(() => {
      const summary = paragraph();
      return {
        id: options.id || uuid().split('-')[0],
        title: capitalizeWords(words()),
        summary,
        content: `${summary}\n${paragraphs()}`,
        date: recentDates.pop() || past(),
        slug: options.slug || slug(),
      };
    });
  return {
    type: RECEIVE_POSTS,
    posts,
  };
};

const POST_COUNT = 10;

export const fetchPosts = () => {
  return dispatch => {
    // emulate api request
    setTimeout(() => dispatch(receivePosts(POST_COUNT)), 1000);
  };
};

export const fetchPost = (id, slug) => {
  return dispatch => {
    // emulate api request
    setTimeout(() => dispatch(receivePosts(1, { id, slug })), 1000);
  };
};

export const addComment = (id, comment) => ({
  type: "ADD_COMMENT",
  id,
  comment
});

export const startAddComment = (id, comment) => {
  return async dispatch => {
    try {
      const { token } = JSON.parse(localStorage.getItem("auth"));
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/posts/${id}/comments`,
        method: "post",
        headers: {
          "x-auth": token
        },
        data: {
          comment
        }
      });

      dispatch(addComment(id, response.data));
    } catch (e) {
      throw new Error(e.response.data.error);
    }
  };
};
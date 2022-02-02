import { callRestApi } from '../../libs/api';

export const fetchPosts = () => async (dispatch, getState) => {
  const state = getState();
  const { appStore } = state;
  const { restApiBaseUrl } = appStore;

  let data = [];

  try {
    const response = await callRestApi('get', restApiBaseUrl, 'posts');

    data = response;
  } catch (err) {
    console.log(err);

    return [];
  }

  return data;
};

export const fetchComments = (postId) => async (dispatch, getState) => {
  const state = getState();
  const { appStore } = state;
  const { restApiBaseUrl } = appStore;

  let data = [];

  try {
    const response = await callRestApi('get', restApiBaseUrl, `posts/${postId}/comments`);

    data = response;
  } catch (err) {
    console.log(err);

    return [];
  }

  return data;
};

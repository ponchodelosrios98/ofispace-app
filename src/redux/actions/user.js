import types from '../../constants/actions';

export const userEntered = (payload) => ({
  type: types.RECEIVE_USER,
  payload,
});

export const userlogOut = (payload) => ({
  type: types.USER_LOGOUT,
  payload,
});

export const requestRecoverPassword = (payload) => ({
  type: types.REQUEST_RECOVER_PASSWORD,
  payload,
});

export const requestFacebookLogin = (payload) => ({
  type: types.REQUEST_FACEBOOK_LOGIN,
  payload,
});

export const checkUserLogin = () => ({
  type: types.CHECK_LOGIN,
});

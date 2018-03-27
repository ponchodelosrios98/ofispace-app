import { fork, takeEvery, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { sendFacebookRequest, postUserAndSignUp, notYeatCreatedAccount } from '../../data/facebook';
import { userEntered } from '../actions/user';

import types from '../../constants/actions';
import messages from '../../constants/messages';

function * handleRequestFacebookLogin(action) {
  const { data, error } = yield call(sendFacebookRequest);
  if (error !== undefined) {
    return Alert.alert(
      messages.errorHeader,
      error,
      [{ text: 'OK' }],
    );
  }
  console.log(data);
  if (data && data.status === 'notYetCreated') {
    console.log('in')
    const { response, createdError } =
      yield call(notYeatCreatedAccount, data.accessToken);
    console.log('error2');
    if (createdError !== undefined) {
      return Alert.alert(
        messages.errorHeader,
        createdError,
        [{ text: 'OK' }],
      );
    }
    const multiResponse = yield call(postUserAndSignUp, response);
    if (multiResponse.error !== undefined) {
      return Alert.alert(
        messages.errorHeader,
        multiResponse.error,
        [{ text: 'OK' }],
      );
    }
    yield put(userEntered(multiResponse.data));
    return action.payload.navigation.navigate('home');
  }

  yield put(userEntered(data));
  return action.payload.navigation.navigate('home');
}

function * watchUserActions() {
  yield takeEvery(
    types.REQUEST_FACEBOOK_LOGIN,
    handleRequestFacebookLogin,
  );
}

export default [
  fork(watchUserActions),
];

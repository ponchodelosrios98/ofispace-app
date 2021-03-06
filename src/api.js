const host = 'https://api.centralofiz.co';

const getHeader = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const postHeader = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

module.exports = {
  key: '@lookat:session',
  user: {
    registerToken(pushToken, token) {
      const url = `${host}/user/token?token=${pushToken}`;
      postHeader.headers.authorization = token;
      return fetch(url, postHeader);
    },
    login(data) {
      const url = `${host}/auth/login`;
      postHeader.body = JSON.stringify(data);
      return fetch(url, postHeader);
    },
    signUp(data) {
      const url = `${host}/user`;
      postHeader.body = JSON.stringify(data);
      return fetch(url, postHeader);
    },
    userInfo(token) {
      const url = `${host}/user`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
    resetPassword(mail) {
      const url = `${host}/reset/password?email=${mail}`;
      return fetch(url, postHeader);
    },
  },
  location: {
    actualCity({ latitude, longitude }) {
      const url = `${host}/cities/nearest?lat=${latitude}&&lng=${longitude}`;
      return fetch(url, getHeader);
    },
  },
  places: {
    byCity(id) {
      const url = `${host}/places/city?city=${id}`;
      return fetch(url, getHeader);
    },
  },
};

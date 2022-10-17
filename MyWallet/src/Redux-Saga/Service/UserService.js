import axios from 'axios';
import { Config } from '../Config';

const userApiClientBase = () =>
  axios.create({
    baseURL: Config.BASE_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 3000,
  });


function register(payload) {
  return userApiClientBase()
    .post('/v1/auth/register', payload)
    .then(response => {
      console.log("hhhhh" + response)
      return response;
    })
    .catch(function (error) {
      console.log("errrrr" + error)
    });
}
function login(payload) {
  return userApiClientBase()
    .post('/v1/auth/login/', payload)
    .then(response => {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

function update(payload) {
  return userApiClientBase()
    .put('/v1/user/update/password/' + payload.id, payload.data)
    .then(response => {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}
export const userService = {
  register,
  login,
  update

};
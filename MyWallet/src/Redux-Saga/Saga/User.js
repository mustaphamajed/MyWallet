import { put, call } from 'redux-saga/effects';
import UserTypes from '../Store/User/Actions';
import { userService } from '../Service/UserService';
import Toast from 'react-native-simple-toast'
import NavigationService from '../Service/NavigationService'

export function* register(action) {
  const response = yield call(userService.register, action.payload);

  if (response.status == 200) {
    Toast.show('User  Created successfully');

    NavigationService.navigateAndReset('Login');
  } else {

    Toast.show('server erreur');
  }
}

export function* login(action) {
  const response = yield call(userService.login, action.payload);

  if (response.status == 200) {
    yield put(UserTypes.loginSuccess(response.data));
    console.log(response.data.haveWallet)
    if (response.data.haveWallet) {
      NavigationService.navigateAndReset('Drawer')
    } else {
      NavigationService.navigateAndReset('FirstScreen')
    }




  } else {

    Toast.show('Incorrect identifiers');
  }
}

export function* update(action) {
  const response = yield call(userService.update, action.payload);

  if (response.status == 200) {

    Toast.show('password updated succefully');
    NavigationService.navigateAndReset('Login')


  } else {

    Toast.show('une erreur est survenu try again!');
  }
}

export function* logout() {
  NavigationService.navigateAndReset('Login')
  yield put(UserTypes.logout());
}
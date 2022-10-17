
import { put, call } from 'redux-saga/effects';

import { categorieService } from '../Service/CategorieService';

import Toast from 'react-native-simple-toast';
import CategorieTypes from '../Store/Categorie/Actions';
import NavigationService from '../Service/NavigationService';
export function* newCategorie(action) {
    const response = yield call(categorieService.newCategorie, action.payload);

    if (response) {
        yield put(CategorieTypes.fetchSuccess(response.data))
        NavigationService.back()

    } else {
        Toast.show('un erreur est survenu');
    }
}

export function* fetch() {
    const response = yield call(categorieService.getAll);

    if (response.status === 200) {

        yield put(CategorieTypes.fetchSuccess(response.data))
    } else {
        console.log(response)
    }

}

export function* updateCategorie(action) {
    const response = yield call(categorieService.updateCat,action.payload);

    if (response.status === 200) {
        console.log(response.data)
        yield put(CategorieTypes.fetchSuccess(response.data))
        NavigationService.back()
    } else {
        console.log(response)
    }

}
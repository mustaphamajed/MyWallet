import React from 'react';
import { StackActions, CommonActions } from '@react-navigation/native';

let navigator;
function setTopLevelNavigator(navigatorRef) {
    navigator = navigatorRef;
}


function navigate(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

function back() {
    navigator.dispatch(CommonActions.goBack());
}

function navigateAndReset(routeName, params) {
    navigator.dispatch(
        CommonActions.reset({
            index: 1,
            routes: [{ name: routeName }, { name: routeName, params: params }],
        })
    );
}

export default {
    navigate,
    back,
    navigateAndReset,
    setTopLevelNavigator,
};

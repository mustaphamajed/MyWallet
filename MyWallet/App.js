import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import Navigation from './src/navigations';
import createStore from './src/Redux-Saga/Store/';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationService from './src/Redux-Saga/Service/NavigationService';


LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  const { store, persistor } = createStore();
  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <NavigationContainer
          independent={true}
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        >
          <Navigation />
        </NavigationContainer>


      </PersistGate>

    </Provider>


  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  }
})
export default App;
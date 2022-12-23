import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import {Provider} from 'react-redux';
import {store, persistor} from './Components/Redux1/Form/Store';
import {PersistGate} from 'redux-persist/integration/react';
import TodoHome from './Components/TodoHome';
import TodoList from './Components/TodoList';
import TodoCreate from './Components/TodoCreate';
import TodoUpdate from './Components/TodoUpdate';
import TodoDogList from './Components/TodoDogList';
import TodoDogBreedImage from './Components/TodoDogBreedImage';
import Demo from './Components/Demo';
import Demo2 from './Components/Demo2';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'rgb(245, 159, 159)',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            <Stack.Screen name="Home" component={TodoHome} />
            <Stack.Screen name="Create" component={TodoCreate} />
            <Stack.Screen name="List" component={TodoList} />
            <Stack.Screen name="Update" component={TodoUpdate} />
            <Stack.Screen name="dogList" component={TodoDogList} />
            <Stack.Screen name="dogImage" component={TodoDogBreedImage} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>

    // <Demo></Demo>

    // <Demo2></Demo2>
  );
};
export default App;

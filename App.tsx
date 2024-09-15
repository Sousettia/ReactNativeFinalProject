import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './Screens/WelcomeScreen';
import LogInScreen from './Screens/LogInScreen';
import CreateAccout1 from './Screens/CreateAccout1';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LogInScreen} />
        <Stack.Screen name="CreateAccout1" component={CreateAccout1}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

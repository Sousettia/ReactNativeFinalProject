import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './Screens/WelcomeScreen';
import LogInScreen from './Screens/LogInScreen';
import CreateAccount1 from './Screens/CreateAccount1';
import CreateAccount2 from './Screens/CreateAccount2';
import CreateProfileScreen from './Screens/CreateProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
        headerStyle:{backgroundColor:'#417F85'},
        headerTitleStyle:{fontWeight:'bold'},
        }} >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LogInScreen} />
        <Stack.Screen name="CreateAccount1" component={CreateAccount1}/>
        <Stack.Screen name="CreateAccount2" component={CreateAccount2}/>
        <Stack.Screen name="CreateProfile" component={CreateProfileScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

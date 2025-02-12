import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import {Login,SignUp} from './Screens/Auth//index';
import { Create, Feed, Modify } from './Screens/Tasks';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './Redux/store';
import TaskView from './Screens/Tasks/ViewTask/ViewTask';


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
<Provider store={store}> 
     <PaperProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Feed" component={Feed} />
          <Stack.Screen name="Create" component={Create} />
          <Stack.Screen name="Modify" component={Modify} />
          <Stack.Screen name="View" component={TaskView} />
      </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

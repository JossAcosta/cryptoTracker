
import React, { Component }  from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CoinsStack from './src/components/coins/CoinsStack';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Bank from "./src/assets/bank.png";
import Star from "./src/assets/star.png";
import FavoritesStack from './src/components/favorites/FavoritesStack';
import LoginScreen from './src/components/login/LoginScreen';
import CoinsScreen from './src/components/coins/CoinsScreen';
import CoinDetailScreen from './src/components/coins/CoinDetailScreen';

import Colors  from './src/res/colors';

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
      <Tab.Navigator
      tabBarOptions={{
        tintColor:"#fff",
        style:{
          backgroundColor: Colors.almostBlack
        }
      }}
    >
        <Tab.Screen 
          name= "Coins"
          component={CoinsStack}
          options={{
            tabBarIcon:({size, color}) => (
              <Image 
              style={{ tintColor : color, width: size, height:size}}
              source={Bank} />
            )
          }}
        />
        <Tab.Screen 
          name= "Favorites"
          component={FavoritesStack}
          options={{
            tabBarIcon:({size, color}) => (
              <Image 
              style={{ tintColor : color, width: size, height:size}}
              source={Star} />
            )
          }}
        />
    </Tab.Navigator> 
    );
}

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Coins" component={CoinsScreen} />
      <Stack.Screen name="CoinDetail" component={CoinDetailScreen} />
    </Stack.Navigator>
  );
}

const App = () => {
  const isSignedIn = false;
  return (   
    <NavigationContainer>
        <HomeStack.Navigator 
          initialRouteName="Login"
          screenOptions={ {
            headerStyle: {
                backgroundColor: Colors.blackPearl,
                shadowColor: Colors.blackPearl
            },
            headerTintColor:Colors.white
          }}>
              <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
              <Stack.Screen options={{headerShown: false}} name="MyTabs" component={MyTabs} />
        </HomeStack.Navigator>
    </NavigationContainer>

  );
};


export default App;

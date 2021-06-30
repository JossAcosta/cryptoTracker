
import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CoinsStack from './src/components/coins/CoinsStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Bank from "./src/assets/bank.png";
import Star from "./src/assets/star.png";
import FavoritesStack from './src/components/favorites/FavoritesStack';

import Colors  from './src/res/colors';

const Tabs = createBottomTabNavigator();

const App = () => {
 
  return (
    <NavigationContainer>

      <Tabs.Navigator
        tabBarOptions={{
          tintColor:"#fff",
          style:{
            backgroundColor: Colors.almostBlack
          }
        }}
      >
        <Tabs.Screen 
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
        <Tabs.Screen 
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
      </Tabs.Navigator>
    </NavigationContainer>
  );
};



export default App;

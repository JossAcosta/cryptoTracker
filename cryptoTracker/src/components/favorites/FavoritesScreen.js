import React, { Component } from 'react';
import { ScrollView, FlatList, StyleSheet, Text, View, } from 'react-native';
import Chart from '../charts/Chart';
import CoinsItem from '../coins/CoinsItem';
import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from '../../res/colors';

import Storage from '../../libs/storage';

class FavoritesScreen extends Component {

    state = {
        favorites:[]
    }

    getFavorites = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys();

            const keys = allKeys.filter((key)=> key.includes("favorite-"));
            
            const favs = await Storage.instance.multiGet(keys);
            
            const favorites = favs.map(fav => JSON.parse(fav[1]));

            this.setState({ favorites });
        
        } catch (err) {
            
            console.log("get favorites err", err);
            
        }
    }

    handlePress = (coin) => {
        this.props.navigation.navigate("CoinDetail", {coin});
    }
    
    componentDidMount(){
        this.props.navigation.addListener("focus", this.getFavorites);
    }

    componentWillUnmount(){
        this.props.navigation.removeListener("focus", this.getFavorites);
    }

    render() {

        const { favorites } = this.state;

        return (
            <View  style={styles.container}>
                {
                    favorites.length == 0 ?
                        <FavoritesEmptyState />
                        : null
                }

                {
                    favorites.length > 0 ?
                    <View  style={styles.container}>
                        <FlatList 
                            data={favorites}
                            renderItem= {({item}) =>
                                <CoinsItem item={item} onPress={()=> this.handlePress(item)}/>
                            }
                        />
                        <ScrollView >
                           <View style={styles.chartContainer}>
                                <Text style={styles.chartTitle}>Social Media Stats</Text>
                                 <View style={{ paddingLeft:24}}>
                                    <Chart favorites={this.state.favorites}/>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    : null
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.charade,
      flex: 1,
    },
    chartContainer:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom:16,
    },
    chartTitle:{
        color: Colors.white,
        fontWeight: 'bold',
        fontSize:20,
        
      }
  });

export default FavoritesScreen;

import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CoinsItem from '../coins/CoinsItem';
import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from '../../res/colors';

class FavoritesScreen extends Component {

    state = {
        favorites:[]
    }

    getFavorites = async () => {
        try {
            const allKeys = Storage.instance.getAllKeys();

            const keys = allKeys.filter((key)=> key.includes("favorite-"));
            
            const favs = await Storage.instance.multiGet(keys);
            
            const favorites = favs.map(fav => Json.parse(fav[1]));

            this.setState({ favorites });
        
        } catch (err) {
            
            console.log("get favorites err", err);
            
        }
    }

    handlePress = (coin) => {
        this.props.navigation.navigate("CoinDetai", {coin});
    }
    
    componentDidMount(){
        this.getFavorites();
    }

    componentWillUnmount(){
        this.props.navigation.removeListener("focus", this.getFavorites);
    }

    render() {

        const { favorite } = this.favorites;

        return (
            <View  style={styles.container}>
                {
                    favorites.length == 0 ?
                        <FavoritesEmptyState />
                        : null
                }

                {
                    favorites.length > 0 ?
                    <FlatList 
                        data={favorites}
                        renderItem= {({item}) =>
                            <CoinsItem item={item} onPress={()=> this.handlePress(item)}/>
                        }
                    />
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
  });

export default FavoritesScreen;

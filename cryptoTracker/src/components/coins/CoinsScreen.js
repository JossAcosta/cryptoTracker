import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';
import Colors from '../../res/colors';
import CoinsSearch from './CoinsSearch';

class CoinsScreen extends Component {

    state = {
        coins:[],
        allCoins:[],
        loading:false
    }

    componentDidMount = async () => {
        this.getCoins();
    }

    getCoins = async () => {
        this.setState({ loading: true })
        const res = await Http.instance.get("https://api.coinlore.net/api/tickers");
        // console.log(coins);
        this.setState({ coins: res.data, allCoins: res.data, loading: false});
    }

    handlePress = (coin) => {
        console.log("go to detail", this.props);
        this.props.navigation.navigate('CoinDetail', {coin});
    }

    handleSearch = (query) => {
        const { allCoins } = this.state;
        const coinsFiltered = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) || coin.symbol.toLowerCase().includes(query.toLowerCase())
        });

        this.setState({ coins: coinsFiltered});
    }

    render() {
        const { coins, loading } = this.state;
        return(
            <View style={styles.container}>
                <CoinsSearch onChange={this.handleSearch}/>
                {loading ?
                     <ActivityIndicator style={styles.loader} color="#fff" size="large" /> 
                    : null 
                }

                {/* <Text style={styles.titleText}>CoinsScreen</Text>
                <Pressable style={styles.btn} onPress={this.handlePress}>
                    <Text style={styles.btnText}>
                        Ir a detail
                    </Text>
                </Pressable> */}
                <FlatList 
                    data={coins}
                    renderItem= { ({ item }) => 
                        <CoinsItem item={item} 
                        onPress = { () => this.handlePress(item)}/>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.blackPearl
    },
    titleText: {
        textAlign: 'center'
    },
    btn: {
        padding: 0,
        backgroundColor: 'yellow',
        borderRadius: 8,
        margin: 16
    },
    btnText: {
        color: 'white',
        textAlign: 'center'
    }
})

export default CoinsScreen;
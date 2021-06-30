import React, { Component } from 'react';
import { View, Text, Image,StyleSheet, SectionList, FlatList, Pressable, Alert } from 'react-native';
import Http from '../../libs/http';
import Colors from '../../res/colors';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../../libs/storage';

class CoinDetailScreen extends Component {

    state ={
        coin:{},
        markets:[],
        isFavorite: false
    }

    toggleFavorite = () =>{
      if(this.state.isFavorite){
        this.removeFavorite()
      }else{
        this.addFavorite()
      }
    }

    addFavorite = async () => {
      const coin = JSON.stringify(this.state.coin);
      const key = `favorite-${this.state.coin.id}`;

      const stored = await Storage.instance.store(key,coin)

      if(stored){
        this.setState({isFavorite:true});
      }
    }

    removeFavorite = async () => {
      Alert.alert("Remove favorite", "Are you sure?",[
        {
          text:"cancel",
          onPress: async ()=>{},
          style:"cancel"
        },
        {
          text:"remove",
          onPress: async ()=>{
            const key = `favorite-${this.state.coin.id}`;
            await Storage.instance.remove(key);
            this.setState({ isFavorite: false });
          },
          style:"destructive"
        }
      ]);
      
    }

    getFavorite = async () => {
      try {
        const key = `favorite-${this.state.coin.id}`;
  
        const favStr = await Storage.instance.get(key);
  
        if(favStr != null) {
          this.setState({ isFavorite: true });
        }
  
      } catch(err) {
        console.log("get favorites err", err);
      }
  
    }

    getSymbolIcon =(nameid) => {

        if(nameid){
            // const symbol = nameid.toLowerCase().replace(" ","-")
            console.log(nameid);
            return `https://c1.coinlore.com/img/25x25/${nameid}.png`
        }
    }

    getSections = (coin) => {
        const sections = [
            {
                title: "Market cap",
                data: [ coin.market_cap_usd]
            },
            {
                title: "Volume 24h",
                data: [ coin.volume24]
            },
            {
                title: "Change 24h",
                data: [ coin.percent_change_24h]
            },
        ];
        return sections;
    }

    getMarkets = async (coinId) => {
      const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`
      const markets = await Http.instance.get(url);
      this.setState({markets})
    }

    componentDidMount(){
        console.log("coin", this.props.route.params);
        const { coin } = this.props.route.params;
        this.props.navigation.setOptions({ title: coin.symbol})
        this.getMarkets(coin.id);
        this.setState({ coin }, () => {
          this.getFavorite();
        });
    }

    render(){

        const { coin, markets, isFavorite } = this.state;

        return (
            <View style={styles.container} >
                <View style={styles.subHeader}>
                  <View style={styles.row}>
                    <Image  style={styles.iconImg} source={{uri: this.getSymbolIcon(coin.nameid)}}/>
                    <Text style={styles.titleText}>{coin.name}</Text>
                  </View>

                  <Pressable
                    onPress={this.toggleFavorite}
                    style={[
                      styles.btnFavorite,
                      isFavorite ?
                      styles.btnFavoriteRemove :
                      styles.btnFavoriteAdd
                    ]}>
                    <Text style={styles.btnFavoriteText}>{ isFavorite ? "Remove favorite" : "Add favorite"}</Text>
                </Pressable>  

                </View>             
                <SectionList
                    style={styles.section}
                    sections={this.getSections(coin)}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => 
                    <View style={styles.sectionItem}>
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                    }
                    renderSectionHeader={({ section }) => 
                      <View style={styles.sectionHeader}>
                        <Text style={styles.sectionText} >{section.title}</Text>
                      </View>
                    }
                />

                <Text style={styles.marketsTitle}>Markets</Text>

                <FlatList 
                  style={styles.list}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                  data={markets}
                  renderItem={({item}) => <CoinMarketItem item={item}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.charade,
      justifyContent:"space-between"
    },
    row: {
      flexDirection: "row"
    },
    subHeader: {
      backgroundColor: 'rgba(0,0,0,0.1)',
      padding: 16,
      flexDirection: 'row',
      fontSize:44,
      justifyContent:"center"
    },
    titleText: {
      fontSize: 16,
      color: Colors.white,
      fontWeight: 'bold',
      marginLeft: 8,
      fontSize:40,
    },
    iconImg: {
      height: 40,
      width: 40,
      alignSelf:"center"
    },
    section:{
      maxHeight:220
    },
    list:{
      maxHeight:100,
      paddingLeft:16
    },
    sectionHeader: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      padding: 8,
    },
    sectionItem: {
      padding: 8,
    },
    itemText: {
      color: Colors.white,
      fontSize: 14,
      alignSelf:"center"
    },
    sectionText: {
      color: Colors.white,
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf:"center"
    },
    marketsTitle:{
      color:"#fff",
      fontSize:18,
      fontWeight: 'bold',
      margin:16

    }, 
    btnFavorite: {
      padding: 4,
      borderRadius: 8,
      marginLeft:20,
      height: 30,
      alignSelf:"center"
    },
    btnFavoriteText: {
      color: Colors.white
    },
    btnFavoriteAdd: {
      backgroundColor: Colors.picton
    },
    btnFavoriteRemove: {
      backgroundColor: Colors.carmine
    }
  });
export default CoinDetailScreen;
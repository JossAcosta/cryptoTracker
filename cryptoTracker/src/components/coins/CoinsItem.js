import React from 'react';
import { View, Text,  StyleSheet, Image,Platform, Pressable } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ArrowDown from "../../assets/arrow_down.png"
import ArrowUp from "../../assets/arrow_up.png"

const CoinsItem = ({item, onPress}) => {

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.symbolText}> {item.symbol} </Text>
                <Text style={styles.nameText}> {item.name} </Text>
                <Text style={styles.priceText}>{`$${item.price_usd}`} </Text> 
            </View>     
            
            <View style={styles.row}>
                <Text style={item.percent_change_1h>0? styles.percentTextUp : styles.percentTextDown}> {item.percent_change_1h} </Text> 
                <Image  style={styles.imageIcon} source ={item.percent_change_1h>0?ArrowUp:ArrowDown}/>            
            </View>    
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        padding:16,
        borderBottomColor: "#62666B",
        borderBottomWidth:2,
        marginLeft: Platform.OS == "ios" ? 16 : 0
    },
    row:{
        flexDirection:"row",
    },
    symbolText:{
        color:"#fff",
        fontWeight:"bold",
        fontSize:16,
        marginRight:12,
        width: 60
    },
    nameText:{
        color:"#fff",
        fontSize:14,
        marginRight:16
    },
    priceText:{
        color:"#fff"
    },
    percentTextUp:{
        color:"#66b266",
        fontSize:12,
        marginRight:8
    },
    percentTextDown:{
        color:"#ff6666",
        fontSize:12,
        marginRight:8
    },
    imageIcon:{
        width:22,
        height:22
    }
})

export default CoinsItem

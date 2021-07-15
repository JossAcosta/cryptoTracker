
import React, { useState, useEffect } from "react";
import { VictoryAxis, VictoryBar,  VictoryChart,VictoryGroup,  VictoryTheme } from "victory-native";
import Http from '../../libs/http';

const Chart = ({favorites}) => {

  const [state, setState] = useState({ symbols:[], twitterData:[], redditData:[] });

  const getSocialMediaStats = async ( { id, symbol } )=> {
    const url = `https://api.coinlore.net/api/coin/social_stats/?id=${id}`
    const { twitter, reddit } = await Http.instance.get(url);
    
    return {
      symbol,
      twitter: {x: symbol, y: twitter.followers_count},
      reddit: {x: symbol, y: reddit.subscribers},
    };
  }; 

  // Promise.all(favorites.map(getSocialMediaStats))
  //     .then((data) =>{
  //       const symbols = data.map( ({ symbol }) => symbol );
  //       const twitterData = data.map(({ twitter })=> twitter);
  //       const redditData = data.map(({ reddit })=> reddit);
  //       const newArray = {symbols, twitterData, redditData}

  //       console.log(newArray);
  //     })

  useEffect(()=> {
    if (state.symbols.length > 0) return;

    Promise.all(favorites.map(getSocialMediaStats))
      .then((data) =>{
        console.log(data)
        const symbols = data.map( ({ symbol }) => symbol );
        const twitterData = data.map(({ twitter })=> twitter);
        const redditData = data.map(({ reddit })=> reddit);
        setState({symbols, twitterData, redditData} ) 
      })
  })
      
    return (
      <VictoryChart  theme={VictoryTheme.material} >
        <VictoryGroup horizontal
          offset={10}
          style={{ data: { width: 6 } }}  
        >
          <VictoryBar 
            style={{ data: { fill: 'lightblue', strokeWidth: 5 } }}
            data={state.twitterData}
          />
          <VictoryBar 
            style={{ data: { fill: "tomato", strokeWidth: 5 } }}
            data={state.redditData}
          />
          {/* <VictoryAxis
            standalone={false}  
            tickValues={state.symbols}
          />
          <VictoryAxis dependentAxis /> */}
        </VictoryGroup>
      </VictoryChart>
          
    );
}


export default Chart
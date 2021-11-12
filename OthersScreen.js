import React from 'react';
import {View, Text} from 'react-native';
import {useValue} from './ValueContext';

export default function AboutScreen(){
  const {currentValue} = useValue();
  const name = currentValue.name;
  return(
    <View>
      <Text style={{marginTop:40,fontSize:20}}>To be continued...</Text>
      <Text> @Copyright {name} </Text>
    </View>
  )
}

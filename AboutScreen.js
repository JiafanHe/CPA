import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {useValue} from './ValueContext';



export default function AboutScreen(){
  const {currentValue} = useValue();
  const name = currentValue.name;

  return(
    <ScrollView>
      <View>

          <Text style={{marginTop:40,fontSize:20,marginLeft:10}}>Hello, I'm {name}. This app is designed for civil engineers.🔥 </Text>

          <Text style={{marginTop:40,fontSize:20,marginLeft:10,marginBottom:20}}>In real life, the load compositions are extremely complicated. But we can decompose them into
          differen loads. The formula of each case is listed below.</Text>

          <View style={{flexDirection:'column',alignItems:'center'}}>
            <Image
              style={{
                height:300,
                width:"90%",
                resizeMode: 'stretch',
                marginBottom:0
              }}
              source={require('./Image/LoadingCases.png')}
            />

            <Image
              style={{
                height:150,
                width:"90%",
                resizeMode: 'stretch',
                marginTop:0}}
              source={require('./Image/LoadingCases2.png')}
            />
          </View>



      </View>
    </ScrollView>
  )
}

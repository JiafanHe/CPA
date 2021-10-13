import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, Image, TextInput, SafeAreaView} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';




function HomeScreen() {

  const [P,setP] = useState(0);
  const [w,setw] = useState(0);
  const [L,setL] = useState(0);
  const [f_1y,setf_1y] = useState(0);
  const [f_2y,setf_2y] = useState(0);
  const [m_1,setm_1] = useState(0);
  const [m_2,setm_2] = useState(0);
  const [inputP, setInputP] = useState("");
  const [inputw, setInputw] = useState("");
  const [inputL, setInputL] = useState("");



  function setDefault(){
    setf_1y(0)
    setf_2y(0)
    setm_1(0)
    setm_2(0)
    setP(0)
    setL(0)
    setw(0)
  }

  useEffect(() => {getData()}
           ,[])


  const getData = async () => {
    try {
          const jsonValue = await AsyncStorage.getItem('lastResult')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setf_1y(data.f_1y)
            setf_2y(data.f_2y)
            setm_1(data.m_1)
            setm_2(data.m_2)
            setP(data.P)
            setL(data.L)
            setw(data.w)
          } else {
            setDefault()
          }
        } catch(e) {
          console.dir(e)
        }
  }

  const storeData = async (value) => {
    try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('lastResult', jsonValue)
        } catch (e) {
          console.dir(e)
        }
  }

  const clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          console.dir(e)
        }
  }

  const resetInputField = () => {
    setInputP("");
    setInputL("");
    setInputw("");
  };




  return (

      <View style={styles.container}>

        <View style={styles.introduce}>

          <Text style={styles.introText}>
            Single element equivalent joint forces f_0 for different types of loads
          </Text>

          <Image
            style={styles.introImage}
            source={require('./Image/image.png')}
          />

        </View>


        <View style={styles.body}>
          <Text style={styles.bodyHeading}>
            Loading Case:
          </Text>
          <View style={{justifyContent: 'center',alignItems: 'center',}}>
            <Image
              style={styles.loadingImage}
              source={require('./Image/loadingCase1.png')}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.parameter}>P : </Text>
            <TextInput
              style={styles.parameter}
              placeholder="Value of P"
              onChangeText={text =>{
                setInputP(text)
                setP(parseFloat(text))
              }}
              value={inputP}
            />

            <Text style={styles.parameter}>L : </Text>
            <TextInput
              style={styles.parameter}
              placeholder="Value of L"
              onChangeText={text =>{
                setL(parseFloat(text))
                setInputL(text)
              }}
              value={inputL}
            />
            <Button
              color='#93B5C6'
              title='Calculate force'
              onPress = {
                () =>
                    { setf_1y(f_1y-P/2);
                      setf_2y(f_2y-P/2);
                      setm_1(m_1-P*L/8);
                      setm_2(m_2+P*L/8);
                    }
              }
            />
          </View>


          <View style={{justifyContent: 'center',alignItems: 'center',}}>
            <Image
              style={styles.loadingImage}
              source={require('./Image/loadingCase2.png')}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.parameter}>w : </Text>
            <TextInput
              style={styles.parameter}
              placeholder="Value of w"
              onChangeText={text =>{
                setw(parseFloat(text))
                setInputw(text)
              }}
              value={inputw}
            />

            <Text style={styles.parameter}>L : </Text>
            <TextInput
              style={styles.parameter}
              placeholder="Value of L"
              onChangeText={text =>{
                setL(parseFloat(text))
                setInputL(text)
              }}
              value={inputL}
            />
            <Button
              color='#93B5C6'
              title='Calculate force'
              onPress = {
                () =>
                    { setf_1y(f_1y-w*L/2);
                      setf_2y(f_2y-w*L/2);
                      setm_1(m_1-w*L^2/12);
                      setm_2(m_2+w*L^2/12);
                    }
              }
            />
          </View>

          <View style={styles.output}>
            <Text style={styles.parameter}>L : {L}</Text>
            <Text style={styles.parameter}>P : {P}</Text>
            <Text style={styles.parameter}>w : {w}</Text>
            <Text style={styles.parameter}>f_1y : {f_1y}</Text>
            <Text style={styles.parameter}>m_1 : {m_1}</Text>
            <Text style={styles.parameter}>f_2y : {f_2y}</Text>
            <Text style={styles.parameter}>m_2 : {m_2}</Text>
          </View>

          <View style={styles.dataButton}>
            <Button
              color='#93B5C6'
              title='Store Data'
              onPress = {
                () =>{storeData({f_1y,f_2y,m_1,m_2,P,L,w})}
              }
            />
          </View>

          <View style={styles.dataButton}>
            <Button
              color='#93B5C6'
              title='Reset'
              onPress = {
                () =>{
                  clearAll();
                  setDefault();
                  resetInputField();
                }
              }
            />
          </View>

        </View>

      </View>

  );
};

function AboutScreen(){
  return(
    <View>
      <Text>Hello, I'm Jiafan He. This app is designed for civil engineers.🔥 </Text>
    </View>
  )
}

function OthersScreen(){
  return(
    <View>
      <Text>To be continued...</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Others" component={OthersScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introduce: {
    flex: 3,
    width:'100%',
    flexDirection:'column',
    backgroundColor: '#6D8299',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introText: {
    fontSize:25,
    fontWeight:"bold",
    color:'#fff',
    marginBottom:30,
  },
  introImage:{
    height:180,
    width:500,
    resizeMode: 'stretch',
  },
  body:{
    flex: 7,
    width:'70%',
    backgroundColor: '#fff',
    flexDirection:'column',
  },
  bodyHeading:{
    fontWeight:"bold",
    fontSize:20,
    marginTop:40,
  },
  loadingImage:{
    height:150,
    width:500,
    resizeMode: 'stretch',
    marginTop:20,
  },
  input:{
    flexDirection:'row',
    marginBottom: 30,
  },
  parameter:{
    flex:1,
    fontSize:20,
  },
  output:{
    marginTop:30,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataButton:{
    marginTop:30,
  }
});

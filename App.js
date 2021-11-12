import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, Image, TextInput, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AboutScreen from './AboutScreen';
import OthersScreen from './OthersScreen';
import ValueProvider from './ValueContext';




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
  const [title, setTitle] = useState("");
  const [outputs, setOutputs] = useState([]);



  function setDefault(){
    setf_1y(0)
    setf_2y(0)
    setm_1(0)
    setm_2(0)
    setP(0)
    setL(0)
    setw(0)
    setTitle("");
    setOutputs([]);
  }

  useEffect(() => {getData()}
           ,[])


  const getData = async () => {
    try {
          const jsonValue = await AsyncStorage.getItem('outputs')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setOutputs(data)
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
          await AsyncStorage.setItem('outputs', jsonValue)
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

  const renderOutputs= ({item}) => {
    return (
      <View style={styles.list}>
           <Text>{item.title}</Text>
           <Text>{item.L} </Text>
           <Text>{item.P} </Text>
           <Text>{item.w} </Text>
           <Text>{item.f_1y} </Text>
           <Text>{item.m_1} </Text>
           <Text>{item.f_2y} </Text>
           <Text>{item.m_2} </Text>
      </View>
    )
  }

  const resetInputField = () => {
    setInputP("");
    setInputL("");
    setInputw("");
    setTitle("");
  };

  const createOutput = () => {
    const newOutput = outputs.concat({
      'title':title,
      'L':L,
      'P':P,
      'w':w,
      "f_1y":f_1y,
      "m_1":m_1,
      "f_2y":f_2y,
      "m_2":m_2
    });
    setOutputs(newOutput);
    storeData(newOutput);

  }

  const OutputTemplate = ({body}) =>{
    return (
      <View style={{  marginTop:5,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',}}>
        {body}
      </View>
    )
  }


  return (
    <ScrollView>
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
          <View style={{flexDirection:"row"}}>
            <Text style={styles.bodyHeading}>
              Loading Case:
            </Text>
            <TextInput
              style={{fontSize:18,marginTop:20}}
              placeholder=" Project Title"
              onChangeText={text =>{
                setTitle(text);
              }}
              value={title}
            />
          </View>
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
              placeholder="/"
              onChangeText={text =>{
                setInputP(text)
                setP(parseFloat(text))
              }}
              value={inputP}
            />

            <Text style={styles.parameter}>L : </Text>
            <TextInput
              style={styles.parameter}
              placeholder="/"
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
              placeholder="/"
              onChangeText={text =>{
                setw(parseFloat(text))
                setInputw(text)
              }}
              value={inputw}
            />

            <Text style={styles.parameter}>L : </Text>
            <TextInput
              style={styles.parameter}
              placeholder="/"
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


          <OutputTemplate body={
              <Text style={styles.outputParameter}>L : {L}</Text>
          } />
          <OutputTemplate body={
              <Text style={styles.outputParameter}>P : {P}</Text>
          } />
          <OutputTemplate body={
              <Text style={styles.outputParameter}>w : {w}</Text>
          } />
          <OutputTemplate body={
              <Text style={styles.outputParameter}>f_1y : {f_1y}</Text>
          } />
          <OutputTemplate body={
              <Text style={styles.outputParameter}>m_1 : {m_1}</Text>
          } />
          <OutputTemplate body={
              <Text style={styles.outputParameter}>f_2y : {f_2y}</Text>
          } />
          <OutputTemplate body={
              <Text style={styles.outputParameter}>m_2 : {m_2}</Text>
          } />




          <View style={styles.dataButton}>
            <Button
              color='#93B5C6'
              title='Store Data'
              onPress = {
                () =>{
                  createOutput();
                }
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

          <View style={{flexDirection:'row',
                    justifyContent:'center',
                    backgroundColor:'#93B5C6',
                    marginTop:15,
                    marginBottom:15}}>
          <Text style={{fontSize:18,color:'white',backgroundColor:'#93B5C6',padding:5}}>
                  History of outputs
             </Text>
          </View>

          <View style={{flexDirection:'row',
                    justifyContent:'center',
                    backgroundColor:'#93B5C6',
                    marginTop:15}}>
            <Text style={styles.history}>
              title
            </Text>
            <Text style={styles.history}>
              L
            </Text>
            <Text style={styles.history}>
              P
            </Text>
            <Text style={styles.history}>
              w
            </Text>
            <Text style={styles.history}>
              f_1y
            </Text>
            <Text style={styles.history}>
              m_1
            </Text>
            <Text style={styles.history}>
              f_2y
            </Text>
            <Text style={styles.history}>
              m_2
            </Text>
          </View>
          <FlatList
            data={outputs}
            renderItem={renderOutputs}
            keyExtractor={item => item.title}
          />



        </View>

      </View>

    </ScrollView>
  );
};





const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <ValueProvider value={{name:"Jiafan He"}}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{headerShown:false}}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="About" component={AboutScreen} />
          <Tab.Screen name="Others" component={OthersScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ValueProvider>
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
    paddingBottom:'3%'
  },
  introText: {
    width:'70%',
    fontSize:20,
    fontWeight:"bold",
    color:'#fff',
    paddingTop:'20%',
    marginBottom: '0%'
  },
  introImage:{
    height:'50%',
    width:'50%',
    resizeMode: 'center',
    paddingBottom:'20%'
  },
  body:{
    flex: 10,
    width:'70%',
    backgroundColor: '#fff',
    flexDirection:'column',
  },
  bodyHeading:{
    fontWeight:"bold",
    fontSize:18,
    marginTop:20,
  },
  loadingImage:{
    height:75,
    width:250,
    resizeMode: 'stretch',
    marginTop:15,
  },
  input:{
    flexDirection:'row',
    marginBottom: 15,
  },
  parameter:{
    flex:1,
    fontSize:18,
  },
  outputParameter:{
    flex:1,
    fontSize:18,
    marginRight:20
  },
  output:{
    marginTop:5,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataButton:{
    marginTop:15,
    marginBottom:15
  },
  list:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  history:{
    flex:1,
    fontSize:10,
    color:'white',
    fontWeight:'bold',
    padding:5
  }
});

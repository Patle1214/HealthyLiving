import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Touchable, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Options from './Options';
import AppleHealthKit, { HealthValue, HealthKitPermissions} from 'react-native-health';

const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.DateOfBirth, 
      AppleHealthKit.Constants.Permissions.ActivitySummary,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
      AppleHealthKit.Constants.Permissions.Height,
      AppleHealthKit.Constants.Permissions.Weight]
  },
}

AppleHealthKit.initHealthKit(permissions, (error) => {
  /* Called after we receive a response from the system */

  if (error) {
    console.log('[ERROR] Cannot grant permissions!')
  }

  /* Can now read or write to HealthKit */

  const options = {
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  }

  AppleHealthKit.getActivitySummary(
    (options),
    (err, results) => {
      if (err) {
        return
      }
      //console.log(results)
    },
  )

  AppleHealthKit.getStepCount(
    ({}),
    (err, results) => {
      if (err) {
        return
      }
      //console.log(results)
    },
  )

  const sleepOptions = {
    startDate: new Date(Date.now() - ( 3600 * 1000 * 24 * 2)).toISOString(),
    endDate: new Date(Date.now() - ( 3600 * 1000 * 24)).toISOString(),
  }

  AppleHealthKit.getSleepSamples((sleepOptions), (err, results) => {
    if (err) {
      //console.log(err)
      return;
    }
    //console.log(results)
  });

  AppleHealthKit.getLatestHeight(null, (err, results) => {
    if (err) {
      //console.log('error getting latest height: ', err)
      return
    }
    //console.log(results)
  })

  AppleHealthKit.getLatestWeight({unit: 'pound'}, (err, results) => {
    if (err) {
      //console.log('error getting latest weight: ', err)
      return
    }
    //console.log(results)
  })

})

var nums= Array.from(Array(100+1).keys()).slice(18) 
const data = {'Chicken Pilaf Salad': 500, 'Trader Joe\'s Salad': 200, 'Organic Pesto Pasta': 300, 'Jamba Juice White Gummy': 400, 'Panera Bread Chicken Soup': 500};

const temp_data = { 'Panera Bread': [['Chicken Noodle Soup', 'Irvine', '15.99', [250, 50, 25]], ['Clam Chowder', 'Irvine', [180, 60, 25]]], 'Panera Bread # 2': [['Chicken Noodle Soup', 'Irvine', '15.99', [250, 50, 25]], 
['Clam Chowder', 'Irvine', [180, 60, 25]]], }

const Home = () => {
  let iconHeight = 26;
  let iconWidth = 26;
  const navigation = useNavigation()
  const [totalCalories, setTotalCalories] = useState(2099)
  const [cardStates, setCardStates] = useState(Array(5).fill(false));
  const [jsonData, setJsonData] = useState({})
  const [cards, setCards] = useState([])
  const [fitnessGoal, setFitnessGoal] = useState('')

  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(5)

  const [caloricGoal, setCaloricGoal] = useState(2099)



  useEffect(() => {
    checkUserAge()
  }, []);

  const retrieveCalories = async () => {
    try {
      const temp = await AsyncStorage.getItem('caloricMaint')
      setCaloricGoal(temp)
    }
    catch (err) {
      return
    }
  }


  const checkUserAge = async () => {
      try {
        const hasAge = await AsyncStorage.getItem('hasAge');
        if (hasAge === null) {
          // Age has not been set, prompt user to enter it
          navigation.navigate("Options")
          return;
        }
  
        const storedAge = await AsyncStorage.getItem('userAge');
        const fit = await AsyncStorage.getItem('userFitness')
        if (storedAge !== null) {
          // Age is already stored, do something with it (e.g., navigate to the next screen)
          // Example: navigation.navigate('Home');
          setFitnessGoal(fit)
          console.log("Already has age")
          // navigation.navigate("Home")
        }
      } catch (error) {
        console.log('Error retrieving user age from AsyncStorage:', error);
      }
    };


  const handleCardPress = (index, key, value) => {
    setCardStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      console.log('press!')
      console.log(cardStates)
      console.log(jsonData["IRVINE"][key][0])
      if (newStates[index]) {
        setTotalCalories(totalCalories - jsonData["IRVINE"][key][0][3][0])
      }
      else {
        setTotalCalories(totalCalories + jsonData["IRVINE"][key][0][3][0])
      }
      return newStates;
    });
  };

  { /*
  const cards = Object.entries(data).slice(0, 10).map(([key, value], index) => (
    <TouchableOpacity key={key} style={[styles.card, cardStates[index] && styles.active_card]} activeOpacity={cardStates[index] === true ? 1 : 0.5} onPress={() => handleCardPress(index , key)}>
      <Text style={styles.card_title}>{key}</Text>
      <Text>{value} cal</Text>
    </TouchableOpacity>
  ));
  */ }



  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.0.83:5000/', {
        params: {
          goal: fitnessGoal
        }
      });
      //console.log(response)
      setJsonData(await response.data);
      // retrieveCalories()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData()
    console.log(jsonData)

  }, [])



  useEffect(() => {
    if (jsonData["IRVINE"]) {
      const newCards = Object.entries(jsonData["IRVINE"]).slice(startIndex, endIndex).map(([key, value], index) => (
        <TouchableOpacity key={key} style={[styles.card, cardStates[index] && styles.active_card]} activeOpacity={cardStates[index] === true ? 1 : 0.5} onPress={() => handleCardPress(index, key, value)}>
          <View style={styles.column}>
            <Text>{key}</Text>
            <Text>{value[0][0]}</Text>
          </View>
          <View style={styles.column_two}>
            <Text>{value[0][3][0]} Cal</Text>
            <Text>{value[0][3][1]}g Protein</Text>
            <Text>{value[0][3][2]}g Sugar</Text>
          </View>

        </TouchableOpacity>
      ));
      setCards(newCards);
    }
  }, [jsonData, cardStates, startIndex]);

  const handleRefresh = () => {
    console.log("start: ", startIndex)
    setStartIndex(prevState => prevState + 10)
    setEndIndex(prevState => prevState + 10)
    
  };





  return (
    <View style={styles.container}>
      <View>
        <View style={styles.heading_container}>
        <Text style={styles.heading}>Healthy Living</Text>
        <Text style={styles.sub_heading}>Food we found nearby you!</Text>

        </View>
        { /* 
          <TextInput
        style={styles.search_input}
        value={searchInput}
        placeholder="Search for food near you..."
        onChangeText={(text) => setSearchInput(text)}
        defaultValue={searchInput}
        ></TextInput> 
        */ }

      </View>
      {/* <Text>Calories remaining: {caloricGoal}</Text> */}

      <TouchableOpacity style={styles.refresh} onPress={() => handleRefresh()}><Text style={styles.bodyTextWhite}>Refresh</Text></TouchableOpacity>

      <ScrollView contentContainerStyle={styles.cardContainer}>{cards}</ScrollView>




      <View style={styles.navContainer}>
            <View style={styles.navBar}>
                <Pressable onPress={() => navigation.replace("Home")}>
                <MaterialCommunityIcons name="food-apple" size={30} color="#1679C1"/>
                </Pressable>
                <Pressable onPress={() => navigation.replace("Workout")}>
                <MaterialCommunityIcons name="arm-flex" size={30} color="#1679C1"/>
                </Pressable>
                <Pressable onPress={() => navigation.replace("Sleep")}>
                <AntDesign name="profile" size={24} color="#1679C1" />
                </Pressable>
                <Pressable onPress={() => navigation.replace("Profile")}>
                <MaterialCommunityIcons name="face-man-profile" size={30} color="#1679C1"/>
                </Pressable>
            </View>
        </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFr',
    scrollBehavior: 'auto',
  },
  scrollView: {
    height: '100%',
  },

  button : {
    backgroundColor: '#0782F9',
    width: '30%',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 48
  },

  buttonOutline : { 
   backgroundColor: 'white',
   marginTop: 5,
   borderColor: '#0782F9',
   borderWidth: 2
  },

  buttonText : { 
    color: 'white',
    fontWeight: '700',
    fontSize: 14
  },

  buttonOutlineText : { 
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16
  },

  navContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 20
  },

  navBar: {
    flexDirection: 'row',
    width:'100%',
    justifyContent: 'space-evenly',
    backgroundColor: '#eee',
    borderRadius: 40,
    padding: 16
  },

  iconBehave: {
    padding: 15
  },

  cardContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 12,
    width: '100%',
    maxHeight: '85%',
  },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 12,
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4888B7',
    marginHorizontal: 'auto',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    width: 350,
    maxHeight: 80,
  },

  active_card: {
    backgroundColor: '#0782F9',
  },
  
  card_title: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  heading: {
    fontSize: 35,
    fontWeight: 900,
    marginTop: 60,
    color: '#1679C1',
    width: '100%',
    textAlign: 'center',
  },

  sub_heading: {
    fontSize: 18,
    fontWeight: 500,
    marginTop: 24,
    color: '#1679C1',
    width: '100%',
    textAlign: 'center',
  },

  

  search_input: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    width: 360,
    height: 50,
    color: '#000000',
    padding: 10,
    fontSize: 16
  },

  heading_container: {
    padding: 0,
    marginTop: 12,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent:'center',
    justifyContent:'center',
  },

  temp: {
    marginTop:12 ,
  },

  column: {
    flex: 7,
  },

  column_two: {
    flex: 3,
    textAlign: 'right',
  
  refresh: {
    marginTop: 4,
    borderRadius: 10,
    padding: 8, 
    backgroundColor: '#1679C1',
    color:'#FFFFFF',
  },

  bodyTextWhite: {
    color: '#FFFFFF'
  },

}})
import { StyleSheet, Text, View, KeyboardAvoidingView, Pressable} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppleHealthKit, { HealthValue, HealthKitPermissions} from 'react-native-health'

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
      AppleHealthKit.Constants.Permissions.HeartRate
    ]
  },
}




const Sleep = () => {
  const navigation = useNavigation()
  const [sleep, setSleep] = useState('')
  const [avgSleep, setAvgSleep] = useState('')
  const date = new Date()
  const options = { weekday: 'long' };
  //const day = date.toLocaleDateString('en-US', options).split(',')[0];
  const [dailyMinutes, setDailyMinutes] = useState('')
  const [sleepPeriods, setSleepPeriods] = useState(0)
  const [goal, setGoal] = useState('')
  const [message, setMessage] = useState('empty')
  const [bpm, setBpm] = useState(0)



  const retrieveSleep = () => {
    AppleHealthKit.initHealthKit(permissions, (error) => {
    /* Called after we receive a response from the system */
  
      if (error) {
        console.log('[ERROR] Cannot grant permissions!')
      }
    
      /* Can now read or write to HealthKit */
      
      const sleepOptions = {
        startDate: new Date(Date.now() - ( 3600 * 1000 * 24)).toISOString(),
        endDate: new Date().toISOString(),
        ascending: true
      }

      AppleHealthKit.getSleepSamples((sleepOptions), (err, results) => {
        if (err) {
          console.log(err)
          return;
        }
        
        var sPeriods = 0
        var minutes = 0
        for (var i = 0; i < results.length; i++) {
          if (results[i].value == 'INBED') {
            sPeriods += 1
            console.log(results[i])
            minutes += Math.ceil((new Date(results[i].endDate) - new Date(results[i].startDate)) / (1000 * 60))
          }
        }
        setSleepPeriods(sPeriods)
        setDailyMinutes(minutes)
        //console.log("MIN: HEREE", minutes)
      });
      
      var curr_date = new Date()

      let bpmOptions = {
        unit: 'bpm', // optional; default 'bpm'
        startDate: new Date(curr_date.getFullYear(), curr_date.getMonth(), curr_date.getDate() - 1, 21).toISOString(),
        endDate: new Date(curr_date.getFullYear(), curr_date.getMonth(), curr_date.getDate(), 9).toISOString()
      }

      AppleHealthKit.getHeartRateSamples(
        bpmOptions,
        (err, results) => {
          if (err) {
            return
          }
          var sum = 0
          for (var i = 0; i < results.length; i++) {
            sum += results[i].value
          }

          setBpm(Math.floor(sum / results.length))
          console.log(bpm)
        },
      )
    })
  }

  const retrieveGoal = async () => {

    try {
      setGoal(await AsyncStorage.getItem("userSleep"))
      console.log(goal)
      if (goal == "6-8") {
        if (dailyMinutes / 60 < 6) {
          setMessage("We recommend sleeping more")
        }
        else if (dailyMinutes / 60 > 8){
          setMessage("We recommend sleeping less")
        }
        else {
          setMessage("You hit your goal, great job!")
        }
      } else if (goal == '8-10') {
        if (dailyMinutes / 60 < 8) {
          setMessage("We recommend sleeping more")
        }

        else if (dailyMinutes / 60 > 10){
          setMessage("We recommend sleeping less")
        }
        else {
          setMessage("You hit your goal, great job!")
        } 
      }
      else {
        if (dailyMinutes / 60 < 10) {
          setMessage("We recommend sleeping more")
        }
        else {
          setMessage("You hit your goal, great job!")
        }
      }
    }

    catch (err) {
      console.log(err)
    }
  }


  useEffect( () => {
    retrieveSleep()
    retrieveGoal()
    //updateSleep()
  }, [])
  

  return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding" 
      >
        { /* 
        <View style={styles.sleepContainer}>
          <Text style={styles.sleepHeading}>Sleep Log</Text>
          <View style={styles.sleepRow}>
            <Text style={styles.sleepRowText}>Monday</Text>
            <Text>8 Hr 0 Min</Text>
          </View>
          <View style={styles.sleepRow}>
            <Text style={styles.sleepRowText}>Tuesday</Text>
            <Text>8 Hr 0 Min</Text>
          </View>
          <View style={styles.sleepRow}>
            <Text style={styles.sleepRowText}>Wednesday</Text>
            <Text>8 Hr 0 Min</Text>
          </View>
          <View style={styles.sleepRow}>
            <Text style={styles.sleepRowText}>Thursday</Text>
            <Text>8 Hr 0 Min</Text>
          </View>
          <View style={styles.sleepRow}>
            <Text style={styles.sleepRowText}>Friday</Text>
            <Text>8 Hr 0 Min</Text>
          </View>
          <View style={styles.sleepRow}>
            <Text style={styles.sleepRowText}>Saturday</Text>
            <Text>8 Hr 0 Min</Text>
          </View>
          <View style={styles.sleepRow}>
            <Text style={styles.sleepRowText}>Sunday</Text>
            <Text>8 Hr 0 Min</Text>
          </View>
        </View>
    */ }
        <View>
          <Text style={styles.heading}>Sleep Stats</Text>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsHeading}>Yesterday you slept...</Text>
          <Text style = {styles.bodyText}>{Math.floor(Number(dailyMinutes)/60)} Hours {Number(dailyMinutes)%60} Mins</Text>
          <Text style = {styles.bodyText}></Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsHeading}>Based on your goals</Text>
          <Text style = {styles.bodyText}>{message}</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsHeading}>Last Night Phone Usage</Text>
          <Text style = {styles.bodyText}>You checked your phone {sleepPeriods} times</Text>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsHeading}>Average Sleep Heart Rate</Text>
          <Text style = {styles.bodyText}>{bpm} bpm</Text>
        </View>

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
      </KeyboardAvoidingView>
  )
}

export default Sleep

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
      },
      heading: {
        fontSize: 35,
        fontWeight: 900,
        marginTop: 60,
        color: '#1679C1',
        width: '100%',
        textAlign: 'center',
      },
    
      button : {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
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
        fontSize: 16
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
        backgroundColor: '#eee',
        width:'95%',
        justifyContent: 'space-evenly',
        borderRadius: 40,
        padding: 16
      },
    
      iconBehave: {
        padding: 40
      },
    
      sleepContainer: {
        width: '88%',
        height: 350,
        borderRadius: 15,
        padding: 12,
        backgroundColor: '#B2CDE1',
      },
    
      sleepHeading: {
        fontSize: 30,
        fontWeight: 600,
        color: '#FFFFFF',
        textAlign: 'center'
      },

      sleepRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 4,
        justifyContent: 'space-between',
      },

      sleepRowText: {
        fontSize: 18,
      },

      statsContainer: {
        marginTop: 30,
        width: '88%',
        height: 100,
        borderRadius: 15,
        padding: 12,
        backgroundColor: '#B2CDE1',
      },

      statsHeading: {
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'center',
        color: '#FFFFFF'
      },

      bodyText: {
        textAlign: 'center',
        padding: 8
      }
    })
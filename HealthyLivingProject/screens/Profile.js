import { StyleSheet, Text, View, KeyboardAvoidingView, Pressable, TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppleHealthKit, { HealthValue, HealthKitPermissions} from 'react-native-health'
import appleHealthKit from 'react-native-health';

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Height,
      AppleHealthKit.Constants.Permissions.Weight,
      AppleHealthKit.Constants.Permissions.ActivitySummary,
      AppleHealthKit.Constants.Permissions.StepCount]
  },
}



const Profile = () => {
  const navigation = useNavigation()
  const [name, setName ] = useState("")
  const [gender, setGender ] = useState("")
  const [age, setAge ] = useState("")
  const [sleep, setSleep ] = useState("")
  const [fitness, setFitness ] = useState("")
  const [caloricMaint, setCaloricMaint] = useState(0)
  const [caloricGoal, setCaloricGoal] = useState(0)
  const [bmi, setBmi] = useState(0)
  const [height, setHeight] = useState(0) // will return 63 inches not (5 '3 )
  const [weight, setWeight] = useState(0)
  const [calories, setCalories] = useState(0)
  const [exerciseTime, setExerciseTime] = useState(0)
  const [stepCount, setStepCount] = useState(0)
  const [healthScore, setHealthScore] = useState(0)

  
  const postCaloricMain = async () => {
    try {
      await AsyncStorage.setItem('caloricMaint', toString(caloricMaint))
      console.log("INSIDE POST")
      console.log(caloricMaint)
      console.log("OUTSIDE POST")
    }
    catch (err) {
      return err
    }
  }



  const retrieveHealthKit = () => {
    try {
      AppleHealthKit.initHealthKit(permissions, (error) => {
      /* Called after we receive a response from the system */
    
        if (error) {
          console.log('[ERROR] Cannot grant permissions!')
        }
      
        /* Can now read or write to HealthKit */
      
        AppleHealthKit.getLatestHeight(null, (err, results) => {
          if (err) {
            console.log('error getting latest height: ', err)
            return
          }
          setHeight(results["value"])
          console.log("Height : ", height)
        })
      
        AppleHealthKit.getLatestWeight({unit: 'pound'}, (err, results) => {
          if (err) {
            console.log('error getting latest weight: ', err)
            return
          }
    
          setWeight(results["value"])
          console.log("Weight: ", weight)
        })

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
            
            var cal = results[0]["activeEnergyBurned"]
            console.log("Calories burned", cal)
            setCalories(cal)

            var time = results[0]["appleExerciseTime"]
            console.log("Exercise time", time)
            setExerciseTime(time)
          },
        )
      
        AppleHealthKit.getStepCount(
          ({}),
          (err, results) => {
            if (err) {
              return
            }
            
            var steps = Number(results["value"]).toFixed(0)
            console.log("Steps:", steps)
            setStepCount(steps)
          },
        )
    
      })
    }
    catch (error) {
      console.log(error)
    }
  }

  console.log("START EFFECT")
  useEffect( () => {
    retrieveUserData()
    retrieveHealthKit()
    console.log("INSIDE #2")
    console.log("Height + Weight", height, weight)
    setBmi(((weight * 703)/ (height ** 2)).toFixed(1)) 
    console.log("BMI:", bmi)

    setCaloricMaint(Math.floor(weight * 15))
    console.log("Caloric Maint: ", caloricMaint)

    var temp_bmr = (4.536 * weight) + (15.88 * height) - (5 * parseInt(age))
    setHealthScore( Math.floor((Math.min((exerciseTime / 30) * 0.5, 0.5) + Math.min((stepCount / 10000) * 0.3, 0.3) + Math.min((calories / temp_bmr) * 0.2, 0.2)) * 100 ))
    console.log("EXIT #2")

    postCaloricMain()

    const fitnessGoal = fitness

    
    if (fitnessGoal == "Gain muscle") {
      setCaloricGoal(caloricMaint + 200)
    }
    else if (fitnessGoal == "Lose weight") {
      setCaloricGoal(caloricMaint - 200)
    }
    else {
      setCaloricGoal(caloricMaint)
    }

  }, [height, weight, caloricMaint, healthScore])
  console.log("END EFFECT")


  const retrieveUserData = async () => {
    try {
      setName(await AsyncStorage.getItem('userName'))
      setGender(await AsyncStorage.getItem('userGender'))
      setAge(await AsyncStorage.getItem('userAge'))
      setFitness(await AsyncStorage.getItem('userFitness'))
      setSleep(await AsyncStorage.getItem('userSleep'))
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding" 
      >
        <View style={styles.marginContainer}></View>
        <View style={styles.profileContainer}>
        <Text style={styles.profileHeading}>{name}</Text>
        
        <View style={styles.profileRow}>
          <Text style={styles.bodyText}>Genders</Text>
          <Text style={styles.bodyText}>{gender}</Text>
        </View>

        <View style={styles.profileRow}>
          <Text style={styles.bodyText}>Age</Text>
          <Text style={styles.bodyText}>{age}</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.bodyText}>Fitness score</Text>
          <Text style={styles.bodyText}>{healthScore}</Text>
        </View>

        <View style={styles.profileRow}>
          <Text style={styles.bodyText}>Current BMI</Text>
          <Text style={styles.bodyText}>{bmi}</Text>
        </View>

        <View style={styles.profileRow}>
          <Text style={styles.bodyText}>Caloric Maintenance</Text>
          <Text style={styles.bodyText}>{caloricMaint}</Text>
        </View>
        </View>

        <View style={styles.profileContainer}>
          <Text style={styles.profileHeading}>Goals</Text>
          
          <View style={styles.profileRow}>
            <Text style={styles.bodyText}>Fitness goal:</Text>
            <Text style={styles.bodyText}>{fitness}</Text>
          </View>

          <View style={styles.profileRow}>
            <Text style={styles.bodyText}>Sleep goal:</Text>
            <Text style={styles.bodyText}>{sleep}</Text>
          </View>

          <View style={styles.profileRow}>
            <Text style={styles.bodyText}>Daily caloric goal</Text>
            <Text style={styles.bodyText}>{caloricGoal}</Text>
          </View>

        </View>

        <View>
          <TouchableOpacity style={styles.editButton} onPress={ () => { navigation.navigate("Options")}}><Text style={styles.editText}>Edit Profile</Text></TouchableOpacity>
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

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFr',
      },

      marginContainer: {
        marginTop: 100
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
    
      profileHeading: {
        fontSize: 30,
        fontWeight: '700',
        color: '#FFFFFF',
      },


      profileContainer: {
        marginBottom: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        width: '85%',
        paddingVertical: 20,
        backgroundColor: '#B2CDE1',
      },

      profileRow: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingVertical: 2,
        color: '#FFFFFF',
      },

      iconBehave: {
        padding: 40
      },

      bodyText: {
        fontSize: 18,
        color: '#FFFFFF'
      },
      
      editButton: {
        borderRadius: 10,
        backgroundColor: '#1679C1',
        color: '#FFFFFF',
        padding: 15,
      },

      editText: {
        color: '#FFFFFF'
      },
    })
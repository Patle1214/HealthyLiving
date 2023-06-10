import { StyleSheet, Text, View, KeyboardAvoidingView, Pressable} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppleHealthKit, { HealthValue, HealthKitPermissions} from 'react-native-health'


const test_calories = 0
const test_step = 0
const test_distance = 0

const permissions = {
  permissions: {
    read: [ 
      AppleHealthKit.Constants.Permissions.ActivitySummary,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning
    ]
  },
}



var pull_workouts = ['Lat Pulldowns', 'Bicep Curls', 'Deadlifts', 'Lateral Raises', 'Barbell Rows', 'Dumbbell Rows']
var push_workouts = ['Bench Press', 'Incline Chest Press', 'Chest Flys', 'Tricep Pushdowns', 'Shoulder Press', 'Tricep Skull Crushers']
var leg_workouts = ['Squats', 'Calf Raises', 'Leg Extensions', 'Curls', 'Romanian Deadlifts',  'Dumbbell Lunges' ]

var workouts = {
  'Monday': pull_workouts,
  'Tuesday': leg_workouts,
  'Wednesday': push_workouts,
  'Thursday': pull_workouts,
  'Friday': pull_workouts,
  'Saturday': push_workouts,
  'Sunday': pull_workouts,
}


const Workout = () => {
  const navigation = useNavigation()
  const [workoutDay, setWorkoutDay] = useState('')
  const d_options = { weekday: 'long' }
  const day = new Date().toLocaleDateString('en-US', d_options).split(',')[0];
  const [workoutSet, setWorkoutSet] = useState(workouts[day])
  const [caloriesBurned, setCaloriesBurned] = useState(2500)
  const [exerciseTime, setExerciseTime] = useState(45)
  const [steps, setSteps] = useState(2500)
  const [walkDistance, setWalkDistance] = useState(1.3)


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
        setCaloriesBurned(results[0]["activeEnergyBurned"])
        console.log("Calories burned", caloriesBurned)
        setExerciseTime(results[0]["appleExerciseTime"])
        console.log("Exercise time", exerciseTime)
      },
    )
  
    AppleHealthKit.getStepCount(
      ({}),
      (err, results) => {
        if (err) {
          return
        }
        
        setSteps(Number(results["value"]).toFixed(0))
        console.log("Steps:", steps)
      },
    )
  
    const distanceOptions = {
      unit: 'mile',
      date: (new Date()).toISOString()
    }
  
    AppleHealthKit.getDistanceWalkingRunning(
      (distanceOptions),
      (err, results) => {
        if (err) {
          return
        }
        console.log("BEGIN DIST")
        setWalkDistance(Number(results["value"]).toFixed(2))
        console.log("Walk distance:", steps)
        console.log("END DIST")

      },
    )
  
  })

  //console.log(workoutSet)

  return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding" 
      >
        <View style={styles.workoutContainer}>
          <Text style={styles.workoutHeading} selectable={true}>Daily Workouts</Text>
          <View style={styles.workoutRow}>
            <Text style={styles.workoutBodyText} selectable={true}>{workoutSet[0]}</Text>
            <Text style={styles.workoutBodyText} selectable={true}>{workoutSet[1]}</Text>
          </View>
          <View style={styles.workoutRow}>
            <Text style={styles.workoutBodyText} selectable={true}>{workoutSet[2]}</Text>
            <Text style={styles.workoutBodyText} selectable={true}>{workoutSet[3]}</Text>
          </View>
          <View style={styles.workoutRow}>
            <Text style={styles.workoutBodyText} selectable={true}>{workoutSet[4]}</Text>
            <Text style={styles.workoutBodyText} selectable={true}>{workoutSet[5]}</Text>
          </View>
        </View>

        <View style={styles.outerContainer}>

          <View style={styles.exercisesContainer}>
            <Text style={styles.heading_one}>Exercises</Text>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="fire" size={30} color="#1679C1"/>
              <Text>{caloriesBurned} Cal</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="clock-outline" size={30} color="#1679C1"/>
              <Text>{exerciseTime} Min</Text>
            </View>

          </View>
          <View style={styles.stepsContainer}>
            <Text style={styles.heading_one}>Steps</Text>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="foot-print" size={30} color="#1679C1"/>
              <Text>{steps} Steps</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="map-marker-distance" size={30} color="#1679C1"/>
              <Text>{walkDistance} Miles</Text>
            </View>
          </View>

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

export default Workout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

      workoutContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        color: '#1679C1',
        height: 300,
        backgroundColor: '#B2CDE1',
        width: '88%',
        marginTop: 100
      },

      workoutHeading: {
        fontSize: 28,
        fontWeight: 800,
        textAlign: 'center',
        padding: 10,
        color: '#FFFFFF'
      },

      workoutRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '92%',
        paddingVertical: 16,
      },

      exercisesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        color: '#1679C1',
        height: 150,
        backgroundColor: '#B2CDE1',
        width: '48%'
      },
      stepsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        color: '#1679C1',
        height: 150,
        backgroundColor: '#B2CDE1',
        width: '48%'
      },
    
      outerContainer: {
        marginTop: 24,
        width: '88%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },

      workoutBodyText: {
        fontSize: 18,
      },

      heading_one: {
        fontSize: 22,
        fontWeight: 600,
        color: '#FFFFFF',
        marginBottom: 8,
      },

      iconRow: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 2,
        alignItems: 'center',
      }
    })
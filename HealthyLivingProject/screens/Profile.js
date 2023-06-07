import { StyleSheet, Text, View, KeyboardAvoidingView, Pressable, TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = () => {
  const navigation = useNavigation()
  const [name, setName ] = useState("")
  const [gender, setGender ] = useState("")
  const [age, setAge ] = useState("")
  const [sleep, setSleep ] = useState("")
  const [fitness, setFitness ] = useState("")
  const bmi = 25

  
  useEffect( () => {
    retrieveUserData()
  }, [])

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
          <Text style={styles.bodyText}>Gender</Text>
          <Text style={styles.bodyText}>{gender}</Text>
        </View>

        <View style={styles.profileRow}>
          <Text style={styles.bodyText}>Age</Text>
          <Text style={styles.bodyText}>{age}</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.bodyText}>Fitness score</Text>
          <Text style={styles.bodyText}>95</Text>
        </View>

        <View style={styles.profileRow}>
          <Text style={styles.bodyText}>Current BMI</Text>
          <Text style={styles.bodyText}>25</Text>
        </View>

        <View style={styles.profileRow}>
          <Text style={styles.bodyText}>Caloric Maintenance</Text>
          <Text style={styles.bodyText}>2500</Text>
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
            <Text style={styles.bodyText}>2500</Text>
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
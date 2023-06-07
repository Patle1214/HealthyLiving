import { StyleSheet, Text, View, KeyboardAvoidingView, Pressable} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Sleep = () => {
  const navigation = useNavigation()

  return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding" 
      >
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

        <View style={styles.statsContainer}>
          <Text style={styles.statsHeading}>Average Sleep</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsHeading}>Sleep Goal</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 24,
        fontWeight: 600,
        textAlign: 'center',
        color: '#FFFFFF'
      }
    })
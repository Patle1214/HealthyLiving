import { StyleSheet, Text, View, KeyboardAvoidingView, Pressable} from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

const Profile = () => {
  const navigation = useNavigation()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Profile")
      }
    })
    return unsubscribe
  }, [])


  return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding" 
      >
        <Text>Profile screen!</Text>
        <View style={styles.navContainer}>
            <View style={styles.navBar}>
                <Pressable onPress={() => navigation.replace("Home")}>
                <AntDesign name="home" size={24} color="black" />
                </Pressable>
                <Pressable onPress={() => navigation.replace("Profile")}>
                <AntDesign name="profile" size={24} color="black" />
                </Pressable>
                <Pressable onPress={() => navigation.replace("More")}>
                <Entypo name="dots-three-horizontal" size={24} color="black" />
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5C6F68'
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
      }
    
    
    })
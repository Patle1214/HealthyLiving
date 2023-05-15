import { Pressable, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { useEffect, useState } from 'react';
import axios from 'axios';

const data = ['Dave\'s hot chicken', 'Chick Fil-A', 'Kentucky Fried Chicken', 'item 4', 'item 5', 'item 6', 'item 7', 'item 8', 'item 9', 'item 10', 'item 11', 'item 12'];

const Home = () => {
  let iconHeight = 26;
  let iconWidth = 26;
  const navigation = useNavigation()
  const handleSignOut = () => {
    auth
      .signOut()
      .then( () => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }
  const cards = data.slice(0, 10).map((item, index) => (
    <View key={index} style={styles.card}>
      <Text style={styles.title}>{item}</Text>
    </View>
  ));

  const [getMessage, setGetMessage] = useState({})
  useEffect(()=>{
    axios.get('http://169.234.40.162:5000').then(response => {
      console.log("SUCCESS FLASK FLASK", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])


  return (
    <View style={styles.container} >
      <Text>Current user: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign out </Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.heading}>Healthy foods near you!</Text>
      </View>
      <ScrollView contentContainerStyle={styles.cardContainer}>{cards}</ScrollView>
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
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5C6F68',
    scrollBehavior: 'auto',
  },
  scrollView: {
    height: '100%',
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

  cardContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: 'green',
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: '#fff',
    padding: 2,
    marginBottom: 16,
    borderRadius: 8,
    marginHorizontal: 'auto',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: '80%',
    minHeight:'15%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24
  }

})
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const navigation = useNavigation()
  const handleSignOut = () => {
    auth
      .signOut()
      .then( () => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }
  return (
    <View style={styles.container}>
      <Text>Current user: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign out </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

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
    fontSize: '16'
  }
})
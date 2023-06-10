import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Touchable, Button } from 'react-native'
import WheelPicker from 'react-native-wheely';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'


const fitness = ['Lose weight', 'Gain muscle', 'Just trying to be healthy!']
const sleep = ['6-8', '8-10', '10+']


const Goals = () => {
    const navigation = useNavigation()
    const [age, setAge] = useState('22');

    const [selectedFitnessIndex, setSelectedFitnessIndex] = useState(0);
    const [selectedFitnessValue, setSelectedFitnessValue] = useState(fitness[0]);
    const [selectedSleepIndex, setSelectedSleepIndex] = useState(0);
    const [selectedSleepValue, setSelectedSleepValue] = useState(sleep[0]);


    const handleFitnessChange = (index) => {
        setSelectedFitnessIndex(index)
        setSelectedFitnessValue(fitness[index])
      }

      const handleSleepChange = (index) => {
        setSelectedSleepIndex(index)
        setSelectedSleepValue(sleep[index])
      }

      const handleSaveScreen = async () => {
        try {
          await AsyncStorage.setItem('userFitness', selectedFitnessValue)
          await AsyncStorage.setItem('userSleep', selectedSleepValue)

          console.log("Stored userFitness and userSleep IN ASYNC")
          console.log("User fitness:", selectedFitnessValue)
          console.log("User sleep:", selectedSleepValue)

          // Age is stored, do something with it (e.g., navigate to the next screen)
          // Example: navigation.navigate('Home');
          navigation.navigate('Home');
        } catch (error) {
          console.log('Error saving user sleep and fitness to AsyncStorage:', error)
        }
      }


    return (
    <View>
        <View style={styles.container}>
        <Text style={styles.prompt}>Choose a fitness goal</Text>
            <WheelPicker
                selectedIndex={selectedFitnessIndex}
                options={fitness}
                onChange={(index) => handleFitnessChange(index)}
                visibleRest={1}
            />
            <Text style={styles.prompt}>Choose sleep goal</Text>
            <WheelPicker
                selectedIndex={selectedSleepIndex}
                options={sleep}
                onChange={(index) => handleSleepChange(index)}
                visibleRest={1}
            />

            <TouchableOpacity
            title="Submit"
            onPress={handleSaveScreen}
            style={styles.submit_button}
            >
            <Text style={styles.submit_text}>Submit</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
    
}

export default Goals

const styles = StyleSheet.create({
    temp: {
        marginTop:100,
        width:'100%',
        height:'100%',
        flexDirection: 'column',
        textAlign: 'center',
        alignContent: 'center',
        padding: 24,
      },

    prompt: {
        fontSize: 24,
        fontWeight: 900,
        color: '#1679C1',
        marginTop: 100,
    },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFr',
    scrollBehavior: 'auto',
  },


    option_input: {
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        width: 360,
        height: 50,
        color: '#000000',
        padding: 10,
        fontSize: 16
      },

      submit_button: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#1679C1',
        color: '#FFFFFF',
        marginTop: 24,
      },
  
      submit_text: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
      }
})
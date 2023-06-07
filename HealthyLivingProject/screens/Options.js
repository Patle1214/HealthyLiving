import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Touchable, Button } from 'react-native'
import WheelPicker from 'react-native-wheely';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'


var nums= Array.from(Array(100+1).keys()).slice(18) 
const genders = ['Male', 'Female', 'Other']


const Options = () => {
    const navigation = useNavigation()
    const [age, setAge] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [selectedAgeIndex, setSelectedAgeIndex] = useState(0);
    const [selectedAgeValue, setSelectedAgeValue] = useState(18);
    const [selectedGenderIndex, setSelectedGenderIndex] = useState(0);
    const [selectedGenderValue, setSelectedGenderValue] = useState('Male');
    const [screen, setScreen] = useState(0);


    

      const handleWheelPickerChange = (index) => {
        setSelectedAgeIndex(index)
        setSelectedAgeValue(nums[index])
      }

      const handleGenderChange = (index) => {
        setSelectedGenderIndex(index)
        setSelectedGenderValue(genders[index])
      }

      const handleSaveScreen = async () => {
        try {
          await AsyncStorage.setItem('userAge', selectedAgeValue.toString())
          await AsyncStorage.setItem('hasAge', 'true')
          await AsyncStorage.setItem('userName', name)
          await AsyncStorage.setItem('userGender', selectedGenderValue)
          console.log("Stored userName, userAge, and userGender IN ASYNC")
          console.log(name)
          console.log(gender)
          console.log(selectedAgeValue)
          // Age is stored, do something with it (e.g., navigate to the next screen)
          // Example: navigation.navigate('Home');
          navigation.navigate('Goals');
        } catch (error) {
          console.log('Error saving user data to AsyncStorage:', error)
        }
      }

      const handlePreviousScreen = () => {
        setScreen((prevState) => {
          return prevState - 1
        })
      }


    return (
    <View>        
        <View style={styles.container}>
          <View>
              <View>
                  <Text style={styles.prompt}>What's your name?</Text>
                  <TextInput 
                  style={styles.option_input}
                  placeholder="Enter your name here"
                  value = {name}
                  onChangeText = {text => setName(text)}
                  >
                  </TextInput>
              </View>
          </View>

              <View>
              <Text style={styles.prompt}>What's your age?</Text>
              <WheelPicker
                selectedIndex={selectedAgeIndex}
                options={nums}
                onChange={(index) => handleWheelPickerChange(index)}
                visibleRest={1}
              />
              </View>

              <View>
                <Text style={styles.prompt}>What's your gender?</Text>
                <WheelPicker
                selectedIndex={selectedGenderIndex}
                options={genders}
                onChange={(index) => handleGenderChange(index)}
                visibleRest={1}
                />

              </View>

{ /* 
          <Text style={styles.prompt}>What's your age?</Text>
          <WheelPicker
            selectedIndex={selectedAgeIndex}
            options={nums}
            onChange={(index) => handleWheelPickerChange(index)}
            visibleRest={1}
          />

            <Text style={styles.prompt}>What's your gender?</Text>
            <WheelPicker
            selectedIndex={selectedGenderIndex}
            options={genders}
            onChange={(index) => handleGenderChange(index)}
            visibleRest={1}
            />
*/ }
          <View style={styles.temp}>
              <TouchableOpacity
                title="Submit"
                onPress={handleSaveScreen}
                style={styles.submit_button}
              >
                  <Text style={styles.submit_text}>Submit</Text>
              </TouchableOpacity>

              </View>

        </View>
    </View>
    )
    
}

export default Options

const styles = StyleSheet.create({
    temp: {
        marginTop:100,
        width:'100%',
        flexDirection: 'col',
        textAlign: 'center',
        alignContent: 'center',
        padding: 24,
      },

    prompt: {
        fontSize: 24,
        fontWeight: 900,
        color: '#1679C1',
        marginTop: 50,
        textAlign: 'center',
    },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFr',
    scrollBehavior: 'auto',
    textAlign: 'start',
    height: '100%',
  },


  option_input: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    width: 350,
    height: 40,
    color: '#000000',
    padding: 10,
    fontSize: 16
    },

    submit_button: {
      borderRadius: 10,
      padding: 10,
      backgroundColor: '#1679C1',
      color: '#FFFFFF',
    },

    submit_text: {
      color: '#FFFFFF',
      fontSize: 20,
      textAlign: 'center',
    }
})
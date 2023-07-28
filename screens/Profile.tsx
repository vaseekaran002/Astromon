import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { RadioButton, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Styles from '../styles/ProfileStyle';
import { NavigationScreenProp } from 'react-navigation';

export interface HomeScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

interface FormValues {
  name: string;
  age: string;
  deviceid: string;
  bloodgroup: string;
  gender: string;
  height: string;
  weight: string;
  
}

const App = (props: HomeScreenProps) => {
  const initialValues: FormValues = {
    name: '',
    age: '',
    deviceid: '',
    bloodgroup: '',
    gender: '',
    height: '',
    weight: '',
   

  };

  const validation = Yup.object().shape({
    name: Yup.string().required('Enter name'),
    age: Yup.string().required('Enter age'),
    deviceid: Yup.string().required('Enter deviceID'),
    bloodgroup: Yup.string().required('Enter blood group'),
    gender: Yup.string().required('Enter gender'),
    height: Yup.string().required('Enter height'),
    weight: Yup.string().required('Enter weight'),
  });
   
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [isViewOnly, setIsViewOnly] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    
    console.log("use effect running")
     loadFormData();
    

    
    setIsLoading(true);
   
  }, [] );

  const loadFormData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('userProfile');
      if (storedData) {
        const storedValues: FormValues = JSON.parse(storedData);
        setFormValues(storedValues);
        setIsViewOnly(false); // Set the form to view-only if data is present
        console.log(storedData);
      } else {
        setIsViewOnly(true); // Set the form editable when there is no data
        console.log('No data found in AsyncStorage.');
      }
      setIsLoading(false); 
    } catch (error) {
      console.error('Error retrieving form values from AsyncStorage:', error);
      setIsLoading(false);
    }
  };
  const handleDeleteProfile = async () => {
    try {
      await AsyncStorage.removeItem('userProfile');
      formValues.age=""
      formValues.name=""
      formValues.gender=""
      formValues.deviceid=""
      formValues.bloodgroup=""
      formValues.height=""
      formValues.weight=""


      setFormValues(formValues);
      setIsViewOnly(true); 
      
      console.log('User profile data deleted from AsyncStorage!');
    } catch (error) {
      console.error('Error deleting user profile data:', error);
    }
  };
  
  const handleSubmit = async (values: FormValues) => {
    console.log(values);
  
    const dataToStore = JSON.stringify(values);
    try {
      await AsyncStorage.setItem('userProfile', dataToStore);
      setFormValues(values); // Update the formValues state with the new values
      console.log('Form values stored in AsyncStorage successfully!');
    } catch (error) {
      console.error('Error storing form values in AsyncStorage:', error);
    }
  };


 if(isLoading){ 
  return null}
 
 return (
    <View style={Styles.container}>
       
    
     
      <Formik initialValues={formValues} validationSchema={validation} onSubmit={handleSubmit}>
        {({ handleChange, handleSubmit, values, errors, }) => (
          <KeyboardAvoidingView behavior="padding">
           <ScrollView>
            <View>
              
                <Text style={Styles.errortxt}>{errors.name}</Text>
                <TextInput
                  style={Styles.textinpt}
                  label="Name"
                  placeholder="Enter name"
                  placeholderTextColor="#A9A9A9"
                  onChangeText={handleChange('name')}
                  value={values.name}
                  editable={isViewOnly}
                />

                <Text style={Styles.errortxt}>{errors.age}</Text>
                <TextInput
                  style={Styles.textinpt}
                  label="Age"
                  placeholder="Enter age"
                  placeholderTextColor="#A9A9A9"
                  onChangeText={handleChange('age')}
                  value={values.age}
                  keyboardType="numeric"
                  editable={isViewOnly}
                />

                <Text style={Styles.errortxt}>{errors.deviceid}</Text>
                <TextInput
                  style={Styles.textinpt}
                  label="DeviceID"
                  placeholder="Enter deviceid"
                  placeholderTextColor="#A9A9A9"
                  onChangeText={handleChange('deviceid')}
                  value={values.deviceid}
                  keyboardType="numeric"
                  editable={isViewOnly}
                />

                <Text style={Styles.errortxt}>{errors.bloodgroup}</Text>
                <TextInput
                  style={Styles.textinpt}
                  label="Bloodgroup"
                  placeholder="Enter bloodgroup"
                  placeholderTextColor="#A9A9A9"
                  onChangeText={handleChange('bloodgroup')}
                  value={values.bloodgroup}
                  editable={isViewOnly}
                />

                <View style={Styles.rdiobtncontainer}>
                  <RadioButton.Group
                    onValueChange={(value) => handleChange('gender')(value)}
                    value={values.gender}
                  >
                    <View style={Styles.genderContainer} >
                      <Text style={Styles.gender}>Gender:</Text>
                      <View style={Styles.genderOption}>
                        <Text style={Styles.genderText}>Male</Text>
                        <RadioButton value="Male" />
                      </View>
                      <View style={Styles.genderOption}>
                        <Text style={Styles.genderText}>Female</Text>
                        <RadioButton value="Female" />
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>

                <Text style={Styles.errortxt}>{errors.height}</Text>
                <TextInput
                  style={Styles.textinpt}
                  label="Height"
                  placeholder="Enter height"
                  placeholderTextColor="#A9A9A9"
                  onChangeText={handleChange('height')}
                  value={values.height}
                  keyboardType="numeric"
                  editable={isViewOnly}
                />

                <Text style={Styles.errortxt}>{errors.weight}</Text>
                <TextInput
                  style={Styles.textinpt}
                  label="Weight"
                  placeholder="Enter weight"
                  placeholderTextColor="#A9A9A9"
                  onChangeText={handleChange('weight')}
                  value={values.weight}
                  keyboardType="numeric"
                  editable={isViewOnly}
                />
             
            </View>
            <View style={Styles.btnscontainter}>
              { (
                <TouchableOpacity onPress={() => {setIsViewOnly(false)
                  handleSubmit()}} style={Styles.appbtncontainer}>
                  <Text style={Styles.appbtntext}>Submit</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={Styles.appbtncontainer}
                onPress={() => setIsViewOnly(true)}
              >
                <Text style={Styles.appbtntext} >Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Styles.bluetoothbtncontainer}
                onPress={handleDeleteProfile}
              >
                <Text style={Styles.bluetoothbtntxt}>Delete Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={Styles.bluetoothbtncontainer}
                onPress={() => {
                  props.navigation.navigate('Bluetooth');
                }}
              >

                <Text style={Styles.bluetoothbtntxt}>Monitor health</Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>

    
    </View>
  );
        

              };


export default App;

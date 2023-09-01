import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, ImageBackground, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { RadioButton, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Styles from '../styles/ProfileStyle';
import { NavigationScreenProp } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/Theme';
import { Dropdown } from 'react-native-element-dropdown';
import Styless from '../styles/HomeStyles';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import DropDownPicker from 'react-native-dropdown-picker';
const bgimg = require('./assest/bg.png')


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

const Profile = (props: HomeScreenProps) => {
  const initialValues: FormValues = {
    name: '',
    age: '',
    deviceid: '',
    bloodgroup: '',
    gender: '',
    height: '',
    weight: '',
   

  };
var gender  = [  { label: 'MALE', value: 'male' },  { label: 'FEMALE', value: 'female' },];
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
  const [genderr,setgender] = useState(false);
  const [place,setplace] = useState("select gender")
  const [touchedInputs, setTouchedInputs] = useState({
    name: false,
    age: false,
    deviceid: false,
    bloodgroup : false,
    gender : false,
    height : false,
    weight : false
  });

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
        setIsViewOnly(false);
        setgender(true); 
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
  
  const handleSubmit = async (values: FormValues) => {
    console.log(values);
  
    const dataToStore = JSON.stringify(values);
    try {
      await AsyncStorage.setItem('userProfile', dataToStore);
      setFormValues(values); 
      console.log('Form values stored in AsyncStorage successfully!');
    } catch (error) {
      console.error('Error storing form values in AsyncStorage:', error);
    }
  };
  const handleChange = (field: string) => (value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
    
    setTouchedInputs((prevTouchedInputs) => ({
      ...prevTouchedInputs,
      [field]: true,
    }));
  };


 if(isLoading){ 
  return null}
 
 return (
 
  <SafeAreaView style={Styles.container}>
  
   
  <StatusBar backgroundColor={COLORS.primary}  />
   
     
      <Formik initialValues={formValues} validationSchema={validation} onSubmit={handleSubmit}>
        {({ handleChange, handleSubmit, values, errors, }) => {
         return (
           <KeyboardAvoidingView behavior="padding">
             <ScrollView>
               <View style={Styles.formm}>

                 <Text style={Styles.errortxt}>{touchedInputs.name || errors.name}</Text>
                 <TextInput
                   style={Styles.textinpt}
                   label="Name"
                   placeholder="Enter name"
                   placeholderTextColor={COLORS.placeholder}
                   onChangeText={handleChange('name')}
                   value={values.name}
                   editable={isViewOnly} />

                 <Text style={Styles.errortxt}>{touchedInputs.age || errors.age}</Text>
                 <TextInput
                   style={Styles.textinpt}
                   label="Age"
                   placeholder="Enter age"
                   placeholderTextColor={COLORS.placeholder}
                   onChangeText={handleChange('age')}
                   value={values.age}
                   keyboardType="numeric"
                   editable={isViewOnly} />

                 <Text style={Styles.errortxt}>{touchedInputs.deviceid || errors.deviceid}</Text>
                 <TextInput
                   style={Styles.textinpt}
                   label="DeviceID"
                   placeholder="Enter deviceid"
                   placeholderTextColor={COLORS.placeholder}
                   onChangeText={handleChange('deviceid')}
                   value={values.deviceid}
                   keyboardType="numeric"
                   editable={isViewOnly} />

                 <Text style={Styles.errortxt}>{touchedInputs.bloodgroup || errors.bloodgroup}</Text>
                 <TextInput
                   style={Styles.textinpt}
                   label="Bloodgroup"
                   placeholder="Enter bloodgroup"
                   placeholderTextColor={COLORS.placeholder}
                   onChangeText={handleChange('bloodgroup')}
                   value={values.bloodgroup}
                   editable={isViewOnly} />
                 <Dropdown  selectedTextStyle={style1.pl}  placeholder={place} placeholderStyle={style1.pl} style={style1.dropdown}  itemTextStyle={style1.text} data={gender} labelField={'label'} valueField={'label'} disable={genderr}
                  
                  onChange={(item: { label: string; value: string }) => {
                    handleChange('gender')(item.value);
                    setplace(item.label) // Update the 'gender' field in the form
                  }}
                  
                   />

                 <Text style={Styles.errortxt}>{touchedInputs.height || errors.height}</Text>
                 <TextInput
                   style={Styles.textinpt}
                   label="Height"
                   placeholder="Enter height"
                   placeholderTextColor={COLORS.placeholder}
                   onChangeText={handleChange('height')}
                   value={values.height}
                   keyboardType="numeric"
                   editable={isViewOnly} />

                 <Text style={Styles.errortxt}>{touchedInputs.weight || errors.weight}</Text>
                 <TextInput
                   style={Styles.textinpt}
                   label="Weight"
                   placeholder="Enter weight"
                   placeholderTextColor={COLORS.placeholder}
                   onChangeText={handleChange('weight')}
                   value={values.weight}
                   keyboardType="numeric"
                   editable={isViewOnly} />

               </View>
             </ScrollView>

             <View style={Styles.btnscontainter}>
               {isViewOnly ? (
                 <TouchableOpacity
                   onPress={() => {
                     if (!Object.values(errors).some(error => error)) {
                       setIsViewOnly(false);
                       setgender(true);
                       setTouchedInputs((prevTouchedInputs) => ({
                         ...prevTouchedInputs,
                         name: true,
                         age: true,
                         deviceid: true,
                         bloodgroup: true,
                         gender: true,
                         height: true,
                         weight: true,
                       }));
                       handleSubmit();
                     }
                   } }
                   style={Styles.appbtncontainer}
                 >
                   <Text style={Styles.appbtntext}>Submit</Text>
                 </TouchableOpacity>
               ) : (
                 <TouchableOpacity
                   onPress={() => {
                     setIsViewOnly(true);
                     setgender(false);

                   } }
                   style={Styles.approundbtn}
                 >
                   <Text style={Styles.appbtntext}>Edit</Text>
                 </TouchableOpacity>
               )}
             </View>


           </KeyboardAvoidingView>
         );
       }}
      </Formik>
      
      
      
    
   
    </SafeAreaView>
   

  );
        

   };
   const style1 = StyleSheet.create( {
   dropdown : {
   

   },
   text : {
   color: 'black'
   },
   pl : {
    color: 'black'
   }

   } )


export default Profile;

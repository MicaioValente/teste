import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import * as DocumentPicker from 'expo-document-picker';
import {useState } from 'react'
import DocumentPicker from 'react-native-document-picker';
export default function App() {
const [singleFile, setSingleFile] = useState(null);

  const _pickDocument = async () => {
    // let result = await DocumentPicker.getDocumentAsync({});
    // let result = await DocumentPicker.pick({
    //   type: [DocumentPicker.types.allFiles],
    // });
   
      // console.log('response', response)
      try {
        const resp = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.allFiles],
        });
        console.log('resp', resp)
        const data = new FormData();
          data.append('fileUploader', 1);
          resp.forEach((file) => data.append('Files', file))
          
        console.log('data', data)

        let res = await fetch(
          'https://app.obstcare.com/api/Documents/Gestation/08dad806-5227-4a53-8f83-2e467c6d8665',
          {
            method: 'post',
            body: data,
            headers: {
              'Content-Type': 'multipart/form-data; ',
              
            },
          }
        );
        const response = await res.json()
        console.log('response', response)
      }catch (e){
        console.log('error', e)
      }
      //  axios.post('https://app.obstcare.com/api/Documents/Gestation/08dad806-5227-4a53-8f83-2e467c6d8665', data, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // })
      //   .then(function (response) {
      //     console.log('response', response);
      //   })
      //   .catch(function (error) {
      //     console.error('error', error);
      //   });


      // try {
      //   console.log('response', response.data)
      //   // axios.post('https://app.obstcare.com/api/Documents/Gestation/08dad806-5227-4a53-8f83-2e467c6d8665')
      // }catch (e) {
      //   console.log(e)
      // }
  }

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      // Setting the state to show single file attributes
      setSingleFile(res);
      _pickDocument()
    } catch (err) {
      console.log(err)
      setSingleFile(null);
      // Handling any exception (If any)
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => _pickDocument()}>
        <Text>Document1</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#0ff',
    padding: 16
  }
});

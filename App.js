import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

export default function App() {
  const _pickDocument = async () => {
      try {
        const documents = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.allFiles],
        });

        const body = new FormData();
        body.append('fileUploader', 1)
        documents.forEach(document => {
          body.append(`Files`, document)
        })

        console.log(JSON.stringify(body))
          
        let res = await fetch(
          'https://app.obstcare.com/api/Documents/Gestation/08dad806-5227-4a53-8f83-2e467c6d8665',
          {
            method: 'POST',
            body,
            headers: {
              Accept: '*/*',
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        const text = await res.text()
        console.log('text', text)
        const response = await res.json()
        console.log('response', response)
      }catch (e){
        console.log('error', e)
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

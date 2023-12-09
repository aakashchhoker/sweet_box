import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import SweetBox from './src/Component/SweetBox';

const App = () => {
  const [isSubmitVisible, setIsSubmitVisible] = useState(false)

  const handleSubmitModal = () =>{
    setIsSubmitVisible(!isSubmitVisible)
  }
  
  return (
    <View style={styles.container}>
      <SweetBox isSubmitVisible={isSubmitVisible} handleSubmitModal={handleSubmitModal} />
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitModal}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submitBtn: {
    backgroundColor: '#5999e6',
    // width: '100%',
    height: 40,
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 30
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#ffff',
  },
});

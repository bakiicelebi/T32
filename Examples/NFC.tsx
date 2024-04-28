import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,  Alert } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
NfcManager.start();

function App() {

  const [key, setKey] = useState([])

    
  async function readNdef() {
    try {
      console.log(key)

      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      const { id }:any = tag;
      console.log(tag)
      if (key.length == 0) {
        setKey(id);
        Alert.alert("Ayarlandi")
        console.log(id)
      }
      else if (key == id) {
        console.log("as")
        Alert.alert("Dogru Giris")

      }
      else {
        Alert.alert("Yanlis Giris")
      }


    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef}>
        <Text>Scan a Tag</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
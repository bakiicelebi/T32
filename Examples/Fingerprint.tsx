import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

const App = () => {

  const rnBiometrics = new ReactNativeBiometrics() 


  const authenticateBiometrics = async () => {
    try {
      const { success, error } = await rnBiometrics.simplePrompt({
        promptMessage: 'Biyometrik kimlik',
      });
      if (success) {
        // Başarılı doğrulama durumunda burada işlemleri gerçekleştirin
        console.log('Biyometrik kimlik doğrulaması başarılı');
      } else {
        // Hata durumunda veya kullanıcı iptal ederse burada uygun işlemleri yapın
        console.error('Biyometrik kimlik doğrulaması başarısız', error);
      }
    } catch (error) {
      console.error('Bir hata oluştu', error);
    }
  };

  return (
    <View >
      <Button title='AA' onPress={authenticateBiometrics} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

import React from 'react'
import LottieView from "lottie-react-native"

const SplashLoading =() => {
  return(
    <LottieView style={{flex: 1}} source={require('../../../../assets/Animations/loading.json')} autoPlay loop />
  )
}

export default SplashLoading;
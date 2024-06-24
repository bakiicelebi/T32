import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'

const DismissKeyboard = ({ children, disabled }: any) => (
    <TouchableWithoutFeedback disabled={disabled} touchSoundDisabled onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

export default DismissKeyboard
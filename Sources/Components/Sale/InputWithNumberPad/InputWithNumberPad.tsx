import { Box, NativeBaseProvider, Input } from 'native-base'
import React, { useEffect, useState } from 'react'
import NumberPad from '../NumberPad'
import { useCartContext } from '../../../context/CartContext';
import { useTranslation } from 'react-i18next';

const InputWithNumberPad = () => {

    const [inputValue, setInputValue] = useState("");
    const { piece, handlePiece } = useCartContext()
    const [pieceState, setPieceState] = useState(1);

    const { t, i18n } = useTranslation()

    const handleClick = (item: string) => {
        if (item === "X" && inputValue.length > -1) {
            setInputValue((prevInput: string) => prevInput.slice(0, -1));
        } else if (item === "A") {
            if (inputValue === "" || inputValue === "0") {
                return;
            }
            else {
                setPieceState(parseInt(inputValue));
                setInputValue("")
            }
        }
        else {
            setInputValue((prevInput: string) => prevInput + item.toString());
        }
    }

    useEffect(() => {
        handlePiece(pieceState)
    }, [pieceState])

    useEffect(() => {
        if (piece === 1) {
            setPieceState(1)
        }
    }, [piece])


    return (
        <NativeBaseProvider>
            <Box style={{ flex: 1 }}>
                <Input borderWidth={0} fontSize={25} fontWeight={"bold"} style={{ color: "red" }} size={"2xl"} isDisabled value={inputValue} placeholder={t('pieces')} />
                <NumberPad onPress={handleClick} />
            </Box>
        </NativeBaseProvider>
    )
}

export default InputWithNumberPad
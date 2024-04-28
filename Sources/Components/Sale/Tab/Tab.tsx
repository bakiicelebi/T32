import { View, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';


//BU SAYFAYA İKON EKLENSİN


const Tabs = (props: any) => {

    const { tabKey, activeTab, navigate, closePage, lastTab } = props;

    const [active, setActive] = useState(false)

    useEffect(() => {
        if (activeTab === tabKey) {
            setActive(true)
        }
        else {
            setActive(false)
        }
    }, [activeTab])


    return (

        <View style={{ backgroundColor: active ? "lightblue" : "lightgray", width: 75, padding: 5 }}>
            <TouchableWithoutFeedback disabled={active} onPress={navigate}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text >Sale {tabKey}</Text>
                    {active && !lastTab && <TouchableOpacity onPress={closePage}>
                        <Text>X</Text>
                    </TouchableOpacity>}
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Tabs;
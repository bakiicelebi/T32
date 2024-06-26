import { LineChart } from "react-native-gifted-charts"
import { Button, Text, View } from 'react-native'
import React, { useState } from 'react'


const App = () => {

  const dPoint = () => {
    return (
      <View
        style={{
          width: 14,
          height: 14,
          backgroundColor: 'white',
          borderWidth: 3,
          borderRadius: 7,
          borderColor: '#07BAD1',
        }}
      />
    );
  };
  const latestData = [
    {
      value: 100,
      labelComponent: () => <Text>asassaas</Text>,
      customDataPoint: dPoint,
    },
    {
      value: 120,
      hideDataPoint: true,
    },
    {
      value: 210,
      customDataPoint: dPoint,
    },
    {
      value: 250,
      hideDataPoint: true,
    },
    {
      value: 320,
      //labelComponent: () => lcomp('24 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 310,
      hideDataPoint: true,
    },
    {
      value: 270,
      customDataPoint: dPoint,
    },
    {
      value: 240,
      hideDataPoint: true,
    },
    {
      value: 130,
      //labelComponent: () => lcomp('26 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 200,
      hideDataPoint: true,
    },
    {
      value: 100,
      customDataPoint: dPoint,
    },
    {
      value: 210,
      hideDataPoint: true,
    },
    {
      value: 270,
      //labelComponent: () => lcomp('28 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 240,
      hideDataPoint: true,
    },
    {
      value: 120,
      hideDataPoint: true,
    },
    {
      value: 100,
      customDataPoint: dPoint,
    },
    {
      value: 210,
      //labelComponent: () => lcomp('28 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 20,
      hideDataPoint: true,
    },
    {
      value: 100,
      customDataPoint: dPoint,
    },
  ];
  const newData = [
    {
      value: 100,
      //labelComponent: () => lcomp('22 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 120,
      hideDataPoint: true,
    },
    {
      value: 210,
      customDataPoint: dPoint,
    },
    {
      value: 250,
      hideDataPoint: true,
    },
    {
      value: 320,
      //labelComponent: () => lcomp('24 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 310,
      hideDataPoint: true,
    },
    {
      value: 270,
      customDataPoint: dPoint,
    },
    {
      value: 240,
      hideDataPoint: true,
    },
    {
      value: 130,
      //labelComponent: () => lcomp('26 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 500,
      hideDataPoint: true,
    },
    {
      value: 100,
      customDataPoint: dPoint,
    },
    {
      value: 210,
      hideDataPoint: true,
    },
    {
      value: 270,
      //labelComponent: () => lcomp('28 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 240,
      hideDataPoint: true,
    },
    {
      value: 120,
      hideDataPoint: true,
    },
    {
      value: 100,
      customDataPoint: dPoint,
    },
    {
      value: 210,
      labelComponent: () => <Text>ASSSSAS</Text>,
      customDataPoint: dPoint,
    },
    {
      value: 20,
      hideDataPoint: true,
    },
    {
      value: 100,
      customDataPoint: dPoint,
    },
  ];
  const [currentData, setCurrentData] = useState(latestData);
  const onPress = () => {
    console.log("asasas")
    setCurrentData(newData)
  }
  return (
    <View>
      <View
        style={{
          marginVertical: 100,
          paddingVertical: 50,
          backgroundColor: '#414141',
        }}>
        <LineChart
          isAnimated
          thickness={5}
          color="#07BAD1"
          
          maxValue={600}
          noOfSections={3}
          animateOnDataChange
          animationDuration={1000}
          areaChart
          yAxisTextStyle={{ color: 'lightgray' }}
          data={currentData}
          hideDataPoints
          startFillColor={'rgb(84,219,234)'}
          endFillColor={'rgb(84,219,234)'}
          startOpacity={0.4}
          endOpacity={0.1}
          spacing={22}
          backgroundColor="#414141"
          rulesColor="gray"
          rulesType="solid"
          initialSpacing={10}
          yAxisColor="lightgray"
          xAxisColor="lightgray"
        />
      </View>
      <Button title="AA" onPress={onPress} />
    </View>
  );
};

export default App;
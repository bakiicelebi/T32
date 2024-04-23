import React from 'react';
import { View, Text } from 'react-native';
import { BarChart as BarGraph } from 'react-native-gifted-charts';

const BarChart = () => {

    const data = [
        { value: 2500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: 'Jan' },
        { value: 2400, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

        { value: 3500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: 'Feb' },
        { value: 3000, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

        { value: 4500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: 'Mar' },
        { value: 4000, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

        { value: 5200, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: 'Apr' },
        { value: 4900, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

        { value: 3000, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: 'May' },
        { value: 2800, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },
    ];

    return (
        <View
            style={{
                margin: 10,
                paddingLeft: 5,
                padding: 20,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
            }}>
            <View >
                <BarGraph
                    data={data}
                    barWidth={20}
                    initialSpacing={10}
                    spacing={20}
                    barBorderTopLeftRadius={10}
                    barBorderTopRightRadius={10}
                    xAxisType={'dashed'}
                    xAxisColor={'lightgray'}
                    yAxisTextStyle={{ color: 'lightgray' }}
                    stepValue={1000}
                    maxValue={6000}
                    noOfSections={6}
                    yAxisLabelTexts={['0', '1k', '2k', '3k', '4k', '5k', '6k']}
                    labelWidth={40}
                    xAxisLabelTextStyle={{ color: 'lightgray', textAlign: 'center' }}
                    showLine
                    lineConfig={{
                        isAnimated: true,
                        animationDuration:2000,
                        color: '#F29C6E',
                        thickness: 3,
                        curved: true,
                        hideDataPoints: true,
                        shiftY: 20,
                        initialSpacing: -5,
                    }}
                    renderTooltip={(item: any, index: any) => {
                        return (
                            <View
                                style={{
                                    marginBottom: 20,
                                    marginLeft: -8,
                                    backgroundColor: '#ffcefe',
                                    paddingHorizontal: 6,
                                    paddingVertical: 4,
                                    borderRadius: 4,
                                    position: "absolute"
                                }}>
                                <Text>{item.value}</Text>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
}

export default BarChart;

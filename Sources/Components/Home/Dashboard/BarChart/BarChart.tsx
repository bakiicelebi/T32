import React from 'react';
import { Box, Text, useColorMode } from 'native-base';
import { BarChart as BarGraph } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';

const BarChart = () => {

    const { t, i18n } = useTranslation();
    const data = [
        { value: 250, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: t('jan') },
        { value: 240, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

        { value: 350, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: t('feb') },
        { value: 300, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

        { value: 450, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: t('mar') },
        { value: 400, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

        { value: 520, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: t('apr') },
        { value: 490, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

        { value: 300, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: t('may') },
        { value: 280, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },
    ];

    const { colorMode } = useColorMode()

    return (
        <Box
            style={{
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Box >
                <BarGraph
                    data={data}
                    barWidth={20}
                    initialSpacing={10}
                    spacing={20}
                    barBorderTopLeftRadius={10}
                    barBorderTopRightRadius={10}
                    xAxisType={'solid'}
                    rulesColor={colorMode==="dark"? "#7f8183": "black"}
                    rulesThickness={1}
                    xAxisColor={colorMode==="dark"? "#7f8183": "black"}
                    xAxisThickness={2}
                    yAxisColor={colorMode==="dark"? "#7f8183": "black"}
                    yAxisThickness={2}
                    yAxisTextStyle={{ color: colorMode==="dark"? "#7f8183": "black" }}
                    stepValue={100}
                    maxValue={600}
                    noOfSections={6}
                    yAxisLabelTexts={['0', '100', '200', '300', '400', '500', '600']}
                    labelWidth={40}
                    xAxisLabelTextStyle={{ color: colorMode==="dark"? "#7f8183": "black", textAlign: 'center' }}
                    showLine
                    lineConfig={{
                        isAnimated: false,
                        color: '#ea7465',
                        thickness: 3,
                        curved: true,
                        hideDataPoints: true,
                        shiftY: 20,
                        initialSpacing: -5,
                    }}
                    renderTooltip={(item: any, index: any) => {
                        return (
                            <Box
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
                            </Box>
                        );
                    }}
                />
            </Box>
        </Box>
    );
}

export default BarChart;

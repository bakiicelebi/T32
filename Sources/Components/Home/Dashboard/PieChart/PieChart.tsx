import React from 'react';
import { PieChart as PieGraph } from 'react-native-gifted-charts';
import { useState } from "react";
<<<<<<< HEAD
import { ScrollView, View, Button } from "react-native";
import { Box, Text, useColorMode } from 'native-base';
import { useTranslation } from 'react-i18next';

const PieChart = ({ type }: any) => {

    const { t, i18n } = useTranslation();
    const { colorMode } = useColorMode()

    const pieData = [
        {
            value: type ? 47 : 81,
=======
import { ScrollView, View, Button, Text } from "react-native";

const PieChart = () => {

    const pieData = [
        {
            value: 47,
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
            color: '#009FFF',
            gradientCenterColor: '#006DFF',
            focused: true,
        },
<<<<<<< HEAD
        { value: type ? 16 : 10, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
        { value: type ? 40 : 5, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
        { value: type ? 3 : 4, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
=======
        { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
        { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
        { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
    ];

    const renderDot = (color: any) => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: color,
                    marginRight: 10,
                }}
            />
        );
    };

    const renderLegendComponent = () => {
        return (
            <>
<<<<<<< HEAD
                <Box
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 4,
                    }}>
                    <Box
=======
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}>
                    <View
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 20,
                        }}>
                        {renderDot('#006DFF')}
<<<<<<< HEAD
                        <Text fontWeight={"semibold"} >{t('excellent')}: {type ? "47%" : "81%"}</Text>
                    </Box>
                    <Box
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#8F80F3')}
                        <Text fontWeight={"semibold"} >{t('okay')}: {type ? "16%" : "10%"}</Text>
                    </Box>
                </Box>
                <Box style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Box
=======
                        <Text style={{ color: 'white' }}>Excellent: 47%</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#8F80F3')}
                        <Text style={{ color: 'white' }}>Okay: 16%</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 20,
                        }}>
                        {renderDot('#3BE9DE')}
<<<<<<< HEAD
                        <Text fontWeight={"semibold"} >{t('good')}: {type ? "40%" : "5%"}</Text>
                    </Box>
                    <Box
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#FF7F97')}
                        <Text fontWeight={"semibold"} >{t('poor')}: {type ? "3%" : "4%"}</Text>
                    </Box>
                </Box>
=======
                        <Text style={{ color: 'white' }}>Good: 40%</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#FF7F97')}
                        <Text style={{ color: 'white' }}>Poor: 3%</Text>
                    </View>
                </View>
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
            </>
        );
    };

    return (

<<<<<<< HEAD
        <Box shadow={"4"}
            _dark={{
                bg: "#1e1f21"
            }} _light={{
                bg: "#ffffff"
            }}
=======
        <View
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
            style={{
                margin: 20,
                padding: 16,
                borderRadius: 20,
<<<<<<< HEAD
            }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {type ? t("sale statistics") : t('performance')}
            </Text>
            <Box style={{ padding: 20, alignItems: 'center' }}>
=======
                backgroundColor: '#232B5D',
            }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Performance
            </Text>
            <View style={{ padding: 20, alignItems: 'center' }}>
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
                <PieGraph
                    data={pieData}
                    donut
                    sectionAutoFocus
                    selectedIndex={2}
                    showGradient
<<<<<<< HEAD
                    radius={60}
                    innerRadius={42}
                    innerCircleColor={colorMode === "dark" ? "#1e1f21" : "#ffffff"}
                    centerLabelComponent={() => {
                        return (
                            <Box style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text
                                    style={{ fontSize: 22, fontWeight: 'bold' }}>
                                    {type ? "45" : "81"}
                                </Text>
                                <Text style={{ fontSize: 14 }}>{t('excellent')}</Text>
                            </Box>
                        );
                    }}
                />
            </Box>
            {renderLegendComponent()}
        </Box>);
=======
                    radius={90}
                    innerRadius={60}
                    innerCircleColor={'#232B5D'}
                    centerLabelComponent={() => {
                        return (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text
                                    style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                                    47%
                                </Text>
                                <Text style={{ fontSize: 14, color: 'white' }}>Excellent</Text>
                            </View>
                        );
                    }}
                />
            </View>
            {renderLegendComponent()}
        </View>);
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
}

export default PieChart;


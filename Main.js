import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Rect } from 'react-native-svg';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {

    const saveSvgValues = async () => {
        try {
            await AsyncStorage.setItem(
                'svgValues',
                JSON.stringify({
                    text1: text1,
                    text2: text2,
                    text3: text3,
                    text4: text4,
                }))
            alert('Data successfully saved')
        }
        catch (e) {
            alert('Failed to save the data to the storage')
        }
    }

    const getSvgValues = async () => {
        const data = await AsyncStorage.getItem('svgValues')
        const parsedData = JSON.parse(data);
        const { text1, text2, text3, text4 } = parsedData;
        console.log(text1, text2, text3, text4);
    }

    const Separator = () => (
        <View style={styles.separator} />
    );

    const [text1, setText1] = useState();
    const [text2, setText2] = useState();
    const [text3, setText3] = useState();
    const [text4, setText4] = useState();

    return (
        <ScrollView style={styles.contentContainer}>
            <View>
                {/* <Text style={styles.heading}>Create SVGs</Text> */}
                <View styles={styles.container}>
                    <Svg height="60%" width="80%" viewBox="-10 -110 10000 10200" preserveAspectRatio="xMinYMin meet">
                        <Rect
                            x={text1}
                            y={text2}
                            width={text3}
                            height={text4}
                            stroke="red"
                            strokeWidth="100"
                        // fill="yellow"
                        />
                    </Svg>
                </View>
                <Separator style={styles.marginn} />
                <View styles={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter the position x"
                        onChangeText={text1 => setText1(text1)}
                        value={text1}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter the position y"
                        onChangeText={text2 => setText2(text2)}
                        value={text2}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter the height in thousands"
                        onChangeText={text3 => setText3(text3)}
                        value={text3}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter the width in thousands"
                        onChangeText={text4 => setText4(text4)}
                        value={text4}
                    />
                    <TouchableOpacity onPress={saveSvgValues} style={styles.appButtonContainer}>
                        <Text style={styles.appButtonText}>Click to save!</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={getSvgValues} style={styles.appButtonContainer2}>
                        <Text style={styles.appButtonText}>See saved dimensions</Text>
                    </TouchableOpacity>
                    <Text>{text1}</Text>
                    <Text>{text2}</Text>
                    <Text>{text3}</Text>
                    <Text>{text4}</Text>
                </View>
            </View>
        </ScrollView>
    );
};


const savedScreen = ({ navigation, route }) => {
    return <Text>This is {route.params.name}'s profile</Text>;
};

export default function Main() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Create SVGs' }}
                />
                <Stack.Screen name="savedScreen" component={savedScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: "aliceblue",
        alignSelf: 'center',
        flexGrow: 1,
        paddingBottom: 10,
    },
    input: {
        height: 30,
        margin: 12,
        borderWidth: 1,
        marginHorizontal: 110
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginHorizontal: 120
    },
    appButtonContainer2: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginHorizontal: 120,
        marginTop: 10
    },
    appButtonText: {
        fontSize: 13,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    heading: {
        fontSize: 25,
        color: "black",
        fontFamily: "Cochin",
        margin: 20,
        marginHorizontal: 110,
        borderRadius: 10,
        padding: 12,
        borderWidth: 2,
        borderColor: "black",
    },
    separator: {
        marginVertical: 4,
        marginHorizontal: 60,
        borderBottomColor: '#737373',
        borderBottomWidth: 1.5,
    },
    container: {
        margin: 100,
        paddingTop: 200,
    },
    container1: {
        height: width / 3,
    },
})
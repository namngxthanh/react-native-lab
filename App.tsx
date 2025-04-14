import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Button, ScrollView } from "react-native";

// Import 10 screens
import bai1 from "./Lab/lab1/b1";
import bai2 from "./Lab/lab1/b2";
import bai3 from "./Lab/lab1/b3";
import bai4 from "./Lab/lab1/b4";
import bai5 from "./Lab/lab1/b5";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: any) {
    const screens = ["bai1", "bai2", "bai3", "bai4", "bai5"];

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            {screens.map((lab1, index) => (
                <View key={index} style={{ marginVertical: 10 }}>
                    <Button
                        title={`Go to ${lab1}`}
                        onPress={() => navigation.navigate(lab1)}
                    />
                </View>
            ))}
        </ScrollView>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="bai1" component={bai1} />
                <Stack.Screen name="bai2" component={bai2} />
                <Stack.Screen name="bai3" component={bai3} />
                <Stack.Screen name="bai4" component={bai4} />
                <Stack.Screen name="bai5" component={bai5} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

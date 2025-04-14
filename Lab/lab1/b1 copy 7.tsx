import React from "react";
import { View, Text, Button } from "react-native";

export default function bai1({ navigation }: any) {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "lightblue",
            }}
        >
            <Text>Hello, React Native!</Text>
        </View>
    );
}

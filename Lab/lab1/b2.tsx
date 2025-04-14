import React from "react";
// Thêm TouchableOpacity và Text vào import
import { View, Alert, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function bai2({ navigation }: any) {
    return (
        <View
            style={{
                flex: 1,
                padding: 40,
                // Căn giữa để dễ nhìn hơn (tùy chọn)
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* Thay thế Button bằng TouchableOpacity */}
            <TouchableOpacity onPress={() => Alert.alert("Hello!")}>
                <Text style={{ padding: 10, backgroundColor: "lightblue" }}>
                    Custom Button
                </Text>
            </TouchableOpacity>
        </View>
    );
}

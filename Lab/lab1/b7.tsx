import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    Alert,
    ViewStyle,
    TextStyle,
} from "react-native";

// ---- Định nghĩa kiểu cho Styles ----
interface Styles {
    safeArea: ViewStyle;
    container: ViewStyle;
    label: TextStyle;

    input: ViewStyle & TextStyle; // <--- Sửa ở đây
}

const App: React.FC = () => {
    const [name, setName] = useState<string>("");

    const handleSubmit = () => {
        if (name.trim() === "") {
            Alert.alert("Please enter your name!");
        } else {
            Alert.alert(`Hello, ${name}!`);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.label}>What is your name?</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter name"
                    placeholderTextColor="#aaa"
                    value={name}
                    onChangeText={setName}
                />

                <Button title="Submit" onPress={handleSubmit} />
            </View>
        </SafeAreaView>
    );
};

// ---- Định nghĩa Styles ----
// Kiểu Styles đã được cập nhật ở trên
const styles = StyleSheet.create<Styles>({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: "bold",
    },
    input: {
        height: 45,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,

        fontSize: 16,
        color: "#000",
    },
});

export default App;

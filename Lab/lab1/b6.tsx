import React from "react";

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextStyle,
    ViewStyle,
} from "react-native";

// ---- Định nghĩa kiểu cho Styles ----
interface Styles {
    safeArea: ViewStyle;
    scrollViewContainer: ViewStyle;
    itemText: TextStyle;
}

// ---- Component chính (App hoặc Bai6) ----
const App: React.FC = () => {
    const items = [...Array(20)];

    return (
        // Sử dụng SafeAreaView
        <SafeAreaView style={styles.safeArea}>
            {}
            <ScrollView style={styles.scrollViewContainer}>
                {}
                {items.map((_, index) => (
                    <Text key={index} style={styles.itemText}>
                        Item {index + 1} {}
                    </Text>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

// ---- Định nghĩa Styles ----
const styles = StyleSheet.create<Styles>({
    safeArea: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollViewContainer: {
        flex: 1,
    },
    itemText: {
        padding: 15,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#fff",
        marginVertical: 2,
    },
});

export default App;

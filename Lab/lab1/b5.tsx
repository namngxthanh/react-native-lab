import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ViewStyle,
    TextStyle,
} from "react-native";

// ---- Định nghĩa kiểu cho Styles ----
interface Styles {
    // Thêm safeArea vào đây
    safeArea: ViewStyle; // <--- Dòng cần thêm
    container: ViewStyle;
    box: ViewStyle;
    boxText: TextStyle;
}

// ---- Định nghĩa kiểu cho Props của Square ----
interface SquareProps {
    text: string;
}

// ---- Component Square ----
const Square: React.FC<SquareProps> = ({ text }) => {
    return (
        <View style={styles.box}>
            <Text style={styles.boxText}>{text}</Text>
        </View>
    );
};

// ---- Component chính (App hoặc Bai5) ----
const App: React.FC = () => {
    return (
        // Giờ đây styles.safeArea sẽ hợp lệ
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Square text="1" />
                <Square text="2" />
                <Square text="3" />
            </View>
        </SafeAreaView>
    );
};

// ---- Định nghĩa Styles ----
// Kiểu Styles đã được cập nhật ở trên
const styles = StyleSheet.create<Styles>({
    safeArea: {
        // Style này giờ đã hợp lệ với interface Styles
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    box: {
        width: 80,
        height: 80,
        backgroundColor: "#7ce0f9",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    boxText: {
        color: "#333",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default App;

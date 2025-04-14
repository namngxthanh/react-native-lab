import React from "react";
// Import kiểu StyleSheet nếu cần định nghĩa rõ ràng, nhưng thường không bắt buộc với ví dụ đơn giản
import { View, StyleSheet, Alert } from "react-native";
// Import component MyButton từ file .tsx
import MyButton from "./Mybutton"; // TypeScript thường tự tìm file .tsx

// Khai báo App là một Functional Component (tùy chọn nhưng rõ ràng)
const App: React.FC = () => {
    // Hàm xử lý sự kiện nhấn nút, kiểu được suy luận
    const handlePress = () => {
        Alert.alert("Pressed!");
    };

    const handleSecondPress = () => {
        Alert.alert("Second button pressed!");
    };

    return (
        // Kiểu của styles.container được suy luận là ViewStyle
        <View style={styles.container}>
            {/* TypeScript sẽ kiểm tra các props truyền vào MyButton có khớp với MyButtonProps không */}
            <MyButton
                text="Click Here"
                onPress={handlePress}
                style={{
                    padding: 10,
                    backgroundColor: "orange",
                    borderRadius: 8,
                }}
            />

            <View style={{ height: 20 }} />

            <MyButton
                text="Another Button"
                onPress={handleSecondPress}
                style={{
                    paddingVertical: 12,
                    paddingHorizontal: 25,
                    backgroundColor: "#007BFF",
                    borderRadius: 5,
                }}
            />
        </View>
    );
};

// Kiểu của StyleSheet.create cũng được suy luận tốt trong trường hợp đơn giản
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
});

export default App;

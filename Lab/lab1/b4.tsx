// App.tsx
import React, { useState } from "react"; // Import useState từ React
import {
    SafeAreaView, // Sử dụng SafeAreaView để tránh bị che bởi tai thỏ/notch
    StyleSheet,
    View,
    Text,
    Button, // Import Button
} from "react-native";

// Khai báo App là một Functional Component
const App: React.FC = () => {
    // Khởi tạo state 'count' với giá trị ban đầu là 0
    // useState trả về một mảng: [giá trị state hiện tại, hàm để cập nhật state đó]
    const [count, setCount] = useState<number>(0); // Chỉ định rõ kiểu là number

    // Hàm tăng giá trị count lên 1
    const incrementCount = () => {
        setCount(count + 1); // Cập nhật state, component sẽ render lại
    };

    // Hàm reset giá trị count về 0 (Thực hiện phần "Try This")
    const resetCount = () => {
        setCount(0); // Cập nhật state về 0
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Hiển thị giá trị count hiện tại */}
                <Text style={styles.text}>You clicked {count} times</Text>

                {/* Nút bấm để tăng count */}
                <Button
                    title="Click me"
                    onPress={incrementCount} // Gọi hàm incrementCount khi nhấn
                />

                {/* Thêm khoảng cách giữa 2 nút */}
                <View style={styles.spacer} />

                {/* Nút bấm để reset count (Thực hiện phần "Try This") */}
                <Button
                    title="Reset"
                    color="#FF5C5C" // Thêm màu cho nút Reset (tùy chọn)
                    onPress={resetCount} // Gọi hàm resetCount khi nhấn
                />
            </View>
        </SafeAreaView>
    );
};

// Định nghĩa styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1, // Đảm bảo SafeAreaView chiếm toàn bộ màn hình
    },
    container: {
        flex: 1, // Chiếm toàn bộ không gian của SafeAreaView
        justifyContent: "center", // Căn giữa nội dung theo chiều dọc
        alignItems: "center", // Căn giữa nội dung theo chiều ngang
        padding: 40, // Padding xung quanh nội dung
    },
    text: {
        fontSize: 20, // Kích thước chữ
        marginBottom: 20, // Khoảng cách dưới Text
    },
    spacer: {
        height: 20, // Tạo khoảng trống giữa 2 nút
    },
});

export default App;

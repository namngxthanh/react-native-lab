import { StyleSheet, Text, TouchableOpacity } from "react-native"; // 1. Thêm TouchableOpacity, bỏ View không dùng
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../src/features/store"; // Đảm bảo đường dẫn này đúng

// Định nghĩa props interface
interface ButtonProps {
    onPress: () => void;
    title: string; // 2. Xóa title bị trùng lặp
    isBlue?: boolean;
    isGray?: boolean;
}

// 3. Sửa cách nhận và định kiểu props bằng destructuring
const Button = ({ onPress, title, isBlue, isGray }: ButtonProps) => {
    const isDarkMode = useSelector(
        (state: RootState) => state.theme.isDarkMode
    ); // Giả sử state.theme.isDarkMode tồn tại

    return (
        // Sử dụng TouchableOpacity để có hiệu ứng khi nhấn
        <TouchableOpacity
            style={[
                styles.button,
                // Áp dụng style nền dựa vào props và dark mode
                isBlue
                    ? styles.btnBlue // Ưu tiên isBlue
                    : isGray
                    ? styles.btnGray // Tiếp theo là isGray
                    : isDarkMode
                    ? styles.btnDark // Nếu không, dựa vào dark mode
                    : styles.btnLight, // Mặc định là light
            ]}
            onPress={onPress} // Gán hàm xử lý onPress
        >
            <Text
                style={[
                    styles.text,
                    // Áp dụng style màu chữ
                    isBlue || isGray
                        ? styles.textWhite // Nút Blue hoặc Gray chữ trắng
                        : isDarkMode
                        ? styles.textLight // Nếu dark mode thì chữ sáng màu (trắng)
                        : styles.textDark, // Nếu light mode thì chữ tối màu (đen)
                ]}
            >
                {title} {/* Hiển thị tiêu đề nút */}
            </Text>
        </TouchableOpacity>
    );
}; // 4. Thêm dấu ngoặc nhọn đóng component

export default Button;

// Định nghĩa styles
const styles = StyleSheet.create({
    button: {
        width: 70,
        height: 70,
        borderRadius: 35, // Làm cho nút tròn
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
    btnBlue: {
        backgroundColor: "#007BFF", // Nền xanh dương
    },
    btnGray: {
        backgroundColor: "#6c757d", // Nền xám
    },
    btnLight: {
        backgroundColor: "#f8f9fa", // Nền sáng (cho light mode default)
        // Bạn có thể thêm viền nếu muốn nút sáng nổi bật hơn
        // borderWidth: 1,
        // borderColor: "#ced4da",
    },
    btnDark: {
        backgroundColor: "#343a40", // Nền tối (cho dark mode default)
        // Tương tự, có thể thêm viền nếu cần
        // borderWidth: 1,
        // borderColor: "#495057",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
    },
    textLight: {
        color: "#FFFFFF", // Chữ trắng (dùng mã hex rõ ràng)
    },
    textWhite: {
        color: "#FFFFFF", // Chữ trắng (giống textLight)
    },
    textDark: {
        color: "#000000", // Chữ đen (dùng mã hex rõ ràng)
    },
});

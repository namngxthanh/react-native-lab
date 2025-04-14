// MyButton.tsx
import React from "react";
// Import các kiểu cần thiết từ react và react-native
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    GestureResponderEvent, // Kiểu cho sự kiện onPress
    StyleProp, // Kiểu cho prop style
    ViewStyle, // Kiểu style cho View/TouchableOpacity
    TextStyle, // Kiểu style cho Text
} from "react-native";

// Định nghĩa kiểu cho props của component MyButton
interface MyButtonProps {
    text: string; // text phải là string
    onPress: (event: GestureResponderEvent) => void; // onPress là một hàm không trả về gì
    style?: StyleProp<ViewStyle>; // style là tùy chọn (?) và phải là kiểu ViewStyle
}

// Sử dụng React.FC (Functional Component) và kiểu Props đã định nghĩa
const MyButton: React.FC<MyButtonProps> = ({ text, onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonBase, style]}>
            {/* Kiểu của textBase được suy luận là TextStyle từ StyleSheet.create */}
            <Text style={styles.textBase}>{text}</Text>
        </TouchableOpacity>
    );
};

// Định nghĩa kiểu cho đối tượng styles
interface Styles {
    buttonBase: ViewStyle;
    textBase: TextStyle;
}

// Tạo StyleSheet với kiểu đã định nghĩa
const styles = StyleSheet.create<Styles>({
    buttonBase: {
        alignItems: "center",
        justifyContent: "center",
    },
    textBase: {
        color: "white",
        fontSize: 16,
    },
});

export default MyButton;

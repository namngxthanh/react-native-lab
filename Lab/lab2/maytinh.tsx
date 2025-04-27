import { StatusBar } from "expo-status-bar";
import {
    Text,
    View,
    Switch,
    StyleSheet,
    Dimensions,
    SafeAreaView,
} from "react-native"; // Thêm SafeAreaView
// import { store } from "../../src/features/store"; // Không cần import store trực tiếp ở đây
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../src/features/store"; // Đảm bảo đường dẫn đúng
import { toggleTheme } from "../../src/features/themeSlice"; // Đảm bảo đường dẫn và tên action đúng
import MyKeyboard from "../../src/components/Mykeyboard"; // Đảm bảo đường dẫn đúng

const { width, height } = Dimensions.get("window");

// Định nghĩa styles bên ngoài component
const styles = StyleSheet.create({
    // Sử dụng safeArea để tránh đè lên tai thỏ/thanh trạng thái
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "space-between", // Đẩy switch lên trên, keyboard xuống dưới
        paddingBottom: 20, // Thêm chút padding dưới cho keyboard
    },
    containerDark: {
        backgroundColor: "#121212", // Màu nền tối
    },
    containerLight: {
        backgroundColor: "#f5f5f5", // Màu nền sáng
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Đẩy text và switch ra hai bên
        width: "100%",
        paddingHorizontal: width * 0.05, // Padding ngang theo chiều rộng màn hình
        marginTop: height * 0.02, // Giảm khoảng cách từ đỉnh một chút nếu dùng SafeAreaView
        paddingTop: 10, // Thêm padding top để không quá sát cạnh
    },
    text: {
        fontSize: width * 0.045, // Điều chỉnh cỡ chữ nếu cần
        fontWeight: "bold",
    },
    textDark: {
        color: "#FFFFFF",
    },
    textLight: {
        color: "#000000",
    },
    keyboardContainer: {
        // Không cần style đặc biệt ở đây vì container đã dùng space-between
    },
});

// 1. Đổi tên component thành chữ hoa
export default function MayTinh() {
    // <--- Đổi tên
    // Lấy trạng thái dark mode và hàm dispatch từ Redux
    const isDarkMode = useSelector(
        (state: RootState) => state.theme.isDarkMode
    );
    const dispatch = useDispatch();

    // 2. Sửa handleToggle: dispatch toggleTheme() không cần tham số
    const handleThemeToggle = () => {
        // Chỉ cần dispatch action toggle, reducer trong slice sẽ tự xử lý việc đảo trạng thái
        dispatch(toggleTheme(!isDarkMode)); // Pass the opposite of the current theme state as the payload
    };

    return (
        // Bao bọc bằng SafeAreaView để đảm bảo nội dung không bị che khuất
        <SafeAreaView
            style={[
                styles.safeArea,
                isDarkMode ? styles.containerDark : styles.containerLight,
            ]}
        >
            <View style={styles.container}>
                {/* StatusBar tự động điều chỉnh màu chữ dựa trên style */}
                <StatusBar style={isDarkMode ? "light" : "dark"} />

                {/* Phần chứa Text và Switch */}
                <View style={styles.switchContainer}>
                    <Text
                        style={[
                            styles.text,
                            isDarkMode ? styles.textDark : styles.textLight,
                        ]}
                    >
                        {isDarkMode ? "Dark Mode" : "Light Mode"}
                    </Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        value={isDarkMode} // Giá trị của Switch được điều khiển bởi state isDarkMode
                        onValueChange={handleThemeToggle} // Gọi hàm đã sửa khi giá trị thay đổi
                    />
                </View>

                {/* Phần chứa bàn phím */}
                <View style={styles.keyboardContainer}>
                    <MyKeyboard />
                </View>
            </View>
        </SafeAreaView>
    );
}

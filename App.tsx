import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Button, ScrollView, StyleSheet } from "react-native"; // Thêm StyleSheet
import { store } from "./src/features/store"; // Đảm bảo đường dẫn này đúng
import { Provider } from "react-redux"; // Chỉ import Provider một lần

// Import các màn hình từ Lab 1 (đảm bảo đường dẫn chính xác)
import bai1 from "./Lab/lab1/b1";
import bai2 from "./Lab/lab1/b2";
import bai3 from "./Lab/lab1/b3";
import bai4 from "./Lab/lab1/b4";
import bai5 from "./Lab/lab1/b5";
import bai6 from "./Lab/lab1/b6";
import bai7 from "./Lab/lab1/b7";
import bai8 from "./Lab/lab1/b8";
import bai9 from "./Lab/lab1/b9";
import bai10 from "./Lab/lab1/b10";

// Import các màn hình khác (đảm bảo đường dẫn chính xác)
import test from "./Lab/others/flatlist";
import maytinh from "./Lab/lab2/maytinh";

// Khởi tạo Stack Navigator
const Stack = createNativeStackNavigator();

// Component màn hình chính để điều hướng đến các bài Lab
function HomeScreen({ navigation }: any) {
    // Có thể định nghĩa type chặt chẽ hơn cho navigation nếu cần
    // Danh sách tên các màn hình để tạo nút điều hướng
    const screens = [
        "bai1",
        "bai2",
        "bai3",
        "bai4",
        "bai5",
        "bai6",
        "bai7",
        "bai8",
        "bai9",
        "bai10",
        "test",
        "maytinh",
    ];

    return (
        // Sử dụng ScrollView nếu danh sách bài tập dài
        <ScrollView contentContainerStyle={styles.container}>
            {screens.map((screenName, index) => (
                <View key={index} style={styles.buttonContainer}>
                    <Button
                        // Đặt tiêu đề nút rõ ràng hơn
                        title={`Go to ${screenName}`}
                        onPress={() => navigation.navigate(screenName)}
                    />
                </View>
            ))}
        </ScrollView>
    );
}

// Component App chính
export default function App() {
    return (
        // Provider của Redux phải bao bọc toàn bộ ứng dụng (hoặc ít nhất là phần cần truy cập store)
        // Nơi tốt nhất thường là bao ngoài NavigationContainer
        <Provider store={store}>
            <NavigationContainer>
                {/* Khai báo Stack Navigator */}
                <Stack.Navigator initialRouteName="Home">
                    {/* Màn hình Home để chọn bài Lab */}
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ title: "Lab Exercises" }} // Đặt tiêu đề cho màn hình Home
                    />
                    {/* Khai báo các màn hình của từng bài Lab */}
                    <Stack.Screen name="bai1" component={bai1} />
                    <Stack.Screen name="bai2" component={bai2} />
                    <Stack.Screen name="bai3" component={bai3} />
                    <Stack.Screen name="bai4" component={bai4} />
                    <Stack.Screen name="bai5" component={bai5} />
                    <Stack.Screen name="bai6" component={bai6} />
                    <Stack.Screen name="bai7" component={bai7} />
                    <Stack.Screen name="bai8" component={bai8} />
                    <Stack.Screen name="bai9" component={bai9} />
                    <Stack.Screen name="bai10" component={bai10} />
                    {/* Khai báo các màn hình khác */}
                    <Stack.Screen name="test" component={test} />
                    <Stack.Screen name="maytinh" component={maytinh} />
                    {/* Không đặt Provider ở đây */}
                </Stack.Navigator>
            </NavigationContainer>
        </Provider> // Kết thúc Provider
    );
}

// Thêm một số style cơ bản cho dễ nhìn
const styles = StyleSheet.create({
    container: {
        padding: 20, // Padding xung quanh ScrollView
        alignItems: "stretch", // Giãn các nút theo chiều rộng
    },
    buttonContainer: {
        marginVertical: 8, // Khoảng cách giữa các nút
    },
});

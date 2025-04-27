import React, { useState, useCallback } from "react"; // Thêm useCallback
import {
    SafeAreaView,
    StyleSheet,
    View,
    TextInput,
    Button,
    FlatList,
    Text,
    Keyboard,
    Platform,
    Alert, // Vẫn dùng Alert để xác nhận xóa
    ViewStyle,
    TextStyle,
    ListRenderItemInfo,
} from "react-native";

// --- Định nghĩa kiểu cho một mục trong danh sách ---
interface ListItem {
    id: string;
    text: string;
}

// --- Định nghĩa kiểu cho Props của component Item tùy chỉnh ---
interface ItemProps {
    item: ListItem;
    onDelete: (id: string) => void; // Chỉ cần hàm xóa
}

// ---- Định nghĩa kiểu cho Styles ----
interface Styles {
    safeArea: ViewStyle;
    container: ViewStyle;
    inputContainer: ViewStyle;
    input: ViewStyle & TextStyle;
    list: ViewStyle;
    listItem: ViewStyle; // Style cho cả container của item
    listItemText: TextStyle;
    deleteButtonContainer: ViewStyle; // Style cho khu vực chứa nút delete
    emptyListText: TextStyle;
}

const TodoItem: React.FC<ItemProps> = React.memo(({ item, onDelete }) => {
    return (
        <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.text}</Text>
            {}
            <View style={styles.deleteButtonContainer}>
                <Button
                    title="Delete"
                    onPress={() => onDelete(item.id)}
                    color="#dc3545"
                />
            </View>
        </View>
    );
});

const App: React.FC = () => {
    const [inputText, setInputText] = useState<string>("");
    const [items, setItems] = useState<ListItem[]>([]);

    const handleAddItem = () => {
        const trimmedText = inputText.trim();
        if (trimmedText === "") {
            return;
        }
        const newItem: ListItem = {
            id: Date.now().toString(),
            text: trimmedText,
            // Bỏ completed
        };
        setItems((prevItems) => [...prevItems, newItem]);
        setInputText("");
        Keyboard.dismiss();
    };

    const handleDeleteItem = useCallback((id: string) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this item?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {
                        // Lọc ra item cần xóa dựa vào id
                        setItems((prevItems) =>
                            prevItems.filter((item) => item.id !== id)
                        );
                    },
                    style: "destructive", // Kiểu để nút có màu đỏ (trên iOS)
                },
            ]
        );
    }, []); // Mảng dependency rỗng

    // --- Hàm render item cho FlatList ---
    const renderListItem = ({ item }: ListRenderItemInfo<ListItem>) => (
        <TodoItem
            item={item}
            onDelete={handleDeleteItem} // Truyền hàm xóa xuống props
        />
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Khu vực nhập liệu */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter new item..."
                        placeholderTextColor="#aaa"
                        value={inputText}
                        onChangeText={setInputText}
                        onSubmitEditing={handleAddItem}
                    />
                    <Button title="Add" onPress={handleAddItem} />
                </View>

                {/* Danh sách các mục */}
                <FlatList
                    style={styles.list}
                    data={items}
                    renderItem={renderListItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={
                        <Text style={styles.emptyListText}>
                            No items yet. Add some!
                        </Text>
                    }
                />
            </View>
        </SafeAreaView>
    );
};

// ---- Định nghĩa Styles ----
const styles = StyleSheet.create<Styles>({
    safeArea: {
        flex: 1,
        backgroundColor: "#f0f0f0",
    },
    container: {
        flex: 1,
        padding: 20,
    },
    inputContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 45,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    list: {
        flex: 1,
    },
    listItem: {
        backgroundColor: "#fff",
        paddingVertical: 10, // Giảm padding dọc chút
        paddingHorizontal: 15,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: "row", // Xếp Text và nút Delete cùng hàng
        justifyContent: "space-between", // Đẩy nút Delete sang phải
        alignItems: "center", // Căn giữa theo chiều dọc
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    listItemText: {
        fontSize: 18,
        color: "#333",
        flex: 1, // Cho phép text co giãn để không bị tràn khi có nút bên cạnh
        marginRight: 10, // Khoảng cách giữa text và nút delete
    },
    deleteButtonContainer: {
        // Không cần style phức tạp nếu chỉ có 1 nút
    },
    emptyListText: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 16,
        color: "#888",
    },
});

export default App;

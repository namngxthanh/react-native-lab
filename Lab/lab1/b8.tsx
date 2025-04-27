import React from "react";
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    Text,
    View,
    ViewStyle,
    TextStyle,
    ListRenderItemInfo,
} from "react-native";

interface DataItem {
    key: string;
    name: string;
}

// ---- Tạo dữ liệu mẫu ----
const data: DataItem[] = Array.from({ length: 50 }, (_, index) => ({
    key: `${index}`, // Chuyển index thành string cho key
    name: `Item ${index + 1}`,
}));

// ---- Định nghĩa kiểu cho Styles ----
interface Styles {
    safeArea: ViewStyle;
    listContainer: ViewStyle; // Style cho FlatList container
    itemContainer: ViewStyle;
    itemText: TextStyle;
}

const App: React.FC = () => {
    const renderItem = ({ item }: ListRenderItemInfo<DataItem>) => (
        <View style={styles.itemContainer}>
            {}
            <Text style={styles.itemText}>{item.name}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {}
            <FlatList
                style={styles.listContainer}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create<Styles>({
    safeArea: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    listContainer: {
        flex: 1,
    },
    itemContainer: {
        backgroundColor: "#ffffff",
        padding: 15,
        marginVertical: 4,
        marginHorizontal: 10,
        borderRadius: 5,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    itemText: {
        fontSize: 18,
        color: "#333",
    },
});

export default App;

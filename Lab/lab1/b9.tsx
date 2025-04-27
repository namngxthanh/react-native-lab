import React from "react";
import {
    SafeAreaView,
    SectionList,
    StyleSheet,
    Text,
    View,
    ViewStyle,
    TextStyle,
    SectionListData,
    ListRenderItemInfo,
} from "react-native";

interface SectionData {
    title: string;
    data: string[];
}

const DATA: SectionData[] = [
    { title: "A", data: ["Apple", "Avocado"] },
    { title: "B", data: ["Banana", "Blueberry"] },
    { title: "C", data: ["Carrot", "Cauliflower", "Cucumber"] }, // Thêm section C
    { title: "D", data: ["Durian", "Date"] }, // Thêm section D
];

// ---- Định nghĩa kiểu cho Styles ----
interface Styles {
    safeArea: ViewStyle;
    container: ViewStyle; // Style cho SectionList container
    item: TextStyle; // Style cho từng mục Text trong section
    header: TextStyle; // Style cho tiêu đề (header) của mỗi section
}

const App: React.FC = () => {
    // Hàm render cho từng mục (item) trong một section
    const renderItem = ({ item }: ListRenderItemInfo<string>) => (
        <Text style={styles.item}>{item}</Text>
    );

    const renderSectionHeader = ({ section }: { section: SectionData }) => (
        <Text style={styles.header}>{section.title}</Text>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {}
            <SectionList
                style={styles.container}
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
            />
        </SafeAreaView>
    );
};

// ---- Định nghĩa Styles ----
const styles = StyleSheet.create<Styles>({
    safeArea: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    container: {
        flex: 1,
    },
    item: {
        padding: 15, // Padding cho item
        paddingLeft: 25, // Thụt vào so với header
        fontSize: 18,
        backgroundColor: "#fff", // Nền trắng cho item
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    header: {
        fontSize: 24, // Cỡ chữ to hơn cho header
        fontWeight: "bold", // In đậm
        backgroundColor: "#e0e0e0", // Màu nền xám nhạt cho header
        paddingVertical: 10, // Padding dọc cho header
        paddingHorizontal: 15, // Padding ngang cho header
    },
});

export default App;

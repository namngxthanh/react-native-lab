import React from "react";
import { View, FlatList, StyleSheet, Text, StatusBar } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const DATA = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
    },
];

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const ExpFlatList = () => (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={(item) => item.id}
                numColumns={1} // Số cột
                initialNumToRender={20}
                horizontal={false} // Chiều ngang
                ListEmptyComponent={
                    <View
                        style={{
                            width: 100,
                            height: 100,
                            backgroundColor: "navy",
                        }}
                    ></View>
                } // Component hiển thị khi DATA trong danh sách trống
                ListFooterComponent={
                    <View
                        style={{
                            width: 100,
                            height: 100,
                            backgroundColor: "orange",
                        }}
                    ></View>
                } // component hiển thị DATA footer
            />
        </SafeAreaView>
    </SafeAreaProvider>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default ExpFlatList;

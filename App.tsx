// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
//     return (
//         <View style={styles.container}>
//             <Text>Hello, React Native!</Text>
//             <StatusBar style="auto" />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//     },
// });
// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Button, ScrollView } from "react-native";

// Import 10 screens
import bai1 from "./Lab/lab1/b1";
//import bai2 from './lab1/bai2';
// import Screen2 from './screens/Screen2';
// import Screen3 from './screens/Screen3';
// import Screen4 from './screens/Screen4';
// import Screen5 from './screens/Screen5';
// import Screen6 from './screens/Screen6';
// import Screen7 from './screens/Screen7';
// import Screen8 from './screens/Screen8';
// import Screen9 from './screens/Screen9';
// import Screen10 from './screens/Screen10';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: any) {
    const screens = ["bai1", "bai2"];

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            {screens.map((lab1, index) => (
                <View key={index} style={{ marginVertical: 10 }}>
                    <Button
                        title={`Go to ${lab1}`}
                        onPress={() => navigation.navigate(lab1)}
                    />
                </View>
            ))}
        </ScrollView>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="bai1" component={bai1} />
                {/* <Stack.Screen name="bai2" component={bai2} /> */}
                {/* <Stack.Screen name="Screen3" component={Screen3} />
        <Stack.Screen name="Screen4" component={Screen4} />
        <Stack.Screen name="Screen5" component={Screen5} />
        <Stack.Screen name="Screen6" component={Screen6} />
        <Stack.Screen name="Screen7" component={Screen7} />
        <Stack.Screen name="Screen8" component={Screen8} />
        <Stack.Screen name="Screen9" component={Screen9} />
        <Stack.Screen name="Screen10" component={Screen10} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

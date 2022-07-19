import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import useBudgets from "./src/useBudgets";
import { useEffect } from "react";

export default function App() {
  const { budgets } = useBudgets();
  useEffect(() => {
    console.log("budgets");
    console.log(budgets);
  }, [budgets]);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

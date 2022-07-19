import { View, Text, StyleSheet } from "react-native";
import BudgetsCards from "../components/BudgetsCards";
import useBudgets from "../useBudgets";
import LatestBudgetsPerMonth from "../components/LatestBudgetsPerMonth";

export default function Home() {
  const { budgets, latestBudgets } = useBudgets();

  return (
    <View style={styles.container}>
      <Text>Hi Julio</Text>
      <BudgetsCards budgets={budgets} />
      <LatestBudgetsPerMonth latestBudgets={latestBudgets} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

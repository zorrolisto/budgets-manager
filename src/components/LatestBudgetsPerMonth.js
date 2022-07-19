import { View, Text, StyleSheet } from "react-native";

export default function LatestBudgetsPerMonth({ latestBudgets }) {
  return (
    <View>
      <Text>Latest Badgets</Text>
      <View>
        {latestBudgets.map((b, idx) => (
          <View key={idx}>
            <Text>{b.name}</Text>
            <View>
              {b.budgetPerMonth.map((bud) => (
                <Text>Month: {bud.month}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

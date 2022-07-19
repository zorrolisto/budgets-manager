import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function BudgetsCards({ budgets }) {
  return (
    <View>
      <Text>Budgets</Text>
      <View>
        {budgets.map((b) => (
          <View key={b.id} style={styles.BudgetCard}>
            <Text>{b.name}</Text>
            <Icon name="user" size={25} style={{ color: b.color }} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  BudgetCard: {
    width: "100%",
  },
});

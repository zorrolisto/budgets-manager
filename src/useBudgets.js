import { useEffect, useState } from "react";
import { generateUUID } from "./utils";
import {
  todoistApiBaseUrl,
  todoistBearerToken,
  todoistBudgetIdList,
} from "./constants";

export default function useAlmuerzos() {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    initBudgets();
    // addOneRandomBudget();
  }, []);
  const addOneRandomBudget = async () => {
    const budgetUpdated = {
      id: "6016721857",
      name: "Personal",
      budgetPerMonth: [
        {
          // month
          m: 7,
          // bills
          b: [
            {
              //description
              d: "taxi",
              //amount
              a: 8,
            },
            {
              d: "pollo a la brasa",
              a: 40,
            },
          ],
        },
      ],
    };
    await updateBudget(budgetUpdated);
  };

  const initBudgets = async () => {
    await getAllBudgets();
  };

  const getAllBudgets = async () => {
    try {
      const url = `${todoistApiBaseUrl}/tasks?ids=${todoistBudgetIdList}`;
      const response = await fetch(url, {
        method: "GET",
        headers: new Headers({ Authorization: `Bearer ${todoistBearerToken}` }),
      });
      const tasksWithBudgets = await response.json();
      if (tasksWithBudgets.length > 0) {
        const budgetsWithFormat = tasksWithBudgets.map((t) => ({
          id: t.id,
          name: t.content,
          budgetPerMonth: JSON.parse(t.description),
        }));
        setBudgets(budgetsWithFormat);
      }
    } catch (e) {
      console.error(e || "Unknown erro");
    }
  };
  const updateBudget = async (budgetUpdated) => {
    const uuidGen = generateUUID();
    try {
      const url = `${todoistApiBaseUrl}/tasks/${budgetUpdated.id}`;
      await fetch(url, {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${todoistBearerToken}`,
          "X-Request-Id": uuidGen,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          name: budgetUpdated.content,
          description: JSON.stringify(budgetUpdated.budgetPerMonth),
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    budgets,
    updateBudget,
    getAllBudgets,
  };
}

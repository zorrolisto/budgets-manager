import { useEffect, useState } from "react";
import { generateUUID } from "./utils";
import {
  todoistApiBaseUrl,
  todoistBearerToken,
  todoistBudgetIdList,
} from "./constants";

export default function useAlmuerzos() {
  const [budgets, setBudgets] = useState([]);
  const [latestBudgets, setLatestBudgets] = useState([]);

  useEffect(() => {
    initBudgets();
    // addOneRandomBudget();
  }, []);
  const addOneRandomBudget = async () => {
    const budgetUpdated = {
      id: "6016721857",
      name: "Personal#4c6ef5",
      budgetPerMonth: [
        {
          y: 2022,
          m: 7,
          b: [
            {
              d: "taxi",
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

  const getBudgetsPerMonthFromString = (budgetsString) => {
    const budgetsParsed = JSON.parse(budgetsString);
    if (budgetsParsed.length === 0) return [];
    return budgetsParsed.map((bud) => ({
      year: bud.y,
      month: bud.m,
      bills: bud.b.map((bill) => ({
        description: bill.d,
        amount: bill.a,
      })),
    }));
  };

  const fromTodoistToBudgetsObject = (todoistObject) => {
    if (todoistObject.length === 0) return [];
    return todoistObject.map((t) => ({
      id: t.id,
      name: t.content.split("#")[0],
      color: `#${t.content.split("#")[1]}`,
      budgetPerMonth: getBudgetsPerMonthFromString(t.description),
    }));
  };
  const fromBudgetsToTodoistObject = (budgets) => {};
  const getLatestBudgets = (budgets) => {
    budgets.forEach((b) => {
      if (b.budgetPerMonth.length === 0) return;
      const budgetPerMonthSortedByMonth = b.budgetPerMonth.sort(
        (first, second) => second.month - first.month
      );
      const budgetPerMonthSortedByYear = budgetPerMonthSortedByMonth.sort(
        (first, second) => second.year - first.year
      );
      b.budgetPerMonth = budgetPerMonthSortedByYear;
    });
    return budgets;
  };

  const initBudgets = async () => {
    const todoistResponse = await getAllBudgets();
    const budgets = fromTodoistToBudgetsObject(todoistResponse);
    setBudgets(budgets);
    setLatestBudgets(getLatestBudgets(budgets));
  };

  const getAllBudgets = async () => {
    try {
      const url = `${todoistApiBaseUrl}/tasks?ids=${todoistBudgetIdList}`;
      const response = await fetch(url, {
        method: "GET",
        headers: new Headers({ Authorization: `Bearer ${todoistBearerToken}` }),
      });
      const tasksWithBudgets = await response.json();
      return tasksWithBudgets;
    } catch (e) {
      console.error(e || "Unknown erro");
    }
    return "[]";
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
    latestBudgets,
  };
}

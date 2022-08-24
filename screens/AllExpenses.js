import React, { useEffect } from "react";
import { View, Text } from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";

function AllExpenses() {
  const expenses = useSelector((states) => {
    return states.expenseData;
  });
  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expenses}
      fallBackText="No Expenses Found!!"
    />
  );
}

export default AllExpenses;

import React, { useEffect, useState } from "react";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";
import { fetchExpenses } from "../Util/http";
import { useDispatch } from "react-redux";
import { setExpense } from "../actions";
import Loader from "../UI/Loader";
import ErrorPage from "../UI/ErrorPage";

function RecentExpense() {
  // const [fetchedExpenses,setFetchedExpenses] = useState([]);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const getExpenses = async () => {
      setLoader(true);
      try {
        const exp = await fetchExpenses();
        dispatch(setExpense(exp));
      } catch (error) {
        setError("Could not fetch expenses");
        console.log(error);
      }
      setLoader(false);
    };
    getExpenses();
  }, []);

  const expenses = useSelector((states) => {
    return states.expenseData;
  });
  const expenses7DaysAgo = expenses.filter((data, index) => {
    const dateObj = new Date();
    let oldDates = dateObj.setDate(dateObj.getDate() - 7);
    return data.date > oldDates;
  });

  const errorHandler = () => {
    setError(null);
  };

  if (error && !loader) {
    return <ErrorPage message={error} onConfirm={errorHandler} />;
  }

  if (loader) {
    return <Loader />;
  }
  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={expenses7DaysAgo}
      fallBackText="No recent expenses found for last 7 Days"
    />
  );
}

export default RecentExpense;

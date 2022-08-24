import axios from "axios";

const baseUrl = 'https://expense-tracker-app-4ead7-default-rtdb.asia-southeast1.firebasedatabase.app';

// adding new data
export const storeExpenses = async (expenseData)=>{
    const response = await axios.post(baseUrl+'/expenses.json',expenseData);
    return response.data.name;
}

// fetching all data
export const fetchExpenses = async ()=>{
    const response = await axios.get(baseUrl+'/expenses.json');
    console.log(response.data,"jeet");
    const expenses = [];
    for(const key in response.data)
    {
        const expenseObj = {
            id:key,
            amount:response.data[key].amount,
            date:new Date(response.data[key].date),
            description:response.data[key].description
        }
        expenses.push(expenseObj);
    }
    return expenses;
}

//updating data
export const updateDbExpense = (id,expenseData)=>{
    return axios.put(baseUrl + `/expenses/${id}.json`,expenseData) //in expenseData no id should be there
}

export const deleteDbExpense = (id)=>{
    console.log("deleteing",id)
    return axios.delete(baseUrl + `/expenses/${id}.json`)
}
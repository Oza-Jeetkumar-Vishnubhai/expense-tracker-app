export const addExpense = (expenseData)=>{
    return {
        type:"ADDEXPENSE",
        payload:expenseData
    }
}

export const updateExpense = (id,expenseData)=>{
    return {
        type:"UPDATEEXPENSE",
        payload:{data:expenseData,id:id}
    }
}

export const remExpense = (id)=>{
    return {
        type:"REMEXPENSE",
        payload:id
    }
}

export const setExpense = (expenses)=>{
    return {
        type:"SET",
        payload:expenses
    }
}
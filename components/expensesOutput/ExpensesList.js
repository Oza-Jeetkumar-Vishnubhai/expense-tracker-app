import React from 'react'
import { FlatList,Text } from 'react-native'
import ExpenseItem from './ExpenseItem'

const renderExpenseItem = ({item})=>{
    return <ExpenseItem {...item}/>
}

function ExpensesList({expenses}) {
  return (
    <FlatList data = {expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item)=>item.id}
    />
  )
}

export default ExpensesList

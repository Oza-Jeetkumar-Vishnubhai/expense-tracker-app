import React from 'react'
import { View,StyleSheet,Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import ExpensesList from './ExpensesList'
import ExpensesSummary from './ExpensesSummary'


function ExpensesOutput({expenses,expensesPeriod,fallBackText}) {
  let text = <Text style={styles.text}>{fallBackText}</Text>
  if(expenses.length!=0)
  {
    text = <ExpensesList expenses={expenses}/>;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
      {text}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding:24,
    backgroundColor:GlobalStyles.colors.primary700,
    flex:1
  },
  text:{
    color:'white',
    textAlign:'center',
    marginTop:32,
    fontSize:16
  }
})

export default ExpensesOutput

import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageExpense from '../screens/ManageExpense';
import ExpenseOverview from './ExpenseOverview';
import { GlobalStyles } from '../constants/styles';

function Stack() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            {/* Nested tab navigator as screen */}
            <Stack.Navigator screenOptions={{
                headerStyle:{
                    backgroundColor:GlobalStyles.colors.primary500
                },
                headerTintColor:'white'
            }}>
                <Stack.Screen name="expensesOverview" component={ExpenseOverview}
                    options={{headerShown:false}}
                />
                <Stack.Screen name="manageExpense" component={ManageExpense} 
                    options={{
                        presentation: 'modal'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Stack

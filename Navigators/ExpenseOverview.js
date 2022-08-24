import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllExpenses from '../screens/AllExpenses';
import RecentExpense from '../screens/RecentExpenses';
import { GlobalStyles } from '../constants/styles';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native';
import IconButton from '../UI/IconButton';
import { useNavigation } from '@react-navigation/native';

function ExpenseOverview() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
            },
            tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            tabBarActiveTintColor: GlobalStyles.colors.accent500,
            headerTintColor: 'white',
            tabBarIcon: ({ color, size }) => {
                return <Ionicons name="calendar" size={size} color={color} />
            },
            headerRight: ({ tintColor }) => {
                const navigation = useNavigation();
                return (
                    <IconButton
                        icon="add"
                        size={24}
                        color={tintColor}
                        onPress={() => { navigation.navigate('manageExpense') }}
                    />)
            }
        }}>
            <Tab.Screen name="recentExpenses" component={RecentExpense}
                options={{
                    title: 'Recent Expenses',
                    tabBarLabel: 'Recent',
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="hourglass" size={size} color={color} />
                    }
                }}
            />
            <Tab.Screen name="allExpenses" component={AllExpenses} />
        </Tab.Navigator>
    )
}

export default ExpenseOverview

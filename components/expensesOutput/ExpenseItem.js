import React from 'react'
import { Pressable, View, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import {useNavigation} from '@react-navigation/native'

function ExpenseItem({ id,description, amount, date }) {
    const navigation = useNavigation();
    const exprensePressHandler = () => {
        navigation.navigate('manageExpense',{
            expenseId:id
        })
    }

    return (
        <Pressable onPress={exprensePressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase,styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount.toFixed()}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 4,
        shadowOpacity: 0.4
    },
    textBase: {
        color: GlobalStyles.colors.primary50
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 80
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
    }
})

export default ExpenseItem

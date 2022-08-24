import React, { useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../constants/styles';
import IconButton from '../UI/IconButton';
import { addExpense, updateExpense, remExpense } from '../actions/index'
import { useDispatch,useSelector } from 'react-redux';
import ExpenseForm from '../components/manageExpenses/ExpenseForm';
import { storeExpenses,deleteDbExpense,updateDbExpense } from '../Util/http';
import Loader from '../UI/Loader';
import ErrorPage from '../UI/ErrorPage';

function ManageExpense({ route, navigation }) {
    const dispatch = useDispatch();
    const [loader,setLoader] = useState(false);
    const [error,setError] = useState();
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    const expenses = useSelector((states) => { return states.expenseData });
    const editedExpense = expenses.find((data,index)=>{
        return editedExpenseId===data.id
    }) // this variable separates add and update window
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        }, [navigation, isEditing]);
    })
    const deleteExpense = async() => {
        setLoader(true);
        try{
            await deleteDbExpense(editedExpenseId);
            dispatch(remExpense(editedExpenseId));
            navigation.goBack();
        }
        catch(error)
        {
            setError("Can not delete Expense");
            setLoader(false)
        }
    }
    const cancelHandler = () => {
        navigation.goBack();
    }
    const confirmHandler = async(expenseData) => {
        setLoader(true);
        if (isEditing) {
            try{
                dispatch(updateExpense(editedExpenseId, expenseData));
                await updateDbExpense(editedExpenseId,expenseData);
                navigation.goBack();
            }
            catch(error)
            {
                setError("Cannot Update expense");
                setLoader(false)
            }
        }
        else {
            try{
                const id = await storeExpenses(expenseData);  //posting data into backend
                dispatch(addExpense({...expenseData,id:id})); //updating fetched data
                navigation.goBack();
            }
            catch(error)
            {
                setError("Cannot Add expense");
                setLoader(false)
            }
            // in entire process data has been fetched only once
        }
    }

    const submitHandler=()=>{
        setError(null);
    }

    if(error)
    {
        return <ErrorPage message={error} onConfirm={submitHandler} />
    }

    if(loader)
    {
        return <Loader />
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                submitLable={isEditing ? "Update" : "Submit"}
                onSubmit={confirmHandler}
                defaultValues = {editedExpense}
            />

            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpense}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        padding: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },

})

export default ManageExpense

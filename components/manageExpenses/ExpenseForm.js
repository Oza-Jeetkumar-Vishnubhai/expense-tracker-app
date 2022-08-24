import React, { useState } from "react";
import { View, StyleSheet, Text, Keyboard,TouchableWithoutFeedback,KeyboardAvoidingView } from "react-native";
import Input from "./Input";
import Button from "../../UI/Button";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onSubmit, onCancel, submitLable, defaultValues }) {
  // console.log("default",defaultValues)
  const [input, setInput] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues
        ? defaultValues.date
            .toISOString()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("-")
        : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });
  const onInputHandler = (inputIdentifier, enteredData) => {
    //comes from react-native when connected with onChangetext
    setInput((curState) => {
      return {
        ...curState,
        [inputIdentifier]: { value: enteredData, isValid: true },
      };
    });
    console.log(input);
  };
  const submitHandler = () => {
    let reverseDate = input.date.value.split("-").reverse().join("-");
    const expenseData = {
      amount: +input.amount.value,
      date: new Date(reverseDate),
      description: input.description.value,
    };

    const isValidAmount = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isValidDate = expenseData.date.toString() !== "Invalid Date";
    const isValidDescription = expenseData.description.trim().length > 0;

    if (!isValidAmount || !isValidDate || !isValidDescription) {
      // Alert.alert("chala ja gandu")
      setInput((curState) => {
        return {
          amount: { value: curState.amount.value, isValid: isValidAmount },
          date: { value: curState.date.value, isValid: isValidDate },
          description: {
            value: curState.description.value,
            isValid: isValidDescription,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !input.amount.isValid || !input.description.isValid || !input.date.isValid;

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex:1}}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={styles.form}>
      <Text style={styles.title}>Your Expenses</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          textConfig={{
            keyBoardType: "decimal-pad",
            onChangeText: onInputHandler.bind(this, "amount"),
            value: input.amount.value,
          }}
          invalid={!input.amount.isValid}
        />
        <Input
          label="Date"
          textConfig={{
            placeholder: "DD-MM-YYYY",
            maxLength: 10,
            onChangeText: onInputHandler.bind(this, "date"),
            value: input.date.value,
          }}
          invalid={!input.date.isValid}
        />
      </View>
      <Input
        label="Description"
        textConfig={{
          multiline: true,
          onChangeText: onInputHandler.bind(this, "description"),
          value: input.description.value,
          // autocorrect:false, // default is true
          // autoCapitalize:'none',
        }}
        invalid={!input.description.isValid}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - Please check your entered data!!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitLable}
        </Button>
      </View>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});

export default ExpenseForm;

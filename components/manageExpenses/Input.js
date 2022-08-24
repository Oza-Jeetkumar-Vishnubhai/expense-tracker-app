import React from 'react'
import { TextInput, View,Text,StyleSheet } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

function Input({label,textConfig,invalid}) {
    const inputStyles = [styles.input];
    if(textConfig && textConfig.multiline)
    {
        inputStyles.push(styles.inputMultiline);
    }
    if(invalid)
    {
        inputStyles.push(styles.invalidInput)
    }
  return (
    <View style={[styles.inputContainer,textConfig.multiline?null:{flex:1}]}>
        <Text style={[styles.label,invalid && styles.invalidLabel]}>{label}</Text>
        <TextInput {...textConfig} style={inputStyles}/>
    </View>
  )
}

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal:4,
        marginVertical:8,
        // flex:1,
    },
    label:{
        color:GlobalStyles.colors.primary100,
        marginBottom:4
    },
    input:{
        backgroundColor:GlobalStyles.colors.primary100,
        padding:6,
        borderRadius:6,
        fontSize:18,
        color:GlobalStyles.colors.primary700,
    },
    inputMultiline:{
        minHeight:100,
        textAlignVertical:'top' //docs says use this for same behaviour on both platforms
    },
    invalidLabel:{
        color:GlobalStyles.colors.error500
    },
    invalidInput:{
        backgroundColor:GlobalStyles.colors.error50
    }
})

export default Input

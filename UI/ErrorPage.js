import React from 'react'
import { View,Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import Button from './Button'

function ErrorPage({message,onConfirm}) {
  return (
    <View style={styles.container}>
        <Text style={styles.errorText}>Error Occured</Text>
        <Text style={styles.errorText}>{message}</Text>
        <Button onPress={onConfirm} style={{alignSelf:"center",margin:10}}>Ok</Button>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"cengter",
        padding:24,
        backgroundColor:GlobalStyles.colors.primary700,
    },
    errorText:{
      alignSelf:'center',
      margin:4,
      color:'white'
    }
})

export default ErrorPage

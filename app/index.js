import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const index = () => {
    const navigation = useNavigation();
  return (
    <View style={{justifyContent:"center",alignItems:"center",marginVertical:350}}>
      <TouchableOpacity
      style={{backgroundColor:"yellow",padding:20,borderRadius:10}}
      onPress={()=> navigation.navigate('Auth/login')}>
      <Text style={{fontSize:30,fontWeight:"500",color:"#fff"}}>Get Started</Text>
      </TouchableOpacity>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})
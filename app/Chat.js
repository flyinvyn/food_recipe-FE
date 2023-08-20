import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar, Icon, Input, NativeBaseProvider } from 'native-base'
import FeatherIcon from "react-native-vector-icons/Feather";

const Chat = () => {
  return (
    <View style={{ marginTop: 60, paddingLeft: 10 }} >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity >
          {<Icon as={<FeatherIcon name="chevron-left" />} size={7} ml="2" color="yellow.400" />}
        </TouchableOpacity>
        <Avatar source={require('../assets/img/profile.png')} style={{ marginHorizontal: 20 }} />
        <View>
          <Text>Creator</Text>
          <Text style={{fontWeight:"300",fontSize:12}}>Hello Creator</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 550 }}>
        <Input backgroundColor="#EFEFEF" w={247} borderRadius={35} fontSize={16} InputRightElement={<Icon as={<FeatherIcon name="paperclip" />} size={6} mr="2" color="yellow.400" />} placeholder='Tuliskan pesan anda....' />
        <TouchableOpacity style={{ width: 45, height: 45, backgroundColor: "#EFEFEF", borderRadius: 100, marginHorizontal: 10 }}>
          {<Icon as={<FeatherIcon name="mic" />} size={6} style={{ marginHorizontal: 10, marginVertical: 10 }} color="yellow.400" />}
        </TouchableOpacity>
        <TouchableOpacity style={{ width: 45, height: 45, backgroundColor: "#EFEFEF", borderRadius: 100 }}>
          {<Icon as={<FeatherIcon name="send" />} size={6} style={{ marginHorizontal: 10, marginVertical: 10 }} color="yellow.400" />}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default () => {
  return (
    <NativeBaseProvider>
      <View style={{ backgroundColor: "#fff" }} flex={1} px="3">
        <Chat />
      </View>
    </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({})
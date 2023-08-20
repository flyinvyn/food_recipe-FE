import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Icon, Image, NativeBaseProvider } from 'native-base'
import FeatherIcon from "react-native-vector-icons/Feather";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const EditProfile = () => {
    const navigation = useNavigation();

    const [users_photo, setUsers_photo] = useState(null);
    const [users_name, setUsers_name] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          setUsers_photo(result.assets[0].uri);
        }
      };

      const handleSubmit = async () => {
    try {
      const users_id = await AsyncStorage.getItem('id')
      console.log(users_id);
      const formData = new FormData();
      formData.append('users_name',users_name)
      if(users_photo){
        formData.append('users_photo', {
          uri: users_photo,
          name:"users_photo.jpg",
          type: "image/jpeg"
        })
      }
      const res = await axios.put(`http://192.168.18.6:7474/users/profile/${users_id}`, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      alert('Succes')
    } catch (error) {
      console.log(error);
    }
  }
    return (
        <View style={{ flex: 1, marginTop: 20, paddingLeft: 20 }}>
            <View style={{ flexDirection: "row", marginTop: 40, alignItems: "center" }}>
                <TouchableOpacity 
                onPress={()=> navigation.navigate('Profiles')}
                style={{ backgroundColor: "#F8F8FA", borderRadius: 16, width: 48, height: 48 }}>
                    {<Icon as={<FeatherIcon name="chevron-left" />} size={7} style={{ marginLeft: "auto", marginRight: "auto", marginTop: 10 }} />}
                </TouchableOpacity>
                <Text style={{ marginHorizontal:70, fontSize: 25, fontWeight: "700", color: "#EFC81A" }}>Edit Profile</Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => {
                    pickImage();
                }}>
                    <Text style={styles.touch}>Change Profile Picture</Text>
                    <View style={{ backgroundColor: "#3F3A3A", width: "95%", height: 1, marginTop: 10 }}></View>
                </TouchableOpacity>
                {users_photo && (
                <Image
                  source={{ uri: users_photo }}
                  style={{width:100,height:100}}
                  alt='Profile'
                />
              )}
            </View>
            <View>
                <TouchableOpacity>
                    <Text style={styles.touch}>Change Password</Text>
                    <View style={{ backgroundColor: "#3F3A3A", width: "95%", height: 1, marginTop: 10 }}></View>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={()=> handleSubmit()}>
                    <Text style={styles.touch}>Save</Text>
                    <View style={{ backgroundColor: "#3F3A3A", width: "95%", height: 1, marginTop: 10 }}></View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default () => {
    return (
        <NativeBaseProvider>
            <View backgroundColor="#fff" flex={1} px="3">
                <EditProfile />
            </View>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    touch: {
        fontSize: 18,
        marginTop: 20,
    }
})
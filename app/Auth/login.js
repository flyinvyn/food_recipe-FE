import { Text, View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { NativeBaseProvider, Box, Input, Pressable, Icon, Image, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import FeatherIcon from "react-native-vector-icons/Feather";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { useEffect } from 'react';

const Login = () => {
    const navigation = useNavigation();
    const [show, setShow] = React.useState(false);
    const [users_email, setUsers_email] = useState('');
    const [users_confirmpassword, setUsers_confirmpassword] = useState('');

    useEffect(() => {
        const cekToken = async () =>{
            try {
                const userToken = await AsyncStorage.getItem('token');
                if(userToken){
                    navigation.navigate("Landing")
                }
            } catch (error) {
                console.log(error);
            }
        }
        cekToken();
      }, [navigation]);
    

    const submit = async () => {
        try {
            const res = await axios.post(`http://192.168.18.6:7474/users/login`,{
                users_email,
                users_confirmpassword
            });
            if (users_email === '' || users_confirmpassword === '') {
                alert('Email dan password harus diisi')
            }else if(res.status !== 201){
                alert('Email atau Password Salah')
            } else {
                alert('Succes')
                navigation.navigate('Landing')
                await AsyncStorage.setItem('token', res.data.data.token_user)
                await AsyncStorage.setItem('id', res.data.data.users_id)
                await AsyncStorage.setItem('name', res.data.data.users_name)
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <View style={styles.top}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={styles.border}>
                    <Image
                        source={require('../../assets/user.png')}
                        style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20 }}
                        alt='user profile'
                    />
                </View>
                <Text style={styles.textTitle}>Welcome !</Text>
                <Text style={{ fontWeight: "500", color: "#C4C4C4", marginBottom: 35, fontSize: 14 }}>Log in to your exiting account.</Text>
            </View>
            <Box alignItems="center">
                <Input backgroundColor="#EFEFEF" borderRadius={10} w={350} h={12} InputLeftElement={<Icon as={<FeatherIcon name="user" />} size={5} ml="2" color="muted.400" />} placeholder="examplexxx@gmail.com" value={users_email} onChangeText={(value) => setUsers_email(value)} />
            </Box>
            <Box alignItems="center" mt={5}>
                <Input backgroundColor="#EFEFEF" borderRadius={10} w={350} h={12} type={show ? "text" : "password"} InputLeftElement={<Icon as={<FeatherIcon name="lock" />} size={5} ml="2" color="muted.400" />} value={users_confirmpassword} onChangeText={(value) => setUsers_confirmpassword(value)}
                InputRightElement={<Pressable onPress={() => setShow(!show)}>
                    <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                </Pressable>} placeholder="Password" />
            </Box>
            <View style={{ marginHorizontal: 30 }}>
                <Link style={styles.forgot} href={'#'}>Forgot Password ?</Link>
            </View>
            <Button onPress={submit} style={styles.login} w={350}>LOG IN</Button>
            <View style={styles.sign}>
                <Text style={{ fontWeight: "500", color: "#999999" }}>Don't have an account?
                    <Link href={"/Auth/register"}><Text style={{ fontWeight: "500", color: "#EFC81A" }}>Sign Up</Text></Link>
                </Text>
            </View>
        </View>
    )
};

export default () => {
    return (
        <NativeBaseProvider>
            <View flex={1} px="3">
                <Login />
            </View>
        </NativeBaseProvider>
    );
};


const styles = StyleSheet.create({
    border: {
        width: 180,
        height: 180,
        backgroundColor: "#C4C4C4",
        borderRadius: 100
    },
    top: {
        marginTop: 150
    },
    textTitle: {
        fontWeight: 500,
        color: "#EFC81A",
        fontSize: 20,
        marginTop: 15
    },
    forgot: {
        marginLeft: "auto",
        fontWeight: "500",
        color: "#999999",
        marginTop: 15,
        marginRight: 20
    },
    login: {
        backgroundColor: "#EFC81A",
        paddingVertical: 5,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 2,
        marginTop: 25
    },
    sign: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    }
});
import { Text, View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { NativeBaseProvider, Box, Input, Pressable, Icon, Image, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Link } from 'expo-router';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const [show, setShow] = React.useState(false);
    const navigation = useNavigation();
    const [users_name, setUsers_name] = useState('');
    const [users_email, setUsers_email] = useState('');
    const [users_phone, setUsers_phone] = useState('');
    const [users_password, setUsers_password] = useState('');
    const [users_confirmpassword, setUsers_confirmpassword] = useState('');

    const submit = () => {
        const data = {
            users_name,
            users_email,
            users_phone,
            users_password,
            users_confirmpassword
        }
        axios.post(`https://food-recipe-be.vercel.app/users/register`, data)
            .then(() => {
                alert('succes')
                navigation.navigate('Auth/login')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <View style={styles.top}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.textTitle}>Let's Get Started !</Text>
                <Text style={{ fontWeight: "500", color: "#C4C4C4", marginBottom: 35, fontSize: 14 }}>Create new account to access all feautures</Text>
            </View>
            <Box alignItems="center">
                <Input backgroundColor={'white'} borderRadius={10} w={350} h={12} InputLeftElement={<Icon as={<FeatherIcon name="user" />} size={5} ml="2" color="muted.400" />} placeholder="Name" value={users_name} onChangeText={(value) => setUsers_name(value)} />
            </Box>
            <Box mt={5} alignItems="center">
                <Input backgroundColor={'white'} borderRadius={10} w={350} h={12} InputLeftElement={<Icon as={<FeatherIcon name="mail" />} size={5} ml="2" color="muted.400" />} placeholder="E-Mail" value={users_email} onChangeText={(value) => setUsers_email(value)} />
            </Box>
            <Box mt={5} alignItems="center">
                <Input backgroundColor={'white'} borderRadius={10} w={350} h={12} InputLeftElement={<Icon as={<FeatherIcon name="phone" />} size={5} ml="2" color="muted.400" />} placeholder="Phone Number" value={users_phone} onChangeText={(value) => setUsers_phone(value)} />
            </Box>
            <Box mt={5} alignItems="center">
                <Input backgroundColor="#fff" borderRadius={10} w={350} h={12} type={show ? "text" : "password"} InputLeftElement={<Icon as={<FeatherIcon name="lock" />} size={5} ml="2" color="muted.400" />} value={users_password} onChangeText={(value) => setUsers_password(value)}
                    InputRightElement={<Pressable onPress={() => setShow(!show)}>
                        <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                    </Pressable>} placeholder="Password" />
            </Box>
            <Box mt={5} alignItems="center">
                <Input backgroundColor="#fff" borderRadius={10} w={350} h={12} type={show ? "text" : "password"} InputLeftElement={<Icon as={<FeatherIcon name="unlock" />} size={5} ml="2" color="muted.400" />} value={users_confirmpassword} onChangeText={(value) => setUsers_confirmpassword(value)}
                    InputRightElement={<Pressable onPress={() => setShow(!show)}>
                        <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                    </Pressable>} placeholder="Password" />
            </Box>

            <Button w={350} style={styles.login} onPress={submit}>Simpan</Button>
            <View style={styles.sign}>
                <Text style={{ fontWeight: "500", color: "#999999" }}>Already have account?
                    <Link href={"/"}><Text style={{ fontWeight: "500", color: "#EFC81A" }}>Log In Here</Text></Link>
                </Text>
            </View>
        </View>
    )
};

export default () => {
    return (
        <NativeBaseProvider>
            <View backgroundColor="#EFEFEF" flex={1} px="3">
                <Register />
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
        paddingVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 2,
        marginTop: 35
    },
    sign: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    }
});
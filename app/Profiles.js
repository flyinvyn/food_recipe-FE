import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeBaseProvider, Icon, Image, Button } from "native-base";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// const ProfImage = ({photo, name}) => {
//     return (

//     )
// }

const Profile = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const users_id = await AsyncStorage.getItem('id')
        axios.get(`https://food-recipe-be.vercel.app/users/profile/${users_id}`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const removeData = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Auth/login')
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: "row", marginTop: 40, alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Landing')}
                        style={{ borderRadius: 16, width: 48, height: 48, marginLeft: 20 }}>
                        {<Icon as={<FeatherIcon name="chevron-left" />} size={7} style={{ marginLeft: "auto", marginRight: "auto", marginTop: 10 }} />}
                    </TouchableOpacity>
                </View>
                {data.map((item, index) => (
                    <View key={index} style={{ justifyContent: "center", alignItems: "center" }}>
                        <Image
                            source={item.users_photo === "null" ||
                            item.users_photo === null ||
                            item.users_photo === ""
                              ? require("../assets/img/noimage.png")
                              : { uri: item.users_photo }} alt='Profile'
                            style={{ width: 140, height: 140, borderRadius: 100 }}
                        />
                        <Text style={{ color: "#FFFFFF", fontSize: 22, fontWeight: "700", marginTop: 10 }}>{item.users_name}</Text>
                    </View>
                ))}
                {/* {data.map(item => {
                    return <ProfImage key={item.users_id} photo={item.users_photo} name={item.users_name} />
                })} */}
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.section}>
                        <View style={styles.wrapper}>
                            {<Icon as={<FeatherIcon name="user" />} size={7} ml="2" color="yellow.400" />}
                            <Link style={{ paddingLeft: 20, fontSize: 15, fontWeight: "600" }} href={'/EditProfile'}>Edit Profile</Link>
                            <Button style={{ backgroundColor: "transparent", marginLeft: "auto" }}>
                                {<Icon as={<FeatherIcon name="chevron-right" />} size={7} ml="2" />}
                            </Button>
                        </View>
                        <View style={styles.wrapper}>
                            {<Icon as={<FeatherIcon name="award" />} size={7} ml="2" color="yellow.400" />}
                            <Link style={{ paddingLeft: 20, fontSize: 15, fontWeight: "600" }} href={'/MyRecipe'}>My Recipe</Link>
                            <Button style={{ backgroundColor: "transparent", marginLeft: "auto" }}>
                                {<Icon as={<FeatherIcon name="chevron-right" />} size={7} ml="2" />}
                            </Button>
                        </View>
                        <View style={styles.wrapper}>
                            {<Icon as={<FeatherIcon name="bookmark" />} size={7} ml="2" color="yellow.400" />}
                            <Link style={{ paddingLeft: 20, fontSize: 15, fontWeight: "600" }} href={'/SaveRecipe'}>Saved Recipe</Link>
                            <Button style={{ backgroundColor: "transparent", marginLeft: "auto" }}>
                                {<Icon as={<FeatherIcon name="chevron-right" />} size={7} ml="2" />}
                            </Button>
                        </View>
                        <View style={styles.wrapper}>
                            {<Icon as={<FeatherIcon name="thumbs-up" />} size={7} ml="2" color="yellow.400" />}
                            <Link style={{ paddingLeft: 20, fontSize: 15, fontWeight: "600" }} href={'/LikeRecipe'}>Liked Recipe</Link>
                            <Button style={{ backgroundColor: "transparent", marginLeft: "auto" }}>
                                {<Icon as={<FeatherIcon name="chevron-right" />} size={7} ml="2" />}
                            </Button>
                        </View>
                        <View style={styles.wrapper}>
                            {<Icon as={<FeatherIcon name="log-out" />} size={7} ml="2" color="yellow.400" />}
                            <TouchableOpacity onPress={() => removeData()}><Text style={{ paddingLeft: 20, fontSize: 15, fontWeight: "600" }}>Log Out</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
};


export default () => {
    return (
        <NativeBaseProvider>
            <View backgroundColor="#fff" flex={1} px="3">
                <Profile />

            </View>
        </NativeBaseProvider>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EFC81A",
        height: 350
    },
    section: {
        backgroundColor: "#FFFFFF",
        height: 310,
        width: 370,
        marginTop: 30,
        borderRadius: 30
    },
    wrapper: {
        marginTop: 20,
        paddingLeft: 23,
        flexDirection: "row",
        alignItems: "center"
    }
});
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon, Button, NativeBaseProvider, Image, ScrollView } from 'native-base'
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Menu = ({photo, name}) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
            <Image source={{uri : `${photo}`}} w={20} height={20} alt='Recipe' borderRadius={15} />
            <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "700", color: '#18172B', width: 100 }}>{name}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <Button w={12} h={12} borderRadius={100} style={{ backgroundColor: "#EFC81A", marginHorizontal: 20 }} >
                    {<Icon as={<FeatherIcon name="bookmark" />} size={7} color="#fff" />}
                </Button>
                <Button w={12} h={12} borderRadius={100} style={{ backgroundColor: "#fff", borderWidth: 2, borderColor: "#EFC81A" }} >
                    {<Icon as={<FeatherIcon name="thumbs-up" />} size={7} color="#EFC81A" />}
                </Button>
            </View>
        </View>
    )
}

const PopularMenu = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);

    useEffect(() => {
        getData()
    }, [])
    const getData = () => {
        axios.get(`http://192.168.18.6:7474/recipes`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <ScrollView>
            <View style={{ flex: 1, marginTop: 20, paddingLeft: 20 }}>
                <View style={{ flexDirection: "row", marginTop: 40, alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Landing')}
                        style={{ backgroundColor: "#F8F8FA", borderRadius: 16, width: 48, height: 48 }}>
                        {<Icon as={<FeatherIcon name="chevron-left" />} size={7} style={{ marginLeft: "auto", marginRight: "auto", marginTop: 10 }} />}
                    </TouchableOpacity>
                    <Text style={{ marginHorizontal: 70, fontSize: 25, fontWeight: "700", color: "#EFC81A" }}>Popular Menu</Text>
                </View>
                {data.map(item => {
                    return <Menu key={item.recipes_id} name={item.recipes_title} photo={item.recipes_photo} />
                })}
            </View>
        </ScrollView>
    )
}

export default () => {
    return (
        <NativeBaseProvider>
            <View backgroundColor="#fff" flex={1} px="3">
                <PopularMenu />
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
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React from 'react'
import { Icon, Button, NativeBaseProvider, Image, HStack } from 'native-base'
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const SaveRecipe = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible2] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get(`https://food-recipe-be.vercel.app/bookmarks`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleDelete = (bookmarks_id) => {
        axios.delete(`https://food-recipe-be.vercel.app/bookmarks/${bookmarks_id}`)
            .then(() => {
                alert('Unsave recipe')
                getData();
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <View style={{ flex: 1, marginTop: 20, paddingLeft: 20 }}>
            <View style={{ flexDirection: "row", marginTop: 40, alignItems: "center" }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profiles')}
                    style={{ backgroundColor: "#F8F8FA", borderRadius: 16, width: 48, height: 48 }}>
                    {<Icon as={<FeatherIcon name="chevron-left" />} size={7} style={{ marginLeft: "auto", marginRight: "auto", marginTop: 10 }} />}
                </TouchableOpacity>
                <Text style={{ marginHorizontal: 70, fontSize: 25, fontWeight: "700", color: "#EFC81A" }}>Saved Recipe</Text>
            </View>
            {data.map(item => (
                <View  key={item.recipes_id} style={{ flexDirection: "row", alignItems:'center', marginTop: 30 }}>
                    <Image source={{uri: item.recipes_photo}} w={20} height={20} borderRadius={15} alt='Recipe' />
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: "700", color: '#18172B', width: 100 }}>{item.recipes_title}</Text>
                    </View>
                    <Button
                        style={{ width: 50, backgroundColor: "red" }}
                        //   onPress={() => handleDelete(item.recipes_id)}
                        onPress={() => setModalVisible2(!modalVisible)} ml={3}
                    >
                        <FeatherIcon name="trash-2" size={20} color={"white"} />
                    </Button>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible2(!modalVisible);
                        }}

                    >
                        <View style={styles.modalView}>
                            <Text marginLeft={'auto'} marginRight={'auto'} fontSize={20}>Unsave this recipe?</Text>

                            <HStack mt={5} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                <Button

                                    onPress={() => setModalVisible2(!modalVisible)}
                                    mr={3}
                                >
                                    Cancel
                                </Button>
                                <Button backgroundColor={'red.600'} w={20} onPress={() => handleDelete(item.bookmarks_id)} >Hapus</Button>
                            </HStack>
                        </View>
                    </Modal>
                </View>
            ))}
        </View>
    )
}

export default () => {
    return (
        <NativeBaseProvider>
            <View backgroundColor="#fff" flex={1} px="3">
                <SaveRecipe />
            </View>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    touch: {
        fontSize: 18,
        marginTop: 20,
    },
    modalView: {
        marginTop: 100,
        marginHorizontal:10,
        backgroundColor: "#EFEFEF",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
})
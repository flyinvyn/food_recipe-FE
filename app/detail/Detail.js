import { Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeBaseProvider, Icon, Image, Button, ScrollView, TextArea, Avatar } from "native-base";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createCommentActions } from '../config/redux/action/commentAction';
import { useDispatch, useSelector } from 'react-redux';

const FirstRoute = () => {
    const route = useRoute();
    const { idRecipe } = route.params
    const [datass, setDatass] = useState([]);
    const getRecipe = () => {
        axios.get(`https://food-recipe-be.vercel.app/recipes/${idRecipe}`)
            .then((res) => {
                setDatass(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        getRecipe()
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {datass.map(item => (
                <ScrollView>
                    <View key={item.recipes_id} style={{ width: 319, backgroundColor: '#FAF7ED', marginTop: 20, marginLeft: 20, borderRadius: 15 }}>
                        <Text style={{ width: 217, marginHorizontal: 40, marginVertical: 40, fontSize: 16 }}>
                            {item.recipes_ingredients}
                        </Text>
                    </View>
                </ScrollView>
            ))}
        </View>
    )
};

const SecondRoute = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    // const {comment} = useSelector((state)=>state.comment)
    const route = useRoute();
    const { idRecipe } = route.params
    // const [idUser, setIdUser] = useState('');
    const [datas, setData] = useState([]);
    const getComment = () => {
        axios.get(`https://food-recipe-be.vercel.app/comments`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // const getId = async () => {
    //     const id = await AsyncStorage.getItem('id')
    //     setIdUser(id)
    // }

    useEffect(() => {
        getComment();
        // getId();
    }, [])

    const [commentText, setCommentText] = useState("");
    const handleComments = async () => {
        const dataUser = await AsyncStorage.getItem("id");
        dispatch(createCommentActions(idRecipe, dataUser, commentText));
        setCommentText("");
        getComment();
    };
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ width: 319, height: 80, backgroundColor: '#FAF7ED', marginLeft: 'auto', marginRight: 'auto', borderRadius: 15, flexDirection: "row", alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('detail/DetailVideo', { idRecipe })} style={{ flexDirection: "row", alignItems: "center" }} >
                            <View style={{ width: 56, height: 56, backgroundColor: '#EEC302', marginVertical: 12, marginHorizontal: 20, borderRadius: 16 }}>
                                {<Icon as={<FeatherIcon name="play" />} size={7} style={{ marginLeft: "auto", marginRight: "auto", marginVertical: 14, color: '#fff' }} />}
                            </View>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: '#666666' }}>Play video</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <TextArea
                        placeholder='Comment :'
                        backgroundColor={'#FAF7ED'}
                        w={319}
                        marginLeft={'auto'}
                        marginRight={'auto'}
                        borderRadius={15}
                        h={40}
                        mt={10}
                        fontSize={17}
                        value={commentText} onChangeText={(value) => setCommentText(value)}
                    />
                    <Button onPress={handleComments} style={{ width: 319, height: 50, borderRadius: 10, backgroundColor: "#EFC81A", marginTop: 60, marginLeft: "auto", marginRight: "auto" }} >
                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>Post</Text>
                    </Button>
                    <View marginLeft={40}>
                        <Text marginTop={10}>Comment:</Text>
                        {datas.map(item => (
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 50 }}>
                                <Avatar mt={5} source={{ uri: item.users_photo }} />
                                <View style={{ flexDirection: "column", marginLeft: 20 }}>
                                    <Text style={{ fontWeight: "700" }}>{item.users_name}</Text>
                                    <Text style={{width:270}}>{item.comment_text}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    )
};

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

const DetailRecipe = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Ingredients' },
        { key: 'second', title: 'Video Step' },
    ]);
    const { idRecipe } = route.params
    const [data, setData] = useState([]);
    const getRecipe = () => {
        axios.get(`https://food-recipe-be.vercel.app/recipes/${idRecipe}`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        getRecipe()
    }, [])

    const handleLike = async () => {
        const dataUser = await AsyncStorage.getItem("id");
        const data = {
            recipes_id: idRecipe,
            users_id: dataUser,
        };
        axios.post("https://food-recipe-be.vercel.app/likeds", data).then((res) => {
            if (res.data.statusCode === 201) {
                alert("Like Recipe Success");
            } else if (res.data.message === "Like Already") {
                alert("Recipe has been Liked");
            }
        });
    };

    const handleBookmarks = async () => {
        const dataUser = await AsyncStorage.getItem("id");
        const data = {
            recipes_id: idRecipe,
            users_id: dataUser,
        };

        axios.post("https://food-recipe-be.vercel.app/bookmarks", data).then((res) => {
            if (res.data.statusCode === 201) {
                alert("Save Success");
            } else if (res.data.message === "Bookmarks Already") {
                alert("Recipes in bookmark");
            }
        });
    };
    return (
        <View style={{ flex: 1 }}>
            <View>
                {data.map(item => (
                    <View>
                        <Image style={{ position: 'relative' }} w={400} height={400} source={{ uri: item.recipes_photo }} alt='Detail' />
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Landing')}
                            style={{ position: 'absolute', top: 20, left: 20, backgroundColor: "#F8F8FA", borderRadius: 16, width: 48, height: 48 }}>
                            {<Icon as={<FeatherIcon name="chevron-left" />} size={7} style={{ marginLeft: "auto", marginRight: "auto", marginTop: 10 }} />}
                        </TouchableOpacity>
                        <Text style={styles.title}>{item.recipes_title}</Text>
                        <Text style={styles.name}>By {item.users_name}</Text>
                    </View>

                ))}
                <View style={styles.icon}>
                    <Button w={12} h={12} marginRight={3} borderRadius={100} onPress={handleBookmarks} style={{ backgroundColor: "#fff" }} >
                        {<Icon as={<FeatherIcon name="bookmark" />} size={7} color="#EFC81A" />}
                    </Button>
                    <Button w={12} h={12} borderRadius={100} onPress={handleLike} style={{ backgroundColor: "#fff" }} >
                        {<Icon as={<FeatherIcon name="thumbs-up" />} size={7} color="#EFC81A" />}
                    </Button>
                </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={styles.section}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}
                        renderTabBar={props => <TabBar {...props} style={{ backgroundColor: "white" }}
                            labelStyle={{ color: 'black' }} />}
                    />
                </View>
            </View>
        </View>
    )
};


export default () => {
    return (
        <NativeBaseProvider>
            <View backgroundColor="#fff" flex={1} px="3">
                <DetailRecipe />
            </View>
        </NativeBaseProvider>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EFC81A",
        height: 310
    },
    b: {
        backgroundColor: '#fff'
    },
    section: {
        backgroundColor: "#fff",
        height: 500,
        width: 400,
        borderRadius: 30,
        position: "relative",
        bottom: 100
    },
    wrapper: {
        marginTop: 20,
        paddingLeft: 23,
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        color: '#fff',
        fontSize: 35,
        width: 160,
        position: 'absolute',
        bottom: 150,
        left: 30,
        fontWeight: "500"
    },
    name: {
        color: '#fff',
        fontSize: 15,
        position: 'absolute',
        bottom: 130,
        left: 30,
    },
    icon: {
        flexDirection: 'row',
        color: '#B0B0B0',
        position: 'absolute',
        bottom: 130,
        left: 270,
    }
});
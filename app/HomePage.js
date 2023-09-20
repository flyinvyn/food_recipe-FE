import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { NativeBaseProvider, Box, Input, Pressable, Icon, Image, Button } from "native-base";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Link, useNavigation } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipe } from './config/redux/action/recipeAction';
import { useIsFocused } from '@react-navigation/native';
const Tab = createBottomTabNavigator();

const Carousel = ({ photo, name, onNavigate }) => {
    return (
        <TouchableOpacity onPress={onNavigate}>
            <View style={{ flex: 2, position: "relative" }}>
                <Image
                    source={{ uri: `${photo}` }} alt='Banana lemonilo'
                    style={{ width: 130, height: 160, marginHorizontal: 15, borderRadius: 15 }}
                />
                <Text style={styles.name}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const Data = () => {
    const [recipes, setRecipes] = useState([]);
    const dispatch = useDispatch();
    const { recipe } = useSelector((state) => state.recipe)
    const focus = useIsFocused();
    const [searchText, setSearchText] = useState("");

    const filteredRecipes = recipes.filter((item) =>
        item.recipes_title.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        if (focus) {
            dispatch(getAllRecipe());
            setRecipes(recipe);
        }
    }, [dispatch, focus])
    return (
        <View style={{ paddingBottom: 100 }}>
            {filteredRecipes.map((item,index)=>(
                <View key={index} style={{ flexDirection: "row", paddingLeft: 23, marginVertical: 10, alignItems: 'center' }}>
                <Image
                    source={{ uri: item.recipes_photo }} alt='Orange La Pasta'
                    style={{ width: 65, height: 65, borderRadius: 16, marginTop: 7 }}
                />
                <View style={{ paddingLeft: 20, marginTop: 5 }}>
                    <Text style={{ fontWeight: "500", color: "#18172B" }}>{item.recipes_title}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
                    </View>
                </View>
            </View>
            ))}
        </View>
    )
}

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const dispatch = useDispatch();
    const { recipe } = useSelector((state) => state.recipe)
    const navigation = useNavigation();
    const focus = useIsFocused();

    useEffect(() => {
        if (focus) {
            dispatch(getAllRecipe());
            setRecipes(recipe);
        }
    }, [dispatch, focus])

    const Move = (recipe) => {
        const idRecipe = recipe.recipes_id
        // console.log(id);
        navigation.navigate("detail/Detail", { idRecipe });
    };

    const [searchText, setSearchText] = useState("");

    const filteredRecipes = recipe.filter((item) =>
        item.recipes_title.toLowerCase().includes(searchText.toLowerCase())
    );
    return (
        <View marginTop={20}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                    <Box>
                        <Input onChangeText={(text) => setSearchText(text)}
                            value={searchText} backgroundColor="#EFEFEF" borderRadius={15} w={350} h={50} InputLeftElement={<Icon as={<FeatherIcon name="search" />} size={5} ml="2" color="muted.400" />} placeholder="Search Pasta, Bread, etc" />
                    </Box>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ paddingLeft: 23, marginTop: 25 }}>
                        <Text style={{ color: "#3F3A3A", fontWeight: "700", fontSize: 18 }}>New Recipes</Text>
                    </View>

                    <View style={{ height: 200, marginTop: 20 }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {filteredRecipes.map((recipe, index) => {
                                return <Carousel key={index} photo={recipe.recipes_photo} name={recipe.recipes_title} onNavigate={() => Move(recipe)} />
                            })}
                        </ScrollView>
                    </View>
                    {/* Popular recipes */}
                    <View style={{ paddingLeft: 23, marginTop: 25, flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ color: "#18172B", fontWeight: "700", fontSize: 18 }}>Popular Recepies</Text>
                        <Link style={{ marginLeft: 'auto', marginRight: 20 }} href={'/PopularMenu'}><Text style={{ color: "#6D61F2", fontWeight: "500", fontSize: 14 }}>More info</Text></Link>
                    </View>
                    {/* <View> */}
                    {/* {recipes.map(recipe => { */}
                    <Data />
                    {/* })} */}
                    {/* </View> */}
                </View>
            </ScrollView>
        </View>
    )
};

export default () => {
    return (
        <NativeBaseProvider>
            <View backgroundColor="#fff" flex={1} px="3">
                <Home />
            </View>
        </NativeBaseProvider>
    );
};


const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        width: 62,
        fontSize: 14,
        fontWeight: '500',
        color: "#FBFBFB",
        position: "absolute",
        top: 100,
        left: 40
    }
});
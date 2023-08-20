import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { NativeBaseProvider, Box, Input, Pressable, Icon, Image, Button } from "native-base";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Link } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipe } from './config/redux/action/recipeAction';
const Tab = createBottomTabNavigator();


const Carousel = ({ photo, name }) => {
    return (
        <Link href={'detail/DetailRecipe'}>
            <View style={{ flex: 2, position: "relative" }}>
                <Image
                    source={{ uri: `${photo}` }} alt='Banana lemonilo'
                    style={{ width: 130, height: 160, marginHorizontal: 15, borderRadius: 15 }}
                />
                <Text style={styles.name}>{name}</Text>
            </View>
        </Link>
    )
}

const Data = ({photo, name, title}) => {
    return (
        <View style={{ flexDirection: "row", paddingLeft: 23, marginTop: 25 }}>
            <Image
            source={{uri: `${photo}`}} alt='Orange La Pasta' 
            style={{ width: 65, height: 65, borderRadius: 16 }}
            />
            <View style={{ paddingLeft: 20, marginTop: 5 }}>
                <Text style={{ fontWeight: "500", color: "#18172B" }}>{name}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
                    <Text style={{ marginLeft: 5 }}>{title}</Text>
                </View>
            </View>
        </View>
    )
}

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const dispatch = useDispatch();
    const {recipe} = useSelector((state) => state.recipe)

    useEffect(() => {
        dispatch(getAllRecipe());
        setRecipes(recipe);
    }, [])

    // const getData = () => {
    // }
    return (
        <View marginTop={20}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                    <Box>
                        <Input backgroundColor="#EFEFEF" borderRadius={15} w={350} h={50} InputLeftElement={<Icon as={<FeatherIcon name="search" />} size={5} ml="2" color="muted.400" />} placeholder="Search Pasta, Bread, etc" />
                    </Box>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ paddingLeft: 23, marginTop: 25 }}>
                        <Text style={{ color: "#3F3A3A", fontWeight: "700", fontSize: 18 }}>New Recipes</Text>
                    </View>

                    <View style={{ height: 200, marginTop: 20 }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {recipe.map(recipe => {
                                return <Carousel key={recipe.recipes_id} photo={recipe.recipes_photo} name={recipe.recipes_title} />
                            })}
                        </ScrollView>
                    </View>
                    {/* Popular recipes */}
                    <View style={{ paddingLeft: 23, marginTop: 25, flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ color: "#18172B", fontWeight: "700", fontSize: 18 }}>Popular Recepies</Text>
                        <Link style={{ marginLeft: 'auto', marginRight: 20 }} href={'/PopularMenu'}><Text style={{ color: "#6D61F2", fontWeight: "500", fontSize: 14 }}>More info</Text></Link>
                    </View>
                    <View>
                        {recipes.map(recipe => {
                            return <Data key={recipe.recipes_id} photo={recipe.recipes_photo} name={recipe.recipes_title} title={recipe.recipes_ingredients} />
                        })}
                    </View>
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
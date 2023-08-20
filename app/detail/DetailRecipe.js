import { Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { NativeBaseProvider, Icon, Image, Button, ScrollView, TextArea, Avatar } from "native-base";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ width: 319, backgroundColor: '#FAF7ED', marginTop: 20, marginLeft: 20, borderRadius: 15 }}>
            <Text style={{ width: 217, marginHorizontal: 40, marginVertical: 40, fontSize: 16 }}>- 2 slices whole-grain bread
                (bakery-fresh recommended)
                - 1 tablespoon hummus
                - 2 slices tomato
                - 1/2 small cucumber, thinly sliced
                lengthwise
                - 1 slice low-fat cheese
            </Text>
        </View>
    </View>
);

const SecondRoute = () => (
    <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ width: 319, height: 80, backgroundColor: '#FAF7ED', marginLeft: 'auto', marginRight: 'auto', borderRadius: 15, flexDirection: "row", alignItems: 'center', marginTop: 20 }}>
                    <Button style={{ width: 56, height: 56, backgroundColor: '#EEC302', marginVertical: 12, marginHorizontal: 20, borderRadius: 16 }}>
                        {<Icon as={<FeatherIcon name="play" />} size={7} style={{ marginLeft: "auto", marginRight: "auto", marginVertical: 5, color: '#fff' }} />}
                    </Button>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '600', color: '#666666' }}>Step 1</Text>
                        <Text>Boil eggs for 3 minutes</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ width: 319, height: 80, backgroundColor: '#FAF7ED', marginLeft: 'auto', marginRight: 'auto', borderRadius: 15, flexDirection: "row", alignItems: 'center', marginTop: 20 }}>
                    <Button style={{ width: 56, height: 56, backgroundColor: '#EEC302', marginVertical: 12, marginHorizontal: 20, borderRadius: 16 }}>
                        {<Icon as={<FeatherIcon name="play" />} size={7} style={{ marginLeft: "auto", marginRight: "auto", marginVertical: 5, color: '#fff' }} />}
                    </Button>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '600', color: '#666666' }}>Step 1</Text>
                        <Text>Boil eggs for 3 minutes</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                <TextArea
                    placeholder='Description'
                    backgroundColor={'#FAF7ED'}
                    w={319}
                    marginLeft={'auto'}
                    marginRight={'auto'}
                    borderRadius={15}
                    h={40}
                    mt={10}
                    fontSize={17}
                />
                <Button style={{ width: 319, height: 50, borderRadius: 10, backgroundColor: "#EFC81A", marginTop: 60, marginLeft: "auto", marginRight: "auto" }} >
                    <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>Post</Text>
                </Button>
                <View marginLeft={40}>
                    <Text marginTop={10}>Comment:</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Avatar mt={5} source={require('../../assets/img/profile.png')} />
                        <View style={{ flexDirection: "column", marginLeft: 20 }}>
                            <Text style={{ fontWeight: "700" }}>Ayudia</Text>
                            <Text>Nice recipe. simple and delicious, thankyou</Text>
                        </View>
                    </View>
                </View>
                <Button style={{ width: 183, height: 50, borderRadius: 10, backgroundColor: "#EFC81A", marginTop: 60, marginLeft: "auto", marginRight: "auto" }} >
                </Button>
            </ScrollView>
        </ScrollView>
    </SafeAreaView>
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

const DetailRecipe = () => {
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Ingredients' },
        { key: 'second', title: 'Video Step' },
    ]);
    return (
        <View style={{ flex: 1 }}>
            <View>
                <Image style={{ position: 'relative' }} w={400} source={require('../../assets/img/thumbnail.png')} alt='Detail' />
                <Text style={styles.title}>Sandwich with Egg</Text>
                <Text style={styles.name}>By Chief Ronald Humson</Text>
                <View style={styles.icon}>
                    <Button w={12} h={12} marginRight={3} borderRadius={100} style={{ backgroundColor: "#fff" }} >
                        {<Icon as={<FeatherIcon name="bookmark" />} size={7} color="#EFC81A" />}
                    </Button>
                    <Button w={12} h={12} borderRadius={100} style={{ backgroundColor: "#fff" }} >
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
        color: '#B0B0B0',
        fontSize: 13,
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
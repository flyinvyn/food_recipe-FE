import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon, Button, NativeBaseProvider, Image } from 'native-base'
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';

const SaveRecipe = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, marginTop: 20, paddingLeft: 20 }}>
            <View style={{ flexDirection: "row", marginTop: 40, alignItems: "center" }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profiles ')}
                    style={{ backgroundColor: "#F8F8FA", borderRadius: 16, width: 48, height: 48 }}>
                    {<Icon as={<FeatherIcon name="chevron-left" />} size={7} style={{ marginLeft: "auto", marginRight: "auto", marginTop: 10 }} />}
                </TouchableOpacity>
                <Text style={{ marginHorizontal:70, fontSize: 25, fontWeight: "700", color: "#EFC81A" }}>Saved Recipe</Text>
            </View>
            <View style={{flexDirection:"row",marginTop:30}}>
                <Image source={require('../assets/img/magaret.png')} w={20} height={20} alt='Recipe' />
                <View style={{marginHorizontal:20}}>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: '#18172B' }}>Margherita</Text>
                    <Text style={{ fontSize: 16, fontWeight: "400", color: '#6E80B0' }}>in Vega Pizza</Text>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: '#18172B' }}>Spicy</Text>
                </View>
            </View>
            <View style={{flexDirection:"row",marginTop:30}}>
                <Image source={require('../assets/img/veg.png')} w={20} height={20} alt='Recipe' />
                <View style={{marginHorizontal:20}}>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: '#18172B' }}>Veg Loaded</Text>
                    <Text style={{ fontSize: 16, fontWeight: "400", color: '#6E80B0' }}>in Vega Pizza</Text>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: '#18172B' }}>Spicy</Text>
                </View>
            </View>
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
    }
})
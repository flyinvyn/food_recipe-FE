import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Box, Button, Icon, Input, NativeBaseProvider, ScrollView, TextArea } from 'native-base'
import FeatherIcon from "react-native-vector-icons/Feather";
import axios from 'axios';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { createRecipeActions } from './config/redux/action/recipeAction';
import { useEffect } from 'react';

const AddRecipe = () => {
  const dispatch = useDispatch();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setRecipes_photo(result.assets[0].uri);
    }
  };

  const getToken = async () =>{
    const users_id = await AsyncStorage.getItem('id')
    setLogin(users_id)
  }
  useEffect(()=>{
    getToken();
  },[])

  const [login, setLogin] = useState('')
  const [recipes_title, setRecipes_title] = useState('')
  const [recipes_ingredients, setRecipes_ingredients] = useState('')
  const [recipes_photo, setRecipes_photo] = useState(null)
  const [recipes_video, setRecipes_video] = useState('')
  const handleSubmit =  () => {
    dispatch(createRecipeActions(recipes_title, recipes_ingredients, recipes_video, recipes_photo, login));
    setRecipes_title('');
    setRecipes_ingredients('');
    setRecipes_photo('');
    setRecipes_video('');
  }
  return (
    <ScrollView>
      <View style={{ flex: 1, marginTop: 20, paddingLeft: 20 }}>
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <Text style={{ marginLeft: "auto", marginRight: "auto", fontSize: 25, fontWeight: "700", color: "#EFC81A", marginVertical: 20 }}>Add Your Recipe</Text>
      </View>
      <Box mt={30}>
        <Input backgroundColor="#fff" borderRadius={10} w={350} h={60} InputLeftElement={<Icon as={<FeatherIcon name="book-open" />} size={7} ml="5" color="muted.500" />} placeholder="Title" value={recipes_title} onChangeText={setRecipes_title} />
      </Box>
      <Box mt={18}>
        <TextArea backgroundColor="#fff" borderRadius={10} w={350} h={200} placeholder="Description" value={recipes_ingredients} onChangeText={setRecipes_ingredients} />
      </Box>
      <Box mt={18}>
        <Input backgroundColor="#fff" borderRadius={10} w={350} h={60} InputLeftElement={<Icon as={<FeatherIcon name="video" />} size={7} ml="5" color="muted.500" />} placeholder="Masukan Url Video" value={recipes_video} onChangeText={setRecipes_video} />
      </Box>
      <Box mt={18}>
        <View style={{backgroundColor:'#fff',borderRadius:10,width:350}}>
          <TouchableOpacity onPress={pickImage} style={{flexDirection:'row',alignItems:'center',marginVertical:15}}>
          <Icon as={<FeatherIcon name="image" />} size={7} ml="5" color="muted.500" />
          <Text style={{marginLeft:10,fontSize:13,fontWeight:'200'}}>Add Image</Text>
          {recipes_photo && (
                <Image
                  source={{ uri: recipes_photo }}
                  style={{width:200,height:100,marginHorizontal:15}}
                />
              )}
          </TouchableOpacity>
        </View>
      </Box>
      <Button onPress={handleSubmit} style={{ width: 183, height: 50, borderRadius: 10, backgroundColor: "#EFC81A", marginVertical: 60, marginLeft: "auto", marginRight: "auto" }} >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>Create</Text>
      </Button>
    </View>
    </ScrollView>
  )
}

export default () => {
  return (
    <NativeBaseProvider>
      <View flex={1} px="3">
        <AddRecipe />
      </View>
    </NativeBaseProvider>
  );
};
import React, { useEffect, useState } from "react";
import {
  Image,
  NativeBaseProvider,
  Container,
  Text,
  Input,
  Icon,
  View,
  ScrollView,
  HStack,
  Box,
  Center,
  VStack,
  Button,
  TextArea,
} from "native-base";
import {
  FlatList,
  Modal,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { updateRecipeActions } from "../config/redux/action/recipeAction";

const UpdateModal = ({
  recipes_id,
  recipes_title,
  recipes_ingredients,
  recipes_photo,
  recipes_video,
  getData,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState(recipes_title);
  const [description, setDescription] = useState(recipes_ingredients);
  const [video, setVideo] = useState(recipes_video);
  const [image, setImage] = useState(null);

  const updateRecipe = () => {
    dispatch(
      updateRecipeActions(
        title,
        description,
        video,
        image,
        recipes_id,
        setModalVisible,
        getData
      )
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text fontSize={20}>Update</Text>
          <Text mt={3}>Title</Text>
          <Input value={title} onChangeText={(value) => setTitle(value)} />
          <Text mt={3}>Ingredients</Text>
          <TextArea
            value={description}
            onChangeText={(value) => setDescription(value)}
          />
          <Text mt={3}>Url Video</Text>
          <Input value={video} onChangeText={(value) => setVideo(value)} />
          <Text mt={3}>Picture</Text>
          <Button mt={3} onPress={pickImage} backgroundColor={"transparent"}>
            <FeatherIcon name="camera" size={20} color={"black"} />
          </Button>
          {image && (
                <Image
                  source={{ uri: image }}
                  style={{width:100,height:100}}
                  alt="image"
                />
              )}
          <HStack mt={3}>
            <Button
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
              mr={3}
            >
              Cancel
            </Button>
            <Button onPress={updateRecipe}>Update</Button>
          </HStack>
        </View>
      </Modal>
      <Button style={{ width: 50, backgroundColor:'blue',marginLeft:25 }} onPress={() => setModalVisible(true)}>
        <FeatherIcon name="edit" size={20} color={"white"} />
      </Button>
    </View>
  );
};

export default UpdateModal;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
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
});
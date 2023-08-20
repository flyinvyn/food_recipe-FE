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
  useNativeBase,
} from "native-base";
import {
  FlatList,
  Modal,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import UpdateModal from "./components/updateModal";
import { deleteRecipeActions } from "./config/redux/action/recipeAction";
import { useNavigation } from "expo-router";

const Home = () => {
    const navigation = useNavigation()
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const SIZE = width * 0.94;
  const [data, setData] = useState([]);
  const [userLogin, setUserLogin] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const dataUser = await AsyncStorage.getItem("id");
    await axios
      .get(`http://192.168.18.6:7474/recipes/users/${dataUser}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  const handleDelete = (recipes_id) => {
    // axios.delete(`http://192.168.1.6:7474/recipes/${recipes_id}`).then(() => {
    //   alert("Recipe Delete");
    dispatch(deleteRecipeActions(recipes_id));
    getData();
  };
  return (
    <View>
        <View style={{ flexDirection: "row", marginTop: 40, alignItems: "center" }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profiles')}
                    style={{ backgroundColor: "#F8F8FA", borderRadius: 16, width: 48, height: 48 }}>
                    {<Icon as={<FeatherIcon name="chevron-left" />} size={7} style={{ marginLeft: "auto", marginRight: "auto", marginTop: 10 }} />}
                </TouchableOpacity>
                <Text style={{ marginHorizontal:70, fontSize: 25, fontWeight: "700", color: "#EFC81A" }}>My Recipe</Text>
            </View>
      <Container maxWidth={SIZE}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View mt={5}>
              <HStack>
                <Image
                  // source={{ uri: item.recipes_photo }}
                  source={
                    item.recipes_photo === "null" ||
                    item.recipes_photo === null ||
                    item.recipes_photo === ""
                      ? require("../assets/img/profile.png")
                      : { uri: item.recipes_photo }
                  }
                  style={styles.image}
                  alt="image"
                />
                <VStack style={{flexDirection:'row',alignItems:'center'}} paddingTop={1}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      width:100
                    }}
                  >
                    {item.recipes_title}
                  </Text>
                  <HStack>
                    <UpdateModal
                      recipes_title={item.recipes_title}
                      recipes_id={item.recipes_id}
                      recipes_video={item.recipes_video}
                      recipes_photo={item.recipes_photo}
                      recipes_ingredients={item.recipes_ingredients}
                      getData={getData}
                    />

                    <Button
                      style={{ width: 50, backgroundColor: "red" }}
                      onPress={() => handleDelete(item.recipes_id)}
                      ml={3}
                    >
                      <FeatherIcon name="trash-2" size={20} color={"white"} />
                    </Button>
                  </HStack>
                </VStack>
              </HStack>
            </View>
          )}
        />
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 20,
    width: 100,
    height: 100,
    marginRight: 20,
  },
  card: {
    width: 180,
    height: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },
  cardImage: {
    width: "100%",
    height: "70%",
  },
});

export default () => {
  return (
    <NativeBaseProvider>
      <View mt={6} flex={1} px="3">
        <Home />
      </View>
    </NativeBaseProvider>
  );
};
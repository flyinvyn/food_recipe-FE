import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import FeatherIcon from "react-native-vector-icons/Feather";
import { Home, Chat, Profile, AddRecipe } from './components/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOption = {
  tabBarShowLabel: false,
  headerShow: false,
  tabBarStyle: {
    position: "absolute",
    height: 60,
    right: 16,
    left: 16,
    elevation: 0,
    background: "#EFEFEF"
  }
}
const Landing = () => {
  return (
    <Tab.Navigator screenOptions={screenOption}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          headerShown:false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.btn}>
                <FeatherIcon name="home" color={focused ? "#EEC302" : "#6E80B0"} size={24} />
                <Text color={focused ? "#EEC302" : "#6E80B0"}>Home</Text>
              </View>
            )
          },
        }}
      />
      <Tab.Screen
      name='Add Recipe'
      component={AddRecipe} 
      options={{
        headerShown:false,
        tabBarIcon: ({focused})=>{
          return (
            <View style={styles.btn}>
              <FeatherIcon name="plus-square" color={focused ? "#EEC302" : "#6E80B0"} size={24} />
              <Text>Add Recipe</Text>
            </View>
          )
        }
      }}
      />
      {/* <Tab.Screen
      name='Chat'
      component={Chat}
      options={{
        headerShown:false,
        tabBarIcon: ({focused})=>{
          return (
            <View style={styles.btn}>
              <FeatherIcon name="message-circle" color={focused ? "#EEC302" : "#6E80B0"} size={24} />
              <Text>Chat</Text>
            </View>
          )
        }
      }}
      /> */}
      <Tab.Screen
      name='Profile'
      component={Profile}
      options={{
        headerShown:false,
        tabBarIcon: ({focused})=>{
          return (
            <View style={styles.btn}>
              <FeatherIcon name="user" color={focused ? "#EEC302" : "#6E80B0"} size={24} />
              <Text>Profile</Text>
            </View>
          )
        }
      }}
      />
    </Tab.Navigator>
  )
};

export default Landing


export const AppResult = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen />
        <Landing />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    width: 61,
    fontSize: 14,
    fontWeight: '500',
    color: "#FBFBFB",
    position: "absolute",
    top: 100,
    left: 40
  },
  btn: {
    alignItems: 'center',
    justifyContent: "center",
    padding: 8,
  }
});
import {  View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import login from '../Auth/login'
import register from '../Auth/register'
import HomePage from '../HomePage'
import AddRecipes from '../AddRecipes'
import Profiles from '../Profiles'
import EditProfile from '../EditProfile'
import LikeRecipe from '../LikeRecipe'
import MyRecipe from '../MyRecipe'
import PopularMenu from '../PopularMenu'
import SaveRecipe from '../SaveRecipe'
import Detail from '../detail/Detail'
import DetailVideo from '../detail/DetailVideo'
const Stack = createNativeStackNavigator()
export default function Route() {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name='Login'
        component={login}
        options={{
            headerShown:false
        }}
        />
        <Stack.Screen
        name='Register'
        component={register}
        options={{
            headerShown:false
        }}
        />
        <Stack.Screen
        name='HomePage'
        component={HomePage}
        options={{
            headerShown:false
        }}
        />
        <Stack.Screen
        name='AddRecipe'
        component={AddRecipes}
        options={{
            headerShown:false
        }}
        />
        <Stack.Screen
        name='Profile'
        component={Profiles}
        options={{
            headerShown:false
        }}
        />
        <Stack.Screen
        name='EditProfile'
        component={EditProfile}
        options={{
            headerShown:false
        }}
        />
        <Stack.Screen
        name='Liked'
        component={LikeRecipe}
        options={{
            headerShown:false
        }}
        />
        <Stack.Screen
        name='Myrecipe'
        component={MyRecipe}
        options={{
            headerShown:false
        }}
        />
        <Stack.Screen
        name='Popular'
        component={PopularMenu}
        options={{
            headerShown:false
        }}
        />
        <Stack.Screen
        name='Save'
        component={SaveRecipe}
        options={{
            headerShown:false
        }}
        />
        <Stack.Screen
        name='detail'
        component={Detail}
        options={{
            headerShown:false
        }}
        />
        <Stack.Screen
        name='Detail'
        component={DetailVideo}
        options={{
            headerShown:false
        }}
        />
    </Stack.Navigator>

  )
}


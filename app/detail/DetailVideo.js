import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { NativeBaseProvider, Text, Center } from 'native-base';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import YoutubeIframe from 'react-native-youtube-iframe';

const DetailVideo = () => {
    const route = useRoute()
    const { idRecipe } = route.params
    // const [title, setTitle] = useState();
    const [link, setLink] = useState();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios
            .get(`http://192.168.18.6:7474/recipes/${idRecipe}`)
            .then((response) => {
                // setTitle(response.data.data[0].recipes_title);
                const videoLink = response.data.data[0].recipes_video;
                const videoSlice = videoLink.slice(32);
                setLink(videoSlice);
            })
            .catch((error) => console.log(error));
    };

    return (
        <NativeBaseProvider>
            <Center flex={1} px={3}>
                <View style={{ margin: 5 }}>
                    <YoutubeIframe height={300} width={400} videoId={link} />
                </View>
                {/* <Text style={{ paddingTop: 20, fontSize: 30 }}>{title}</Text> */}
            </Center>
        </NativeBaseProvider>
    );
};

export default DetailVideo;

const styles = StyleSheet.create({});
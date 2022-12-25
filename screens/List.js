import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Platform, FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';
import ImageCard from '../components/ImageCard';



export default function List(props) {

    const { result } = props

    const data = {
        name: '',
        url: '',
        status: '',
      }
   

 return (
      <View style={styles.container}>
             <FlatList
                contentContainerStyle={{backgroundColor:'white', alignItems:'center', flexGrow: 1}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={result}
                numColumns={2}
                keyExtractor={(item, index) => index}
                renderItem={({item}) => (
                    (data.name = item.profile.name),
                    (data.url = item.profile.pictureUrl),
                    (data.status = item.status),
                        <ImageCard {...data}/>
                )}
             /> 
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    hint: {
      marginLeft: 24,
      marginRight: 24,
      fontSize: 14,
      textAlign: 'center',
    },
    
  });
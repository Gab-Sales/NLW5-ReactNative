import React from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View
}from 'react-native';

import colors from '../styles/colors';
import userImg from '../assets/Sales.png';
import fonts from '../styles/fonts';

export function Header(){
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.username}>Gabriel</Text>
            </View>
            <Image style={styles.image} source={userImg} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:20,
        marginTop:40,
        padding:30
    },
    image:{
        width:70,
        height:70,
        borderRadius:40
    },
    greeting:{
        fontSize:32,
        color:colors.heading,
        fontFamily:fonts.text
    },
    username:{
        fontSize:32,
        color:colors.heading,
        fontFamily:fonts.heading,
        lineHeight:40
    }
})
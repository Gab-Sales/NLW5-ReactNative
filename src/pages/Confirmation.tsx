import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { 
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { Button } from '../components/Button'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Confirmation(){
    const navigation = useNavigation();

    function handlerMoveOn(){
        navigation.navigate('PlantSelect');
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    🥳
                </Text>
                <Text  style={styles.title}>
                    Prontinho.
                </Text>  
                <Text  style={styles.subtitle}>
                    Agora vamos começar a cuidas das suas plantinhas com muito cuidado.
                </Text>
                <View style={styles.footer}>
                    <Button title="Confirmar" onPress={handlerMoveOn}/>
                </View>             
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-around'
    },
    content:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:30,
        width:'100%'
    },
    emoji:{
        fontSize:78
    },
    title:{
        fontSize:22,
        fontFamily:fonts.heading,
        textAlign:'center',
        color:colors.heading,
        lineHeight:38,
        marginTop:15
    },
    subtitle:{
        fontSize:17,
        fontFamily:fonts.text,
        textAlign:'center',
        paddingVertical:10,
        color:colors.heading
    },
    footer:{
        width:'100%',
        paddingHorizontal:60,
        marginTop:20
    }
})
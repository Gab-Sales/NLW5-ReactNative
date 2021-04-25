import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { 
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../components/Button'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){
    const[isFocused,setIsFocused]=useState(false);
    const[isFilled,setIsFilled]=useState(false);
    const[name,setName]=useState<string>();

    const navigation = useNavigation();



    function handlersubmit(){
        if(!!name){

            AsyncStorage.setItem('@plantmanager:user',name)

            navigation.navigate('Confirmation',{
                title:'prontinho',
                subtitle:'Agora vamos começar a cuidas das suas plantinhas com muito cuidado.',
                buttontitle:'Começar',
                icon:'smile',
                nextScreen:'PlantSelect'
            }); 
                        
        }else{
            Alert.alert(
                "Alerta",
                "Você Precisa preencher seu nome!",
                [
                    { text: "OK" }
                ]
            ) 
        }
    }

    function handleInputBlur(){
       setIsFocused(false);
       setIsFilled(!!name);
    }

    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputChange(value:string){
        setIsFilled(!!value);
        setName(value);
    }

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS==='ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>                   
                            <Text style={styles.emoji}>
                                {isFilled ? '🥳' : '😄'}
                            </Text>
                            <Text style={styles.title}>
                                Como podemos{'\n'} chamar você?
                            </Text>
                            <TextInput
                                style={[styles.input,
                                        (isFocused || isFilled) && {borderColor:colors.green}
                                ]} 
                                placeholder="Digite seu nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />
                            <View style={styles.footer}>
                                <Button title="Confirmar" onPress={handlersubmit}/>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'space-around'
    },
    content:{
        flex:1,
        width:'100%'
    },
    form:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:54,
        alignItems:'center'
    },
    emoji:{
        fontSize:44
    },
    input:{
        borderBottomWidth:1,
        borderColor:colors.gray,
        color:colors.heading,
        width:'100%',
        fontSize:18,
        marginTop:50,
        padding:10,
        textAlign:'center'
    },
    title:{
        fontSize:24,
        lineHeight:32,
        textAlign:'center',
        color:colors.heading,
        fontFamily:fonts.heading
    },
    footer:{
        marginTop:40,
        width:'100%',
        paddingHorizontal:20
    }
});
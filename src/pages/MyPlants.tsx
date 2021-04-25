import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert
} from 'react-native'
import { Header } from '../components/Header';
import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';
import { FlatList } from 'react-native-gesture-handler';
import { loadPlant, PlantProps, removePlant, StoragePlantProps } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';
import AsyncStorage from '@react-native-async-storage/async-storage';
export function MyPlants(){
    const[MyPlants,setMyPlants]=useState<PlantProps[]>([]);
    const[Loading,setLoading]=useState(true);
    const[nextWaterd,setNextWaterd]=useState<string>();

    function handleRemove(plant:PlantProps){
        Alert.alert('Remover',` Deseja remover a ${plant.name}?`,[
          {
            text:'não',
            style:'cancel'
          },
          {
            text:'Sim',
            onPress:async () => {
                try{
                    await removePlant(plant.id);
                    setMyPlants((oldData ) => 
                        oldData.filter((item)=>item.id != plant.id)
                    );

                }catch(err){
                    Alert.alert('Não foi possivel remover.');
                }
            }
          } 
        ])
    }

    useEffect(()=>{
        async function loadStoragedData() {
            const plansStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plansStoraged[0].dateTimeNotification).getTime(),new Date().getTime(),{locale:pt}
            )

            setNextWaterd(
                `Não esqueça de regar a ${plansStoraged[0].name} à ${nextTime} horas.`
            )

            setMyPlants(plansStoraged);
            setLoading(false);
        }

        loadStoragedData();

    },[])

    if(Loading)
        return <Load />

    return(
        <View style={styles.container}>
            <Header />
            <View style={styles.subcontainer}>
            <View style={styles.spotlight}>
                <Image 
                    source={waterdrop}
                    style={styles.spotLightImage}
                />
                <Text style={styles.spotLightText}>
                    {nextWaterd}
                </Text>
            </View>
            
            
                <Text style={styles.plantsTitle}>
                    Proximas Regadas
                </Text>
                <View style={styles.plants}>
                <FlatList 
                    data={MyPlants}
                    keyExtractor={(item)=>String(item.id)}
                    renderItem={({item})=>(
                        <PlantCardSecondary 
                            data={item}
                            handleRemove={()=>{handleRemove(item)}}
                            />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:colors.background
    },
    subcontainer:{
        flex:1,
        width:'100%',
        paddingHorizontal:30,
        paddingTop:15,
    },
    spotlight:{
        backgroundColor:colors.blue_light,
        paddingHorizontal:20,
        borderRadius:20,
        height:110,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    spotLightImage:{
        width:60,
        height:60
    },
    spotLightText:{
        flex:1,
        color:colors.blue,
        paddingHorizontal:20,
        textAlign:'justify'
    },
    plants:{
        flex:1,
        width:'100%'
    },
    plantsTitle:{
        fontSize:24,
        fontFamily:fonts.heading,
        color:colors.heading,
        marginVertical:20
    }
})
import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { EnviromentButton } from '../components/EnviromentButton';

import { Header } from '../components/Header'
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load'
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from '../libs/storage';

interface EnviromentProps {
    key:string,
    title:string
}

export function PlantSelect(){
    const[enviroments,setEnviroments]=useState<EnviromentProps[]>([]);
    const[plants,setPlants]=useState<PlantProps[]>([]);
    const[filteredplants,setFilteredPlants]=useState<PlantProps[]>([]);
    const[enviromentsSelected,setEnviromentsSelected]=useState('all');
    const[loading,setLoading]=useState(true);
    const[page,setPage]=useState(1);
    const[loadingMore,setLoadingMore]=useState(false);
    const Navigation = useNavigation();

    function handleEnviromentSelected(enviroment:string){
        setEnviromentsSelected(enviroment);

        if(enviroment==='all')
            return setFilteredPlants(plants);

        const filtered = plants.filter(plant=>plant.environments.includes(enviroment));

        setFilteredPlants(filtered);

    }

    useEffect(()=>{
        async function fetchEnviroment(){
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');
            setEnviroments([
                {
                    key:'all',
                    title:'Todos'
                },
                ...data
            ])
        }
        fetchEnviroment();

    },[])

    async function fetchPlants(){
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if(!data)
            return setLoading(true)
        
        if(page > 1){
            setPlants(oldValue=>[...oldValue,...data])
            setFilteredPlants(oldValue=>[...oldValue,...data])
        }else{
            setPlants(data);
            setFilteredPlants(data);          
        }           
        setLoading(false);
        setLoadingMore(false);
    }

    useEffect(()=>{

        fetchPlants();

    },[])

    function handleFetchMore(distance: number){
        if(distance < 1)
            return;

        setLoadingMore(true);
        setPage(oldValue=>oldValue+1)    
        fetchPlants();
    }

    function handlePlantSelect(plant: PlantProps){
        Navigation.navigate('PlantSave',{plant})
    }

    if(loading)
        return <Load />
    return(
        <View style={styles.container}>
            <Header />
            <View style={styles.header}>
                <Text style={styles.title}>
                    Em qual Ambiente
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
                </Text>
            </View>
            <View>
                <FlatList                   
                    data={enviroments} 
                    keyExtractor={(item)=>String(item.key)}
                    renderItem={({item})=>(
                        <EnviromentButton 
                            title={item.title}
                            active={item.key === enviromentsSelected}
                            onPress={()=>handleEnviromentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>
            <View style={styles.plants}>
                <FlatList
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd})=>handleFetchMore(distanceFromEnd)}
                    data={filteredplants} 
                    keyExtractor={(item)=>String(item.id)}
                    renderItem={({item})=>(
                        <PlantCardPrimary 
                            data={item}
                            onPress={()=>handlePlantSelect(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    ListFooterComponent={
                        loadingMore ?
                        <ActivityIndicator color={colors.green} />
                        : <></>
                    }
                />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background,
    },
    title:{
        fontSize:17,
        color:colors.heading,
        fontFamily:fonts.heading,
        lineHeight:20,
        marginTop:15
    },
    subtitle:{
        fontSize:17,
        fontFamily:fonts.text,
        lineHeight:20,
        color:colors.heading
    },
    header:{
        padding:30
    },
    enviromentList:{
        height:40,
        justifyContent:'center',
        paddingBottom:5,
        marginLeft:32,
        marginVertical:5
    },
    plants:{
        flex:1,
        paddingHorizontal:32,
        justifyContent:'center'
    }
})
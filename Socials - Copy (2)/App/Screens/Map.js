//Map

import React, { Component } from 'react';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import {
    Text,
    StyleSheet,
    View,
    FlatList,
    Image,
    ScrollView,
    TouchableHighlight
} from 'react-native';

export default class Map extends Component{

    render(){
        return(
            <View style={{flex:1}}>

                <View style={{flexDirection: 'row', borderBottomColor: 'gray', borderWidth: 1, padding: 15,}}>
                    
                    <Text style={{ fontWeight: 'bold', fontSize: 20, alignSelf: 'center', marginLeft: 5, marginRight: 290, }}>Map </Text>
                     
                    <Image source={require('../Assets/pencil_map.png')} style={{ height: 28, width: 28 }} />
                           
                </View>

                <View style={styles.container}>
                    <MapView style={styles.map}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0,
                            longitudeDelta: 0.0,
                        }}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: 37.78825,
                                longitude: -122.4324
                            }}
                        />
                    </MapView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});
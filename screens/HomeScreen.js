import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, AsyncStorage, Dimensions, Modal, Button } from 'react-native';
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import mapStyle from '../components/mapStyle.json';
import BottomSheet from '../components/BootomSheet';


export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            user: '',
            isLoggedIn: 0,
            region: null,
            typeBike: false
        }

    }

    componentDidMount() {
        this._retrieveData()
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {

        const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            let position = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
            let region = {
                latitude: parseFloat(position.coords.latitude),
                longitude: parseFloat(position.coords.longitude),
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            };
            this.setState({
                region: region,
            });
        }
    }

    centerMap() {
        if (this.state.region) {
            const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.region;
            this.map.animateToRegion({ latitude, longitude, latitudeDelta, longitudeDelta })
        }

    }

    _retrieveData = async () => {
        try {
            const userdata = await AsyncStorage.getItem('fullName');
            const isLoggedIn = await AsyncStorage.getItem('isAlreadyLoggedIn');
            this.setState({ user: userdata, isLoggedIn: isLoggedIn });
        } catch (error) {
            // Error retrieving data
        }
    };

    render() {

        return (
            this.state.region ?
                <View style={styles.container}>
                    <MapView style={styles.map}
                        initialRegion={this.state.region}
                        showCompass={true}
                        showsUserLocation={false}
                        rotateEnabled={false}
                        customMapStyle={mapStyle}
                        provider='google'
                        ref={(map) => { this.map = map }}>
                        <Marker
                            anchor={{ x: 0.5, y: 0.5 }}
                            coordinate={{
                                latitude: this.state.region.latitude,
                                longitude: this.state.region.longitude,
                            }}
                            description={"This is a marker in React Natve"}>
                            <Image source={require('../assets/images/marker3.png')}
                                style={{ height: 60, width: 60 }} />
                        </Marker>
                    </MapView>
                    <TouchableOpacity onPress={() => this.centerMap()} style={styles.location}>
                        <MaterialIcons name='my-location' color='#000' size={26} />
                    </TouchableOpacity>
                    <View style={styles.topHeader}>
                        <View>
                            <Text style={styles.font}>Hey {this.state.user} !</Text>
                            <Text style={{ fontFamily: 'lexendDeca', fontSize: 12, color: '#757575' }}>Schedule a delivery now</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={this.props.navigation.openDrawer}
                                style={styles.hamburger}>
                                <FontAwesome5 name='bars' size={18} color='#000' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.bottomFooter} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: 'googleSans', fontSize: 14, color: '#fff' }}>Schedule a delivery now</Text>
                            <FontAwesome5 name='shipping-fast' size={18} color='#fff' />
                        </View>
                        <View style={styles.innerFooter}>
                            <Text style={{ fontFamily: 'googleSans', fontSize: 14, color: '#121212', alignSelf: 'center' }}>Select shipment type</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 10, paddingBottom: 10 }}>
                                <MaterialCommunityIcons name='bike' size={25} color='#121212' style={styles.shipIcons} />
                                <MaterialCommunityIcons name='car-pickup' size={25} color='#121212' style={styles.shipIcons} />
                                <MaterialCommunityIcons name='truck' size={25} color='#121212' style={styles.shipIcons} />
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={{ fontFamily: 'googleSans', fontSize: 18, color: '#fff' }} >Book Now  </Text>
                                    <MaterialCommunityIcons name='check-circle' size={20} color='#fff' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>

                : <View style={styles.container}>
                    <Text style={{ fontFamily: 'googleSans', fontSize: 14, color: '#121212' }}>Map Not Loaded</Text>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    font: {
        fontFamily: 'googleSans',
        fontSize: 16
    },
    hamburger: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 40,
        height: 40,
        borderRadius: 16,
        padding: 5,
        shadowColor: '#121212',
        shadowOffset: { height: 8, width: 8 },
        shadowOpacity: 1, // IOS
        shadowRadius: 3,
        elevation: 7,

    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',
        zIndex: -1
    },
    topHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fbfaf8',
        width: Dimensions.get('window').width,
        height: '12%',
        position: 'absolute',
        top: 0,
        left: 0,
        shadowColor: '#121212',
        shadowOffset: { height: 5, width: 5 },
        elevation: 4,
        paddingTop: 32,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 10
    },
    location: {
        backgroundColor: '#f1f3f6',
        width: 36,
        height: 36,
        borderRadius: 18,
        padding: 5,
        shadowColor: '#121212',
        shadowOffset: { height: 5, width: 5 },
        shadowOpacity: 1, // IOS
        shadowRadius: 3,
        elevation: 7,
        position: 'absolute',
        bottom: '32%',
        right: 10
    },
    bottomFooter: {
        backgroundColor: '#27292c',
        width: Dimensions.get('window').width,
        height: '30%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    innerFooter: {
        backgroundColor: '#f1f3f6',
        width: Dimensions.get('window').width,
        height: '85%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    shipIcons: {
        backgroundColor: '#fff',
        width: 45,
        height: 45,
        borderRadius: 16,
        padding: 10,
        shadowOffset: { height: 4, width: 4 },
        shadowOpacity: 1, // IOS
        shadowRadius: 4,
        elevation: 4,
    },
    button: {
        backgroundColor: '#27292c',
        borderRadius: 15,
        textAlign: 'center',
        justifyContent: 'center',
        padding: 10,
        color: '#fff',
        flexDirection: 'row',
        marginTop: 5,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOffset: { height: 4, width: 4 },
        shadowOpacity: 1, // IOS
        shadowRadius: 1,
        elevation: 4,
        width: Dimensions.get('window').width * .62,
        height: 45
    },
    slide: {
        backgroundColor: '#121212',
        width: Dimensions.get('window').width,
        height: '30%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 1000,
        transform: [
            { translateY: 200 },
        ]
    }
})
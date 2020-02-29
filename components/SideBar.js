import React from 'react'
import { StyleSheet, View, Text, Dimensions, AsyncStorage, TouchableOpacity, ScrollView, Image } from 'react-native';
import { AntDesign, Octicons, MaterialIcons } from '@expo/vector-icons';

export default class SideBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: '',
            active: {
                Home: true,
                Settings: false,
                Logout: false,
                Payments: false
            }
        }
    }

    activateSettings() {
        this.setState({
            active: {
                Home: false,
                Settings: true,
                Logout: false,
                Bookings: false,
                Payments: false
            }
        });
    }
    activateHome() {
        this.setState({
            active: {
                Home: true,
                Bookings: false,
                Settings: false,
                Payments: false,
                Logout: false
            }
        });
    }
    activateBookings() {
        this.setState({
            active: {
                Home: false,
                Bookings: true,
                Settings: false,
                Payments: false,
                Logout: false
            }
        });
    }
    activatePayments() {
        this.setState({
            active: {
                Home: false,
                Bookings: false,
                Settings: false,
                Payments: true,
                Logout: false
            }
        });
    }
    _storeData = async () => {
        try {
            await AsyncStorage.setItem('isAlreadyLoggedIn', 'No');
        } catch (error) {
            // Error saving data
        }
    };
    logout() {
        this.setState({
            active: {
                Home: false,
                Settings: false,
                Bookings: false,
                Payments: false,
                Logout: true
            }
        });
        this._storeData();
        this.props.navigation.navigate('Login')
    }

    componentDidMount() {
        this._retrieveData()
    }

    _retrieveData = async () => {
        try {
            const userdata = await AsyncStorage.getItem('fullName');
            this.setState({ user: userdata });
        } catch (error) {
            // Error retrieving data
        }
    };

    render() {
        const active = this.state.active;
        return (
            <ScrollView>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../assets/images/avatar.png')}
                            style={styles.avatar}
                        ></Image>
                        <View style={{ padding: 15 }}>
                            <Text style={styles.font}> {this.state.user} </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={active.Home ? styles.active : styles.drawerItems}>
                        <TouchableOpacity style={[styles.item]} onPress={this.activateHome.bind(this)}>
                            <Octicons name='home' size={20} style={active.Home ? styles.activeIcon : styles.nonActiveIcon} />
                            <Text style={active.Home ? styles.activeFont : styles.nonActiveFont}>Home</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={active.Bookings ? styles.active : styles.drawerItems}>
                        <TouchableOpacity style={[styles.item]} onPress={this.activateBookings.bind(this)}>
                            <MaterialIcons name='directions-bike' size={20}
                                style={active.Bookings ? styles.activeIcon : styles.nonActiveIcon} />
                            <Text style={active.Bookings ? styles.activeFont : styles.nonActiveFont}>My Bookings</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={active.Settings ? styles.active : styles.drawerItems}>
                        <TouchableOpacity style={[styles.item]} onPress={this.activateSettings.bind(this)}>
                            <Octicons name='gear' size={20}
                                style={active.Settings ? styles.activeIcon : styles.nonActiveIcon} />
                            <Text style={active.Settings ? styles.activeFont : styles.nonActiveFont}>Settings</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={active.Payments ? styles.active : styles.drawerItems}>
                        <TouchableOpacity style={[styles.item]} onPress={this.activatePayments.bind(this)}>
                            <Octicons name='credit-card' size={20}
                                style={active.Payments ? styles.activeIcon : styles.nonActiveIcon} />
                            <Text style={active.Payments ? styles.activeFont : styles.nonActiveFont}>Payments</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={active.Logout ? styles.active : styles.drawerItems}>
                        <TouchableOpacity style={styles.item} onPress={this.logout.bind(this)}>
                            <AntDesign name='logout' size={20} style={active.Logout ? styles.activeIcon : styles.nonActiveIcon} />
                            <Text style={active.Logout ? styles.activeFont : styles.nonActiveFont}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#27292C'

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: '#f1f3f6',
        padding: 20,
        height: Dimensions.get('window').height * 0.23,
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#121212',
        marginBottom: 12,
        backgroundColor: '#f1f3f6'
    },
    font: {
        fontFamily: 'googleSans',
        fontSize: 16
    },
    drawerItems: {
        padding: 15,
        marginTop: 5,
        borderLeftWidth: 6,
        borderLeftColor: '#27292c'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        width: '100%'
    },
    active: {
        flexDirection: 'row',
        backgroundColor: 'rgba(241,243,245,0.1)',
        padding: 15,
        marginTop: 5,
        borderLeftWidth: 6,
        borderLeftColor: '#f1f3f6'
    },
    activeFont: {
        fontFamily: 'googleSans',
        color: '#f1f3f6',
        fontSize: 14
    },
    nonActiveFont: {
        fontFamily: 'googleSans',
        color: '#8F959B',
        fontSize: 14
    },
    activeIcon: {
        marginRight: 25,
        color: '#f1f3f6'
    },
    nonActiveIcon: {
        marginRight: 25,
        color: '#8F959B'
    }
});
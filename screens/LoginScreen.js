import React from 'react'
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, Dimensions, Image, AsyncStorage, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';

export default class LoginScreen extends React.Component {

    state = {
        fullName: '',
        email: '',
        password: '',
        isVisible: false
    }

    _storeData = async () => {
        try {
            await AsyncStorage.setItem('isAlreadyLoggedIn', 'Yes');
        } catch (error) {
            // Error saving data
        }
    };
    _retrieveData = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const pass = await AsyncStorage.getItem('password');
            const user = await AsyncStorage.getItem('fullName');
            if (email === this.state.email && pass === this.state.password) {
                this._storeData();
                this.props.navigation.navigate('Home');
                this.setState({ isVisible: true })

            }
            else {
                this.setState({ isVisible: true })
                //alert('Wrong email or password ');
            }
        } catch (error) {
            // Error retrieving data
        }
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/background2.png')}
                    style={styles.backgroundImage}
                ></Image>
                <View style={styles.header}>
                    <Text style={styles.font}>
                        Welcome
                    <Text style={{ fontFamily: 'poppins' }}> Back,</Text>
                    </Text>
                    <Text style={{ fontFamily: 'lexendDeca' }}>Sign in to continue !</Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', width: 300, marginBottom: 10, }}>
                        <TextInput style={styles.textinput} title='Email' placeholder='Email'
                            placeholderTextColor='#757575' autoCapitalize='none'
                            value={this.state.email} onChangeText={email => this.setState({ email })}
                        ></TextInput>
                        <Icon name="envelope" size={15} color="#757575"
                            style={{ position: 'absolute', top: 10, right: 10 }} />
                    </View>
                    <View style={{ marginBottom: 1, backgroundColor: '#fff' }}>
                        <TextInput style={styles.textinput} title='password' placeholder='Password' secureTextEntry={true}
                            placeholderTextColor='#757575' autoCapitalize='none'
                            value={this.state.password} onChangeText={password => this.setState({ password })}
                        ></TextInput>
                        <Icon name="lock" size={20} color="#757575"
                            style={{ position: 'absolute', top: 10, right: 10 }} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 1 }}>
                        <TouchableOpacity>
                            <Text style={{ fontFamily: 'lexendDeca', fontSize: 12, paddingTop: 5 }}>Forgot Password ?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={this._retrieveData}>
                        <Text style={styles.buttontext}>Sign in  </Text>
                        <Icon name="arrow-circle-right" size={15} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.alternate}>
                    <Text style={{ fontFamily: 'lexendDeca', color: '#eee' }}>I'm a new user.</Text>
                    <TouchableOpacity onPress={() => navigate('Signup')}>
                        <Text style={{ fontFamily: 'poppins', fontSize: 13, lineHeight: 25, color: '#fff' }}> Sign up</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.isVisible}
                    onRequestClose={() => { console.log("Modal has been closed.") }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.modal}>
                            <Image
                                source={require('../assets/images/cross.png')}
                                style={{ height: 100, width: 100 }}
                            ></Image>
                            <Text>Modal is open!</Text>
                            <Button title="Click To Close Modal"
                                onPress={() => { this.setState({ isVisible: !this.state.isVisible }) }} />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 40,
        backgroundColor: '#fff'
    },
    header: {
        marginBottom: 20,
    },
    font: {
        fontFamily: 'lexendDeca',
        fontSize: 28
    },
    textinput: {
        width: 300,
        fontSize: 14,
        fontFamily: 'poppins',
        color: '#000000',
        backgroundColor: '#eee',
        padding: 5
    },
    button: {
        backgroundColor: '#121212',
        borderRadius: 5,
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
    },
    buttontext: {
        fontSize: 14,
        fontFamily: 'poppins',
        color: '#fff'
    },
    backgroundImage: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: -2,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    alternate: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: '10%',
        alignSelf: 'center',
        padding: 10,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 250,
        width: 350,
        backgroundColor: '#f1f3f6',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'pink'
    }
})
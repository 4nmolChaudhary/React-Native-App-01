import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';

export default class SignupScreen extends React.Component {

    state = {
        fullName: '',
        email: '',
        password: ''
    }

    _storeData = async () => {
        try {
            await AsyncStorage.setItem('fullName', this.state.fullName);
            await AsyncStorage.setItem('email', this.state.email);
            await AsyncStorage.setItem('password', this.state.password);
            this.props.navigation.navigate('Login');
        } catch (error) {
            // Error saving data
        }
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/background4.png')}
                    style={styles.backgroundImage}
                ></Image>
                <View style={styles.header}>
                    <Text style={styles.font}>
                        Create
                    <Text style={{ fontFamily: 'poppins' }}> Account,</Text>
                    </Text>
                    <Text style={{ fontFamily: 'lexendDeca' }}>Sign up to get started ! </Text>
                </View>
                <View >
                    <View style={{ marginBottom: 10 }}>
                        <TextInput style={styles.textinput} title='name' placeholder='Full Name'
                            placeholderTextColor='#757575' value={this.state.fullName}
                            onChangeText={fullName => this.setState({ fullName })}></TextInput>
                        <Icon name="user" size={20} color="#757575"
                            style={{ position: 'absolute', top: 10, right: 10 }} />
                    </View>
                    <View style={{ flexDirection: 'row', width: 300, marginBottom: 10 }}>
                        <TextInput style={styles.textinput} title='Email' placeholder='Email'
                            placeholderTextColor='#757575' autoCapitalize='none'
                            value={this.state.email} onChangeText={email => this.setState({ email })}
                        ></TextInput>
                        <Icon name="envelope" size={15} color="#757575"
                            style={{ position: 'absolute', top: 10, right: 10 }} />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput style={styles.textinput} title='password' placeholder='Password' secureTextEntry={true}
                            placeholderTextColor='#757575' autoCapitalize='none'
                            value={this.state.password} onChangeText={password => this.setState({ password })}
                        ></TextInput>
                        <Icon name="lock" size={20} color="#757575"
                            style={{ position: 'absolute', top: 10, right: 10 }} />
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={this._storeData}>
                        <Text style={styles.buttontext}>Sign up  </Text>
                        <Icon name="arrow-circle-right" size={15} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.alternate}>
                    <Text style={{ fontFamily: 'lexendDeca', color: '#757575' }}>I'm already a member.</Text>
                    <TouchableOpacity onPress={() => navigate('Login')}>
                        <Text style={{ fontFamily: 'poppins', fontSize: 13, lineHeight: 25 }}> Sign in</Text>
                    </TouchableOpacity>
                </View>
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
    },
    header: {
        marginBottom: 20
    },
    font: {
        fontFamily: 'lexendDeca',
        fontSize: 28
    },
    textinput: {
        width: '100%',
        fontSize: 14,
        fontFamily: 'poppins',
        color: '#000000',
        backgroundColor: '#eee',
        padding: 5
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 5,
        textAlign: 'center',
        justifyContent: 'center',
        padding: 10,
        color: '#fff',
        flexDirection: 'row',
        marginTop: 5,
        shadowColor: 'rgba(0,0,0,0.7)',
        shadowOffset: { height: 4, width: 4 },
        shadowOpacity: 1, // IOS
        shadowRadius: 1,
        elevation: 4
    },
    buttontext: {
        fontSize: 14,
        fontFamily: 'poppins',
        color: '#fff'
    },
    backgroundImage: {
        position: 'absolute',
        width: Dimensions.get('window').width + 25,
        height: Dimensions.get('window').height + 35,
    },
    alternate: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: '10%',
        alignSelf: 'center',
        padding: 10,
    }
})
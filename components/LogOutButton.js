import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class LogOutButton extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                    <Text>Log Out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

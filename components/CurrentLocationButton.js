import React from 'react'
import { StyleSheet, View, Text, SafeAreaView, AsyncStorage, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default CurrentLocationButton = props => (
    <View style={styles.container}>
        <MaterialIcons
            name='my-location'
            color='#000'
            size={26}
            style={styles.button}

        />
    </View>

)
const styles = StyleSheet.create({
    container: {
        zIndex: 50,
        position: 'absolute',
        bottom: '30%',
        right: '5%'

    },
    button: {
        backgroundColor: '#f7567c',
        width: 36,
        height: 36,
        borderRadius: 18,
        padding: 5
    }
})
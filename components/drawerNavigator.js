import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from '../screens/HomeScreen';
import SideBar from './SideBar';
import { Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { Dimensions, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import LogOutButton from './LogOutButton';

const navigationOptions = { headerShown: false }

const drawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
    },
},
    {
        initialRouteName: 'Home',
        contentComponent: props => <SideBar {...props} />,
        drawerWidth: Dimensions.get('window').width * 0.8,
        drawerBackgroundColor: '#27292C',
    })

export default drawerNavigator;
import React from 'react'
import { Text, View, Dimensions, Button } from 'react-native'

import SlidingUpPanel from 'rn-sliding-up-panel'

const { height } = Dimensions.get('window')

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'center'
    },
    panel: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative'
    },
    panelHeader: {
        height: 120,
        backgroundColor: '#b197fc',
        alignItems: 'center',
        justifyContent: 'center'
    },
    favoriteIcon: {
        position: 'absolute',
        top: -24,
        right: 24,
        backgroundColor: '#2b8a3e',
        width: 48,
        height: 48,
        padding: 8,
        borderRadius: 24,
        zIndex: 1
    }
}

class BottomSheet extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Hello world</Text>
                <Button title='Show main' onPress={() => this._panel.show()} />
                <SlidingUpPanel
                    ref={c => (this._panel = c)}
                    draggableRange={{ top: height / 1.75, bottom: 0 }}
                    animatedValue={this._draggedValue}
                    showBackdrop={false}>
                    <View style={{ backgroundColor: '#121212', height: '100%' }}>
                        <Text>Hello world</Text>
                        <Button title='Show inner' onPress={() => this._panel.show()} />
                        <SlidingUpPanel
                            ref={c => (this._panel = c)}
                            draggableRange={{ top: height, bottom: 0 }}
                            animatedValue={this._draggedValue}
                            showBackdrop={false}>
                            <View style={{ backgroundColor: '#fff', height: '100%' }}>
                                <Text style={{ color: '#000' }}>Bottom Sheet Content</Text>
                                <Button title='Hide' onPress={() => this._panel.hide()} />
                            </View>
                        </SlidingUpPanel>
                    </View>
                </SlidingUpPanel>
            </View>
        )
    }
}

export default BottomSheet
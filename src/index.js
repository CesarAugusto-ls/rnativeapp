import React from 'react';
import {SafeAreaView, StyleSheet, Text, StatusBar} from 'react-native';

import './config/ReactotronConfig ';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

const App = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Text style={styles.welcome}>Welcome</Text>
            </SafeAreaView>
        </>
    );
};

export default App;

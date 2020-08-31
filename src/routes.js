import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Main from './pages/Main'
import User from './pages/User'


const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: '#7159c1',
                    },
                    headerTintColor: '#FFF',
                    headerTitleAlign: "center"
                }}
            >
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="User" component={User} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;

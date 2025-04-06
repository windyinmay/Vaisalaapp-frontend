import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import AppOverviewScreen from '../screens/AppOverviewScreen';
import LoginScreen from '../screens/LoginScreen';
import NfcInfoScreen from '../screens/NfcInfoScreen';
import ScanScreen from '../screens/ScanScreen';
import ConnectedScreen from '../screens/ConnectedScreen';
import ConfigurationScreen from '../screens/ConfigurationScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Welcome' component={WelcomeScreen} />
			<Stack.Screen name='Overview' component={AppOverviewScreen} />
			<Stack.Screen name='Login' component={LoginScreen} />
			<Stack.Screen name='NFCInfo' component={NfcInfoScreen} />
			<Stack.Screen name='Scan' component={ScanScreen} />
			<Stack.Screen name='Connected' component={ConnectedScreen} />
			<Stack.Screen name='Config' component={ConfigurationScreen} />
		</Stack.Navigator>
	);
}

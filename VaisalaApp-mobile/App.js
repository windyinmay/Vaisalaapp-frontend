import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { FlowProvider } from './context/FlowContext';

export default function App() {
	return (
		<FlowProvider>
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
		</FlowProvider>
	);
}

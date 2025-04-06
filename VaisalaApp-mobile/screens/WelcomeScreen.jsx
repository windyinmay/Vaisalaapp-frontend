import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFlow } from '../context/FlowContext';

export default function WelcomeScreen() {
	const navigation = useNavigation();
	const { setFlow } = useFlow();

	return (
		<View style={styles.container}>
			<Image
				source={require('../assets/images/logo_small.png')}
				style={styles.logo}
			/>
			<Text style={styles.title}>Welcome</Text>

			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					setFlow('setup');
					navigation.navigate('Overview');
				}}
			>
				<Text>Set up new sensor</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					setFlow('calibration');
					navigation.navigate('Overview');
				}}
			>
				<Text>Calibrate existing sensor</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate('Login')}
			>
				<Text>Instructions</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: { height: 28, resizeMode: 'contain' },
	title: { fontSize: 32, marginBottom: 20 },
	button: {
		padding: 12,
		marginVertical: 8,
		backgroundColor: '#ddd',
		borderRadius: 6,
		width: '80%',
		alignItems: 'center',
	},
});

import React, { createContext, useState, useContext } from 'react';

const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
	const [flow, setFlow] = useState('setup');

	return (
		<FlowContext.Provider value={{ flow, setFlow }}>
			{children}
		</FlowContext.Provider>
	);
};

export const useFlow = () => useContext(FlowContext);

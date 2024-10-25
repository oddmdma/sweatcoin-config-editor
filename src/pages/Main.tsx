import React from 'react';
import {Link} from 'react-router-dom';
import {BASE_URL} from "../constants";
import {Box, Container, Heading, Section} from "@radix-ui/themes";

export const MainPage: React.FC = () => {
	return (
		<Container px="8" size="3" width="100%">
			<Section size="1">
				<Heading as="h1" mb="7">Main Page</Heading>
				<Box><Link to={`${BASE_URL}/boost-burst`}>Boost Burst</Link></Box>
				<Box><Link to={`${BASE_URL}/branded-boost`}>Branded Boost</Link></Box>
			</Section>
		</Container>
	);
};
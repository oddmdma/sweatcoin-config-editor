import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Container, Heading, Section} from "@radix-ui/themes";

export const MainPage: React.FC = () => {
	return (
		<Container px="8" size="3" width="100%">
			<Section size="1">
				<Heading as="h1" mb="7">Main Page</Heading>
				<Box><Link to="/boost-burst">Boost Burst</Link></Box>
				<Box><Link to="/branded-boost">Branded Boost</Link></Box>
			</Section>
		</Container>
	);
};

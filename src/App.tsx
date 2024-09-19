import React, {useState} from 'react';
import {Button, Checkbox, Container, Flex, Heading, Section, Text, TextField} from '@radix-ui/themes';

import {ClipboardCopyIcon} from '@radix-ui/react-icons'

function App() {
	const [formData, setFormData] = useState({
		started_at: 1726617600,
		finish_at: 1726876800,
		total: 3,
		useDummyData: false,
		push_notification_showing_hours: 15,
		push_notification_showing_minutes: 0,
		use_push_notification: true,
	});
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value, type, checked} = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};
	
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData);
	};
	
	return (
		<Container px="8" size="3">
			<Section size="3">
				<Flex direction="column" gap="2">
					
					<Heading as="h1" mb="7">Boost Burst Config:</Heading>
					<form onSubmit={handleSubmit}>
						<Flex gap="1" direction="column" mb="5">
							<Text size="2">Started At:</Text>
							<TextField.Root type="datetime-local">
								<TextField.Slot/>
							</TextField.Root>
						</Flex>
						
						<Flex gap="1" direction="column" mb="5">
							<Text size="2">Finish At:</Text>
							<TextField.Root type="datetime-local">
								<TextField.Slot/>
							</TextField.Root>
						</Flex>
						
						<Flex gap="1" direction="column" mb="5">
							<Text size="2">Streak length:</Text>
							<TextField.Root type="number">
								<TextField.Slot/>
							</TextField.Root>
						</Flex>
						
						<Flex gap="1" direction="column" mb="5">
							<Text as="label" size="2">
								<Flex gap="2">
									<Checkbox defaultChecked={false}/>
									Use Dummy Data
								</Flex>
							</Text>
						</Flex>
						
						<Flex gap="1" direction="column" mb="5">
							<Text size="2">Push Notification Showing Time:</Text>
							<TextField.Root type="time">
								<TextField.Slot/>
							</TextField.Root>
						</Flex>
						
						
						<Button type="submit" my="5">
							<ClipboardCopyIcon/>
							Copy to Clipboard
						</Button>
					</form>
				</Flex>
			</Section>
		</Container>
	);
}

export default App;

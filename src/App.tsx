import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Container, Flex, Heading, Section, Text, TextField} from '@radix-ui/themes';
import {ClipboardCopyIcon} from '@radix-ui/react-icons';

function App() {
	const [formData, setFormData] = useState({
		started_at: "2024-09-10T00:00",  // Use string in ISO 8601 format for datetime-local
		finish_at: "2024-09-13T00:00",
		total: 3,
		useDummyData: false,
		push_notification_showing_hours: "15:00",  // Use string "HH:MM" for time field
		use_push_notification: true,
	});
	
	// Load data from local storage
	useEffect(() => {
		const savedData = localStorage.getItem('formData');
		if (savedData) {
			setFormData(JSON.parse(savedData));
		}
	}, []);
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value, type, checked} = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),  // Converting numeric values
		});
	};
	
	
	const handleCopyToClipboard = () => {
		const dataToCopy = JSON.stringify(formData, null, 2);
		localStorage.setItem('formData', JSON.stringify(formData));
		navigator.clipboard.writeText(dataToCopy).then(() => {
			alert('Data copied to clipboard!');
		}).catch(err => {
			console.error('Failed to copy data: ', err);
		});
	};
	
	return (
		<Container px="8" size="3" width="100%">
			<Section size="3">
				<Flex direction="column" gap="2">
					<Heading as="h1" mb="7">Boost Burst Config:</Heading>
					<form onSubmit={e => e.preventDefault()}>
						<Flex gap="1" direction="column" mb="5">
							<Text size="2">Started At:</Text>
							<TextField.Root type="datetime-local" name="started_at" value={formData.started_at}
															onChange={handleChange}>
								<TextField.Slot/>
							</TextField.Root>
						</Flex>
						
						<Flex gap="1" direction="column" mb="5">
							<Text size="2">Finish At:</Text>
							<TextField.Root type="datetime-local" name="finish_at" value={formData.finish_at} onChange={handleChange}>
								<TextField.Slot/>
							</TextField.Root>
						</Flex>
						
						<Flex gap="1" direction="column" mb="5">
							<Text size="2">Streak length:</Text>
							<TextField.Root type="number" name="total" value={formData.total} onChange={handleChange}>
								<TextField.Slot/>
							</TextField.Root>
						</Flex>
						
						<Flex gap="1" direction="column" mb="5">
							<Text as="label" size="2">
								<Flex gap="2">
									<Checkbox name="useDummyData" checked={formData.useDummyData} onChange={handleChange}/>
									Use Dummy Data
								</Flex>
							</Text>
						</Flex>
						
						<Flex gap="1" direction="column" mb="5">
							<Text size="2">Push Notification Showing Time:</Text>
							<TextField.Root type="time" name="push_notification_showing_hours"
															value={formData.push_notification_showing_hours} onChange={handleChange}>
								<TextField.Slot/>
							</TextField.Root>
						</Flex>
						
						<Button type="button" my="5" onClick={handleCopyToClipboard}>
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

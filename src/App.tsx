import {ChangeEvent, useEffect, useState} from 'react';
import {Button, Container, Flex, Heading, Section, Text,} from '@radix-ui/themes';
import {ClipboardCopyIcon} from '@radix-ui/react-icons';
import {Checkbox} from "./components/Checkbox";
import {TextField} from "./components/TextField";
import {mapFormData} from "./utils";

const INITIAL_FORM_DATA = {
	started_at: "2024-09-10T00:00",
	finish_at: "2024-09-13T00:00",
	total: 3,
	useDummyData: false,
	push_notification_showing_hours: "15:00",
	use_push_notification: true,
	auction_id: null,
};

const App = () => {
	const [formData, setFormData] = useState(INITIAL_FORM_DATA);
	
	useEffect(() => {
		const savedData = localStorage.getItem('formData');
		if (savedData) {
			setFormData(JSON.parse(savedData));
		}
	}, []);
	
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {name, value, type, checked} = e.target;
		setFormData(prevFormData => ({
			...prevFormData,
			[name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
		}));
	};
	
	const handleCopyToClipboard = () => {
		const dataToCopy = JSON.stringify(formData, null, 2);
		localStorage.setItem('formData', JSON.stringify(formData));
		console.log(mapFormData(formData));
		navigator.clipboard.writeText(dataToCopy)
			.then(() => alert('Data copied to clipboard!'))
			.catch(err => console.error('Failed to copy data: ', err));
	};
	
	return (
		<Container px="8" size="3" width="100%">
			<Section size="1">
				<Flex direction="column" gap="2">
					<Heading as="h1" mb="7">Boost Burst Config:</Heading>
					<form onSubmit={e => e.preventDefault()}>
						<TextField
							label="Started At:"
							type="datetime-local"
							name="started_at"
							value={formData.started_at}
							onChange={handleChange}
						/>
						<TextField
							label="Finish At:"
							type="datetime-local"
							name="finish_at"
							value={formData.finish_at}
							onChange={handleChange}
						/>
						<TextField
							label="Streak length:"
							type="number"
							name="total"
							value={formData.total}
							onChange={handleChange}
						/>
						<Checkbox
							label="Use Dummy Data"
							name="useDummyData"
							checked={formData.useDummyData}
							onChange={handleChange}
						/>
						<TextField
							label="Push Notification Showing Time:"
							type="time"
							name="push_notification_showing_hours"
							value={formData.push_notification_showing_hours}
							onChange={handleChange}
						/>
						<TextField
							label="Auction id:"
							type="number"
							name="auction_id"
							value={formData.auction_id || ''}
							onChange={handleChange}
						/>
						
						<Button type="button" my="3" onClick={handleCopyToClipboard}>
							<ClipboardCopyIcon/>
							Copy to Clipboard
						</Button>
					</form>
				</Flex>
			</Section>
			<Section size="1">
				<Heading as="h3" mb="3" size="3">Mapped Data:</Heading>
				<Text size="1">
					<pre>{JSON.stringify(mapFormData(formData), null, 2)}</pre>
				</Text>
			</Section>
		</Container>
	);
};


export default App;

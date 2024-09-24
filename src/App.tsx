import {ChangeEvent, useEffect, useState} from 'react';
import {Button, Container, Flex, Heading, Section,} from '@radix-ui/themes';
import {ClipboardCopyIcon} from '@radix-ui/react-icons';
import {Checkbox} from "./components/Checkbox";
import {TextField} from "./components/TextField";

const INITIAL_FORM_DATA = {
	started_at: "2024-09-10T00:00",
	finish_at: "2024-09-13T00:00",
	total: 3,
	useDummyData: false,
	push_notification_showing_hours: "15:00",
	use_push_notification: true,
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
		console.log({name, value, type, checked});
		setFormData(prevFormData => ({
			...prevFormData,
			[name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
		}));
	};
	
	const handleCopyToClipboard = () => {
		const dataToCopy = JSON.stringify(formData, null, 2);
		localStorage.setItem('formData', JSON.stringify(formData));
		navigator.clipboard.writeText(dataToCopy)
			.then(() => alert('Data copied to clipboard!'))
			.catch(err => console.error('Failed to copy data: ', err));
	};
	
	return (
		<Container px="8" size="3" width="100%">
			<Section size="3">
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
						
						<Button type="button" my="5" onClick={handleCopyToClipboard}>
							<ClipboardCopyIcon/>
							Copy to Clipboard
						</Button>
					</form>
				</Flex>
			</Section>
		</Container>
	);
};


export default App;

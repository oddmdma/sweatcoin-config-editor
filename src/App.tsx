import {ChangeEvent, useEffect, useState} from 'react';
import {
	Button,
	Checkbox as RadixCheckbox,
	Container,
	Flex,
	Heading,
	Section,
	Text,
	TextField as RadixTextField
} from '@radix-ui/themes';
import {ClipboardCopyIcon} from '@radix-ui/react-icons';

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
						<TextField label="Started At:" type="datetime-local" name="started_at" value={formData.started_at}
											 onChange={handleChange}/>
						<TextField label="Finish At:" type="datetime-local" name="finish_at" value={formData.finish_at}
											 onChange={handleChange}/>
						<TextField label="Streak length:" type="number" name="total" value={formData.total}
											 onChange={handleChange}/>
						<Checkbox label="Use Dummy Data" name="useDummyData" checked={formData.useDummyData}
											onChange={handleChange}/>
						<TextField label="Push Notification Showing Time:" type="time" name="push_notification_showing_hours"
											 value={formData.push_notification_showing_hours} onChange={handleChange}/>
						
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

type TextFieldProps = {
	label: string;
	type: 'number' | 'search' | 'time' | 'text' | 'hidden' | 'tel' | 'url' | 'email' | 'date' | 'datetime-local' | 'month' | 'password' | 'week';
	name: string;
	value: string | number;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TextField = ({label, type, name, value, onChange}: TextFieldProps) => (
	<Flex gap="1" direction="column" mb="5">
		<Text size="2">{label}</Text>
		<RadixTextField.Root type={type} name={name} value={value} onChange={onChange}>
			<RadixTextField.Slot/>
		</RadixTextField.Root>
	</Flex>
);

type CheckboxProps = {
	label: string;
	name: string;
	checked: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({label, name, checked, onChange}: CheckboxProps) => (
	<Flex gap="1" direction="column" mb="5">
		<Text as="label" size="2">
			<Flex gap="2">
				<RadixCheckbox
					name={name}
					checked={checked}
					onCheckedChange={(checked) => onChange({
						target: {
							name,
							type: 'checkbox',
							checked,
							value: checked ? 'true' : 'false'
						}
					} as ChangeEvent<HTMLInputElement>)}
				/>
				{label}
			</Flex>
		</Text>
	</Flex>
);

export default App;

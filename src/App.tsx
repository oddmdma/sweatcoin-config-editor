import {ChangeEvent, useEffect, useState} from 'react';
import {Button, Container, Flex, Heading, Section, Text,} from '@radix-ui/themes';
import {ClipboardCopyIcon} from '@radix-ui/react-icons';
import {Checkbox} from "./components/Checkbox";
import {TextField} from "./components/TextField";
import {mapFormData} from "./utils";
import {ExerciseModel, FormData} from "./types";

const INITIAL_FORM_DATA: FormData = {
	started_at: "2024-09-10T00:00",
	finish_at: "2024-09-13T00:00",
	total: 3,
	useDummyData: false,
	push_notification_showing_hours: "15:00",
	use_push_notification: true,
	auction_id: null,
	dummyData: {exercises: []}
};

const getRandomAmount = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};


const App = () => {
	const [formData, setFormData] = useState(INITIAL_FORM_DATA);
	const [newExercise, setNewExercise] = useState(getInitialExercise());
	const [showAdditionalFields, setShowAdditionalFields] = useState(false);
	
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
	
	const handleExerciseChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {name, value, type} = e.target;
		setNewExercise(prevExercise => ({
			...prevExercise,
			[name]: type === 'number' ? Number(value) : value,
		}));
	};
	
	const handleAddExercise = () => {
		const exerciseWithTimestamps = {
			...newExercise,
			started_at: new Date(newExercise.started_at).getTime() / 1000,
			finished_at: new Date(newExercise.finished_at).getTime() / 1000,
		};
		
		setFormData(prevFormData => ({
			...prevFormData,
			dummyData: {
				...prevFormData.dummyData,
				exercises: [...(prevFormData.dummyData?.exercises || []), exerciseWithTimestamps],
			},
		}));
		setNewExercise(getInitialExercise());
	};
	
	const handleDeleteExercise = (id: number) => {
		setFormData(prevFormData => ({
			...prevFormData,
			dummyData: {
				...prevFormData.dummyData,
				exercises: prevFormData.dummyData?.exercises.filter(exercise => exercise.id !== id) || [],
			},
		}));
	};
	
	const handleCopyToClipboard = () => {
		const dataToCopy = JSON.stringify(formData, null, 2);
		saveToLocalStorage();
		navigator.clipboard.writeText(dataToCopy)
			.then(() => alert('Data copied to clipboard!'))
			.catch(err => console.error('Failed to copy data: ', err));
	};
	
	const saveToLocalStorage = () => {
		localStorage.setItem('formData', JSON.stringify(formData));
	}
	
	
	return (
		<Container px="8" size="3" width="100%">
			<Section size="1">
				<Heading as="h1" mb="7">Boost Burst Config:</Heading>
				<Flex gap="5">
					<Section size="1">
						<Flex direction="column" gap="9">
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
					
					
					{formData.useDummyData && (
						<Section size="1">
							<Heading as="h3" mb="3" size="3">Add Dummy Exercise:</Heading>
							<form onSubmit={e => e.preventDefault()}>
								<Button
									type="button"
									onClick={() => setShowAdditionalFields(!showAdditionalFields)}
									mb="3"
									variant="outline"
									size="1"
								>
									{showAdditionalFields ? 'Hide Additional Fields' : 'Show Additional Fields'}
								</Button>
								<TextField
									label="Started At:"
									type="datetime-local"
									name="started_at"
									value={newExercise.started_at}
									onChange={handleExerciseChange}
								/>
								<TextField
									label="Finished At:"
									type="datetime-local"
									name="finished_at"
									value={newExercise.finished_at}
									onChange={handleExerciseChange}
								/>
								<TextField
									label="Amount Earned:"
									type="number"
									name="amount_earned"
									value={newExercise.amount_earned}
									onChange={handleExerciseChange}
								/>
								{showAdditionalFields && <><TextField
                  label="Amount Earned Walk Chain:"
                  type="number"
                  name="amount_earned_walk_chain"
                  value={newExercise.amount_earned_walk_chain}
                  onChange={handleExerciseChange}
                />
                  <TextField
                    label="Approved Steps:"
                    type="number"
                    name="approved_steps"
                    value={newExercise.approved_steps}
                    onChange={handleExerciseChange}
                  />
                  <TextField
                    label="Duration:"
                    type="number"
                    name="duration"
                    value={newExercise.duration}
                    onChange={handleExerciseChange}
                  />
                  <TextField
                    label="Duration Approved:"
                    type="number"
                    name="duration_approved"
                    value={newExercise.duration_approved}
                    onChange={handleExerciseChange}
                  />
                  <TextField
                    label="Duration Planned:"
                    type="number"
                    name="duration_planned"
                    value={newExercise.duration_planned}
                    onChange={handleExerciseChange}
                  />

                  <TextField
                    label="Operation ID:"
                    type="number"
                    name="operation_id"
                    value={newExercise.operation_id}
                    onChange={handleExerciseChange}
                  />
                  <TextField
                    label="Total Steps:"
                    type="number"
                    name="total_steps"
                    value={newExercise.total_steps}
                    onChange={handleExerciseChange}
                  />
                  <TextField
                    label="Walk Chain ID:"
                    type="number"
                    name="walk_chain_id"
                    value={newExercise.walk_chain_id}
                    onChange={handleExerciseChange}
                  />
                  <TextField
                    label="Started Total Steps:"
                    type="number"
                    name="started_total_steps"
                    value={newExercise.started_total_steps}
                    onChange={handleExerciseChange}
                  />
                </>}
								<Flex gap="3" mb="7" mt="3">
									<Button type="button" onClick={handleAddExercise}>
										Add Exercise
									</Button>
								</Flex>
							</form>
							<Heading as="h3" my="3" size="3">Exercises:</Heading>
							{formData.dummyData?.exercises.map(exercise => (
								<Flex key={exercise.id} direction="row" gap="2" align="center" justify-content="space-between" mb="1">
									<Text size="1">ID: {exercise.id}</Text>
									<Button type="button" onClick={() => handleDeleteExercise(exercise.id)} style={{marginLeft: "auto"}}>
										Delete
									</Button>
								</Flex>
							))}
						</Section>
					)
					}
					<Section size="1">
						<Heading as="h3" mb="3" size="3">Mapped Data:</Heading>
						<Text size="1">
							<pre>{JSON.stringify(mapFormData(formData), null, 2)}</pre>
						</Text>
					</Section>
				
				</Flex>
			</Section>
		</Container>
	);
	
	
	function getInitialExercise(): ExerciseModel {
		return {
			amount_earned: getRandomAmount(10, 1000),
			amount_earned_walk_chain: getRandomAmount(10, 1000),
			approved_steps: getRandomAmount(10, 1000),
			duration: getRandomAmount(10, 1000),
			duration_approved: getRandomAmount(10, 1000),
			duration_planned: 1200,
			finished_at: 0,
			id: Date.now() + Math.floor(Math.random() * 1000),
			operation_id: getRandomAmount(10, 1000),
			started_at: 0,
			total_steps: getRandomAmount(10, 1000),
			walk_chain_id: getRandomAmount(1000000, 9000000),
			started_total_steps: getRandomAmount(10, 1000),
		};
	}
};

export default App;

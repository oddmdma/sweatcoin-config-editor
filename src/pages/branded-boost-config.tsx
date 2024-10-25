import {ChangeEvent, useEffect, useState} from 'react';
import {Button, Container, Flex, Heading, Section, Text} from '@radix-ui/themes';
import {TextField} from '../components/TextField';
import {BrandedBoostConfig} from '../types';
import {ClipboardCopyIcon} from "@radix-ui/react-icons";

const INITIAL_CONFIG: BrandedBoostConfig = {
	id: '',
	circleScreenLogoLink: '',
	boostScreenLogoLink: '',
	boostScreenLogoHeight: 0,
	todayBlockTitle: '',
	todayBlockLogoHeight: 0,
	boostScreenTitle: '',
	contentTitle: '',
	contentDescription: '',
	contentData: undefined,
	circleScreenAnimationDelayMs: 0,
	campaignStartDate: 0,
	campaignEndDate: 0,
};

const LOCAL_STORAGE_KEY = 'brandedBoost';

export const BrandedBoostConfigEditor = () => {
	const [config, setConfig] = useState<BrandedBoostConfig>(INITIAL_CONFIG);
	
	useEffect(() => {
		const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (savedData) {
			setConfig(JSON.parse(savedData));
		}
	}, []);
	
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {name, value, type, checked} = e.target;
		setConfig(prevConfig => ({
			...prevConfig,
			[name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
		}));
	};
	
	const handleCopyToClipboard = () => {
		const dataToCopy = JSON.stringify(mapBrandedBoostConfig(config), null, 2);
		saveToLocalStorage();
		navigator.clipboard.writeText(dataToCopy)
			.then(() => alert('Data copied to clipboard!'))
			.catch(err => console.error('Failed to copy data: ', err));
	};
	
	const saveToLocalStorage = () => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
	}
	
	return (
		<Container px="8" size="3" width="100%">
			<Section size="1">
				<Heading as="h1" mb="7">Branded Boost Config Editor</Heading>
				<Flex gap="5">
					<Section size="1">
						<Flex direction="column" gap="9">
							<form onSubmit={e => e.preventDefault()}>
								
								<TextField
									label="Id:"
									type="text"
									name="id"
									value={config.id || ''}
									onChange={handleChange}
								/>
								<TextField
									label="Boost Screen Logo Link:"
									type="text"
									name="boostScreenLogoLink"
									value={config.boostScreenLogoLink || ''}
									onChange={handleChange}
								/>
								<TextField
									label="Boost Screen Logo Height:"
									type="number"
									name="boostScreenLogoHeight"
									value={config.boostScreenLogoHeight ?? 0}
									onChange={handleChange}
								/>
								<TextField
									label="Today Block Title:"
									type="text"
									name="todayBlockTitle"
									value={config.todayBlockTitle || ''}
									onChange={handleChange}
								/>
								<TextField
									label="Today Block Logo Height:"
									type="number"
									name="todayBlockLogoHeight"
									value={config.todayBlockLogoHeight ?? 0}
									onChange={handleChange}
								/>
								<TextField
									label="Boost Screen Title:"
									type="text"
									name="boostScreenTitle"
									value={config.boostScreenTitle || ''}
									onChange={handleChange}
								/>
								<TextField
									label="Content Title:"
									type="text"
									name="contentTitle"
									value={config.contentTitle || ''}
									onChange={handleChange}
								/>
								<TextField
									label="Content Description:"
									type="text"
									name="contentDescription"
									value={config.contentDescription || ''}
									onChange={handleChange}
								/>
								<TextField
									label="Circle Screen Animation Delay (ms):"
									type="number"
									name="circleScreenAnimationDelayMs"
									value={config.circleScreenAnimationDelayMs ?? 0}
									onChange={handleChange}
								/>
								<TextField
									label="Campaign Start Date:"
									type="datetime-local"
									name="campaignStartDate"
									value={config.campaignStartDate ? new Date(config.campaignStartDate).toISOString().slice(0, -1) : ''}
									onChange={handleChange}
								/>
								<TextField
									label="Campaign End Date:"
									type="datetime-local"
									name="campaignEndDate"
									value={config.campaignEndDate ? new Date(config.campaignEndDate).toISOString().slice(0, -1) : ''}
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
							<pre>{JSON.stringify(mapBrandedBoostConfig(config), null, 2)}</pre>
						</Text>
					</Section>
				</Flex>
			</Section>
		</Container>
	);
	
	function mapBrandedBoostConfig(config: BrandedBoostConfig) {
		return {
			id: config.id || '',
			circleScreenLogoLink: config.circleScreenLogoLink,
			boostScreenLogoLink: config.boostScreenLogoLink,
			boostScreenLogoHeight: config.boostScreenLogoHeight ?? 0,
			todayBlockTitle: config.todayBlockTitle || '',
			todayBlockLogoHeight: config.todayBlockLogoHeight ?? 0,
			boostScreenTitle: config.boostScreenTitle || '',
			contentTitle: config.contentTitle || '',
			contentDescription: config.contentDescription || '',
			contentData: config.contentData || null,
			circleScreenAnimationDelayMs: config.circleScreenAnimationDelayMs ?? 0,
			campaignStartDate: config.campaignStartDate ? new Date(config.campaignStartDate).getTime() / 1000 : null,
			campaignEndDate: config.campaignEndDate ? new Date(config.campaignEndDate).getTime() / 1000 : null,
		};
	}
};

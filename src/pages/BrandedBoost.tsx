import {ChangeEvent, useEffect, useState} from 'react';
import {Box, Button, Container, Flex, Heading, Section, Text} from '@radix-ui/themes';
import {TextField} from '../components/TextField';
import {BrandedBoostConfig, LearningData} from '../types';
import {ClipboardCopyIcon} from "@radix-ui/react-icons";
import {Checkbox} from "../components/Checkbox";
import {JSONBeautifier} from "../components/JSONBeautifier";

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
	campaignStartDate: "2024-09-10T00:00",
	campaignEndDate: "2024-09-13T00:00",
};

const INITIAL_LEARNING_DATA: LearningData = {
	featured: {image: '', title: '', url: ''},
	sections: []
};

const LOCAL_STORAGE_KEY = 'brandedBoost';

export const BrandedBoost = () => {
	const [config, setConfig] = useState<BrandedBoostConfig>(INITIAL_CONFIG);
	const [learningData, setLearningData] = useState<LearningData>(INITIAL_LEARNING_DATA);
	
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
	
	const handleLearningDataChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setLearningData(prevData => ({
			...prevData,
			featured: {
				...prevData.featured,
				[name]: value
			}
		}));
	};
	
	const handleAddSection = () => {
		setLearningData(prevData => ({
			...prevData,
			sections: [...prevData.sections, {title: '', articles: []}]
		}));
	};
	
	const handleRemoveSection = (index: number) => {
		setLearningData(prevData => {
			const sections = [...prevData.sections];
			sections.splice(index, 1);
			return {...prevData, sections};
		});
	};
	
	const handleSectionChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setLearningData(prevData => {
			const sections = [...prevData.sections];
			sections[index] = {...sections[index], [name]: value};
			return {...prevData, sections};
		});
	};
	
	const handleAddArticle = (sectionIndex: number) => {
		setLearningData(prevData => {
			const sections = [...prevData.sections];
			sections[sectionIndex].articles.push({image: '', title: '', url: ''});
			return {...prevData, sections};
		});
	};
	
	const handleRemoveArticle = (sectionIndex: number, articleIndex: number) => {
		setLearningData(prevData => {
			const sections = [...prevData.sections];
			sections[sectionIndex].articles.splice(articleIndex, 1);
			return {...prevData, sections};
		});
	};
	
	const handleArticleChange = (sectionIndex: number, articleIndex: number, e: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setLearningData(prevData => {
			const sections = [...prevData.sections];
			sections[sectionIndex].articles[articleIndex] = {...sections[sectionIndex].articles[articleIndex], [name]: value};
			return {...prevData, sections};
		});
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
		<Container px="8" size="4">
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
									value={config.campaignStartDate || ''}
									onChange={handleChange}
								/>
								<TextField
									label="Campaign End Date:"
									type="datetime-local"
									name="campaignEndDate"
									value={config.campaignEndDate || ''}
									onChange={handleChange}
								/>
								<Checkbox
									label="Content Data"
									name="contentData"
									checked={!!config.contentData}
									onChange={(e) => setConfig(prevConfig => ({
										...prevConfig,
										contentData: e.target.checked ? INITIAL_LEARNING_DATA : undefined
									}))}
								/>
								<Box>
									{config.contentData && (
										<>
											<Heading as="h3" mb="3" size="3">Featured Item:</Heading>
											<TextField
												label="Featured Image Link:"
												type="text"
												name="image"
												value={learningData.featured.image}
												onChange={handleLearningDataChange}
											/>
											<TextField
												label="Featured Title:"
												type="text"
												name="title"
												value={learningData.featured.title}
												onChange={handleLearningDataChange}
											/>
											<TextField
												label="Featured URL:"
												type="text"
												name="url"
												value={learningData.featured.url}
												onChange={handleLearningDataChange}
											/>
											<Heading as="h3" mb="3" size="3">Sections:</Heading>
											{learningData.sections.map((section, sectionIndex) => (
												<div key={sectionIndex}>
													<TextField
														label="Section Title:"
														type="text"
														name="title"
														value={section.title}
														onChange={(e) => handleSectionChange(sectionIndex, e)}
													/>
													<Flex gap="2" my={"4"}>
														<Button type="button" onClick={() => handleAddArticle(sectionIndex)} variant={"outline"}>
															Add Article
														</Button>
														<Button type="button" onClick={() => handleRemoveSection(sectionIndex)} variant={"outline"}>
															Remove Section
														</Button>
													</Flex>
													{section.articles.map((article, articleIndex) => (
														<div key={articleIndex}>
															<TextField
																label="Article Image Link:"
																type="text"
																name="image"
																value={article.image}
																onChange={(e) => handleArticleChange(sectionIndex, articleIndex, e)}
															/>
															<TextField
																label="Article Title:"
																type="text"
																name="title"
																value={article.title}
																onChange={(e) => handleArticleChange(sectionIndex, articleIndex, e)}
															/>
															<TextField
																label="Article URL:"
																type="text"
																name="url"
																value={article.url}
																onChange={(e) => handleArticleChange(sectionIndex, articleIndex, e)}
															/>
															<Button type="button" onClick={() => handleRemoveArticle(sectionIndex, articleIndex)}
																			variant={"outline"} my={"2"}>
																Remove Article
															</Button>
														</div>
													))}
												</div>
											))}
											<Button type="button" onClick={handleAddSection} variant={"outline"} color={"green"}>
												Add Section
											</Button>
										</>
									)}
								</Box>
								<Button type="button" my="7" onClick={handleCopyToClipboard} color={"green"}>
									<ClipboardCopyIcon/>
									Copy to Clipboard
								</Button>
							</form>
						</Flex>
					</Section>
					
					<Section size="1">
						<Heading as="h3" mb="3" size="3">Mapped Data:</Heading>
						<Text size="1">
							<JSONBeautifier data={mapBrandedBoostConfig(config)}/>
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

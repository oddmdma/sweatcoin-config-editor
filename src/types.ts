export interface LearningArticle {
	image: string
	title: string
	url: string
	video?: boolean
}

interface LearningSection {
	title: string
	articles: LearningArticle[]
}

export interface LearningData {
	featured: LearningArticle
	sections: LearningSection[]
}

export interface BrandedBoostConfig {
	id?: string
	circleScreenLogoLink: string
	boostScreenLogoLink: string
	boostScreenLogoHeight?: number
	todayBlockTitle?: string
	todayBlockLogoHeight?: number
	boostScreenTitle?: string
	contentTitle?: string
	contentDescription?: string
	contentData?: LearningData
	circleScreenAnimationDelayMs?: number
	campaignStartDate?: number
	campaignEndDate?: number
}


export interface FormData {
	started_at: string;
	finish_at: string;
	total: number;
	push_notification_showing_hours: string;
	use_push_notification: boolean;
	useDummyData: boolean;
	auction_id: number | null;
	dummyData?: { exercises: ExerciseModel[] };
}

export interface ExerciseModel {
	amount_earned: number;
	amount_earned_walk_chain: number;
	approved_steps: number;
	duration: number;
	duration_approved: number;
	duration_planned: number;
	finished_at: number;
	id: number;
	operation_id: number;
	started_at: number;
	total_steps: number;
	walk_chain_id: number;
	started_total_steps: number;
}

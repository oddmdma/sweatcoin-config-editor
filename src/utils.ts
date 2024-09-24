import {FormData} from "./types";

export const mapFormData = (formData: FormData) => {
	const {
		started_at,
		finish_at,
		total,
		push_notification_showing_hours,
		use_push_notification,
		useDummyData,
		auction_id
	} = formData;
	const notificationTime = push_notification_showing_hours.split(':').map(Number);
	
	return {
		started_at: new Date(started_at).getTime() / 1000,
		finish_at: new Date(finish_at).getTime() / 1000,
		total,
		push_notification_showing_hours: notificationTime[0],
		push_notification_showing_minutes: notificationTime[1],
		use_push_notification,
		useDummyData,
		auction_id: auction_id || null,
	};
}



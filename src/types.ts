// {
//   "started_at": "2024-09-10T00:00",
//   "finish_at": "2024-09-13T00:00",
//   "total": 3,
//   "push_notification_showing_hours": "17:00",
//   "use_push_notification": true,
//   "useDummyData": false
// }


//export interface BoostBurstConfig {
//   started_at: number
//   finish_at: number
//   total: number
//   useDummyData?: boolean
//   use_push_notification?: boolean
//   push_notification_showing_hours?: number
//   push_notification_showing_minutes?: number
//   auction_id?: number
// }


export interface FormData {
	started_at: string;
	finish_at: string;
	total: number;
	push_notification_showing_hours: string;
	use_push_notification: boolean;
	useDummyData: boolean;
	auction_id: number | null;
}

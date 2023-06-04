export const DEFAULT_TIMER = 2000;

type NotificationTitle = "Success" | "Error";
type NotificationType = "success" | "error";

export interface Notification {
  id?: number;
  title?: NotificationTitle;
  message: string;
  type?: NotificationType;
  timer?: number;
}

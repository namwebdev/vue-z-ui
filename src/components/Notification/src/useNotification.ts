import { ref } from "vue";
import { DEFAULT_TIMER, Notification } from "./types";

const notifications = ref<Notification[]>([]);
const useNotification = () => {
  const notify = (props: Notification) => {
    const {
      title = "Success",
      message,
      type = "success",
      timer = DEFAULT_TIMER,
    } = props;
    const newNotify: Notification = {
      id: Math.floor(Math.random() * 200),
      type,
      title,
      message,
      timer,
    };
    notifications.value = [newNotify, ...notifications.value];
  };
  function clearOne(id: number) {
    notifications.value = notifications.value.filter(
      (notify) => notify.id !== id
    );
  }

  return { notifications, notify, clearOne };
};

export default useNotification;

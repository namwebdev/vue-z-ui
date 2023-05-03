export interface MessageBoxState {
  title: string;
  message: string;
  iconClass: IconClass;
  boxLoading: boolean;
  confirmButtonLoading: boolean;
  onConfirm: (state: MessageBoxState, done: () => void) => void;
}

export interface MessageBoxOptions {
  iconClass?: IconClass;
  onConfirm?: (state: MessageBoxState, done: () => void) => void;
}

export type IconClass = "fas fa-trash";
export type Action = "confirm" | "close";

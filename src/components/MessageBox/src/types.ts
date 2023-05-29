export interface MessageBoxState {
  title: string;
  message: string;
  iconClass: string;
  boxLoading: boolean;
  confirmButtonLoading: boolean;
  onConfirm: (state: MessageBoxState, done: () => void) => void;
}

export interface MessageBoxOptions {
  iconClass?: string;
  onConfirm?: (state: MessageBoxState, done: () => void) => void;
}

export type Action = "confirm" | "close";

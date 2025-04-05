import { IFile } from "@/types/file";

type ActionDropdownState = {
  isModalOpen: boolean;
  isDropdownOpen: boolean;
  action: ActionType | null;
  name: string;
  emails: string[];
};

export type ActionDropdownAction =
  | { type: "SET_MODAL_OPEN"; payload: boolean }
  | { type: "SET_DROPDOWN_OPEN"; payload: boolean }
  | { type: "SET_ACTION"; payload: ActionType | null }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAILS"; payload: string[] }
  | { type: "CANCEL_ACTION"; payload: ActionDropdownState };

export const getInitialState = (file: IFile): ActionDropdownState => ({
  isModalOpen: false,
  isDropdownOpen: false,
  action: null,
  name: file.name,
  emails: [],
});

// Patterns: Observer
export const actionDropdownReducer = (
  state: ActionDropdownState,
  action: ActionDropdownAction
): ActionDropdownState => {
  switch (action.type) {
    case "SET_MODAL_OPEN":
      return { ...state, isModalOpen: action.payload };
    case "SET_DROPDOWN_OPEN":
      return { ...state, isDropdownOpen: action.payload };
    case "SET_ACTION":
      return { ...state, action: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAILS":
      return { ...state, emails: action.payload };
    case "CANCEL_ACTION":
      return action.payload;
    default:
      return state;
  }
};

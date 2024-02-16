export interface IDialogHandle {
    isOpen: boolean;
    onDialogSubmit: () => void;
    onDialogCancel: () => void;
}
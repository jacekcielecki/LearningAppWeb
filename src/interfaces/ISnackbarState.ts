import { AlertColor } from "@mui/material/Alert/Alert";

interface ISnackbarState {
    visible: boolean;
    message: string;
    severity: AlertColor | undefined;
};

export default ISnackbarState;
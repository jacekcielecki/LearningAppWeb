import Button from '@mui/material/Button';
import { TextField } from "@mui/material";

export const CreateAccount = () => {
    return (
        <div>
            <h3>Create Account</h3>
            <Button variant="contained">Hello World</Button>
            <TextField id="outlined-basic" label="Email" variant="outlined" />
        </div>
    );
}
 
export default CreateAccount;
import { Counter } from "../Components/Counter";
import Heading from "../Components/Heading";
import { Section } from "../Components/Section";
import { List } from "../Components/List";
import { Snackbar } from '@mui/material';
import { useState } from "react";
import DenseTable from "../Components/Table";
import PermanentDrawerLeft from "../Components/NavBar"
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Test = () => {
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

    const handleCloseSnackbar = () => {
        setIsSnackbarOpen(false);
      };

    return (
        <>
            <Container maxWidth="xl">
                {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} /> */}
                <DenseTable />
            </Container>

            {/* <Heading title="This is param" />
            <Section>This is some children</Section>
            <Counter></Counter>
            <List items={["test1", "test2", "test3"]} render={(item: string) => (<span className="gold">{item}</span>)}></List>
            <button onClick={() => setIsSnackbarOpen(true)}>Show Snack</button>

            <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message="This is a Snackbar message"
            /> */}

        </>
    );
}
 
export default Test;
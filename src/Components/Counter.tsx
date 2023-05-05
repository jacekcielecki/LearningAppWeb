import { useState, useEffect, useCallback } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface User {
    id: number,
    username: string,
}


export const Counter = () => {
    const [count, setCount] = useState<number>(0);
    const [users, setUsers] = useState<User[] | null>(null);

    useEffect( () => {
        console.log(users)
    }, [users])

    const addTwo = useCallback((): void => setCount(prev => prev + 2), [])

    return ( 
        <>
            <h1>{count}</h1>
            <button onClick={() => setCount(prev => prev + 1)}>+</button>
            <button onClick={() => setCount(prev => prev - 1)}>-</button>
            <button onClick={addTwo}>Add two</button>
        </>
    )
}

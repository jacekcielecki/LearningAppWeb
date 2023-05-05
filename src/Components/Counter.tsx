import { useState } from "react";

export const Counter = () => {
    const [count, setCount] = useState<number>(0);

    return ( 
        <>
            <h1>{count}</h1>
            <button onClick={() => setCount(prev => prev + 1)}>+</button>
            <button onClick={() => setCount(prev => prev - 1)}>-</button>
        </>
    )
}

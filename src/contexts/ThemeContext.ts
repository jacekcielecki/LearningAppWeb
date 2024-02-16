import { createContext } from 'react';
import { Theme } from '@mui/material';

const ThemeContext = createContext<Theme | null>(null);

export default ThemeContext;
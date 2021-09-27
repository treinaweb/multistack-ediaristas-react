import { useTheme, useMediaQuery } from '@mui/material';

export default function useIsMobile(): boolean {
    const theme = useTheme(),
        isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return isMobile;
}

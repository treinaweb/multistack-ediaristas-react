import { useTheme, useMediaQuery } from '@material-ui/core';

export default function useIsMobile(): boolean {
    const theme = useTheme(),
        isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return isMobile;
}

import { UserInterface, UserType } from 'data/@types/UserInterface';
import { useRouter, NextRouter } from 'next/router';
import { useEffect } from 'react';

export const privateRoutes = [
    '/alterar-dados',
    '/diarias',
    '/pagamentos',
    '/oportunidades',
];

export const annonymousRoutes = [
    '/cadastro/diarista',
    '/login',
    '/recuperar-senha',
    '/',
];

export const houseCleanerOnlyRoutes = ['/pagamentos', '/oportunidades'];

export default function useRouterGuard(
    user: UserInterface,
    isLogging: boolean
): NextRouter {
    const router = useRouter();
    const isLogged = user.nome_completo.length > 0;
    const isHouseCleaner = user.tipo_usuario === UserType.Diarista;

    useEffect(() => {
        handleNavigation(router.route);

        router.events.on('routeChangeStart', handleNavigation);

        return () => {
            router.events.off('routeChangeStart', handleNavigation);
        };
    }, [router, isLogged, isLogging]);

    function handleNavigation(url: string) {
        if (!isLogging) {
            if (privateRoutes.includes(url) && !isLogged) {
                router.replace('/login');
                return;
            }

            if (
                (annonymousRoutes.includes(url) && isLogged) ||
                (houseCleanerOnlyRoutes.includes(url) && !isHouseCleaner)
            ) {
                router.replace(getHome());
                return;
            }

            if (url === '/encontrar-diarista' && isHouseCleaner) {
                router.replace('/');
                return;
            }
        }
    }

    function getHome(): string {
        if (!isLogged) {
            return '/';
        }
        return isHouseCleaner ? '/oportunidades' : '/diarias';
    }

    return router;
}

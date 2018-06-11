import News from './client/layout/News';
import Preferences from './client/layout/Preferences';
import Comments from './client/layout/Comments';
import { getNews, getComments } from './client/components/API';

export const routes = [
    {
        path: '/preferences',
        component: Preferences,
        dataLoader: () => Promise.resolve(),
    },
    {
        path: '/:id?',
        exact: true,
        component: News,
        dataLoader: param => getNews(param),
    },
    {
        path: '/comments/:id',
        component: Comments,
        dataLoader: param => getComments(param),
    },
];

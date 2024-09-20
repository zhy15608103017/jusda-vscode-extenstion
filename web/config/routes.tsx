export default {
  routes: [
    {
        path: '/',
        redirect: '/Home',
    },
    {
        path: '/',
        component: '@/layouts/AppLayout.tsx',
        routes: [
            {
                path: '/Home',
                component: '@/pages/Home',
            },
            // {
            //     path: '/list',
            //     component: '@/pages/list',
            // },
            {
                redirect: '/Home'
            }
        ],
    },
],
};

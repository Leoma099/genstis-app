const routesData = [];

(function updateModules() {
    const requireModule = require.context(
        '@/views/',
        true,
        /route.js/
    );

    const root = {
        path: '/',
        name: 'Root',
        redirect: '/dashboard',
    };

    routesData.push(root);

    requireModule.keys().forEach((fileName) => {
        const moduleDefinition = requireModule(fileName);

        moduleDefinition.default.forEach((route) => {
            routesData.push(route);
        });
    });

    routesData.push({ path: '/:catchAll(.*)', redirect: '/404-page-not-found' });
}());

if (process.env.BASE_URL) {
    console.log(routesData);
}

export default routesData;
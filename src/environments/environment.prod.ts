export const environment = {
   production: true,
   apiUrl: 'https://opiniao-api.herokuapp.com',
   tokenWhitelistedDomains: [new RegExp('opiniao-api.herokuapp.com')],
   tokenBlacklistedRoutes: [new RegExp('\/oauth\/token')]
};

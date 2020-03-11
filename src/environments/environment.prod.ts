export const environment = {
   production: true,
   apiUrl: 'https://opiniao-api.herokuapp.com/',
   tokenWhitelistedDomains: [/opiniao-api.herokuapp.com/],
   tokenBlacklistedRoutes: [/\/oauth\/token/]
};

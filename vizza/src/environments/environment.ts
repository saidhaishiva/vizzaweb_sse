// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    apiHostTravel: 'http://13.127.24.123/vizza/api/index.php/travel/',
    apiHostPa: 'http://13.127.24.123/vizza/api/index.php/pa/',
    apiHostHealth: 'http://13.127.24.123/vizza/api/index.php/health/',
    apiHostHome: 'http://13.127.24.123/vizza/api/index.php/home/',
    apiHostPos: 'http://13.127.24.123/vizza/api/index.php/pos/',
    apiHostDm: 'http://13.127.24.123/vizza/api/index.php/dm/',
    apiHostLife: 'http://13.127.24.123/vizza/api/index.php/endowment/',
    apiHostTerm: 'http://13.127.24.123/vizza/api/index.php/termlife/',
    webHost: 'http://13.127.24.123',
    imgUrl:  'http://13.127.24.123/vizza',
    travelInsurance: true,
    healthInsurance: true,
    lifeInsurance: true,
    paAccident: true
};

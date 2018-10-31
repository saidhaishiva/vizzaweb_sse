export class Settings {
    constructor(public name: string, 
                public loadingSpinner: boolean,
                public fixedHeader:boolean,
                public sidenavIsOpened: boolean,
                public sidenavIsPinned: boolean,
                public sidenavUserBlock: boolean,
                public HomeSidenavUserBlock: boolean,
                public menu: string,
                public menuType: string,
                public theme: string,
                public rtl: boolean,
                public userId:any,
                public username:any) { }
}
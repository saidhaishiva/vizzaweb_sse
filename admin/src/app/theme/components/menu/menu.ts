import { Menu } from './menu.model';

export const verticalMenuItems = [
    new Menu (0, 'Dashboard', '/dashboard', null, 'dashboard', null, false, 0),
    new Menu (1, 'POS', '/pos', null, 'supervisor_account', null, false, 0),
    new Menu (18, 'POS Manager', '/posmanager', null, 'supervisor_account', null, false, 0),
    new Menu (19, 'DM Manager', '/dmmanager', null, 'supervisor_account', null, false, 0),
    new Menu (22, 'Career List', '/careerList', null, 'supervisor_account', null, false, 0),
    new Menu (23, 'Testimonial', '/testimonial', null, 'supervisor_account', null, false, 0),
    new Menu (20, 'DM', '/distance-marketing', null, 'supervisor_account', null, false, 0),
    new Menu (21, 'Media Center', '/mediacenter', null, 'supervisor_account', null, false, 0),
    new Menu (15, 'Renewal ', '/adminlist', null, 'supervisor_account', null, false, 0),
    new Menu (25, 'Meta Details ', '/metaDetails', null, 'supervisor_account', null, false, 0),
    new Menu (16, 'Logout', '/login', null, 'power_settings_new', null, false, 0 ),
]

export const horizontalMenuItems = [
]

import { Menu } from './menu.model';
export const verticalMenuItems = [
    new Menu (1, 'Dashboard', '/', null, null, null, false, 0),
    new Menu (2, 'Users', '/users', null, 'supervisor_account', null, false, 0),
    new Menu (3, 'UI Features', null, null, 'computer', null, true, 0),
    new Menu (4, 'Buttons', '/ui/buttons', null, 'keyboard', null, false, 3),
    new Menu (5, 'Cards', '/ui/cards', null, 'card_membership', null, false, 3),
    new Menu (6, 'Lists', '/ui/lists', null, 'list', null, false, 3),
    new Menu (7, 'Grids', '/ui/grids', null, 'grid_on', null, false, 3),
    new Menu (8, 'Tabs', '/ui/tabs', null, 'tab', null, false, 3),
    new Menu (9, 'Expansion Panel', '/ui/expansion-panel', null, 'dns', null, false, 3),
    new Menu (10, 'Chips', '/ui/chips', null, 'label', null, false, 3),
    new Menu (11, 'Progress', '/ui/progress', null, 'data_usage', null, false, 3),
    new Menu (12, 'Dialog', '/ui/dialog', null, 'open_in_new', null, false, 3),
    new Menu (13, 'Tooltip', '/ui/tooltip', null, 'chat_bubble', null, false, 3),
    new Menu (14, 'Snackbar', '/ui/snack-bar', null, 'sms', null, false, 3),
    new Menu (15, 'Dynamic Menu', '/dynamic-menu', null, 'format_list_bulleted', null, false, 0),
    new Menu (16, 'Mailbox', '/mailbox', null, 'email', null, false, 0),
    new Menu (17, 'Chat', '/chat', null, 'chat', null, false, 0),
    new Menu (20, 'Form Controls', null, null, 'dvr', null, true, 0),
    new Menu (21, 'Autocomplete', '/form-controls/autocomplete', null, 'short_text', null, false, 20),
    new Menu (22, 'Checkbox', '/form-controls/checkbox', null, 'check_box', null, false, 20),
    new Menu (23, 'Datepicker', '/form-controls/datepicker', null, 'today', null, false, 20),
    new Menu (24, 'Form field', '/form-controls/form-field', null, 'view_stream', null, false, 20),
    new Menu (25, 'Input', '/form-controls/input', null, 'input', null, false, 20),
    new Menu (26, 'Radio button', '/form-controls/radio-button', null, 'radio_button_checked', null, false, 20),
    new Menu (27, 'Select', '/form-controls/select', null, 'playlist_add_check', null, false, 20),
    new Menu (28, 'Slider', '/form-controls/slider', null, 'tune', null, false, 20),
    new Menu (29, 'Slide toggle', '/form-controls/slide-toggle', null, 'star_half', null, false, 20),
    new Menu (30, 'Tables', null, null, 'view_module', null, true, 0),
    new Menu (31, 'Basic', '/tables/basic', null, 'view_column', null, false, 30),
    new Menu (32, 'Paging', '/tables/paging', null, 'last_page', null, false, 30),
    new Menu (33, 'Sorting', '/tables/sorting', null, 'sort', null, false, 30),
    new Menu (34, 'Filtering', '/tables/filtering', null, 'format_line_spacing', null, false, 30),
    new Menu (35, 'NGX DataTable', '/tables/ngx-table', null, 'view_array', null, false, 30),
    new Menu (40, 'Pages', null, null, 'library_books', null, true, 0),
    new Menu (43, 'Login', '/login', null, 'exit_to_app', null, false, 40),
    new Menu (44, 'Register', '/register', null, 'person_add', null, false, 40),
    new Menu (45, 'Blank', '/blank', null, 'check_box_outline_blank', null, false, 40),
    new Menu (46, 'Page Not Found', '/pagenotfound', null, 'error_outline', null, false, 40),
    new Menu (47, 'Error', '/error', null, 'warning', null, false, 40),
    new Menu (50, 'Schedule', '/schedule', null, 'event', null, false, 0),
    new Menu (66, 'Maps', null, null, 'map', null, true, 0),
    new Menu (67, 'Google Maps', '/maps/googlemaps', null, 'location_on', null, false, 66),
    new Menu (68, 'Leaflet Maps', '/maps/leafletmaps', null, 'my_location', null, false, 66),
    new Menu (70, 'Charts', null, null, 'multiline_chart', null, true, 0),
    new Menu (71, 'Bar Charts', '/charts/bar', null, 'insert_chart', null, false, 70),
    new Menu (72, 'Pie Charts', '/charts/pie', null, 'pie_chart', null, false, 70),
    new Menu (73, 'Line Charts', '/charts/line', null, 'show_chart', null, false, 70),
    new Menu (74, 'Bubble Charts', '/charts/bubble', null, 'bubble_chart', null, false, 70),
    new Menu (81, 'Drag & Drop', '/drag-drop', null, 'mouse', null, false, 0),
    new Menu (85, 'Material Icons', '/icons', null, 'insert_emoticon', null, false, 0),
    new Menu (140, 'Level 1', null, null, 'more_horiz', null, true, 0),
    new Menu (141, 'Level 2', null, null, 'folder_open', null, true, 140),
    new Menu (142, 'Level 3', null, null, 'folder_open', null, true, 141),
    new Menu (143, 'Level 4', null, null, 'folder_open', null, true, 142),
    new Menu (144, 'Level 5', null, 'http://themeseason.com', 'link', null, false, 143),
    new Menu (200, 'External Link', null, 'http://themeseason.com', 'open_in_new', '_blank', false, 0)
]
export const horizontalMenuItems = [
    new Menu (1, 'Home', '/home', null, 'home', null, true, 0),
    new Menu (2, 'Online Insurance', '/', null, null, null, true, 0),
    new Menu (6, 'Motor Car Insurance', '/four-wheeler-home', null, null, null, false, 2),
    new Menu (7, 'Motor Bike Insurance', '/bike-insurance', null, null, null, false, 2),
    new Menu (3, 'Health Insurance', '/healthinsurance', null, null, null, false, 2),
    new Menu (10, 'Personal Accident', '/personalaccident', null, null, null, false, 2),
    new Menu (8, 'Travel Insurance', '/travel', null, null, null, false, 2),
    new Menu (4, 'Life Insurance', '/term-life', null, null, null, false, 2),
    new Menu (5, 'Life-POS', '/', null, null, null, true, 2),
    new Menu (9, 'Life Insurance', '/', null, null, null, true, 0),
    new Menu (4, 'Life Insurance-Term', '/term-life', null, null, null, false, 9),
    new Menu (21, 'Life Insurance-Endowment', '/endowment-life-insurance', null, null, null, false, 9),
    new Menu (28, 'ULIP', '/ulip', null, null, null, false, 9),
    // new Menu (61, 'Life Insurance POS', '/', null, null, null, true, 9),
    new Menu (60, 'Bajaj Goal Suraksha', '/gold-suraksha', null, null, null, false, 5),
    new Menu (55, 'Edelweiss', '/edelweiss-pos-home', null, null, null, false, 5),
    new Menu (22, 'General Insurance', '/', null, null, null, true, 0),
    new Menu (24, 'Commercial Insurance', '/', null, null, null, true, 22),
    new Menu (29, 'Jewelers Block Policy', '/jewelers', null, null, null, false, 24),
    new Menu (30, 'Bankers Indemnity Policy', '/bankers', null, null, null, false, 24),
    new Menu (11, 'Shopkeepers Policy', '/shopkeeperpolicy', null, null, null, false, 24),
    new Menu (12, 'Marine Cargo Policy', '/marinecargo', null, null, null, false, 24),
    new Menu (71, 'Contractor Machinery Policy', '/contractorMachineryPolicy', null, null, null, false, 24),
    // new Menu (31, 'Special Contingency Policy', '/specialContigency', null, null, null, false, 24),
    new Menu (32, 'Marine Hull Policy', '/marinehull', null, null, null, false, 24),
    new Menu (33, 'Aviation Insurance', '/aviation', null, null, null, false, 24),
    new Menu (13, 'Money Insurance', '/money', null, null, null, false, 24),
    new Menu (19, 'House Holder Policy', '/household', null, null, null, false, 24),
    new Menu (25, 'Industrial Insurance', '/', null, null, null, true, 22),
    new Menu (14, 'Fire Policy', '/fire', null, null, null, false, 25),
    new Menu (15, 'Burglary Policy', '/burglary', null, null, null, false, 25),
    new Menu (16, 'Machinery Breakdown Policy', '/machinery', null, null, null, false, 25),
    new Menu (17, 'Electronics Equipment Policy', '/electronics', null, null, null, false, 25),
    new Menu (34, 'Consequential Loss Policy', '/consequentialLossPolicy', null, null, null, false, 25),
    new Menu (18, 'Contractors All Risk Policy', '/contractors', null, null, null, false, 25),
    new Menu (35, 'Marine cum Erection/ Storage Policy', '/marineErectionComponent', null, null, null, false, 25),
    new Menu (36, 'Advance Loss of Profit', '/advanceLossProfit', null, null, null, false, 25),
    new Menu (37, 'Contractor Plant and Machinery Policy', '/contractorMachineryPlant', null, null, null, false, 25),
    new Menu (38, 'Mega Package Policy', '/mega', null, null, null, false, 25),
    new Menu (39, 'Erection All Risk Policy', '/erectionPolicy', null, null, null, false, 25),
    new Menu (26, 'Liability Insurance', '/', null, null, null, true, 22),
    new Menu (20, 'Public Liability Policy', '/public', null, null, null, false, 26),
    new Menu (40, 'Products Liability Policy', '/professionalLiabilty', null, null, null, false, 26),
    new Menu (41, 'Professional Indemnity Policy', '/professionalIndemnity', null, null, null, false, 26),
    new Menu (42, 'Directors and Officers Liability Policy', '/directorsLiabilty', null, null, null, false, 26),
    new Menu (43, 'Lift Insurance', '/liftPolicy', null, null, null, false, 26),
    new Menu (44, 'Employers Liability Policy', '/emplyoeeLiabilty', null, null, null, false, 26),
    new Menu (23, 'Workmen Compensation', '/workmen', null, null, null, false, 26),
    new Menu (45, 'Carriers Liability Policy', '/careerPolicy', null, null, null, false, 26),
    new Menu (46, 'Liability Insurance Act Policy', '/liabilityAct', null, null, null, false, 26),
    new Menu (47, 'Golfers Indemnity Policy', '/golfersPolicy', null, null, null, false, 26),
    new Menu (48, 'Fidelity Guarantee Insurance Policy', '/fedlityPolicy', null, null, null, false, 26),
    new Menu (27, 'Group Insurance', '/', null, null, null, true, 22),
    new Menu (49, 'Group Medical Insurance', '/grouphealth', null, null, null, false, 27),
    new Menu (50, 'Group Personal Accident', '/grouppersonal', null, null, null, false, 27),
    new Menu (51, 'Group Term Life Insurance', '/groupterm', null, null, null, false, 27),
    new Menu (52, 'Group Travel Insurance', '/groupTravel', null, null, null, false, 27),
    // new Menu (27, 'Jewelers Block Policy', '/jewelersblock', null, null, null, false, 22),
    // new Menu (28, 'Bankers Identity Policy', '/bankers', null, null, null, false, 22),
    // new Menu (29, 'Marine Hull policy', '/marinehull', null, null, null, false, 22),
    // new Menu (30, 'Aviation Insurance', '/aviation', null, null, null, false, 22),
    // new Menu (31, 'Erection All risk Policy', '/erection', null, null, null, false, 22),
    // new Menu (32, 'Directors and Officers Liability Policy', '/directors', null, null, null, false, 22),
    new Menu (67, 'Renewal', '/', null, null, null, true, 0),
    new Menu (67, 'Renewal Reminder', '/renewal-reminder', null, null, null, false, 67),
    new Menu (67, 'Renew Existing Policy', '/renew-existing-policy', null, null, null, false, 67),
    new Menu (67, 'Health Insurance Renewal', '/star-renewal', null, null, null, false, 67),
    new Menu (67, 'Health Landing', '/health-enquiry', null, null, null, false, 67),
    new Menu (67, 'Term Landing', '/term-enquiry', null, null, null, false, 67),
    new Menu (68, 'Claim Assistance', '/claim-assistance', null, null, null, true, 0),
    new Menu (33, 'Blogs', '/', null, null, null, true, 0),
    // new Menu (49, 'Learning Center', '/learning-center', null, null, null, false, 33),
    new Menu (49, 'Learning Center', '/', null, null, null, true, 33),
    new Menu (49, 'Training', '/POS-Training', null, null, null, false, 49),
    new Menu (49, 'Mock Test', '/POS-Mock_Test', null, null, null, false, 49),
    new Menu (50, 'Media Library ', '/mediacenter', null, null, null, false, 33),
    new Menu (50, 'FAQ', '/faq', null, null, null, false, 33),
    new Menu (50, 'Insurance Dictionary', '/ins-dic', null, null, null, false, 33),
    new Menu (34, 'POS', '/pos', null, null, null, true, 0),
    // new Menu (36, 'About POS', '/about-pos', null, null, null, false, 34),
    // new Menu (37, 'POS Login', '/pos', null, null, null, false, 34),
    new Menu (39, 'About us', '/about-vizza', null, null, null, false, 1),
    new Menu (35, 'Contact us', '/contacts', null, null, null, false, 1),
    new Menu (38, 'Careers', '/careers', null, null, null, false, 1),
    // new Menu (45, 'Login', '/', null, null, null, true, 0),
    // new Menu (46, 'POS Login', '/pos', null, null, null, false, 45),
    // new Menu (47, 'Distance Marketing Login', '/dm-login', null, null, null, false, 45),
    // new Menu (48, 'Employee Login', null, 'https://vizzainsurance.com/admin', 'input', '_blank', false, 45)
    // new Menu (3, 'UI Features', null, null, 'computer', null, false, 0),
    // new Menu (4, 'Buttons', '/ui/buttons', null, 'keyboard', null, false, 3),
    // new Menu (5, 'Cards', '/ui/cards', null, 'card_membership', null, false, 3),
    // new Menu (6, 'Lists', '/ui/lists', null, 'list', null, false, 3),
    // new Menu (7, 'Grids', '/ui/grids', null, 'grid_on', null, false, 3),
    // new Menu (8, 'Tabs', '/ui/tabs', null, 'tab', null, false, 3),
    // new Menu (9, 'Expansion Panel', '/ui/expansion-panel', null, 'dns', null, false, 3),
    // new Menu (10, 'Chips', '/ui/chips', null, 'label', null, false, 3),
    // new Menu (11, 'Progress', '/ui/progress', null, 'data_usage', null, false, 3),
    // new Menu (12, 'Dialog', '/ui/dialog', null, 'open_in_new', null, false, 3),
    // new Menu (13, 'Tooltip', '/ui/tooltip', null, 'chat_bubble', null, false, 3),
    // new Menu (14, 'Snackbar', '/ui/snack-bar', null, 'sms', null, false, 3),
    // new Menu (16, 'Mailbox', '/mailbox', null, 'email', null, false, 40),
    // new Menu (17, 'Chat', '/chat', null, 'chat', null, false, 40),
    // new Menu (20, 'Form Controls', null, null, 'dvr', null, true, 0),
    // new Menu (21, 'Autocomplete', '/form-controls/autocomplete', null, 'short_text', null, false, 20),
    // new Menu (22, 'Checkbox', '/form-controls/checkbox', null, 'check_box', null, false, 20),
    // new Menu (23, 'Datepicker', '/form-controls/datepicker', null, 'today', null, false, 20),
    // new Menu (24, 'Form field', '/form-controls/form-field', null, 'view_stream', null, false, 20),
    // new Menu (25, 'Input', '/form-controls/input', null, 'input', null, false, 20),
    // new Menu (26, 'Radio button', '/form-controls/radio-button', null, 'radio_button_checked', null, false, 20),
    // new Menu (27, 'Select', '/form-controls/select', null, 'playlist_add_check', null, false, 20),
    // new Menu (28, 'Slider', '/form-controls/slider', null, 'tune', null, false, 20),
    // new Menu (29, 'Slide toggle', '/form-controls/slide-toggle', null, 'star_half', null, false, 20),
    // new Menu (30, 'Tables', null, null, 'view_module', null, true, 0),
    // new Menu (31, 'Basic', '/tables/basic', null, 'view_column', null, false, 30),
    // new Menu (32, 'Paging', '/tables/paging', null, 'last_page', null, false, 30),
    // new Menu (33, 'Sorting', '/tables/sorting', null, 'sort', null, false, 30),
    // new Menu (34, 'Filtering', '/tables/filtering', null, 'format_line_spacing', null, false, 30),
    // new Menu (35, 'NGX DataTable', '/tables/ngx-table', null, 'view_array', null, false, 30),
    // new Menu (70, 'Charts', null, null, 'multiline_chart', null, true, 0),
    // new Menu (71, 'Bar Charts', '/charts/bar', null, 'insert_chart', null, false, 70),
    // new Menu (72, 'Pie Charts', '/charts/pie', null, 'pie_chart', null, false, 70),
    // new Menu (73, 'Line Charts', '/charts/line', null, 'show_chart', null, false, 70),
    // new Menu (74, 'Bubble Charts', '/charts/bubble', null, 'bubble_chart', null, false, 70),
    // new Menu (66, 'Maps', null, null, 'map', null, true, 70),
    // new Menu (67, 'Google Maps', '/maps/googlemaps', null, 'location_on', null, false, 66),
    // new Menu (68, 'Leaflet Maps', '/maps/leafletmaps', null, 'my_location', null, false, 66),
    // new Menu (81, 'Drag & Drop', '/drag-drop', null, 'mouse', null, false, 3),
    // new Menu (85, 'Material Icons', '/icons', null, 'insert_emoticon', null, false, 3),
    // new Menu (40, 'Pages', null, null, 'library_books', null, true, 0),
    // new Menu (43, 'Login', '/login', null, 'exit_to_app', null, false, 40),
    // new Menu (44, 'Register', '/register', null, 'person_add', null, false, 40),
    // new Menu (45, 'Blank', '/blank', null, 'check_box_outline_blank', null, false, 40),
    // new Menu (46, 'Page Not Found', '/pagenotfound', null, 'error_outline', null, false, 40),
    // new Menu (47, 'Error', '/error', null, 'warning', null, false, 40),
    // new Menu (50, 'Schedule', '/schedule', null, 'event', null, false, 40),
    // new Menu (140, 'Level 1', null, null, 'more_horiz', null, true, 0),
    // new Menu (141, 'Level 2', null, null, 'folder_open', null, true, 140),
    // new Menu (142, 'Level 3', null, null, 'folder_open', null, true, 141),
    // new Menu (143, 'Level 4', null, null, 'folder_open', null, true, 142),
    // new Menu (144, 'Level 5', null, 'http://themeseason.com', 'link', null, false, 143),
    // new Menu (200, 'External Link', null, 'http://themeseason.com', 'open_in_new', '_blank', false, 40)
]

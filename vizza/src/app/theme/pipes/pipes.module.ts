import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationPipe} from './pagination/pagination.pipe';
import { ProfilePicturePipe } from './profilePicture/profilePicture.pipe';
import { ChatPersonSearchPipe } from './search/chat-person-search.pipe';
import { UserSearchPipe } from './search/user-search.pipe';
import { TruncatePipe } from './truncate/truncate.pipe';
import { MailSearchPipe } from './search/mail-search.pipe';
import {AgePipe} from '../../../agepipes';

@NgModule({
    imports: [ 
        CommonModule 
    ],
    declarations: [
        PaginationPipe,
        ProfilePicturePipe,
        ChatPersonSearchPipe,
        UserSearchPipe,
        TruncatePipe,
        MailSearchPipe,
        AgePipe
    ],
    exports: [
        PaginationPipe,
        ProfilePicturePipe,
        ChatPersonSearchPipe,
        UserSearchPipe,
        TruncatePipe,
        MailSearchPipe,
        AgePipe
    ]
})
export class PipesModule { }

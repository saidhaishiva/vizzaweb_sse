import { Injectable, Pipe, PipeTransform } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'


@Pipe({
    name: 'list'
})

@Injectable()
export class faqPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer){}
ans: any;
    faq_question: any;
    transform(faqQuestionsList: any, searchval: any): any {
        console.log(faqQuestionsList, '98765789')


        for (let i = 0; i < faqQuestionsList; i++) {
            console.log(faqQuestionsList[i].contents, "12345678");


            for (let j = 0; j < faqQuestionsList[i].contents; j++) {

                this.ans = faqQuestionsList[i].contents[j].content_ans;
                console.log(this.faq_question, "12345678");


                this.ans = this.faq_question.replace(new RegExp('\•', 'g'), "<br _ngcontent-vizza-app-c14>");
                console.log(this.faq_question, "12345678");
                return this.ans;

            }
        }
    }

    //     if (!searchval) {
    //         return faqQuestionsList;
    //     }
    //     // Match in a case insensitive maneer
    //     const re = new RegExp(searchval, 'gi');
    //     console.log(re,'re')
    //
    //     const match = faqQuestionsList.match(re);
    //     console.log(re,'re')
    //     console.log(match,'match')
    //
    //
    //     // If there's no match, just return the original value.
    //     if (!match) {
    //         return faqQuestionsList;
    //     }
    //
    //     const result = faqQuestionsList.replace(re, "<mark>" + match[0] + "</mark>");
    //     return this.sanitizer.bypassSecurityTrustHtml(result);
    //     console.log(result,'result')
    // }
    //

// transform(faqQuestionsList: any[], search: string, value: string): any[] {
    //     console.log(faqQuestionsList, '12345678');
    //     for (let i = 0; i < faqQuestionsList.length; i++) {
    //
    //         for (let j = 0; j < faqQuestionsList[i].contents; j++) {
    //         console.log(faqQuestionsList[i].contents[j].content_qstn,"09876546789");
    //         let fq= faqQuestionsList[i].contents[j].content_qstn
    //     }
    //     }
    //
    //     if (!faqQuestionsList) return [];
    //
    //     return faqQuestionsList.filter(it => it.this.fq.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    //
    //
    // }

}



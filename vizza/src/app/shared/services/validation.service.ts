import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

    constructor() {
    }

    // Name validation
    nameValidate(event) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    // Dob validation
    dobValidate(event) {
        if (event.charCode !== 0) {
            const pattern = /[0-9/]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    // Dob validation
    numberValidate(event) {
        if (event.charCode !== 0) {
            const pattern = /[0-9]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    // onlynumValidate(event) {
    //     if (event.charCode !== 0) {
    //         const pattern = /[1-9][0-9]/;
    //         const inputChar = String.fromCharCode(event.charCode);
    //         if (!pattern.test(inputChar)) {
    //             event.preventDefault();
    //         }
    //     }
    // }
// pan gst validation
    idValidate(event) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z0-9]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    space(event) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z0-9 ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
}



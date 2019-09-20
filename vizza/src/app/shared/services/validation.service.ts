import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

    constructor() {
    }

    // Name validation
    nameValidate(event) {
        if (event.code == 'Space') {
            if (event.target.value.length == 0) {
                event.preventDefault();
            }
        } else {
            if (event.charCode !== 0) {
                const pattern = /[a-zA-Z ]/;
                const inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                    event.preventDefault();
                }
            }
        }
    }
// travel reliance
    passportIssue(event) {
        if (event.code == 'Space') {
            if (event.target.value.length == 0) {
                event.preventDefault();
            }
        } else {
            if (event.charCode !== 0) {
                const pattern = /[/Sa-zA-Z0-9 ]/;
                const inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                    event.preventDefault();
                }
            }
        }
    }

    nameValidateNospace(event) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z]/;
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
            const pattern = /[a-zA-Z0-9 ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    passPortValidate(event) {
        if (event.charCode !== 0) {
            const pattern = /^[A-PR-WYa-pr-wy][0-9]\d\s?\d{4}[1-9]$/;
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

    spac(event) {
        console.log(event);
        let id = document.getElementsByClassName('nospace');
        console.log(id, 'id');
        id[0].addEventListener("keydown", checkKeyPress, false);

        function checkKeyPress(event) {
            if (event.code == "Space" && event.target.value.length == 0 && event.keyCode == 32) {
                event.preventDefault();
            }
        }

    }
    // height weight validation
    heightValidate(event: any) {
        console.log(event.target.value.length);
        if (event.key == '0') {
            if (event.target.value.length == 0) {
                event.preventDefault();
            }
        } else {
            if (event.charCode !== 0) {
                const pattern = /[0-9/]/;
                const inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                    event.preventDefault();
                }
            }
        }
    }
    addressValidate(event) {
        if (event.code == 'Space') {
            if (event.target.value.length == 0) {
                event.preventDefault();
            }
        } else {
            if (event.charCode !== 0) {
                const pattern = /[a-zA-Z0-9-/,.() ]/;
                const inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                    event.preventDefault();
                }
            }
        }
    }
    employeeCode(event) {
        if (event.code == 'Space') {
            if (event.target.value.length == 0) {
                event.preventDefault();
            }
        } else {
            if (event.charCode !== 0) {
                const pattern = /[a-zA-Z0-9 ]/;
                const inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                    event.preventDefault();
                }
            }
        }
    }

    paste(event: any) {
        event.preventDefault();
    }
}



import {Component, ViewEncapsulation, ViewChild, HostListener, ElementRef, Inject} from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
    selector: 'app-fullscreen',
    encapsulation: ViewEncapsulation.None,
    template: `
        <button mat-icon-button class="full-screen">
            <mat-icon *ngIf="!toggle" #expand>fullscreen</mat-icon>
            <mat-icon *ngIf="toggle" #compress>fullscreen_exit</mat-icon>
        </button>
    `
})
export class FullScreenComponent {
    toggle:boolean = false;
    @ViewChild('expand') private expand:ElementRef;
    @ViewChild('compress') private compress:ElementRef;
    doc: any = document;
 constructor(@Inject(WINDOW) private window: Window) {}


    requestFullscreen(elem) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else {
            console.log('Fullscreen API is not supported.');
        }
    };

    exitFullscreen() {
        if (this.doc.exitFullscreen) {
            this.doc.exitFullscreen();
        } else if (this.doc.webkitExitFullscreen) {
            this.doc.webkitExitFullscreen();
        } else if (this.doc.mozCancelFullScreen) {
            this.doc.mozCancelFullScreen();
        } else if (this.doc.msExitFullscreen) {
            this.doc.msExitFullscreen();
        } else {
            console.log('Fullscreen API is not supported.');
        }
    };

    @HostListener('click') getFullscreen(){
        if(this.expand){
            this.requestFullscreen(this.doc.documentElement);
        }
        if(this.compress){
            this.exitFullscreen();
        }
    }

    @HostListener('window:resize') onFullScreenChange(){
        let fullscreenElement = this.doc.fullscreenElement || this.doc.mozFullScreenElement ||
            this.doc.webkitFullscreenElement || this.doc.msFullscreenElement;
        if (fullscreenElement != null) {
            this.toggle = true;
        } else {
            this.toggle = false;
        }
    }

}

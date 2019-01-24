import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-claim-assistance',
  templateUrl: './claim-assistance.component.html',
  styleUrls: ['./claim-assistance.component.scss']
})
export class ClaimAssistanceComponent implements OnInit {
    public pincodeErrors: any;
    public pin:any;
    public title: any;
    allImage: any;
    fileDetails: any;
    getUrl: any;
    url: any;
    fileUploadPath: any;

    constructor(public fb: FormBuilder, public common: CommonService, public toastr: ToastrService, public dialog: MatDialog,public auth: AuthService) {
    }
    form = this.fb.group({
        'insurance': ['', Validators.compose([Validators.required])],
        'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        'contactperson': ['', Validators.compose([Validators.required])],
        'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
        'email': ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
        'pincode': ['', Validators.compose([Validators.required])],
    });

  ngOnInit() {
  }
    getPincodeDetails(pin, title) {
        this.pin = pin;
        this.title = title;
        const data = {
            'platform': 'web',
            'postalcode': this.pin
        }
        if (this.pin.length == 6) {
            this.common.getPincodeDetails(data).subscribe(
                (successData) => {
                    this.getPincodeDetailsSuccess(successData);
                },
                (error) => {
                    this.getPincodeDetailsFailure(error);
                }
            );
        }
    }
    public getPincodeDetailsSuccess(successData) {

        if (successData.IsSuccess == false) {
            this.toastr.error(successData.ErrorObject);
            this.pincodeErrors = false;
        }else {
            this.pincodeErrors = true;
        }
    }

    public getPincodeDetailsFailure(error) {
    }
    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);

            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
    public data(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
    readUrl(event: any) {
        this.getUrl = '';
        let getUrlEdu = [];
        this.fileDetails = [];
        for (let i = 0; i < event.target.files.length; i++) {
            this.fileDetails.push({'image': '', 'size': event.target.files[i].size, 'type': event.target.files[i].type, 'name': event.target.files[i].name});
        }
        for (let i = 0; i < event.target.files.length; i++) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                this.url = event.target.result;
                getUrlEdu.push(this.url.split(','));
                this.onUploadFinished(getUrlEdu);
            };
            reader.readAsDataURL(event.target.files[i]);
        }

    }
    onUploadFinished(event) {
        this.allImage.push(event);
    }
    onUpload() {
        const data = {
            'platform': 'web',
            'image_path': '',
            'file_type': '3'
        };
        let length = this.allImage.length-1;
        for (let k = 0; k < this.allImage[length].length; k++) {
            this.fileDetails[k].image = this.allImage[length][k][1];
        }
        data.image_path = this.fileDetails;
        this.common.fileUploadPolicyHome(data).subscribe(
            (successData) => {
                this.fileUploadSuccess(successData);
            },
            (error) => {
                this.fileUploadFailure(error);
            }
        );
    }

    public fileUploadSuccess(successData) {
        if (successData.IsSuccess) {
            this.fileUploadPath = successData.ResponseObject.imagePath;
            this.toastr.success( successData.ResponseObject.message);
        } else {
            this.toastr.error(successData.ErrorObject, 'Failed');
        }
    }

    public fileUploadFailure(error) {
    }

    ClaimAssistanceDialog(){
        const dialogRef = this.dialog.open(ClaimAssistanceDialog, {
            width: '1600px',
        });
        dialogRef.disableClose = true;
    }

    claimAssitance(values) {
        if (this.form.valid) {
            const data = {
                'platform': 'web',
                'role_id': this.auth.getPosRoleId() != 0  ? this.auth.getPosRoleId() : '4',
                'user_id': this.auth.getPosUserId() != null  ? this.auth.getPosUserId() : '0',
                'insurence_type': this.form.controls['insurance'].value,
                'company_name': this.form.controls['name'].value,
                'contact_person' : this.form.controls['contactperson'].value,
                'customer_mobile': this.form.controls['mobile'].value,
                'customer_email': this.form.controls['email'].value,
                'pincode': this.form.controls['pincode'].value,
            };

            this.common.claimAssistance(data).subscribe(
                (successData) => {
                    this.claimAssistanceSuccess(successData);
                },
                (error) => {
                    this.claimAssistanceFailure(error);
                }
            );
        }
    }
    claimAssistanceSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.toastr.success(successData.ResponseObject);
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    claimAssistanceFailure(error) {
    }
}
@Component({
    selector: 'claimassistancedialog',
    template: `        
        <div class="container">
        <div  class="row text-justify">
        
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h4 class="text-center"> About Vizza Claim Assistance</h4>
                <hr>
            </div>
             <div class="col-sm-2 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
            <h4 class="col-md-12">“ Vizza has extensive capabilities and competence to handle claim of any nature and magnitude”</h4>
            <h6 class="col-md-12"><small>Vizza can advise and assist you in,</small></h6>
            <p class="col-md-12">Handling the initial crisis situation and coordinating with the Surveyor and Insurer to ensure evidence of loss is preserved and recorded.</p>
            <p class="col-md-12">Also, steps are recommended to prevent further loss.</p>
            <p class="col-md-12">Advising and Assisting you in investigation of cause of loss and damage.</p>
            <p class="col-md-12">Advising and Assisting you in handling the Insurer queries.</p>
            <p class="col-md-12">Advising and Assisting you in the event of any dispute with the Insurer.</p>
            <p class="col-md-12">Advising and Assisting you to take necessary steps should the Insurer decline the Liability.</p>
            <section class="row">

            <div class="row h-claim">
                <div class="col-md-3 col-sm-6">
                    <h4><span>1</span>CONTACT VIZZA</h4>
                    <p>When it comes to your Insurance Policy, the first thing to do when a loss occurs is to contact Vizza Insurance Broker.Vizza will guide you in obtaining proper resolution of your claim. </p>
                </div>
                <div class="col-md-3 col-sm-6">
                    <h4><span>2</span>CLAIM INVESTIGATION</h4>
                    <p>After the claim has been reported, it will need to be investigated by an adjuster to determine the amount of loss or damages covered by your insurance policy. The adjuster will also identify any liable parties, and you can help the process by providing any witness information or other parties’ contact information.</p>
                </div>
                <div class="col-md-3 col-sm-6">
                    <h4><span>3</span>LOSS ASSESSMENT</h4>
                    <p>Loss Assessment process requires establishment of cause of loss to determine whether insurer is liable to indemnify the loss. The process also involves extensive investigation and documentation to establish the amount of loss and the amount that the insurer is liable to indemnify.</p>
                </div>
                <div class="col-md-3 col-sm-6">
                    <h4><span>4</span>DISPUTE</h4>
                    <p>In the event of insurer declining liability, cause of action arises to proceed legally against the insurer. In case, the insurer settles the amount which is not to the satisfaction of the insured, then the insured has the right to approach proper forum for redressal.</p>
                </div>
                <!--<div class="col">-->
                <!--<h4><span>5</span>Payment</h4>-->
                <!--<p>Order to accurately evaluate the extent of the damage, your insurance adjuster may hire appraisers, engineers, or contractors to lend their expert advice. Once the evaluation is complete, your adjuster will provide you with a list of preferred vendors to help with repairs. You’re not obligated to hire these vendors, but it can save you a good deal of time-->
                <!--</div>-->

            </div>
            <!--<p class="bottomQoute">Every claim is different, and although the claims process can vary slightly according to the situation, your adjuster will devote the time and attention it takes to-->
            <!--resolve your particular case. Vizza Insurance is committed to ensuring every claim is handled as fairly, professionally and as carefully as possible. If you run-->
            <!--into questions or concerns during the claims process, you can always contact us on our website.-->
            <!--</p>-->

        </section>
         </div>
        </div>`,
})
export class ClaimAssistanceDialog {

    constructor(
        public dialogRef: MatDialogRef<ClaimAssistanceDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
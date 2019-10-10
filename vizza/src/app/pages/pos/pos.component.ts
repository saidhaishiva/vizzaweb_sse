import {Component, Inject, OnInit} from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {emailValidator} from '../../theme/utils/app-validators';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import { LoginService } from '../../shared/services/login.service';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

    public form: FormGroup;
    public settings: Settings;
    public response: any;
    public status: any;
    conps: boolean;
    newps: boolean;
    hide = true;
    data: any;
    constructor(public appSettings: AppSettings, public fb: FormBuilder, public router: Router, private route: ActivatedRoute, public loginService: LoginService, public authService: AuthService,  public toast: ToastrService,public dialog: MatDialog) {
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = true;
        this.settings.sidenavIsOpened = true;
        this.settings.sidenavIsPinned = true;
        this.response = [];
        this.conps = true;
        this.newps = true;
        this.form = this.fb.group({
            'username': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
        });
       if ( this.settings.userId > 0) {
           this.router.navigate(['/pos-profile']);
       }
    }


    ngOnInit() {

    }

    public login(): void {
        if (this.form.valid) {
            const data = {
                'username': this.form.controls['username'].value,
                'password': this.form.controls['password'].value,
                'platform': 'web',
            };
            this.loginService.doLogin(data).subscribe(
                (successData) => {
                    this.loginSuccess(successData);
                },
                (error) => {
                    this.loginFailure(error);
                }
            );
        }
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
    public loginSuccess(successData) {
        if (successData.IsSuccess) {
            this.data = successData.ResponseObject.pos_details;
            this.authService.setToken(this.data.pos_email, this.data.pos_firstname, this.data.pos_id, this.data.pos_lastname, this.data.pos_mobileno, this.data.pos_roleid, successData.ResponseObject.Accesstoken, this.data.pos_status, this.data.pos_userid);
            this.authService.setSessionData('posStatus', this.data.pos_status);
            this.authService.setSessionData('posId', this.data.pos_id);
            this.authService.setSessionData('trainingStatus', this.data.training_status);
            this.authService.setSessionData('examStatus', this.data.exam_status);
            this.authService.setSessionData('documentStatus', this.data.doc_verified_status);
            this.authService.setSessionData('loginStatus', 'pos');
            this.settings.myprofile = 'pos';

            // training_status
            this.settings.userId = this.authService.getPosUserId();
            this.settings.username = this.authService.getPosFirstName() +' '+ this.authService.getPosLastName();
            this.router.navigate(['/pos-profile']);
        } else {
            this.toast.error(successData.ErrorObject);
        }
    }

    public loginFailure(error) {
        console.log(error);
    }
    public changeTheme(theme) {
        this.settings.theme = theme;
    }

    PosInsurer(){
        const dialogRef = this.dialog.open(PosInsurer, {
            width: '1200px',
        });
        dialogRef.disableClose = true;
    }

}
@Component({
    selector: 'posinsurer',
    template: ` 
  <div class="row">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h3 class="text-center">About Vizza POS</h3>
            </div>
            <div class="col-sm-2 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
  </div>      
  <div mat-dialog-content>
    <mat-accordion>
    <mat-expansion-panel class="mb-3">
        <mat-expansion-panel-header>
          <mat-panel-title>
            <h6>About Point of Sales Person (POSP)</h6>
          </mat-panel-title>
        </mat-expansion-panel-header>
        <p>About Point of Sales Person (POSP)
          Point of Sales Person (POSP) is a representative of Vizza Insurance Broking Services Pvt. Ltd., who will be appointed to penetrate the Insurance Market. The POSPerson will be a certified distributor of Insurance Products across many platforms for certain approved Pre-Underwritten policies representing Vizza Insurance Broking Services Pvt. Ltd.</p>
        <p>It involves introducing themselves as a POS Person of our Organization and help customers to get their Insurance renewed or provide them with options to choose a new insurance policy. If and when a POS person manages to complete a policy, he/she will be paid based on the business procured as per IRDA Regulations of 2017.</p>
      </mat-expansion-panel>

      <mat-expansion-panel class="mb-3">
        <mat-expansion-panel-header>
          <mat-panel-title>
            <h6>Eligibility</h6>
          </mat-panel-title>
        </mat-expansion-panel-header>
        <ol><li>The minimum age required to become a POS Person is 18 years.</li>
          <li>The minimum educational qualification required to become a POS Person isClass X (10th Standard). </li>
          <li>The POSP Applicant should not have any existing Insurance Agency/Broking License/POS Person of any other Insurance/ Intermediary Organization.</li>
        </ol>
      </mat-expansion-panel>

      <mat-expansion-panel class="mb-3">
        <mat-expansion-panel-header>
          <mat-panel-title>
            <h6>Registration Process</h6>
          </mat-panel-title>
        </mat-expansion-panel-header>
        <strong>Step 1:</strong>
        <ul><li>Firstly, you should provide us with your Basic Personal Information and your Contact details.</li>
          <li>You, then provide us with your Identity Proofsincluding PAN and Aadhar Cards and highest educational certificates.</li>
          <li>We then ask you for your bank details which also requires a cancelled cheque leaf.</li></ul>
        <strong>Step 2:</strong>
        <ul><li>Once you are registered and Vizza approves you after checking whether all the documents are in order then the POS training Module starts.</li>
          <li>Following this, a 15 hour Training Module will be allotted for each person, after which they will be allowed to write the Online Examination.</li>
          <li>This Examination will consist of30 Questions and the PassPercentage is 40%, so if a person gets 12 out of 30 answers correct, he/she would clear the Examination and be ready to be enrolled as POS Person for Vizza Insurance Broking Services Pvt. Ltd.</li>
          <li>Once the Examination is done, you will be given the Course Completion Certificate and the Examination Certificate for passing the Examination. This is a mandatory exercise that everyone must follow.
            (As per the IRDAI Regulation 2017, any person interested to become a POSP for any insurance company or an insurance broker must complete the 15 hour Training Module and Pass the Examination conducted by the Insurance Company/Intermediary.)</li>
          <li>Once this procedure is done, the person would be asked to sign an agreement form, after which he/she would receive theAppointment Letter as POS Person from Vizza Insurance Broking Services Pvt. Ltd.</li>
          <li>Finally, the issue of ID cards under the designation of POSP would be provided by Vizza Insurance Broking Services Pvt. Ltd.</li></ul>
      </mat-expansion-panel>

      <mat-expansion-panel class="mb-3">
        <mat-expansion-panel-header>
          <mat-panel-title>
            <h6>The DO’s and DON’T s of POS Person</h6>
          </mat-panel-title>
        </mat-expansion-panel-header>
        <strong class="text-center">DO’s</strong>
        <ol><li>Every POS Person should identify himself and the Broking Company he is representing.</li>
          <li>Show the POS certificate to the prospect on demand.</li>
          <li>Disseminate the required information in respect of insurance products offered for sale by various insurance companies and consider the needs of the prospect while recommending a specific product.</li>
          <li>Indicate the premium to be charged by the insurer for the insurance product offered for sale.</li>
          <li>Explain to the prospect the nature of information required in the proposal form by the Insurer, and the importance of disclosure of material information in the purchase of an insurance contract.</li>
          <li>Bring to the notice of the insurer every fact about the prospect relevant to the insurance underwriting, including any adverse habits and material fact that may adversely affect the Pre-Underwritten nature of the product offered.</li>
          <li>Obtain the requisite documents at the time of filling the proposal form with the insured, and other documents subsequently asked for by the insurer for completion of the proposal.</li>
          <li>Advise every prospect to effect nomination under the policy.</li>
          <li>Advise the prospects regarding Free Look Period.</li>
          <li>Inform promptly the prospect about the acceptance or rejection of the proposal by the insurer.</li>
          <li>Render required services to the clients such as assignment, change of address etc.</li>
          <li>Support for claim settlement by complying with the requirements for claim settlement.</li></ol>
        <strong>DON’T s</strong>
        <ol><li>POS Person should not solicit or procure insurance business without being appointed to act as such by the insurer/intermediary.</li>
          <li>POS Person should not induce the prospect to omit any material information in the proposal form.</li>
          <li>POS Person should not induce the prospect to submit wrong information in the proposal form or documents submitted to the insurer for acceptance of the proposal.</li>
          <li>POS Person should not behave in a discourteous manner with the prospect.</li>
          <li>POS Person should not demand or receive a share of proceeds from the beneficiary under an insurance contract.</li>
          <li>POS Person should not offer any rebate/discount/inducement to the prospect for obtaining business.</li>
          <li>POS Person should not collect in his name or for his account, any amount, whether on account of premium or otherwise, from any customer or policyholder.</li></ol>
      </mat-expansion-panel>

      <mat-expansion-panel class="mb-3">
        <mat-expansion-panel-header>
          <mat-panel-title>
            <h6>Important IRDAI Guidelines for any POS Person</h6>
          </mat-panel-title>
        </mat-expansion-panel-header>
        <ol><li>Source only certain Pre Underwritten Products approved by theauthority.</li>
          <li>Observe and comply with the provisions of the Insurance Act 1938, the general or specific orders or the directions of the Authority, the Regulations and all other applicable rules, laws, orders etc. in the performance and discharge of Point Of Sales Person&#39;s obligations under this Agreement.</li>
          <li>Obey the Company&#39;s directions and instructions and, in the absence of any such directions and instructions in relation to any particular matter, to act in the best interests of the Policy holders.</li>
          <li>The Point Of Sales Person upon receipt of any new application of insurance, notices of alterations and/or cancellation of policies shall immediately forward the same to the Company.</li>
          <li>Not solicit or sell to the customers, within the prescribed territory any other insurance policy except those approved by the authority.</li>
          <li>Not alter or modify or offer or agree to alter or modify in any way or manner the terms of the Policies or any form or document prescribed or issued by the Insurer without its prior express consent in writing.</li>
          <li>Not make any representations to customers or give any warranties or other commitments other than those contained in any standard terms and conditions prescribed by the Insurer from time to time.</li>
          <li>Not collect in his name or for his account any amount, whether on account of premium or otherwise, from any customer or policyholder.</li>
          <li>Not issue personal cheques on behalf of the insured or not accept cheques of any other person, other than that of the customer, towards the premium payable by the customers on the policies issued.</li>
          <li>Not assign, change or otherwise deal with this Agreement in any way or manner.</li>
          <li>Directly or indirectly not be engaged in selling policies relating to Insurance Business of any other Insurance Brokers.</li>
          <li>Not pledge the credit of the Company in any manner</li>
          <li>Not negotiate or enter into any contract(s) and/or agreement(s) of any nature whatsoever on behalf of the Company and the Company shall not be bound by any contract and/or agreement made by the Point Of Sales Person.</li>
          <li>Be held responsible for the misuse/loss of any Cover note/any other online portal issued to him/her and any liability arising there from shall be entirely to his/her account.</li>
          <li>Adhere to the Anti Money Laundering (AML) Policy and the Know Your Customers (KYC) Norms.</li></ol>
        <p><strong>Note: </strong>The above guidelines are not to be violated at any cost.</p>
      </mat-expansion-panel>

      <mat-expansion-panel class="mb-3">
        <mat-expansion-panel-header>
          <mat-panel-title>
            <h6>Payment</h6>
          </mat-panel-title>
        </mat-expansion-panel-header>
        <p>The Company will pay to the Point Of Sales Person for the business procured at the rates prescribed and in compliance of the regulation. These rates will be communicated separately to the Point of Sales Person from time to time and also requirements of IT Act compliance for TDS. It is expressly agreed to between the Parties that upon any premium refunded, cancellation of policy or otherwise the commission payable to the Point Of Sales Person on such policy shall be reduced proportionately. It  is  further  agreed  to  by  the  Point  Of  Sales  Person that  in  respect  of  any  business,  where  the  Company  deems  it necessary, the Company may reduce or increase the commission payable to the Point Of Sales Person (subject to the maximum limit prescribed under the Act and by IRDA, from time to time).</p>
      </mat-expansion-panel>

      <mat-expansion-panel class="mb-3">
        <mat-expansion-panel-header>
          <mat-panel-title>
            <h6>Claim Procedure</h6>
          </mat-panel-title>
        </mat-expansion-panel-header>
        <p>The Point Of Sales Person must not adjust or pay any claims whatsoever or any commitments with reference to the claims on Policies issued by the Insurers. Upon intimation of any claim by an insured or the insured&#39;s representatives the Point Of Sales Person shall immediately inform the  company  particularly  the  Company&#39;s  claim  department  in  writing  about  the  said  claim  and  simultaneously  arrange  for  the  insured  or  Insured&#39;s representative to complete the necessary formalities pertaining to his/her/its/their claim for the Company&#39;s immediate attention. Under no circumstances the  Point  Of  Sales  Person shall  pay  or  settle  any  claim,  nor  admit  any  liability  or  institute  legal  proceedings  or  represent  the  Company  in  legal  proceedings  in connection with any matter relating to the claims or the business of the Company.</p>
        <p>A Point of Sales person can only represent One Insurance Company/ Corporate agent or Insurance Broker. This is in accordance with the 2017 regulations for ‘Point of Sales Person’ of IRDAI.</p>
        <p>A POS Person cannot represent two organizations, but here at Vizza Insurance Broking Services Pvt. Ltd. , we provide the POS person with so many choices to explain to his client about the various policies each insurance company has to offer.</p>
      </mat-expansion-panel>
    </mat-accordion>
  </div>`,
})
export class PosInsurer {

    constructor(
        public dialogRef: MatDialogRef<PosInsurer>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}

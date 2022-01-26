import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {
  nicknameFormGroup: FormGroup;
  userNickname: string;

  constructor(private _formBuilder: FormBuilder, private _snackbar: MatSnackBar) { }
  

  ngOnInit(): void {
    this.createFormControl();
  }

  createFormControl() {
    this.nicknameFormGroup = this._formBuilder.group({
      nickname: ["", [Validators.required, Validators.pattern('^[a-zA-Z \-\']+'), Validators.maxLength(20)]],
    });
  }

  checkNickname(){
    (this.nicknameFormGroup.valid) ? this.userNickname = this.nicknameFormGroup.value.nickname : this.formIsInvalid();
  }

  formIsInvalid(){
    this.nicknameFormGroup.controls['nickname'].markAsTouched();
    this._snackbar.open('Did you forget your nickname?', null, {
      duration: 3000
    });
  };

}

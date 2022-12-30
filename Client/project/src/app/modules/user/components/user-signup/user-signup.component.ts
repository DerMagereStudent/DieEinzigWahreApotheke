import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {
  public formModel: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    passwords: this.formBuilder.group({
      password1: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9\d]).{0,}$/)]],
      password2: ['', Validators.required]
    }, { validator: this.comparePasswords }),
    title: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    birthday: ['', Validators.required],
    street: ['', Validators.required],
    housenr: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
  }

  public async onSubmit(): Promise<void> {
    var result = await this.userService.signup({
      email: this.formModel.value.email,
      password: this.formModel.value.passwords.password1,
      title: this.formModel.value.title,
      firstName: this.formModel.value.firstname,
      lastName: this.formModel.value.lastname,
      birthday: this.formModel.value.birthday,
      address: {
        id: "",
        street: this.formModel.value.street,
        houseNr: this.formModel.value.housenr,
        state: this.formModel.value.state,
        country: this.formModel.value.country,
      },
    });

    if (result.succeeded) {
      this.messageService.add({
        severity: "success", closable: true, life: 5000,
        summary: "Registriert", detail: "Du hast dich erfolgreich registriert"
      });

      await this.router.navigateByUrl("/user/login");
      return;
    }

    for (let error of result.errors) {
      this.messageService.add({
        severity: "error", closable: true, life: 5000,
        summary: error.code, detail: error.description
      });
    }
  }

  private comparePasswords(formGroup: FormGroup): void {
    let confirmPwdCtrl = formGroup.get('password2')!;
    
    if (confirmPwdCtrl.errors == null || 'passwordMismatch' in confirmPwdCtrl.errors) {
      if (formGroup.get('password1')!.value != confirmPwdCtrl.value)
        confirmPwdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPwdCtrl.setErrors(null);
    }
  }
}

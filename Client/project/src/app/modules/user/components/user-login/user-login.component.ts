import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  public formModel: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
  }

  public async onSubmit(): Promise<void> {
    var result = await this.userService.login({
      email: this.formModel.value.email,
      password: this.formModel.value.password
    });

    if (result.succeeded) {
      await this.router.navigateByUrl("/").then(() => window.location.reload());
      return;
    }

    for (let error of result.errors) {
      this.messageService.add({
        severity: "error", closable: true, life: 5000,
        summary: error.code, detail: error.description
      });
    }
  }
}

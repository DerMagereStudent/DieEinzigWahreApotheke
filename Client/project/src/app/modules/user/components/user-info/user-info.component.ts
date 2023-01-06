import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserInfo } from 'src/app/modules/shared/models/UserInfo';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  public userInfo?: UserInfo;

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.userService.userInfo.pipe(takeUntil(this.unsubscribe)).subscribe({
      next: info => this.userInfo = info
    });

    await this.userService.getUserInfo();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

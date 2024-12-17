import { Component } from '@angular/core';
import {UserModel} from "../../shared/models/user.model";
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  user: UserModel = {} as UserModel;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    const userId = this.userService.getSavedUserId();
    if (userId) {
      this.userService.getUserInfo(userId).subscribe((user: any) => {
        this.user = user[0];
      });
    }
  }
}

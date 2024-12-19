import { Component } from '@angular/core';
import { UserModel } from '../../shared/models/user.model';
import { UserService } from '../../core/services/user.service';
import {PayementModel} from "../../shared/models/payement.model";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  user: UserModel = {} as UserModel;
  userOrders: PayementModel[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUserInfos();
    this.loadOrders();
  }

  loadUserInfos() {
    const userId = this.userService.getSavedUserId();
    if (userId) {
      this.userService.getUserInfo(userId).subscribe((user: any) => {
        this.user = user[0];
      });
    }
  }

  loadOrders() {
    const userId = this.userService.getSavedUserId();
    if (userId) {
      this.userService.getUserOrders(userId).subscribe((orders) => {
        this.userOrders = orders;
      });
    }
  }
}

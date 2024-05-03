import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent {
  arrUsers: User[] = []
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'role', 'email', 'password', 'date_of_birth', 'address'];
  constructor(private userService: UserService) {
      this.userService.getUsers().subscribe(
        data => {
          this.arrUsers = data;
          console.log(this.arrUsers);
        }
      )
  }
}

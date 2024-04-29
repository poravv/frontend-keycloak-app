import { Component, OnInit } from '@angular/core';
import { IUser } from '../../model/User';
import { UsersService } from '../../services/user/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit{
  isModelOpen = false;
  users!: IUser[];
  user!: IUser;
  
  constructor(
    private userService: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        if (response) {
          this.users=response;
        }
      },
    });
  }

  loadUser(user: IUser) {
    this.user = user;
    this.openModel();
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        this.toastr.success("Eliminacion satisfactoria"+response);
        this.getAllUsers();
      },
    });
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllUsers();
  }

 }

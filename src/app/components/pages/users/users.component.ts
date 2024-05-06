import { Component, OnInit } from '@angular/core';
import { IUser } from '../../model/User';
import { UsersService } from '../../services/user/users.service';
import { ToastrService } from 'ngx-toastr';
import { GroupsService } from '../../services/groups/groups.service';

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
    private toastr: ToastrService,
    private groupService: GroupsService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        if (response) {
          console.log(response)
          this.users=response;
        }
      },
    });
  }

  getMyGroup(userId:string){
    this.groupService.getGroups(userId).subscribe({
      next: (response) => {
        console.log(response);
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
        this.toastr.success("Eliminacion satisfactoria "+response);
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

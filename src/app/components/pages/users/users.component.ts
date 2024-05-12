import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/user/users.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../model/UserModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit{
  isModelOpen = false;
  user!: UserModel;
  dataTable!: MatTableDataSource<UserModel>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort!: MatSort;

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'username','roles','accion'];
  
  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    //private groupService: GroupsService
  ) {}

  ngOnInit(): void {
    this.getUserSucursal();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        if (response) {
          //console.log(response)
          this.dataTable=response;
          this.dataTable.paginator = this.paginator;
          this.dataTable.sort = this.sort;
        }
      },
    });
  }

  getUserSucursal() {
    this.userService.getAllUsersForSucursal().subscribe({
      next: (response) => {
        if (response) {
          this.dataTable=response;
          this.dataTable.paginator = this.paginator;
          this.dataTable.sort = this.sort;
        }
      }
    });
    /*
    this.userService.getMyGroup().subscribe({
      next: (response) => {
        if (response) {
          //console.log(response[0].id)
          this.dataTable= new MatTableDataSource<UserModel>;
          this.groupService.getGroupMembers(response[0].id).subscribe({
            next: (response) => {
              if (response) {
                this.dataTable=response;
                this.dataTable.paginator = this.paginator;
                this.dataTable.sort = this.sort;
              }
            }
          });
        }
      },
    });
    */
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        this.toastr.success("Eliminacion satisfactoria "+response);
        this.getAllUsers();
      },
    });
  }
 }

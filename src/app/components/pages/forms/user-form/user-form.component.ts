import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/user/users.service';

import { UserModel } from '../../../model/UserModel';
import { RolesModel } from 'src/app/components/model/RolesModel';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { RolesService } from 'src/app/components/services/roles/roles.service';
import { GroupsService } from 'src/app/components/services/groups/groups.service';
import { UserGroupModel } from 'src/app/components/model/GroupsModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  data: UserModel | null = null;
  userForm!: FormGroup;
  roles!: [RolesModel];
  userGroups!: [UserGroupModel];
  roleSelected: any[] = [];
  groupSelected: any;
  userId: string;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private rolesService: RolesService,
    private groupServices: GroupsService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router) {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id') ?? "";
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['']
    });
  }

  dataSet() {
    if (this.userId) {
      this.usersService.getUserId(this.userId).subscribe({
        next: (userRes: UserModel) => {
          //console.log(userRes);
          this.data = userRes;
          this.resetUserForm();
          this.userForm.get("username")?.disable();
          this.userForm.get("username")?.setValue(userRes.username);
          this.userForm.get("email")?.setValue(userRes.email);
          this.userForm.get("firstName")?.setValue(userRes.firstName);
          this.userForm.get("lastName")?.setValue(userRes.lastName);
        },
      });
    }
  }

  ngOnInit(): void {
    this.getAllRoles();
    this.getAllGroups();
    this.dataSet();
  }

  getAllRoles() {
    this.rolesService.getRoles().subscribe({
      next: (response) => {
        if (response) {
          //console.log(response);
          this.roles = response;
        }
      }
    });
  }

  getAllGroups() {
    this.groupServices.getGroups().subscribe({
      next: (response) => {
        if (response) {
          //console.log(response);
          this.userGroups = response;
        }
      },
    });
  }

  checkRoles(event: MatCheckboxChange) {
    //console.log(typeof event.checked);
    //console.log(event.source.id);
    //console.log(event.source.name);
    if (event.checked === true) {
      this.roleSelected.push(new RolesModel(event.source.id, event.source.name ?? ""));
      //console.log(this.roleselected);
    } else {
      this.roleSelected.map((data, index) => {
        if (data.id == event.source.id) {
          this.roleSelected.splice(index, 1);
        }
      });
      //console.log(this.roleselected);
    }
  }

  clearForm() {
    this.resetUserForm();
  }

  cancel() {
    this.resetUserForm();
    this.data=null;
    this.router.navigate(['users/list']);
  }

  ngOnChanges(): void {
    if (this.data != null) {
      this.userForm.patchValue({
        username: this.data.username,
        email: this.data.email,
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        password: this.data.password,
      });
    }
  }

  onSubmit() {
    if (this.data != null) {
      delete this.userForm.value.password;
      this.usersService
        .updateUser(this.data.id ?? "", this.userForm.value)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.resetUserForm();
            this.router.navigate(['users/list']);
            this.openMessage("Actualización satisfactoria");
          },
        });
    } else {
      if (this.userForm.valid && this.groupSelected != null) {
        this.userForm.value.credentials = [{
          "temporary": false,
          "type": "Password",
          "value": this.userForm.value.password
        }];
        this.userForm.value.attributes = { "sucursal": this.groupSelected.id };
        this.userForm.value.enabled = true;
        delete this.userForm.value.password;

        this.usersService.createUser(this.userForm.value).subscribe(() => {
          this.usersService.getUser(this.userForm.value.username).subscribe((userRes) => {
            //console.log(result[0].id);
            if (userRes) {
              if (userRes[0].id) {
                this.usersService.createUserRole(userRes[0].id, this.roleSelected).subscribe((roleRes) => {
                  if (roleRes == null) {
                    console.log(userRes);
                    this.resetUserForm();
                    this.router.navigate(['users/list']);
                    this.openMessage("Creación satisfactoria");
                  }
                }, error => {
                  console.log("Error", error.error);
                  this.openMessage(error.error.errorMessage);
                });
              }
            }
          });

        }, error => {
          console.log("Error", error.error);
          this.openMessage(error.error.errorMessage);
        });
      } else {
        this.userForm.markAllAsTouched();
        //this.toastr.error("Complete datos requeridos");
      }
    }


  }

  resetUserForm() {
    this.userForm.reset();
    this.groupSelected = null;
    this.roleSelected = [];
    //this.data = null;
  }

  openMessage(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3 * 1000,
    });
  }
}

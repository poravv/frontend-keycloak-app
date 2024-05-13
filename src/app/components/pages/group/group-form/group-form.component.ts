import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from 'src/app/components/services/groups/groups.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserGroupModel } from 'src/app/components/model/GroupsModel';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {
  data: UserGroupModel | null = null;
  groupForm!: FormGroup;
  groups!: [UserGroupModel];
  groupId: string;

  constructor(
    private fb: FormBuilder,
    private groupServices: GroupsService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router) {
    this.groupId = this.activatedRoute.snapshot.paramMap.get('id') ?? "";
    this.groupForm = this.fb.group({
      name: ['', Validators.required],
      path: ['', Validators.required]
    });
  }

  dataSet() {
    if (this.groupId) {
      this.groupServices.getGroupsForId(this.groupId).subscribe({
        next: (groupRes: UserGroupModel) => {
          this.data = groupRes;
          this.resetUserForm();
          this.groupForm.get("path")?.disable();
          this.groupForm.get("name")?.setValue(groupRes.name);
          this.groupForm.get("path")?.setValue(groupRes.path);
        },
      });
    }
  }

  ngOnInit(): void {
    this.getAllGroups();
    this.dataSet();
  }

  clearForm() {
    this.resetUserForm();
  }

  cancel() {
    this.resetUserForm();
    this.data = null;
    this.router.navigate(['group/list']);
  }

  ngOnChanges(): void {
    if (this.data != null) {
      this.groupForm.patchValue({
        name: this.data.name,
        path: this.data.path
      });
    }
  }

  getAllGroups() {
    this.groupServices.getGroups().subscribe({
      next: (response) => {
        if (response) {
          //console.log(response);
          this.groups = response;
        }
      },
    });
  }

  onSubmit() {
    if (this.data != null) {
      delete this.groupForm.value.password;
      this.groupServices
        .updateGroup(this.data.id ?? "", this.groupForm.value)
        .subscribe({
          next: (response) => {
            //console.log(response);
            this.resetUserForm();
            this.router.navigate(['group/list']);
            this.openMessage("Actualización satisfactoria");
          },
        });
    } else {
      if (this.groupForm.valid) {
        this.groupServices.createUser(this.groupForm.value).subscribe(() => {
          this.resetUserForm();
          this.router.navigate(['group/list']);
          this.openMessage("Creación satisfactoria");

        }, error => {
          console.log("Error", error.error);
          this.openMessage(error.error.errorMessage);
        });
      } else {
        this.groupForm.markAllAsTouched();
        //this.toastr.error("Complete datos requeridos");
      }
    }
  }

  resetUserForm() {
    this.groupForm.reset();
    //this.data = null;
  }

  openMessage(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3 * 1000
    });
  }
}

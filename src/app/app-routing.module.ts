import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { UsersComponent } from './components/pages/users/users.component';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { UserFormComponent } from './components/pages/forms/user-form/user-form.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'users', 
    children:[
      {path:'list',component: UsersComponent},
      {path:'create',component: UserFormComponent},
      {path:'edit/:id',component: UserFormComponent}
    ]
  },
  {path:'projects', component: ProjectsComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

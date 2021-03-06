import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddProjectComponent } from "./community/add-project/add-project.component";
import { JournalDiaryComponent } from "./components/journal-diary/journal-diary.component";
import { PrivacyComponent } from "./components/privacy/privacy.component";
import { ViewJournalDiaryComponent } from "./components/view-journal-diary/view-journal-diary.component";
import { BlogComponent } from "./console/blog/blog.component";
import { PublishComponent } from "./console/publish/publish.component";
import { ViewPostComponent } from "./console/view-post/view-post.component";
import { AdminAuthGuard } from "./guards/admin-auth.guard";
import { AuthGuard } from "./guards/auth.guard";
import { RegisterGuard } from "./guards/register.guard";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";
import { MentoringComponent } from "./layouts/mentoring/mentoring.component";
import { ChatComponent } from "./peer/chat/chat.component";
import { MentorsComponent } from "./peer/mentors/mentors.component";
import { RespondComponent } from "./peer/respond/respond.component";
import { CompletedComponent } from "./shared/completed/completed.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent, canActivate: [AuthGuard],
    children: [
      // { path: "dashboard", component: DashboardComponent },
      { path: "dashboard", component: SettingsComponent },
      { path: "publish", component: PublishComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "done", component: CompletedComponent },
      { path: "diary", component: JournalDiaryComponent },
      { path: "view-diary/:id", component: ViewJournalDiaryComponent },
      { path: "add-project", component: AddProjectComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },


    // admin views
    {
      path: "mentoring",
      component: MentoringComponent, canActivate: [AuthGuard],
      children: [
        // { path: "dashboard", component: DashboardComponent },
      
        { path: "chat", component: MentorsComponent },
        { path: "chatroom/:id", component: ChatComponent },
        { path: "", redirectTo: "chat", pathMatch: "full" },
        { path: "respond/:id", component: RespondComponent },
      ],
    },


  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "profile", component: ProfileComponent },
  { path: "post/:id", component: ViewPostComponent },
  { path: "blog", component: BlogComponent },
  { path: "ysn", component: LandingComponent },
  { path: "privacy", component: PrivacyComponent },
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [AuthGuard, RegisterGuard, AdminAuthGuard]
})
export class AppRoutingModule {}

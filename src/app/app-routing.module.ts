import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { PersonalityTestComponent } from './personality-test/personality-test.component';

const routes: Routes = [
  { path: "onboarding", component: OnboardingComponent, pathMatch: "full" },
  { path: "test", component: PersonalityTestComponent, pathMatch: "full" },
  { path: "**", redirectTo: "onboarding" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

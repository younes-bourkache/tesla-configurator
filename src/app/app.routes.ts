import { Routes } from '@angular/router';
import { ModelComponent } from './configurator/model/model.component';
import { OptionComponent } from './configurator/option/option.component';
import { SummaryComponent } from './configurator/summary/summary.component';
import { optionsGuard } from './configurator/guards/options.guard';
import { summaryGuard } from './configurator/guards/summary.guard';

export const routes: Routes = [
    {path:'step1',component:ModelComponent},
    {path:'step2',component:OptionComponent, canActivate:[optionsGuard]},
    {path:'step3',component:SummaryComponent, canActivate:[summaryGuard]},
    {path:'**', redirectTo:'step1'},
];

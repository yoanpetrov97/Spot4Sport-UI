import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CourtsComponent} from "./components/courts/courts.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { ReservationsComponent } from './components/reservations/reservations.component';
import { UsersComponent } from './components/users/users.component';
import { EventsComponent } from './components/events/events.component';

@NgModule({
    declarations: [
        AppComponent,
        CourtsComponent,
        ReservationsComponent,
        UsersComponent,
        EventsComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        HttpClientModule,
        RouterModule.forRoot([
            {
                path: "reservations",
                component: ReservationsComponent
            },
            {
                path: "courts",
                component: CourtsComponent
            },
            {
                path: "events",
                component: EventsComponent
            },
            {
                path: "users",
                component: UsersComponent
            },
            {path: "", redirectTo: "/courts", pathMatch: "full"},
            {
                path: "**",
                component: CourtsComponent
            },
        ]),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

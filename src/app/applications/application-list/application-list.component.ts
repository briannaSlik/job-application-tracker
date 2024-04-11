import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Application } from "../application.model";
import { ApplicationService } from "../application.service";

@Component({
    selector: 'jat-application-list',
    templateUrl: './application-list.component.html',
    styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit, OnDestroy{
    applications: Application[] = [];
    applicationSub: Subscription;

    constructor(public applicationService: ApplicationService) {}

    ngOnInit() {
        this.applicationService.getApplications()
        this.applicationSub = this.applicationService.getApplicationUpdateListener()
        .subscribe((applications: Application[]) => {
            this.applications = applications;
            console.log(this.applications)
        });
    }

    onDelete(id: string) {
        this.applicationService.deleteApplication(id);
    }

    ngOnDestroy(): void {
        this.applicationSub.unsubscribe();
    }
}
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ApplicationService } from '../application.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Application } from '../application.model';

@Component({
    selector: 'jat-application-create',
    templateUrl: './application-create.component.html',
    styleUrls: ['./application-create.component.css']
})
export class ApplicationCreateComponent implements OnInit {
    private mode: string = 'create';
    private id: string;
    application: Application;

    constructor(public applicationService: ApplicationService, public route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.mode = 'edit';
                this.id = paramMap.get('id');
                this.applicationService.getApplication(this.id).subscribe(applicationData => {
                    this.application = {
                        id: applicationData._id,
                        title: applicationData.title,
                        company: applicationData.company,
                        salary: applicationData.salary,
                        location: applicationData.location,
                        hours: applicationData.hours,
                        link: applicationData.link
                    }
                });
            } else {
                this.mode = 'create';
                this.id = null;
            }
        });
    }

    onSaveApplication(form: NgForm) {
        if (form.invalid) {
            return;
        }
        
        const application = {
            title: form.value.title,
            company: form.value.company,
            salary: form.value.salary,
            location: form.value.location,
            hours: form.value.hours,
            link: form.value.link
        }

        if (this.mode === 'create') {
            this.applicationService.createApplication(application);
            form.resetForm();
        } else {
            application['id'] = this.id;
            this.applicationService.updateApplication(application)
        }
    }
}
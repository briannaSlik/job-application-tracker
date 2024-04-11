import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'

import { Application } from './application.model';

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    private applications: Application[] = [];
    private applicationsUpdated = new Subject<Application[]>();

    constructor(private http: HttpClient) { }

    getApplication(id: string){
        return this.http.get<{_id: string, title: string, company: string, salary: string, location: string, hours: string, link: string}>('http://localhost:3000/api/applications/' + id);
    }
    
    getApplications() {
        this.http.get<{ message: string, applications: any }>('http://localhost:3000/api/applications')
        .pipe(map((data) => {
            return data.applications.map(application => {
                return {
                    id: application._id,
                    title: application.title,
                    company: application.company,
                    salary: application.salary,
                    location: application.location,
                    hours: application.hours,
                    link:  application.link
                }
            })
        }))   
        .subscribe((data) => {
                this.applications = data;
                this.applicationsUpdated.next([...this.applications])
            })
    }

    getApplicationUpdateListener() {
        return this.applicationsUpdated.asObservable();
    }

    createApplication(applicationData) {
        const application: Application = { 
            id: null, 
            title: applicationData.title, 
            company: applicationData.company,
            salary: applicationData.salary,
            location: applicationData.location,
            hours: applicationData.hours,
            link: applicationData.link
         };
        this.http.post<{ message: string, id: string }>('http://localhost:3000/api/applications', application)
            .subscribe((responseData) => {
                const id = responseData.id;
                application.id = id;
                this.applications.push(application);
                this.applicationsUpdated.next([...this.applications]);
            })
    }

    updateApplication(applicationData){
        const application: Application = { 
            id: applicationData.id, 
            title: applicationData.title, 
            company: applicationData.company,
            salary: applicationData.salary,
            location: applicationData.location,
            hours: applicationData.hours,
            link: applicationData.link
        };
        // console.log(application)
        this.http.put('http://localhost:3000/api/applications/' + applicationData.id, application)
            .subscribe(response => {
                const updatedApplications = [...this.applications];
                const oldApplicationIndex = updatedApplications.findIndex(a => a.id === application.id);
                updatedApplications[oldApplicationIndex] = application;
                this.applications = updatedApplications;
                this.applicationsUpdated.next([...this.applications])
            });
    }

    deleteApplication(id: string){
        this.http.delete("http://localhost:3000/api/applications/" + id)
            .subscribe(() => {
                this.applications = this.applications.filter(application => application.id !== id);
                this.applicationsUpdated.next([...this.applications])
            })
    }
}
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import filestack from 'filestack-js';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit, AfterViewInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    notes = [
        {
            name: "Default note",
            content: "This is the default note. You can add new notes by clicking on the \"create a note\" button above. New notes will be added in this section."
        }
    ];
    showModal: Boolean = false;
    apiKey: String = 'A9CFNM6bKS2qOfMvu8SSQz';
    textAreaContent: string;

    constructor() {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    openCompose() {
        this.textAreaContent = "";
        this.showModal = true;
    }
    closeCompose() {
        this.showModal = false;
    }

    addNote() {
        let name = (<HTMLInputElement>document.getElementById("noteName")).value;
        let content = document.getElementById("noteContent").innerHTML;
        if(name.length && content.length) {
            this.notes.unshift({
                name: name,
                content: content
            })
        }
        this.showModal = false;
    }

    uploadPhotos() {
        const client = filestack.init(this.apiKey);
        client.pick({
            accept: ['.jpg', '.png', '.svg'],
            maxFiles: 1
        }).then(function (result) {
            return result.filesUploaded[0].url;
        }).then(fileUrl => {
            document.getElementById("noteContent").innerHTML += "<img style=\"padding: 5px\" class=\"col-xs-12\" src=\""+ fileUrl +"\" height=\"auto\" width=\"100%\"/><br>";
            this.textAreaContent = document.getElementById("noteContent").innerHTML;
        });
    }


    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}

import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-alumnos-unayoe',
    templateUrl: './alumnos-unayoe.component.html',
    styleUrls: ['./alumnos-unayoe.component.css']
})
export class AlumnosUnayoeComponent implements OnInit {

    ngOnInit() {
    }


    constructor() {

    }

    selected = ['pizza-1'];

    foods =[
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];

}

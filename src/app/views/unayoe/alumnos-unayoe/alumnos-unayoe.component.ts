import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-alumnos-unayoe',
  templateUrl: './alumnos-unayoe.component.html',
  styleUrls: ['./alumnos-unayoe.component.css']
})
export class AlumnosUnayoeComponent implements OnInit {

  ngOnInit() {
  }

  visible: boolean = true;
  selectableEvalPsi: boolean = true;
  removableEvalPsi: boolean = true;
  addOnBlurEvalPsi: boolean = false;

  separatorKeysCodes = [ENTER, COMMA];

  testCtrl = new FormControl();

  filteredTests: Observable<any[]>;

  tests = [
    'Lemon',
  ];

  allTests = [
    'Apple',
    'Lemon',
    'Lime',
    'Orange',
    'Strawberry'
  ];

  @ViewChild('testInput') testInput: ElementRef;

  constructor() {

  }

  addTest(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tests.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.testCtrl.setValue(null);
  }

  removeTest(test: any): void {
    const index = this.tests.indexOf(test);

    if (index >= 0) {
      this.tests.splice(index, 1);
    }
  }

  filter(name: string) {
    return this.allTests.filter(fruit =>
        fruit.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selectedTest(event: MatAutocompleteSelectedEvent): void {
    this.tests.push(event.option.viewValue);
    this.testInput.nativeElement.value = '';
    this.testCtrl.setValue(null);
  }
}

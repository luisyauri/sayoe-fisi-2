import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiPerfilDialogComponent } from './mi-perfil-dialog.component';

describe('MiPerfilDialogComponent', () => {
  let component: MiPerfilDialogComponent;
  let fixture: ComponentFixture<MiPerfilDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiPerfilDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiPerfilDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

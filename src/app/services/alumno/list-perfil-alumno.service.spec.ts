import { TestBed } from '@angular/core/testing';

import { ListPerfilAlumnoService } from './list-perfil-alumno.service';

describe('ListPerfilAlumnoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListPerfilAlumnoService = TestBed.get(ListPerfilAlumnoService);
    expect(service).toBeTruthy();
  });
});

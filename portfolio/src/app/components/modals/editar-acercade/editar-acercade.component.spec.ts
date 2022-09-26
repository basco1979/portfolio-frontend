import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAcercadeComponent } from './editar-acercade.component';

describe('EditarAcercadeComponent', () => {
  let component: EditarAcercadeComponent;
  let fixture: ComponentFixture<EditarAcercadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAcercadeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAcercadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

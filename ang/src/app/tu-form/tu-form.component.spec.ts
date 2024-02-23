import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuFormComponent } from './tu-form.component';

describe('TuFormComponent', () => {
  let component: TuFormComponent;
  let fixture: ComponentFixture<TuFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TuFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

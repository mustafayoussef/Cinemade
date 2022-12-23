import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TVSComponent } from './tvs.component';

describe('TVSComponent', () => {
  let component: TVSComponent;
  let fixture: ComponentFixture<TVSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TVSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TVSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

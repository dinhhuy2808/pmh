import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPhongThuyComponent } from './app-phong-thuy.component';

describe('AppPhongThuyComponent', () => {
  let component: AppPhongThuyComponent;
  let fixture: ComponentFixture<AppPhongThuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPhongThuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPhongThuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

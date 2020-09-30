import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmessageComponent } from './vmessage.component';

describe('VmessageComponent', () => {
  let component: VmessageComponent;
  let fixture: ComponentFixture<VmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthInterfaceComponent } from './user-auth-interface.component';

describe('UserAuthInterfaceComponent', () => {
  let component: UserAuthInterfaceComponent;
  let fixture: ComponentFixture<UserAuthInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAuthInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAuthInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

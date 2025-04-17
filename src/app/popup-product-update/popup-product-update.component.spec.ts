import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupProductUpdateComponent } from './popup-product-update.component';

describe('PopupProductUpdateComponent', () => {
  let component: PopupProductUpdateComponent;
  let fixture: ComponentFixture<PopupProductUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupProductUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupProductUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

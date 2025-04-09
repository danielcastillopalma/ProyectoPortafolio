import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrlabPage } from './qrlab.page';

describe('QrlabPage', () => {
  let component: QrlabPage;
  let fixture: ComponentFixture<QrlabPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrlabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBadgeComponent } from './status-badge.component';
import { TitleCasePipe } from '@angular/common';

describe('StatusBadgeComponent', () => {
  let component: StatusBadgeComponent;
  let fixture: ComponentFixture<StatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleCasePipe, StatusBadgeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default status and class', () => {
    expect(component.status).toBe('active');
    expect(component.cssClass).toBe('bg-success');
  });

  it('should update cssClass when status changes', () => {
    component.status = 'pending';
    component.ngOnChanges();
    expect(component.cssClass).toBe('bg-warning');

    component.status = 'approved';
    component.ngOnChanges();
    expect(component.cssClass).toBe('bg-info');

    component.status = 'active';
    component.ngOnChanges();
    expect(component.cssClass).toBe('bg-success');

    component.status = 'denied';
    component.ngOnChanges();
    expect(component.cssClass).toBe('bg-danger');

    component.status = 'expired';
    component.ngOnChanges();
    expect(component.cssClass).toBe('bg-danger');

    component.status = 'other';
    component.ngOnChanges();
    expect(component.cssClass).toBe('bg-secondary');
  });

  it('should display the status with title case', () => {
    component.status = 'active';
    fixture.detectChanges();

    const badgeElement: HTMLElement = fixture.nativeElement.querySelector('span.badge');
    expect(badgeElement.textContent?.trim()).toBe('Active');
  });
});

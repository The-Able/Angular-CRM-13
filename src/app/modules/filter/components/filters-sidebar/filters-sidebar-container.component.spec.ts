import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersSidebarContainerComponent } from './filters-sidebar-container.component';

describe('DivorceLeadFiltersSidebarComponent', () => {
  let component: FiltersSidebarContainerComponent;
  let fixture: ComponentFixture<FiltersSidebarContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersSidebarContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersSidebarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

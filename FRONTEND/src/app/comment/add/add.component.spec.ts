import { ComponentFixture, TestBed } from '@angular/core/testing';

import { addCommentComponent } from './add.component';

describe('AddComponent', () => {
  let component: addCommentComponent;
  let fixture: ComponentFixture<addCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ addCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(addCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFavoriteTopicsComponent } from './dialog-favorite-topics.component';

describe('DialogFavoriteTopicsComponent', () => {
  let component: DialogFavoriteTopicsComponent;
  let fixture: ComponentFixture<DialogFavoriteTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFavoriteTopicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFavoriteTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

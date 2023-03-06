import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnecdoteComponent } from './create-anecdote.component';

describe('CreateAnecdoteComponent', () => {
  let component: CreateAnecdoteComponent;
  let fixture: ComponentFixture<CreateAnecdoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAnecdoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAnecdoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

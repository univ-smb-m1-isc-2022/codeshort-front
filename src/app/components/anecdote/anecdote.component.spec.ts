import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnecdoteComponent } from './anecdote.component';

describe('AnecdoteComponent', () => {
  let component: AnecdoteComponent;
  let fixture: ComponentFixture<AnecdoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnecdoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnecdoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

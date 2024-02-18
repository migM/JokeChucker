import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { ShareModalComponent } from './share-modal.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ShareModalComponent', () => {
  let component: ShareModalComponent;
  let fixture: ComponentFixture<ShareModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ShareModalComponent>>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(waitForAsync(() => {
    const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [ShareModalComponent],
      
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ShareModalComponent>>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create the top bar component', () => {
    expect(component).toBeTruthy();
  });

  it('should open Twitter with joke text', () => {
    const jokeText = 'This is a joke';
    spyOn(window, 'open');
    component.tweet(jokeText);
    const expectedUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(jokeText)}`;
    expect(window.open).toHaveBeenCalledWith(expectedUrl, '_blank');
  });
  
  it('should copy text to clipboard', () => {
    const jokeText = 'This is a joke';
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    component.copyText(jokeText);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(jokeText);
  });
});

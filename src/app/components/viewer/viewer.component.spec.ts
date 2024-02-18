import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ViewerComponent } from './viewer.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ViewerComponent', () => {
  let component: ViewerComponent;
  let fixture: ComponentFixture<ViewerComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  let matDialogSpy: { open: jasmine.Spy };
  let matSnackBarSpy: { open: jasmine.Spy };
 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewerComponent, 
                     TopBarComponent, 
                     FooterComponent
                    ],
                    schemas: [
                      CUSTOM_ELEMENTS_SCHEMA
                    ],

      imports: [HttpClientTestingModule, 
                RouterTestingModule, 
               ],
                
      providers: [{provide: MatDialog, useValue: matDialogSpy},
                 {provide: MatSnackBar, useValue: matSnackBarSpy},
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    });

    it('should call checkForSensitiveContent method and update flags - option death', () => {
      const jokeValue = 'This is a death joke';
      component.checkForSensitiveContent(jokeValue);
      
      expect(component.deathJoke).toBeTrue();
      expect(component.isSensitive).toBeFalse();
      expect(component.chuckKicked).toBeFalse();
    });   
      
    it('should call checkForSensitiveContent method and update flags - option sensitive', () => {
      const jokeValue = 'This is a fuck joke';
      component.checkForSensitiveContent(jokeValue);
      
      expect(component.deathJoke).toBeFalse();
      expect(component.isSensitive).toBeTruthy();
      expect(component.chuckKicked).toBeFalse();
      });

    it('should call checkForSensitiveContent method and update flags - option sensitive', () => {
      const jokeValue = 'This is a kick joke';
      component.checkForSensitiveContent(jokeValue);
      
      expect(component.deathJoke).toBeFalse();
      expect(component.isSensitive).toBeFalse();
      expect(component.chuckKicked).toBeTrue();
      });
        
      it('should call checkForSensitiveContent method and update flags - not specific case', () => {
      const jokeValue = 'This is a random joke';
      component.checkForSensitiveContent(jokeValue);
      expect(component.deathJoke).toBeFalse();
      expect(component.isSensitive).toBeFalse();
      expect(component.chuckKicked).toBeFalse();
      });
});

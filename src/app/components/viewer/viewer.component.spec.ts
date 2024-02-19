import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { ViewerComponent } from './viewer.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ViewerComponent', () => {
  let component: ViewerComponent;
  let fixture: ComponentFixture<ViewerComponent>;
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

    it('should call getJoke method - error', () => {
      const spyGet = spyOn(component['http'], 'get').and.returnValue(throwError(() => new Error('error')))
      const spyCheckSensitiveContent = spyOn(component, 'checkForSensitiveContent').and.stub();
      const timesChuckedBefore = component.timesChucked;
        
      component.getJoke();
      expect(component.timesChucked).toEqual(timesChuckedBefore)
      expect(spyGet).toHaveBeenCalled();
      expect(spyCheckSensitiveContent).not.toHaveBeenCalled();
    });

    it('should call getJoke method - success', fakeAsync(()=> {
      const spyGet = spyOn(component['http'], 'get').and.returnValue(of({value: 'my joke'}))
      const spyCheckSensitiveContent = spyOn(component, 'checkForSensitiveContent').and.stub();
          
      component.getJoke();
      tick();
          
      expect(spyGet).toHaveBeenCalled();
      expect(spyCheckSensitiveContent).toHaveBeenCalledWith('my joke');
      expect(component.jokeValue).toEqual('my joke');
    }));

    it('should set category to "celebrity" when category is "celebrity"', () => {
      component.onCategorySelected('celebrity');
      expect(component.category).toEqual('celebrity');
    });
    
    it('should set category to "political" when category is "political"', () => {
      component.onCategorySelected('political');
      expect(component.category).toEqual('political');
    });
    
    it('should set category to "dev" when category is "dev"', () => {
      component.onCategorySelected('dev');
      expect(component.category).toEqual('dev');
    });
    
    it('should set category to empty string when category is "random"', () => {
      component.onCategorySelected('');
      expect(component.category).toEqual('');
    });
  
});

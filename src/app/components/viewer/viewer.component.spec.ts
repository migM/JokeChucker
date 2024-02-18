import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ViewerComponent } from './viewer.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

fdescribe('ViewerComponent', () => {
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
});

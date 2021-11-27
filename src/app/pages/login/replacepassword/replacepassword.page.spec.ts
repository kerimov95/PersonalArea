import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReplacepasswordPage } from './replacepassword.page';

describe('ReplacepasswordPage', () => {
  let component: ReplacepasswordPage;
  let fixture: ComponentFixture<ReplacepasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplacepasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReplacepasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

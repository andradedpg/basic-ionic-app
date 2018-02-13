import { SelectListComponent } from './../components/select-list/select-list';
import { CameraServiceProvider } from './../providers/camera-service/camera-service';
import { Camera } from '@ionic-native/camera';
// import { CameraPreview } from '@ionic-native/camera-preview';
import { LoaderService } from './../providers/loader';
import { Clipboard } from '@ionic-native/clipboard';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { NativeStorage } from '@ionic-native/native-storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// import { ZBar } from '@ionic-native/zbar';

// Pages
import { MyApp } from './app.component';
import { FormPage } from './../pages/form/form-page';
import { HomePage } from './../pages/home/home';
import { LoginPage } from '../pages/login/login';
// Services
import { ConfigService } from './../providers/config-service';
import { HttpService } from './../providers/http-service';
import { ConnectivityService } from './../providers/connectivity-service';
import { LoginProvider } from '../providers/login/login';

// Component


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    FormPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    FormPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ConnectivityService,
    ConfigService,
    HttpService,
    NativeGeocoder,
    LaunchNavigator,
    NativeStorage,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginProvider,
    ScreenOrientation,
    Clipboard,
    LoaderService,
    BarcodeScanner,
    CameraServiceProvider,
    Camera
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
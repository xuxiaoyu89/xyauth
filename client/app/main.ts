import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module.ts';
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js');
import 'rxjs';


const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);

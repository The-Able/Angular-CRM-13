/* tslint:disable:object-literal-sort-keys */
import { IgxCalendarModule, IgxCardModule, IgxDialogModule } from 'igniteui-angular';
import { AppModuleConfig } from './core/AppModuleConfig';
import { Config } from './core/Config';
import { IConfigGenerator } from './core/IConfigGenerator';
import { CalendarComponent } from '../../src/app/samples/calendar/calendar.component';
import { CalendarSample1Component } from '../../src/app/samples/calendar/calendar-sample-1/calendar-sample-1.component';
import { CalendarSample2Component } from '../../src/app/samples/calendar/calendar-sample-2/calendar-sample-2.component';
import { CalendarSample3Component } from '../../src/app/samples/calendar/calendar-sample-3/calendar-sample-3.component';
import { CalendarSample4Component } from '../../src/app/samples/calendar/calendar-sample-4/calendar-sample-4.component';
import { CalendarSample5Component } from '../../src/app/samples/calendar/calendar-sample-5/calendar-sample-5.component';

export class CalendarConfigGenerator implements IConfigGenerator {
    public generateConfigs(): Config[] {
        const configs = new Array<Config>();

        configs.push(new Config({
            component: CalendarComponent,
            appModuleConfig: new AppModuleConfig({
                imports: [IgxCardModule, IgxCalendarModule, CalendarComponent],
                ngDeclarations: [CalendarComponent],
                ngImports: [IgxCardModule, IgxCalendarModule]
            })
        }));

        configs.push(new Config({
            component: CalendarSample1Component,
            appModuleConfig: new AppModuleConfig({
                imports: [IgxCalendarModule, CalendarSample1Component],
                ngDeclarations: [CalendarSample1Component],
                ngImports: [IgxCalendarModule]
            }),
            shortenComponentPathBy: '/calendar/'
        }));

        configs.push(new Config({
            component: CalendarSample2Component,
            appModuleConfig: new AppModuleConfig({
                imports: [IgxCalendarModule, CalendarSample2Component],
                ngDeclarations: [CalendarSample2Component],
                ngImports: [IgxCalendarModule]
            }),
            shortenComponentPathBy: '/calendar/'
        }));

        configs.push(new Config({
            component: CalendarSample3Component,
            appModuleConfig: new AppModuleConfig({
                imports: [IgxCalendarModule, IgxDialogModule, CalendarSample3Component],
                ngDeclarations: [CalendarSample3Component],
                ngImports: [IgxCalendarModule, IgxDialogModule]
            }),
            shortenComponentPathBy: '/calendar/'
        }));

        configs.push(new Config({
            additionalFiles: ['/src/app/date-parser.ts'],
            component: CalendarSample4Component,
            appModuleConfig: new AppModuleConfig({
                imports: [IgxCalendarModule, CalendarSample4Component],
                ngDeclarations: [CalendarSample4Component],
                ngImports: [IgxCalendarModule]
            })
        }));

        configs.push(new Config({
            component: CalendarSample5Component,
            appModuleConfig: new AppModuleConfig({
                imports: [IgxCalendarModule, IgxDialogModule, CalendarSample5Component],
                ngDeclarations: [CalendarSample5Component],
                ngImports: [IgxCalendarModule, IgxDialogModule]
            }),
            shortenComponentPathBy: '/calendar/'
        }));

        return configs;
    }
}

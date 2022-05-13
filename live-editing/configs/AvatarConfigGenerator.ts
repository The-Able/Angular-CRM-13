/* tslint:disable:object-literal-sort-keys */
import { IgxAvatarModule } from 'igniteui-angular';
import { AppModuleConfig } from './core/AppModuleConfig';
import { Config } from './core/Config';
import { IConfigGenerator } from './core/IConfigGenerator';
import { AvatarSample3Component } from '../../src/app/samples/avatar/avatar-sample-3/avatar-sample-3.component';

export class AvatarConfigGenerator implements IConfigGenerator {
    public generateConfigs(): Config[] {
        const configs = new Array<Config>();

        configs.push(new Config({
            component: AvatarSample3Component,
            appModuleConfig: new AppModuleConfig({
                imports: [IgxAvatarModule, AvatarSample3Component],
                ngDeclarations: [AvatarSample3Component],
                ngImports: [IgxAvatarModule]
            }),
            shortenComponentPathBy: '/avatar/'
        }));

        return configs;
    }
}

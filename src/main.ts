import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
export function getCurrentHost(): string {
  return window.location.href.split('/').reduce((_, __, ___, arr) => `${arr[0]}//${arr[2]}`, '');
}

const XHROpen = window.XMLHttpRequest.prototype.open;

window.XMLHttpRequest.prototype.open = function (method, url: string): void {
  const realm = environment.keycloakConfig.realm;
  const tokenURL = `/auth/realms/${realm}/protocol/openid-connect/token`;
  const accountURL = `/auth/realms/${realm}/account`;

  const re = new RegExp(`${tokenURL}|${accountURL}`, 'g');
  const match = url.match(re);

  if (match?.length > 0) {
    const currentHost = getCurrentHost();

    arguments[1] = `${currentHost}${match[0]}`;
    return XHROpen.apply(this, arguments);
  }

  return XHROpen.apply(this, arguments);
};

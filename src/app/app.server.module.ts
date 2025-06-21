import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app';

@NgModule({
  imports: [
    ServerModule,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}

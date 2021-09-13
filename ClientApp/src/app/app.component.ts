import { Component, AfterViewInit, NgZone, Renderer2, ElementRef, ViewChild } from '@angular/core';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouteConfigLoadStart, RouteConfigLoadEnd
} from '@angular/router'
import { ScriptLoader } from './core/script-loader'
import  { Environment } from './core/common/globals'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  title = 'Delta Dashboard';
  private requiredScripts: string[] = ["misc", "settings", "todolist"];

  /*
   * The activator to the global asynchronous loading mechanism
   */
  public isAsynchronous: boolean

  // holding a reference to the fading element
  @ViewChild('routeLoading')
  fadingElement: ElementRef

  constructor(router: Router, private ngZone: NgZone,
    private renderer: Renderer2, private scriptLoader: ScriptLoader, environment: Environment) {
    router.events.subscribe((event: any) => {
      //this.interceptNavigation(event, ngZone)
    })

    environment.asynchronousObserver.subscribe((x) => { this.isAsynchronous = x })
  }

  ngAfterViewInit() {
    // We do not load all scripts in a single instance  with main.js because jquery needs
    //to be fully loaded in order for the other scripts to function properly.
    this.scriptLoader.load(this.requiredScripts, "")
  }

  // https://stackoverflow.com/questions/37069609/show-loading-screen-when-navigating-between-routes-in-angular-2
  private interceptNavigation(event: RouterEvent, ngZone: NgZone): void {
    if (event instanceof RouteConfigLoadStart) {
      
      ngZone.runOutsideAngular(() => {
        this.renderer.setStyle(
          this.fadingElement.nativeElement,
          'animation', 'fading 1s infinite alternate'
        )
      })
    }

    if (event instanceof RouteConfigLoadEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError) {
      //this.hideSpinner()
    }
  }

  
  private hideSpinner(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.removeStyle(
        this.fadingElement.nativeElement,
        'animation'
      )
    })
  }
}

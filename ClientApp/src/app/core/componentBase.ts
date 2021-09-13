import { OnChanges, SimpleChanges } from "@angular/core";
import { take } from "rxjs/operators";
import { AppInjector } from "../app-injector.service";
import { ColorTable } from "./color-table";
import { DialogOptions, DialogResult, NotificationType, SmartTableParam, SmartTableResult } from "./core-interface";
import HttpContext from "./httpContext";
import ArialTranslate from "./translateService";
import { Environment } from "./common/globals";

declare var document;
declare function showNotification(color, text, icon, from, align, animateEnter, animateExit);
declare function showDialogWithIcon(title, text, type)
declare function showDialogWithOptions(title, text, type, showCancel, cancelText, okText): Promise<DialogResult>;
declare function showToaster(title, text, mode);

/**
 * A base class for all components
 *
 * This base class supplies basic services, methods, properties required by all pages to
 * perfom certain operations such as the @property httpClient service, loading functionality and lots more.
 *
 * Always call @method afterComponentInit in your component's @method ngAfterViewInit method to load scripts.
 * If the base @method afterComponentInit is not called, mobile
 * functionality may not work on your pages and the navbar will be hidden in devices with width lesser than 467px
 * 
 * Use the intellisense to learn more about these properties and methods*/
export default class ComponentBase  {

  /**
   * Auto imported HttpContext dependency to be used as a wrapper around the angular HttpClient
   */
  protected httpContext: HttpContext

  /**
   * A smart table object to be used for sorting, searching and pagination
   */
  public smartTableParam: SmartTableParam = new SmartTableParam();

  /**
   * A object resulting from a request made to the calling server requesting for paged items
   */
  public smartTableResult: SmartTableResult = new SmartTableResult();

  /**
   * A collection of string errors handled when an error occurs performing an operation
   */
  public validationErrors: string[] = new Array<string>();

  /**
   * The page's title to be used in the browser's tab title
   */
  public title: string;


/**
 * Activates a blur transparent visual style to inform the user that an async or remote operation
 * is in effect and should wait.
 *
 * This renders all components inactive until the operation is complete. The caller should deactive
 * the effect by setting property to false to deactivate the effect.
 * @param value Determines if the loader should be activated. Defaults to true
 */
  public set inAsyncMode(value: boolean){
    this.environment.inAsyncMode = value
  }

  /**
   * A url used to send a fetch request to the server requesting for items
   */
  protected paginationFetchUrl = "";

  private arialTranslate: ArialTranslate

  private environment: Environment

  // component inheritance methodology and manual resolve depency
  // https://devblogs.microsoft.com/premier-developer/angular-how-to-simplify-components-with-typescript-inheritance/
  /**
   * 
   * @param selector The component's tag selector
   */
  constructor(selector: string) {
    AppInjector.getInjector().pipe(take(1)).subscribe((injector) => {
      this.httpContext = injector.get(HttpContext)
      this.arialTranslate = injector.get(ArialTranslate)
      this.environment = injector.get(Environment)
    });
  }

  /**
   * Translates a string to the current request culture. The string is translated if the local translation
   * is found from the server
   * @param key The string to be locally translated
   */
  public translate(key: string) {
    return this.arialTranslate.translate(key)
  }

  /**
   * Performs an operation relating to data fetching from the server requesting for items
   * from the backing collection on a different page view with all existing parameters in place
   * @param $requestedPage
   */
  public changePage($requestedPage) {
    this.inAsyncMode = true
    this.smartTableParam.pagination.requestedPage = $requestedPage
    return this.httpContext.search<SmartTableResult>(this.paginationFetchUrl, this.smartTableParam).subscribe(
      (x) => {
        this.smartTableResult = x
        this.inAsyncMode = false;

        this.smartTableParam.pagination.pageSize = this.smartTableResult.pageSize;
        this.smartTableParam.pagination.requestedPage = this.smartTableResult.currentPage;
      }, (x)=> {
        this.inAsyncMode = false;
        this.handleError(x)
    })
  }

  /**
   * Search method used to call the server with the corresponding user search input parameters*/
  public search() {
    this.inAsyncMode = true
    //this.smartTableParam.pagination.requestedPage = 1
    return this.httpContext.search<SmartTableResult>(this.paginationFetchUrl, this.smartTableParam).subscribe(
      (x) => {
        this.smartTableResult = x
        this.inAsyncMode = false

        this.smartTableParam.pagination.pageSize = this.smartTableResult.pageSize;
        this.smartTableParam.pagination.requestedPage = this.smartTableResult.currentPage;
      }, (x) => {
        this.inAsyncMode = false;
        this.handleError(x)
      })
  }

  /**
   * returns a random color from the color table. random colors are just css classes which you can apply
   * on your element to take the color as its background*/
  public randomColor(): string {
    return ColorTable[0]
  }

  /**
   * Updates the pages' title tag
   * @param title
   */
  protected updatePageTitle(title?: string) {
    let tx = title ? title : "";
    document.getElementsByTagName("title")[0].innerHTML = tx;
  }

  /**
   * Handles remote errors from the server by iterating over the error message collection and
   * inserting the error messages in the components' @property validationErrors collection
   *
   * These errors are usually displayed in a forms' validation errors
   * @param error The object returned from the server usually .Net Core's ModelState
   * @param showToaster When set to true, error messages are notified to the user through a toaster
   */
  protected handleError(error: any, showToaster?: boolean) {
    this.validationErrors = []
    if (error.error) {
      for (var key in error.error) {
        // split('.')[0] because sometimes modelstate sends the line of the
        // source code which contains the modelstate error which starts after the dot
        this.validationErrors.push(`${error.error[key][0].split('.')[0]}`);
      }

      if (showToaster) {
        this.toastNotification("", this.validationErrors.join("\n"), NotificationType.danger)
      } else {
          this.validationErrors.push(`An error occured while performing the last operation`);
          this.toastNotification("", "An error occured while performing the last operation", NotificationType.danger)
      }
    }
  }

  public afterComponentInit() {
   
  }

  /**
   * Displays a toaster inlcuding the message to be displayed in the appropriate mode
   * @param title A title for your notification
   * @param message The message to be shown in the notification box
   * @param type The type defines the type of notification
   */
  public toastNotification(title: string, message: string, type: NotificationType) {
    showToaster(title, message, type)
  }

  /**
   * Displays a dialog box with a message.
   * @param title The title of the dialog box
   * @param message The message to be displayed in the dialog
   * @param type The type of dialog message: success, info, danger
   * @returns an object of dialogResult defining the actions performed by the user
   */
  public showDialog(title: string, message: string, type?: string) {
    showDialogWithIcon(title, message, type)
  }

  /**
   * Displays a modal dialog box with a message and dialog buttons.
   * This modal dialog provides the convinience for a user action confirmation.
   *
   * 
   * @param message The message to be displayed in the dialog
   * @param title The title of the dialog box
   * @param type The icon to be displayed
   * @param options The dialog buttons options to be displayed
   * @returns an object of dialogResult defining the actions performed by the user
   */
  public async showModalDialog(title: string, message: string, type: NotificationType, options: DialogOptions): Promise<DialogResult> {
    let ok, cancel, icon;
    switch (options) {
      case DialogOptions.YesCancel:
        ok = "Yes", cancel = "Cancel"
      case DialogOptions.OkCancel:
        ok = "Ok", cancel = "Cancel"
      case DialogOptions.YesNo:
        ok = "Yes", cancel = "No"
      default:
        ok = "Ok", cancel = "Cancel"
    }

    switch (type) {
      case NotificationType.danger:
        icon = "danger";
        break;
      case NotificationType.info:
        icon = "info";
        break;
      case NotificationType.success:
        icon = "success";
        break;
      case NotificationType.warning:
        icon = "warning";
        break;
      default:
    }

    return showDialogWithOptions(title, message, icon, true, cancel, ok)
  }

  /**
   * Displays a notification to the user on the screen usually at the bottom right corner of the screen
   * @param message The message to be displayed
   * @param icon An icon to display with the notification. These icons are derived from font-awesome
   */
  public showNotification(message: string, icon: string = "") {
    showNotification(null, message, icon, "bottom", "right", null, null)
  }
}

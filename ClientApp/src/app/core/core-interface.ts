
export interface ModelState {
  /**
   * A collection of response errors received from the server over a http request.
   */
  errors: string[];
}

/**
 * Returns the base url of the hosting server.
 */
export function BASE_URL() {
  return document.getElementsByTagName('base')[0].href;
}

export class User {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  emailConfirmed: boolean;
  status: number;
  roles: Array<string>;
  userGroups: Array<number>;
}

export class Role {
  id: string;
  name: string;
}

export class Widget {
  id: string;
  name: string;
  createUrl: string;
  thumbnail: string;
}

export class WidgetFormBase {
  id: number;
  name: string;
  widgetZoneId: string;
  publishStart: string;
  publishEnd: string;
  displayOrder: number;
}

export class WidgetGroup {
  groupName: string;
  widgets: Widget[]
}

export class WidgetInstance {
  id: number;
  name: string;
  widgetType: string;
  widgetZone: string;
  dateCreated: Date;
  editUrl: string;
  publishStart: Date;
  publishEnd: Date;
  displayOrder: number = 0;
  showInPreview: boolean;
}

export class WidgetZone {
  id: string;
  name: string;
}

export class AuthorizationLevel {
  id: string;
  name: string;
}

export class AuthorizationScopeVm {
  roleId: string;
  roleName: string;
  resourceId: number;
  resourceName: string;
  levelIds: number[];
}

export class FlexTemplate {
  viewComponentName: string;
  name: string;
}

export class ResourceRole {
  public id: number;

  public name: string;

  public roleIds: string[];
}

export class UserGroup {
  id: number;
  name: string;
}

export enum NotificationType {
  /**
   * inferred by a red color or boostraps/themes' text-danger
   */
  danger,
  /**
   * inferred by a blue color or boostraps/themes' text-info
   */
  info,
  /**
   * inferred by a green color or boostraps/themes' text-success
   */
  success,
  /**
   * inferred by a orange color or boostraps/themes' text-warning
   */
  warning
}

export enum DialogOptions {
  Ok,
  /**
   * dialog buttons Yes and No */
  YesNo,
  /**
   * dialog buttons Yes and Cancel */
  YesCancel,
  /**
   * dialog buttons Ok and Cancel */
  OkCancel
}

export enum DialogResult {
  Ok,
  Yes,
  No,
  Cancel
}

export class Search {
  /**
   * An untyped object. Object type could be interpreted by the caller at the receiving server
   */
  predicateObject: any = {};
}

export class Sort {
  /**
   * The name of parameter sorting should be applied on*/
  predicate: string;
  /**
   * The sort direction. true for descending and false for ascending*/
  reverse: boolean;
}

export class Pagination {
  /**
   * Represents the page to which should be returned */
  requestedPage: number = 1;
  /**
   * The number of items to be returned for the page */
  pageSize: number = 10;
}

export class SmartTableParam {
  /**
   * The pagination mechanism*/
  pagination: Pagination = new Pagination();
  /**
   * The search object*/
  search: Search = new Search();
  /**
   * The sorting mechanism*/
  Sort: Sort = new Sort();
}

export class SmartTableResult{
  /**
   * The collection of items returned by the server*/
  items: any[]
  /**
   * The total number of items in the collection*/
  totalItems: number
  /**
   * The current page returned in the collection*/
  currentPage: number
  /**
   * The number of items in the current page*/
  pageSize: number
  /**
   * True if a page exists before the current page*/
  hasPreviousPage: boolean
  /**
   * True if a page exists after the current page*/
  hasNextPage: boolean
  /**
   * The total number of pages as observed by the server*/
  totalPages: number
 }

export class EntityType {
  id: number;
  name: string;
}

export class Entity {
  id: number;
  name: string;
  entityTypedId: number;
  slug: string;
  isChecked: boolean;
  entityTypeName: string;
}

export class Menu {
  id: number;
  name: string;
  typeName: string;
  isSystem: boolean;
  isPublished: boolean;
}

export class MenuType {
  id: number;
  name: string;
}

export class MenuForm{
  id: number;
  name: string;
  isPublished: boolean;
  menuTypeId: string;
  items: MenuItemForm[] = new Array<MenuItemForm>();
}

export class MenuItemForm {
  data: any;
  id: number;
  parentId: number;
  entityId: number;
  name: string;
  customLink: string;
  displayOrder: number;
  children: MenuItemForm[] = new Array<MenuItemForm>();
}

export class SearchOption {
  id: string;
  name: string;
}

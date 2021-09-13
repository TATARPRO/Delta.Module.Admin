import { Injectable } from "@angular/core"

@Injectable()
export class EndpointMetadata {

  public appSettingEndpoints = {
    read: "/appsettings/group/",
    update: "/appsettings/group/update"
  }

  public appSettingGroupEndpoints = {
    list: "/appsetting-group/list/"
  }

  public authorizationLevelEndpoints = {
    list: "/authorization-levels/list"
  }

  public carouselWidgetEndpoints = {
    create: "/carousel-widgets/create/",
    read: "/carousel-widgets/read/",
    update: "/carousel-widgets/update/"
  }

  public entityEndpoints = {
    read: "/entities/read/"
  }

  public entityTypeEndpoints = {
    list: "/entity-types/menuable/"
  }

  public flexEndpoints = {
    create: "/flex-widgets/create/",
    read: "/flex-widgets/read/",
    update: "/flex-widgets/update/",
    flexTemplates: "/flex-widgets/flex-templates/",
    flex: "/flex-widgets/flex-template/?name="
  }

  public menuEndpoints = {
    create: "/menus/create/",
    read: "/menus/read/",
    list: "/menus/list",
    update: "/menus/update/",
    delete: "/menus/delete/",
  }

  public menuTypeEndpoints = {
    list: "/menutypes/list/",
  }

  public menuItemEndpoints = {
    create: "/menuitems/create/",
    delete: "/menuitems/delete/",
  }

  public webPagEndpoints = {
    list: "/webpages/list/",
    create: "/webpages/create/",
    read: "/webpages/read/",
    update: "/webpages/update/",
    delete: "/webpages/delete/"
  }

  public roleEndpoints = {
    create: "/roles/create/",
    read: "/roles/read/",
    update: "/roles/update/",
    list: "/roles/list",
    delete: "/roles/delete/"
  }

  public resourceRoleEndpoints = {
    read: "/resource-roles/list",
    update: "/resource-roles/update"
  }

  public themeEndpoints = {

  }

  public userEndpoints = {
    quickSearch: "/users/quick-search/",
    read: "/users/",
    create: "/users/create",
    update: "/users/update",
    list: "/users/list",
    delete: "/users/delete/",
    scopes: "/users/scopes/",
    searchOptions: "/users/search-options/"
  }

  public userGroupEndpoints = {
    create: "/usergroups/create/",
    read: "/usergroups/read/",
    update: "/usergroups/update/",
    list: "/usergroups/list",
    delete: "/usergroups/delete/"
  }

  public widgetEndpoints = {
    list: "/widgets/list/",
  }

  public coreWidgetEndpoints = {
    container102Create: "/widgets/container102/create/",
    container102Read: "/widgets/container102/read/",
    container102Update: "/widgets/container102/update/",
    container201Create: "/widgets/container210/create/",
    container201Read: "/widgets/container210/read/",
    container201Update: "/widgets/container210/update/",
    container363Create: "/widgets/container363/create/",
    container363Read: "/widgets/container363/read/",
    container363Update: "/widgets/container363/update/",
    container39Create: "/widgets/container39/create/",
    container39Read: "/widgets/container39/read/",
    container39Update: "/widgets/container39/update/",
    container48Create: "/widgets/container48/create/",
    container48Read: "/widgets/container48/read/",
    container48Update: "/widgets/container48/update/",
    container84Create: "/widgets/container84/create/",
    container84Read: "/widgets/container84/read/",
    container84Update: "/widgets/container84/update/",
    container93Create: "/widgets/container93/create/",
    container93Read: "/widgets/container93/read/",
    container93Update: "/widgets/container93/update/",
    containerX12Create: "/widgets/container12/create/",
    containerX12Read: "/widgets/container12/read/",
    containerX12Update: "/widgets/container12/update/",
    containerX2Create: "/widgets/container2/create/",
    containerX2Read: "/widgets/container2/read/",
    containerX2Update: "/widgets/container2/update/",
    containerX3Create: "/widgets/container3/create/",
    containerX3Read: "/widgets/container3/read/",
    containerX3Update: "/widgets/container3/update/",
    containerX4Create: "/widgets/container4/create/",
    containerX4Read: "/widgets/container4/read/",
    containerX4Update: "/widgets/container4/update/",
    containerX6Create: "/widgets/container6/create/",
    containerX6Read: "/widgets/container6/read/",
    containerX6Update: "/widgets/container6/update/",
  }

  public widgetInstanceEndpoints = {
    list: "/widget-instances/list/",
    delete: "/widget-instances/delete/",
    showPreview: "/widget-instances/show-in-preview/"
  }

  public widgetZoneEndpoints = {
    list: "/widget-zones/list"
  }
}

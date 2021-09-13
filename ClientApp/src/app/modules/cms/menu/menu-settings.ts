import { Component, AfterViewInit, OnInit, OnChanges, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../core/componentBase';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../../core/endpointMeta';
import { EntityType, Entity, MenuForm, MenuItemForm } from '../../../core/core-interface';
import { TreeComponent } from '@circlon/angular-tree-component';

@Component({
  selector: 'menu-settings',
  templateUrl: './menu-settings.html'
})
export class MenuSettingsComponent extends ComponentBase implements OnInit, AfterViewInit, OnChanges {

  public model: MenuForm = new MenuForm();
  public title: string = "Setup menu";
  public entities: Entity[] = new Array<Entity>();
  public entityTypes: EntityType[] = new Array<EntityType>();
  public selectedEntityType: number; // the entity types' id selected
  public selectedEntities: Entity[] = new Array<Entity>(); // the entities belonging to the entity type selected
  public customLink = { name: "", customLink: "" };
  public isEditMode = false;
  public isSubmitting = false;
  public menuTree = [];
  public treeOptions = {
    allowDrag: true,
    allowDrop: true,
    useCheckbox: true
  }

  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: EndpointMetadata) {
    super('menu-settings')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
    this.updatePageTitle("Setup menu: Delta Admin")
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getEntityTypes();

    if (this.model && this.model.id) {
      this.getMenuSettings(this.model.id)
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  ngOnChanges() {
    
  }

  public submit() {
    this.isSubmitting = true;

    this.inAsyncMode = true
    this.validationErrors = []

    this.model.items = this.treeToArray(this.menuTree)
    let result: Observable<any> = this.updateSettings()

    result.subscribe(() => {
      this.router.navigateByUrl("/module/cms/menus")
    }, (fail) => {
      this.inAsyncMode = false
      this.handleError(fail)
    });
  }

  private updateSettings() {
    return this.httpContext.update<any>(this.endpoints.menuEndpoints.update + this.model.id, this.model)
  }

  public deleteNodes() {

  }

  /**
   * Adds or removes the checked entity to the selected entity collection before it is added to the model
   * @param entity
   */
  public toggleEntity(entity) {
    var entityIds = this.selectedEntities.map((item) => { return item.id; });
    var index = entityIds.indexOf(entity.id);
    if (index > -1) {
      this.selectedEntities.splice(index, 1);
    } else {
      this.selectedEntities.push(entity);
    }
    entity.isChecked = true;
  };

  /**
   * creates the selected entities as menu items for the current menu
   * after the menu item items are created, the result from the server is added to the model
   */
  public addMenuItems() {
    if (this.selectedEntities) {
      let menuItems = this.selectedEntities.map((item) => {
        return { entityId: item.id, name: item.name };
      });
      this.httpContext.create<any>(this.endpoints.menuItemEndpoints.create + this.model.id, menuItems).subscribe((result) => {
        result.forEach((item) => {
          item.children = [];
          this.menuTree.push(item);
          this.tree.treeModel.update();
        });
        this.selectedEntities = [];
        this.uncheckAllMenuItems();
      }, (error) => {
        this.handleError(error)
      });
    }
  }

  /**
   * A user might prefer a custom defined menu item which is not a member of any entity type
   * in such a scenario, the user can add a custom link with a display name and url action
   */
  public addCustomLink() {
    var menuItems = [];
    menuItems.push(this.customLink);
    this.httpContext.create<any>(this.endpoints.menuItemEndpoints.create + this.model.id, menuItems).subscribe((result) => {
      result.forEach((item) => {
        item.children = [];
        this.menuTree.push(item);
        this.tree.treeModel.update();
        this.customLink = { name: "", customLink: "" };
      });
    }, (error) => {
      this.handleError(error)
    });
  };

  /**
   * When a node is moved to another node, from the tree, the tree-component library exposes an event
   * handler which calls this method.
   * @param $event
   */
  public onNodeMoved($event) {
    let id = $event.node.id
    let index = this.menuTree.findIndex(x => x.id == id)

    if (index > -1) {
      let toParent = $event.to.parent
      if (toParent) {
        this.menuTree[index].parentId = toParent.id
      } else {
        this.menuTree[index].parentId = null
      }
    }
  }

  /**
   * Returns an array as a tree structure
   * @param arr
   */
  public arrayToTree(arr: MenuItemForm[]) {
    let roots: MenuItemForm[] = Array<MenuItemForm>()
    for (let i = 0; i < arr.length; i++) {
      arr[i].children = arr.filter(x => x.parentId == arr[i].id)
    }

    roots = arr.filter(x => x.parentId == undefined);
    return roots;
  }

  /**
   * converts a tree to an array
   * @param tree
   */
  public treeToArray(tree): MenuItemForm[] {
    let items: MenuItemForm[] = new Array<MenuItemForm>()
    if (tree instanceof(Array)) {
      tree.forEach((node, i) => {
        items = items.concat(this.getTreeNodes(node, i, undefined))
      })
    }

    return items;
  }

  private getTreeNodes(node, order, parentId): MenuItemForm[] {
    let items: MenuItemForm[] = new Array<MenuItemForm>()
    if (node.children) {
      let displayOrder = order;
      let item: MenuItemForm = {
        id: node.id,
        name: node.name,
        entityId: node.entityId,
        customLink: node.customLink,
        parentId: parentId,
        displayOrder: displayOrder,
        data: {},
        children: undefined
      }
      items.push(item)

      // get its child nodes
      if (node.children instanceof (Array)) {
        node.children.forEach((grandNode, i) => {
          items = items.concat(this.getTreeNodes(grandNode, i, node.id))
        })
      }
    } else {
      items.push(node)
    }

    return items;
  }

  public uncheckAllMenuItems() {
    this.entities.forEach((entity) => {
      entity.isChecked = false;
    });
  }

  public getEntities($event) {
    let id = $event.target.value, name = $event.name
    this.httpContext.read<any>(this.endpoints.entityEndpoints.read + `?entityTypeId=${id}`).subscribe((result) => {
      this.entities = result;
      this.selectedEntityType = id
      this.uncheckAllMenuItems();
    });
  }

  private getEntityTypes() {
    this.httpContext.read<any>(this.endpoints.entityTypeEndpoints.list).subscribe((result) => {
      this.entityTypes = result;
      this.uncheckAllMenuItems();
    });
  }

  private getMenuSettings(id: number) {
    this.httpContext.read<any>(this.endpoints.menuEndpoints.read + id).subscribe((x) => {
      this.model = x
      this.menuTree = this.arrayToTree(this.model.items)
      this.tree.treeModel.update();
      this.inAsyncMode = false
    }, (fail) => {
      this.inAsyncMode = false
      this.handleError(fail, true)
    });
  }

}

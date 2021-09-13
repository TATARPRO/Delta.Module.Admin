import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../core/componentBase';
import { DeltaDirectory, MediaUploadVm } from '../file-manager.models';
import { FileManagerEndpoints } from '../fileEndpoints';
import { NotificationType, DialogOptions } from '../../../core/core-interface';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'home-dir-component',
  templateUrl: './home-dir.component.html'
})
export class HomeDirectoryComponent extends ComponentBase implements AfterViewInit, OnInit {
 
  public title: string = "File Manager";
  public currentDirectory: DeltaDirectory = new DeltaDirectory();
  public folder = { name: "", folderId: this.currentDirectory.id }
  public uploadPercent = 0;
  private upload: MediaUploadVm = new MediaUploadVm();
 
  public constructor(private router: Router, private activatedRoute: ActivatedRoute, private fileEndpoints: FileManagerEndpoints) {
    super('home-dir-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.currentDirectory.id = activatedRoute.snapshot.params["id"]
    }

    router.events.subscribe((change) => {
      if (change instanceof NavigationEnd) {
        if (activatedRoute.snapshot.params["id"]) {
          this.openFolder(activatedRoute.snapshot.params["id"])
        }
      }
    })
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getFiles();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }

  private getFiles() {
    this.httpContext.read<any>(`${this.fileEndpoints.mediaEndpoints.list}${this.currentDirectory.id == null ? "" : "?folderId=" + this.currentDirectory.id}`).subscribe((x) => {
      this.currentDirectory = x
      this.inAsyncMode = false
    });
  }

  public copyUrl(url: string) {
    const element = document.createElement('textarea');
    element.style.display = 'hidden';
    element.value = url;
    document.body.appendChild(element);
    element.focus();
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
  }

  public fileChanged(fileList: FileList) {
    if (fileList && fileList.length > 0) {
      this.upload.file = fileList[0]
    }
  }

  public uploadFile() {
    let form = new FormData()
    form.append("folderId", `${this.currentDirectory.id}`)
    form.append("file", this.upload.file)

    this.httpContext.raw('POST', this.fileEndpoints.mediaEndpoints.upload, form, {
      reportProgress: true,
    }).subscribe((x: HttpEvent<any>) => {
      if (x.type === HttpEventType.UploadProgress) {
        this.uploadPercent = Math.round(100 * (x.loaded / x.total))
      } else if (x instanceof HttpResponse) {
        this.uploadPercent = 0
        this.getFiles();
      }
    }, (fail) => {
      this.handleError(fail, true)
    });
  }

  public openFolder(folderId: number) {
    this.inAsyncMode = true
    this.httpContext.read<any>(`${this.fileEndpoints.mediaEndpoints.list}?folderId=${folderId}`).subscribe((x) => {
      this.currentDirectory = x
      this.inAsyncMode = false
    }, (fail) => {
      this.inAsyncMode = false
      this.handleError(fail, true)
    });
  }

  public deleteFile(id: number) {
    this.showModalDialog("Delete File", "Are you sure you want to delete this file. This action may not be irreversible",
      NotificationType.warning, DialogOptions.YesCancel)
      .then(() => {
        this.inAsyncMode = true
        this.httpContext.delete<any>(this.fileEndpoints.mediaEndpoints.delete + id).subscribe(() => {
          this.getFiles();
        }, (fail) => {
          this.handleError(fail, true)
            this.inAsyncMode = false
        });
      }).catch(() => { })
  }

  public deleteFolder(id: number) {
    this.showModalDialog("Delete Folder", "Are you sure you want to delete this folder?. The folder and all of its contents will be deleted. " +
      "This action may not be irreversible",
      NotificationType.warning, DialogOptions.YesCancel)
      .then(() => {
        this.inAsyncMode = true
        this.httpContext.delete<any>(this.fileEndpoints.folderEndpoints.delete + id).subscribe(() => {
          this.getFiles();
        }, (fail) => {
            this.inAsyncMode = false
          this.handleError(fail, true)
        });
      }).catch(() => { })
  }

  public createFolder() {
    this.inAsyncMode = true
    this.httpContext.create<any>(`${this.fileEndpoints.folderEndpoints.create}?name=${this.folder.name}${this.currentDirectory.id == null ? "" : "&parent=" + this.currentDirectory.id}`, null).subscribe(() => {
      this.getFiles();
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail, true)
    });
  }
}

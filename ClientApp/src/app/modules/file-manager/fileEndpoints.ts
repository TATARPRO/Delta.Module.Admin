import { Injectable } from '@angular/core'

@Injectable()
export class FileManagerEndpoints {
  folderEndpoints = {
    create: "/folder/create/",
    update: "/folder/update/",
    delete: "/folder/delete/"
  }

  mediaEndpoints = {
    list: "/media/list/",
    upload: "/media/upload/",
    delete: "/media/delete/"
  }
}

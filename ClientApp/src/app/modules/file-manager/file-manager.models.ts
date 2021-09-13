export class MediaUploadVm {
  file: File;
  folderId: string;
}

export class DeltaDirectory {
  id: number = null;
  name: string;
  currentPage: number;
  folders: DeltaFolderVm[] = new Array<DeltaFolderVm>();
  files: MediaListItem[] = new Array<MediaListItem>();
}

export class DeltaFolderVm {
  id: number;
  name: string;
}

export class MediaListItem {
  id: number;
  name: string;
  type: string;
  url: string;
  dateCreated: Date;
}

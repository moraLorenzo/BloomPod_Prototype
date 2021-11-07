import { Injectable } from '@angular/core';

import {
  Plugins,
  CameraResultType,
  Capacitor,
  FilesystemDirectory,
  CameraPhoto,
  CameraSource,
} from '@capacitor/core';

const { Camera, FileSystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor() {}

  public async takePhoto() {
    const photoUrl = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100,
    });

    return photoUrl;
  }
}

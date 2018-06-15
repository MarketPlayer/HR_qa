import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Song } from '../interfaces/common';

@Injectable({
  providedIn: 'root'
})
export class SongsStateService {
  private songsList = [] as Array<Song>;
  private songsListSource = new Subject<Array<Song>>();

  public songsListSourceState = this.songsListSource.asObservable();

  public changeSongsListSourceState(songsList: Array<Song>) {
    this.songsList = songsList;
    this.songsListSource.next(songsList);
  }

  public addNewSong(songName: string = null) {
    this.songsList.push({
      id: new Date().getTime(),
      name: !!songName ? songName : `Track ${this.songsList.length}`
    });
    this.changeSongsListSourceState(this.songsList);
  }

  public removeSongById(songId: number) {
    this.songsList.splice(this.songsList.findIndex(el => el.id === songId), 1);
    this.changeSongsListSourceState(this.songsList);
  }

  constructor() {}
}

import { Component, AfterViewInit } from '@angular/core';

import { SongsStateService } from '../../services/songs-state.service';
import { Song } from '../../interfaces/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  timeLineNumbers = new Array(24);
  songsList: Array<Song>;

  removeTrack(songId: number) {
    this.songsStateService.removeSongById(songId);
  }

  constructor(private songsStateService: SongsStateService) {
    this.songsStateService.songsListSourceState.subscribe(songsList => {
      this.songsList = songsList;
    });
  }

  ngAfterViewInit() {}
}

import { Component } from '@angular/core';

import { SongsStateService } from './services/songs-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SongsStateService]
})
export class AppComponent {
  constructor(private songsStateService: SongsStateService) {}

  addNewSong(event: Event) {
    const inputTarget = event.target as HTMLInputElement,
      songName = !!inputTarget.files[0].name ? inputTarget.files[0].name : null;

    this.songsStateService.addNewSong(songName);
  }
}

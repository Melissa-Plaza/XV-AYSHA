import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Hero } from '../hero/hero';
import { Countdown } from '../countdown/countdown';
import { EventDetails } from '../event-details/event-details';
import { DressCode } from '../dress-code/dress-code';
import { Rsvp } from '../rsvp/rsvp';

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [CommonModule, Hero, Countdown, EventDetails, DressCode, Rsvp],
  templateUrl: './envelope.html',
  styleUrl: './envelope.css'
})
export class Envelope {
  opened = false;
  isPlaying = false;
  videoUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/j3ObHjm1fAE?enablejsapi=1&start=15&end=45'
    );
  }

  openEnvelope() {
    this.opened = true;
  }

  toggleMusic() {
    if (isPlatformBrowser(this.platformId)) {
      this.isPlaying = !this.isPlaying;
      const iframe = document.getElementById('yt-player') as HTMLIFrameElement;
      const cmd = this.isPlaying ? 'playVideo' : 'pauseVideo';
      iframe?.contentWindow?.postMessage(
        `{"event":"command","func":"${cmd}","args":""}`, '*'
      );
    }
  }
}

import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Envelope } from './components/envelope/envelope';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Envelope],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'xv-aysha';
  isPlaying = false;
  videoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/j3ObHjm1fAE?autoplay=0&enablejsapi=1&start=0&end=30'
    );
  }

  toggleMusic() {
    this.isPlaying = !this.isPlaying;
    const iframe = document.getElementById('yt-player') as HTMLIFrameElement;
    const cmd = this.isPlaying ? 'playVideo' : 'pauseVideo';
    iframe.contentWindow?.postMessage(`{"event":"command","func":"${cmd}","args":""}`, '*');
  }
}

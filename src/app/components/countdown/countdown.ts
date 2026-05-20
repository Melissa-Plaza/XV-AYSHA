import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown.html',
  styleUrl: './countdown.css'
})
export class Countdown implements OnInit, OnDestroy {
  days = 0; hours = 0; minutes = 0; seconds = 0;
  private timer: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateCountdown();
      this.timer = setInterval(() => this.updateCountdown(), 1000);

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.2 });

      setTimeout(() => {
        document.querySelectorAll('.countdown-item').forEach(el => observer.observe(el));
      }, 100);
    }
  }

  ngOnDestroy() { clearInterval(this.timer); }

  updateCountdown() {
    const diff = new Date('2026-08-19T19:00:00').getTime() - new Date().getTime();
    this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((diff % (1000 * 60)) / 1000);
  }
}

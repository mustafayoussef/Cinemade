import { environment } from './../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-embed',
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.scss']
})
export class VideoEmbedComponent implements OnInit {
  @Input() site: string = 'YouTube';
  @Input() key: string | null = null;
  youTubeEmbed = environment.youTubeEmbed;
  vimeombed = environment.vimeoEmbed;

  videoUrl: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    switch(this.site){
      case 'YouTube':        
        this.videoUrl = this.getSafeUrl(`${this.youTubeEmbed}/${this.key}`);
        break;

      case 'Vimeo':
        this.videoUrl = this.getSafeUrl(`${this.vimeombed}/${this.key}`)
        break;
    }
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend-client';

  // ngOnInit(): void {
  //   let colors = ['#fff', '#15202B', '#606B56', '#46344E'];

  //   let theme = localStorage.getItem('theme');
  //   console.log(theme);

  //   if (theme == null) {
  //     setTheme('blue');
  //   } else {
  //     setTheme(theme);
  //   }

  //   let themeDots = document.getElementsByClassName('theme-dot');
  //   console.log(themeDots);

  //   for (var i = 0; themeDots.length > i; i++) {
  //     themeDots[i].addEventListener('click', function () {
  //       let mode = this.dataset.mode;
  //       console.log('Option clicked:', mode);
  //       setTheme(mode);
  //     });
  //   }

  //   function setTheme(mode) {
  //     if (mode == 'light') {
  //       let light = document.getElementById('theme-style');
  //       light.style.backgroundColor = colors[0];
  //       light.style.color = '#000';
  //     }

  //     if (mode == 'blue') {
  //       let blue = document.getElementById('theme-style');
  //       blue.style.backgroundColor = colors[1];
  //       blue.style.color = '#fff';
  //     }

  //     if (mode == 'green') {
  //       let green = document.getElementById('theme-style');
  //       green.style.backgroundColor = colors[2];
  //       green.style.color = '#fff';
  //     }

  //     if (mode == 'purple') {
  //       let purple = document.getElementById('theme-style');
  //       purple.style.backgroundColor = colors[3];
  //       purple.style.color = '#fff';
  //     }

  //     localStorage.setItem('theme', mode);
  //   }
  // }
}

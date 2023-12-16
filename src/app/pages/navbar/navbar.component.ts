// navbar.component.ts
import { Component,AfterViewInit  } from '@angular/core';
import { DataLoginService } from 'src/app/services/data-login.service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {
  ngAfterViewInit(): void {
      this.setupSidebar();
  }

  private setupSidebar() {
      const sidebar = document.querySelector(".sidebar") as HTMLElement | null;

      if (sidebar) {
          // Realiza tus operaciones con el sidebar aquí
          sidebar.classList.add("close");
      }
  }

  toggleSidebar() {
      const sidebar = document.querySelector(".sidebar") as HTMLElement | null;

      if (sidebar) {
          sidebar.classList.toggle("close");
      }
  }

  toggleDarkLightMode() {
      const body = document.querySelector("body") as HTMLElement | null;
      const darkLight = document.querySelector("#darkLight") as HTMLElement | null;

      if (body && darkLight) {
          body.classList.toggle("dark");
          darkLight.classList.toggle("bx-moon");
          darkLight.classList.toggle("bx-sun");
      }
  }

  expandSidebar() {
      const sidebar = document.querySelector(".sidebar") as HTMLElement | null;

      if (sidebar) {
        sidebar.classList.toggle("close");
        sidebar.classList.toggle("hoverable");
    }
  }
}
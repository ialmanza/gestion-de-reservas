import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  ngOnInit(): void {
    const drawerToggle = document.getElementById('drawer-toggle');
    const drawerNavigation = document.getElementById('drawer-navigation');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerClose = document.getElementById('drawer-close');
    const drawerHoverArea = document.getElementById('drawer-hover-area');

  function openDrawer() {
    drawerNavigation!.classList.remove('drawer-hidden', '-translate-x-full');
    drawerNavigation!.classList.add('drawer-visible', 'translate-x-0');
    drawerOverlay!.classList.remove('hidden');
  }

  function closeDrawer() {
    drawerNavigation!.classList.remove('drawer-visible', 'translate-x-0');
    drawerNavigation!.classList.add('drawer-hidden', '-translate-x-full');
    drawerOverlay!.classList.add('hidden');
  }

  drawerToggle!.addEventListener('click', function () {
    if (drawerNavigation!.classList.contains('drawer-hidden')) {
      openDrawer();
    } else {
      closeDrawer();
    }
  });

  drawerClose!.addEventListener('click', closeDrawer);
  drawerOverlay!.addEventListener('click', closeDrawer);
  drawerHoverArea!.addEventListener('mouseenter', openDrawer);
  drawerNavigation!.addEventListener('mouseleave', closeDrawer);
}

}

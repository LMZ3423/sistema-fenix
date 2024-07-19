import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  roleID: number | null = null;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.roleID = this.authService.getRoleID();
    console.log('roleID sidebar:', this.roleID);
  }

}

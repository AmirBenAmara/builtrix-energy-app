import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  errMsg: string | undefined;

  constructor(private router: Router, private apiService: ApiService) {}

  async login() {
    const auth = await this.apiService.loginService(this.username || '', this.password || '')
    console.log(this.username)
    console.log(this.password)
    console.log(auth)
    if (
      auth
    ) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errMsg = 'Invalid Credentials';
    }
  }
}

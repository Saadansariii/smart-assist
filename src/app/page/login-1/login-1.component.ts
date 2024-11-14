import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChildren, QueryList, ElementRef, Renderer2, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface LoginResponse {
  token: string;
  message?: string;
}

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-1',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './login-1.component.html',
  styleUrls: ['./login-1.component.css'],
})
export class Login1Component {
  @ViewChildren('inputElement') inputElements: QueryList<ElementRef> | undefined;

  loginObj: LoginData = {
    email: '',
    password: '',
  };

  isModalVisible = false;
  private readonly API_BASE_URL = 'https://api.smartassistapp.in/api-docs/';
  private readonly SESSION_TIMEOUT = 6 * 1000000; // 6 minutes in milliseconds

  // Use inject() for all dependencies
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly renderer = inject(Renderer2);
 
  constructor() {}

  showPassword : boolean = false;

  ngAfterViewInit() {
    if (this.inputElements) {
      this.inputElements.toArray().forEach((input) => {
        this.renderer.listen(input.nativeElement, 'focus', this.addClass.bind(this));
        this.renderer.listen(input.nativeElement, 'blur', this.removeClass.bind(this));
      });
    }
  }

  addClass(event: FocusEvent): void {
    const parent = (event.target as HTMLElement).parentNode?.parentNode as Element;
    if (parent) {
      parent.classList.add('focus');
    }
  }

  removeClass(event: FocusEvent): void {
    const parent = (event.target as HTMLElement).parentNode?.parentNode as Element;
    if (parent && (event.target as HTMLInputElement).value === '') {
      parent.classList.remove('focus');
    }
  }

  onLoginBtn() {
    if (!this.validateLoginInput()) {
      return;
    }

    this.http
      .post<LoginResponse>('https://api.smartassistapp.in/api/login/super-admin', this.loginObj)
      .subscribe({
        next: (response) => {
          if (response.token) {
            this.handleSuccessfulLogin(response.token);
          } else {
            this.toastr.error('Invalid credentials', 'Error');
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          const errorMessage = error.error?.message || 'Failed to login';
          this.toastr.error(errorMessage, 'Error');
        }
      });
  }

  private validateLoginInput(): boolean {
    if (!this.loginObj.email || !this.loginObj.password) {
      this.toastr.error('Please enter both email and password', 'Validation Error');
      return false;
    }
    if (!this.isValidEmail(this.loginObj.email)) {
      this.toastr.error('Please enter a valid email address', 'Validation Error');
      return false;
    }
    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private handleSuccessfulLogin(token: string): void {
    this.toastr.success('Login Successful', 'Success');
    sessionStorage.setItem('adminToken', token);
    
    this.router.navigate(['/Admin/dashboard'])
      .then(() => window.location.reload())
      .catch(error => {
        console.error('Navigation error:', error);
        this.toastr.error('Failed to navigate to dashboard', 'Error');
      });

    this.setupAutoLogout();
  }

  private setupAutoLogout(): void {
    setTimeout(() => {
      sessionStorage.removeItem('adminToken');
      this.router.navigateByUrl('/login')
        .then(() => {
          this.toastr.info('Session expired. Please log in again.', 'Session Expired');
        })
        .catch(error => {
          console.error('Logout navigation error:', error);
        });
    }, this.SESSION_TIMEOUT);
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  forgetPwd(loginObj: LoginData) {
    if (!loginObj.email || !this.isValidEmail(loginObj.email)) {
      this.toastr.error('Please enter a valid email address', 'Validation Error');
      return;
    }

    this.http
      .post('https://api.smartassistapp.in/api/superAdmin/create', { email: loginObj.email })
      .subscribe({
        next: () => {
          this.toastr.success('Password reset email sent', 'Success');
          this.closeModal();
        },
        error: (error) => {
          console.error('Password reset error:', error);
          const errorMessage = error.error?.message || 'Failed to send password reset email';
          this.toastr.error(errorMessage, 'Error');
        }
      });
  }
}
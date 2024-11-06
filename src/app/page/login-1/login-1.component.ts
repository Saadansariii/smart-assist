import { HttpClient, HttpClientModule,  } from '@angular/common/http';
import {
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  Renderer2,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {   showAlert } from '../../utils/aleart';
import { create } from 'domain';
import { Token } from '@angular/compiler';
// import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-1',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login-1.component.html',
  styleUrl: './login-1.component.css',
})
export class Login1Component {
  @ViewChildren('inputElement') inputElements:
    | QueryList<ElementRef>
    | undefined;
  cookieService: any;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    if (this.inputElements) {
      this.inputElements.toArray().forEach((input) => {
        this.renderer.listen(
          input.nativeElement,
          'focus',
          this.addClass.bind(this)
        );
        this.renderer.listen(
          input.nativeElement,
          'blur',
          this.removeClass.bind(this)
        );
      });
    }
  }

  // Update: Cast parentNode to Element type to access classList
  addClass(event: FocusEvent): void {
    const parent = (event.target as HTMLElement).parentNode
      ?.parentNode as Element;
    if (parent) {
      parent.classList.add('focus');
    }
  }

  // event for placeholder input
  removeClass(event: FocusEvent): void {
    const parent = (event.target as HTMLElement).parentNode
      ?.parentNode as Element;
    if (parent && (event.target as HTMLInputElement).value === '') {
      parent.classList.remove('focus');
    }
  }

  loginObj: any = {
    email: '',
    password: '',
  };

  http = inject(HttpClient);
  router = inject(Router);

  onLoginBtn() {
    this.http
      .post(
        'http://192.168.1.13:4090/api/' + 'login/super-admin',
        this.loginObj
      )
      .subscribe((res: any) => {
        
        console.log(res);
        if (res.token) {
          // alert('Login Successful'); 
            showAlert('danger' , 'loginsucessful')
          this.router.navigate(['/Admin/dashboard']).then(() => {
            window.location.reload();
          });
          // Store the token in sessionStorage
          sessionStorage.setItem('adminToken', res.token); 
          setTimeout(() => {
            this.router.navigateByUrl('/login');
            sessionStorage.removeItem('adminToken');
            alert('Session expired. Please log in again.');
            
          }, 1000000 * 6);
        } else {
          alert('Wrong Password');
        }
      });
  }
}
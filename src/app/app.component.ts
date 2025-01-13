import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  secretKey: string = "mrbbjkye";

  emailForm = this.fb.group({
    name: [""],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    message: [""]
  });

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  //Send an email using formspree.io account
  sendEmail(name: String, email: String, message: String) {
    
    //Set the url with your secretKey from formspree.io
    let url = "https://formspree.io/f/" + this.secretKey;

    //Set Headers
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      })
    };

    let data = `name=${name}&email=${email}&message=${message}`;
    let errorMessage: string = "";

    this.httpClient.post<any>(url, data, httpOptions).subscribe({
        next: data => {
            alert("Thank You For Contacting Us ");
        },
        error: error => {
            errorMessage = error.message;
            alert( 'Please fill the right email Id and information');
        }
    })

    //DEBUG
    // console.log("url is ", url);
    // console.log("data", name, email, message);
  }
}
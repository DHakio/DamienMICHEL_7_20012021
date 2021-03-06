import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  connexionForm: FormGroup;
  error: string;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {

    this.titleService.setTitle("Groupomania - Connexion");

    this.connexionForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onConnexion() {
    const email = this.connexionForm.get('email').value;
    const password = this.connexionForm.get('password').value;

    if(this.connexionForm.valid) {
      this.auth.login(email, password)
        .then(() => {this.router.navigate(['index'])})
        .catch((error: any) => {
          if(error.status == 0 || error.status == 500) {
            this.error = "Problème de connexion au serveur"
          }
          else if(error.status == 401)  {
              this.error = "Identifiants incorrectes"
          }
          else {
            this.error = "Une erreur est survenue"
          }
        });
    }
  }
}

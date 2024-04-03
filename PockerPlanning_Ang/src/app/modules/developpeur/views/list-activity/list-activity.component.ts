import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Commentaire } from 'src/app/commentaire';
import { ActivityService } from 'src/app/service/activity.service';
  export class Activity {
  constructor(
    public idActivity: number,
    public description: string,
    public name: string,
    public nbPerson: number,
    public hour: number,
    public picture:string,
    public event: Event // Relation many-to-one avec Event
  ) { }
}
@Component({
  selector: 'app-list-activity',
  templateUrl: './list-activity.component.html',
  styleUrls: ['./list-activity.component.css']
})
export class ListActivityComponent {
  activity!: Activity
  
  activityList!: Activity[]
  currentPage: number = 1;
  totalEvents: number = 0;
  pageSize: number = 3;
  totalPages: number = 0;
  commentaireForm: FormGroup;
     pages: number[] = [];
  constructor(public _router: Router, public activityservice: ActivityService,private formBuilder: FormBuilder) { // Supprimez Validators.required du contrôle de formulaire
    this.commentaireForm = this.formBuilder.group({
      contenu: [''], // Supprimez Validators.required si vous ne voulez pas de contrôle de saisie
    });
    }
    v!:string;
    com: any = {};

    submitCommentaire(): void {
      // Vérifiez si this.activity est défini et que son idActivity est non nul
      if (!this.activity || !this.activity.idActivity) {
          console.error('ID de l\'activité est null ou l\'activité est non définie');
          return;
      }
  
      // Assurez-vous que l'activité est définie dans le commentaire
      this.com.activity = this.activity;
  
      // Définissez l'ID de l'activité dans le commentaire
      this.com.id_activity = this.activity.idActivity;
  
      // Soumettez le commentaire
      this.activityservice.addComment(this.com).subscribe(
          (response) => {
              console.log('Commentaire ajouté avec succès :', response);
              // Réinitialisez le commentaire après l'ajout
              this.com = new Commentaire();
              this.loadActivites();

          },
          (error) => {
              console.error('Erreur lors de l\'ajout du commentaire :', error);
          }
      );
  }
  activites: Activity[] = [];
  selectedActivite!: Activity;
  commentaires: Commentaire[] = [];
  getCommentsForActivity(activityId: number): void {
    this.activityservice.getCommentsForActivity(activityId)
      .subscribe((data) => {
        this.commentaires = data;
      }, (error) => {
        console.error('Erreur lors de la récupération des commentaires : ', error);
      });
  }
  selectActivite(activite: Activity): void {
    this.selectedActivite = activite;
    this.getCommentsForActivity(activite.idActivity);
  }
  showComments(activite: Activity): void {
    this.selectedActivite = activite;
    this.getCommentsForActivity(activite.idActivity);
  }
  
  loadActivites(): void {
    this.activityservice.getactivities()
      .subscribe((data) => {
        this.activites = data;
      }, (error) => {
        console.error('Erreur lors de la récupération des activités : ', error);
      });
  }

    
    fetchActivities(): void {
      this.activityservice.getactivities().subscribe(
        (response) => {
          console.log('Liste des activités récupérée avec succès :', response);
          // Supposons que response soit une liste d'activités, sélectionnez la première activité (ou toute autre logique appropriée)
          if (response && response.length > 0) {
            this.activity = response[0]; // Sélectionnez la première activité par défaut
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération de la liste des activités :', error);
        }
      );
    }
    
    
    
    
    // Méthode pour rafraîchir la liste des activités après l'ajout du commentaire
    refreshActivityList() {
      this.activityservice.getactivities().subscribe(
        response => {
          console.log('Liste des activités mise à jour:', response);
          this.activityList = response;
        },
        error => {
          console.error('Erreur lors de la mise à jour de la liste des activités:', error);
          // Gérez l'erreur ici, par exemple, affichez un message à l'utilisateur
        }
      );
    }
    
    

  ngOnInit(): void {
    this.fetchActivities();
    this.loadActivites();

     this.activityservice.getactivities().subscribe(
      response => {
        console.log('Response from service:', response);
        this.activityList = response;
      },
      error => {
        console.error('Error from service:', error);
      }
    );
  }
   
   
  deleteActivity(id: number) {
    console.log(`delete Activity ${id}`);
    this.activityservice.deleteActivity(id).subscribe(
      response => {
        console.log(response);
        this.activityservice.getactivities().subscribe(
          response => {
            console.log(response);
            this.activityList = response;
          });
      })
      window.location.reload();

  }
  addActivity(){
    this._router.navigate(['developpeur/add-activity'])
  }
  updateActivity(id: number) {
    
    this._router.navigate(['developpeur/update-activity', id])
  }
}

import { User } from "./core/models/user";
import { Activity } from "./modules/developpeur/views/list-activity/list-activity.component";

export class Commentaire {
    idcommentaire!:number;
    contenue!:string;
    user_id?: number; // ID de l'utilisateur qui a commenté
    id_activity?: number;
    user!: User;
    activity!:Activity;
}

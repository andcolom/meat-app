import {Response} from '@angular/http'
import { Observable } from 'rxjs/Observable';

export class ErrorHandler {

    static handleError(error: Response | any) {
        let message : string
        if (error instanceof Response){
            message = `Erro ${error.status} ao acessar a URL  ${error.url} - ${error.statusText}`
        }
        else{
            message = error.toString()
        }
        console.log(message)
        return Observable.throw(message)
    }

}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private heroesUrl = '/GetListMacdos';
  constructor(private http: HttpClient) { }

  getListMacdos(etatAmericain: string) {
    return this.http.post(this.heroesUrl, { etatAmericain: etatAmericain }, httpOptions).pipe(
      catchError(this.handleError('getListMacdos'))
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`operation failed: ${error.message}` + 'fff');
      return of(result as T);
    };
  }
}

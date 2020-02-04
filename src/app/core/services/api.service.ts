import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn } from '@angular/fire/database';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private db: AngularFireDatabase) {}

  getUrl(endpoint: string, userId?: string, itemKey?: string) {
    let url = `${endpoint}`;
    if (userId && !itemKey) {
      url += `/${userId}`;
    }
    if (userId && itemKey) {
      url += `/${userId}/${itemKey}`;
    }
    return url;
  }

  getOne<T>(endpoint: string, userId?: string): Observable<T> {
    const url = this.getUrl(endpoint, userId);
    return this.db
      .object<T>(url)
      .valueChanges()
      .pipe(catchError(this.handleObsError));
  }

  saveOne<T>(endpoint: string, item: T, userId?: string) {
    const url = this.getUrl(endpoint, userId);
    return this.db
      .object<T>(url)
      .set(item)
      .catch(err => {
        this.handlePromiseErr(err);
      });
  }

  updateOne<T>(endpoint: string, item: T, userId?: string) {
    const url = this.getUrl(endpoint, userId);
    return this.db
      .object<T>(url)
      .update(item)
      .catch(err => {
        this.handlePromiseErr(err);
      });
  }

  deleteOne<T>(endpoint: string, userId?: string) {
    const url = this.getUrl(endpoint, userId);
    return this.db
      .object<T>(url)
      .remove()
      .catch(err => {
        this.handlePromiseErr(err);
      });
  }

  getList<T>(endpoint: string, userId: string, query?: QueryFn): Observable<T[]> {
    const url = this.getUrl(endpoint, userId);
    return this.db
      .list<T>(url, query)
      .snapshotChanges()
      .pipe(
        map((changes): T[] =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        ),
        catchError(this.handleObsError)
      );
  }

  addToList<T>(endpoint: string, item: T, userId: string) {
    const url = this.getUrl(endpoint, userId);
    return this.db
      .list<T>(url)
      .push(item)
      .catch(err => {
        this.handlePromiseErr(err);
      });
  }

  getkeyOnSave<T>(endpoint: string, item: T, userId: string) {
    const url = this.getUrl(endpoint, userId);
    return this.db.list<T>(url).push(item).key;
  }

  deleteList<T>(endpoint: string, userId: string) {
    const url = this.getUrl(endpoint, userId);
    return this.db
      .list<T>(url)
      .remove()
      .catch(err => {
        this.handlePromiseErr(err);
      });
  }

  deleteListItem<T>(endpoint: string, userId: string, itemKey: string) {
    const url = this.getUrl(endpoint, userId);
    return this.db
      .list<T>(url)
      .remove(itemKey)
      .catch(err => {
        this.handlePromiseErr(err);
      });
  }

  updateListItem<T>(
    endpoint: string,
    item: T,
    userId?: string,
    itemKey?: string
  ) {
    const url = this.getUrl(endpoint, userId);
    return this.db
      .list<T>(url)
      .update(itemKey, item)
      .catch(err => {
        this.handlePromiseErr(err);
      });
  }

  handleObsError(err: any) {
    const errorMsg = 'Si è verificato un errore, riprova in pochi minuti!';
    return throwError(errorMsg);
  }

  handlePromiseErr(err: any) {
    if (err) {
      return { err: 'Si è verificato un errore, riprova in pochi minuti!' };
    }
  }
}

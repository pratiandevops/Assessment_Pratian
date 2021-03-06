import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompilerService {

  constructor(private http: HttpClient) { }

  public ccompiler(code: string, arg: string): Observable<string> {
    return this.http.post<string>(`${environment.compilerURL}/ccompiler`,{code, arg})
      .pipe(map((response: string) => response as string));
  }

  public csharpcompiler(code: string, arg: string): Observable<string> {
    return this.http.post<string>(`${environment.compilerURL}/csharpcompiler`,{code, arg})
      .pipe(map((response: any) => response as string));
  }

  public pcompiler(code: string, arg: string): Observable<string> {
    return this.http.post<string>(`${environment.compilerURL}/pcompiler`,{code, arg})
      .pipe(map((response: string) => response as string));
  }

  public jcompiler(code: string, arg: string): Observable<string> {
    return this.http.post<string>(`${environment.compilerURL}/jcompiler`,{code, arg})
      .pipe(map((response: string) => response as string));
  }

  public getAllLanguages(): Observable<any> {
    return this.http.get<any>(`${environment.compilerURL}/glotapi/languages`)
      .pipe(map((response: any) => response));
  }

  public glotCompiler(language: string, data: any): Observable<any> {
    return this.http.post<any>(`${environment.compilerURL}/glotapi/languages/${language}/latest`, data)
      .pipe(map((response: any) => response));
  }
}

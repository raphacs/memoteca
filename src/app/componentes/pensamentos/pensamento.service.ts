import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:3000/pensamentos';
  constructor(private http: HttpClient) { }

  listar(pagina: number): Observable<Pensamento[]>{
    const itensPorPagina = 6;

    let params = new HttpParams()
    .set("_page", pagina.toString())
    .set("_limit", itensPorPagina.toString());

    // return this.http.get<Pensamento[]>(`${this.API}?_page=${pagina}&_limit=${itensPorPagina}`);
    return this.http.get<Pensamento[]>(this.API, { params });
  }

  criar(pensamento: Pensamento): Observable<Pensamento>{
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  editar(pensamento: Pensamento): Observable<Pensamento>{
    return this.http.put<Pensamento>(`${this.API}/${pensamento.id}`, pensamento);
  }

  excluir(id: number): Observable<Pensamento>{
    return this.http.delete<Pensamento>(`${this.API}/${id}`);
  }

  buscarPorId(id: number): Observable<Pensamento>{
    return this.http.get<Pensamento>(`${this.API}/${id}`);
  }


}
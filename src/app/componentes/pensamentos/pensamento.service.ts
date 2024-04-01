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

  listar(pagina: number, filtro: string, favoritos: boolean): Observable<Pensamento[]>{
    const itensPorPagina = 6;

    let params = new HttpParams()
    .set("_page", pagina.toString())
    .set("_limit", itensPorPagina.toString());


    if(filtro.trim().length > 2){
      params = params.set("q", filtro);
    }

    if(favoritos){
      params = params.set("favorito", true);
    }

    // return this.http.get<Pensamento[]>(`${this.API}?_page=${pagina}&_limit=${itensPorPagina}`);
    return this.http.get<Pensamento[]>(this.API, { params });
  }

  criar(pensamento: Pensamento): Observable<Pensamento>{
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  editar(pensamento: Pensamento): Observable<Pensamento>{
    return this.http.put<Pensamento>(`${this.API}/${pensamento.id}`, pensamento);
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento>{
    // return this.http.patch<Pensamento>(`${this.API}/${pensamento.id}`, {favorito: !pensamento.favorito});
    pensamento.favorito = !pensamento.favorito;
    return this.editar(pensamento);
  }

  excluir(id: number): Observable<Pensamento>{
    return this.http.delete<Pensamento>(`${this.API}/${id}`);
  }

  buscarPorId(id: number): Observable<Pensamento>{
    return this.http.get<Pensamento>(`${this.API}/${id}`);
  }


}

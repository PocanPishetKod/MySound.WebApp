import { Injectable } from "@angular/core";
import { DatabaseService } from './database.service';
import * as ClientOAuth2 from "client-oauth2";
import { ISaveToken } from './auth.service';

@Injectable()
export class TokenRepository 
{

  constructor(private databaseService: DatabaseService) 
  {

  }

  public async getToken(): Promise<ISaveToken> {
    let data = <ClientOAuth2.Token>await (await this.databaseService.getDatabase())
      .get(this.databaseService.tokenStoreName, "main");

    return data ? data : null;
  }

  public async setToken(token: ISaveToken): Promise<void> 
  {
    (await this.databaseService.getDatabase())
      .transaction(this.databaseService.tokenStoreName, 'readwrite')
      .store.put({
        key: "main", value: token });
  }

  public async removeToken(): Promise<void> 
  {
    (await this.databaseService.getDatabase())
      .delete(this.databaseService.tokenStoreName, "main");
  }
}

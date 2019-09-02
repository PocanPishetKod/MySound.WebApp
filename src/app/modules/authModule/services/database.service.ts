import { openDB } from 'idb';
import { wrap, IDBPDatabase } from 'idb/lib';

export class DatabaseService 
{
  private _databaseName: string;
  public get databaseName(): string
  {
    return this._databaseName;
  }

  private _tokenStoreName: string;
  public get tokenStoreName(): string
  {
    return this._tokenStoreName;
  }

  constructor() 
  {
    this._databaseName = "tokendb"
    this._tokenStoreName = "token";
  }

  private async openOrCreateDb(): Promise<IDBPDatabase> 
  {
      return await openDB(this.databaseName, 1, {
          upgrade(db)
          {
              db.createObjectStore("token", { keyPath: "key" });
          }
      });
  }

  public async getDatabase(): Promise<IDBPDatabase> 
  {
      return await this.openOrCreateDb();
  }
}

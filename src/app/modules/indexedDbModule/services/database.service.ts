import { IDBPDatabase, openDB, IDBPObjectStore } from 'idb';
import { Injectable } from '@angular/core';
import { IndexedDbModule } from '../indexed-db.module';

@Injectable({
    providedIn: IndexedDbModule
})
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

    public async getTokenStore(): Promise<IDBPObjectStore<unknown, [string], string>>
    {
        let database = await this.openOrCreateDb();
        return database.transaction(this.tokenStoreName, "readwrite").store;
    }
}
import { IClaims } from './claims.interface';

export class Claims implements IClaims
{
    public authenticationMethods: string[] = [];
    public accessApis: string[] = [];
    public startTokenDate: Date;
    public endTokenDate: Date;
    public subject: string;
    public scopes: string[] = [];
    public tokenIssuer: string;
    public authTime: Date;
    public clientId: string;
    public email: string;
    public username: string;
    public nickname: string;
    public role: string;

    constructor(payload: any)
    {
        if (payload)
        {
            if (payload.amr)
            {
                (<string[]>payload.amr).forEach(x =>
                {
                    this.authenticationMethods.push(x);
                });
            }

            if (payload.aud)
            {
                (<string[]>payload.aud).forEach(x =>
                {
                    this.accessApis.push(x); 
                });
            }

            if (payload.nbf)
            {
                this.startTokenDate = new Date(payload.nbf * 1000);
            }

            if (payload.exp)
            {
                this.endTokenDate = new Date(payload.exp * 1000);
            }

            if (payload.sub)
            {
                this.subject = payload.sub;
            }

            if (payload.scope)
            {
                (<string[]>payload.scope).forEach(x =>
                {
                    this.scopes.push(x); 
                });
            }

            if (payload.iss)
            {
                this.tokenIssuer = payload.iss;
            }

            if (payload.auth_time)
            {
                this.authTime = new Date(payload.auth_time * 1000);
            }

            if (payload.client_id)
            {
                this.clientId = payload.client_id;
            }

            if (payload.email)
            {
                this.email = payload.email;
            }

            if (payload.name)
            {
                this.username = payload.username;
            }

            if (payload.nickname)
            {
                this.nickname = payload.nickname;
            }

            if (payload.role)
            {
                this.role = payload.role;
            }
        }
    }
}
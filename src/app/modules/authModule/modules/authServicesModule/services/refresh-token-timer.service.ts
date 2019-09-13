import { Injectable } from "@angular/core";
import { RefreshTokenTimerTimeCalculator } from './refresh-token-timer-time-calculator.service';
import { AuthServicesModule } from '../auth-services.module';

@Injectable({
    providedIn: AuthServicesModule
})
export class RefreshTokenTimerService
{
    private secondsBeforeExpiration: number;
    private timerId: number;

    constructor(private refreshTokenTimerTimeCalculator: RefreshTokenTimerTimeCalculator)
    {
        this.secondsBeforeExpiration = 10;
        this.timerId = null;
    }

    /** Пытается поставить таймер на обновление токена. При удачном выполнении возвращает true, иначе false
     *  Возвращает false в случае если токен уже истек.
     */
    public setTimer(endTokenDate: Date, handler: () => Promise<any>): boolean
    {
        if (this.timerId)
        {
            throw new Error();
        }

        let time = this.refreshTokenTimerTimeCalculator.calculate(endTokenDate, this.secondsBeforeExpiration);
        if (time == -1)
        {
            return false;
        }

        this.timerId = window.setTimeout(handler, time);
        return true;
    }

    /** Отменяет таймер */
    public cancelTimer(): void
    {
        if (this.timerId)
        {
            window.clearTimeout(this.timerId);
            this.timerId = null;
        }
    }
}
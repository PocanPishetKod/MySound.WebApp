import { Injectable } from "@angular/core";
import { AuthServicesModule } from '../auth-services.module';

@Injectable({
    providedIn: AuthServicesModule
})
export class RefreshTokenTimerTimeCalculator
{
    constructor()
    {
        
    }

    /** Высчитывает время до истечения токена */
    private getEndTokenTimeForTimer(endTokenDate: Date, secondsBeforeExpiration: number): Date
    {
        return new Date(endTokenDate.getMilliseconds() - secondsBeforeExpiration * 1000);
    }

    /** Высчитывает время таймера в секундах. Возвращает отрицательное число если таймер не может быть установлен */
    public calculate(endTokenDate: Date, secondsBeforeExpiration: number): number
    {
        let now = new Date().getMilliseconds();
        let end = this.getEndTokenTimeForTimer(endTokenDate, secondsBeforeExpiration).getMilliseconds();
        let differenceSeconds = (end - now) / 1000;

        if (differenceSeconds > secondsBeforeExpiration)
        {
            return differenceSeconds;
        }

        return -1;
    }
}
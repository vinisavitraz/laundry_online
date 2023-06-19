export class DateUtils {

    public static formatDateToString(date: Date): string {
        const year: number = date.getFullYear();
        let month: number = date.getMonth() + 1;
        let day: number = date.getDate();
        let monthString: string = month.toString();
        let dayString: string = day.toString();
        let hours: number = date.getHours();
        let minutes: number = date.getMinutes();
        let hoursString: string = date.getHours().toString();
        let minutesString: string = day.toString().toString();

        if (day < 10) dayString = '0' + day;
        if (month < 10) monthString = '0' + month;
        if (hours < 10) hoursString = '0' + hours;
        if (minutes < 10) minutesString = '0' + minutes;

        return dayString + '/' + monthString + '/' + year + ' ' + hoursString + ':' + minutesString;
    }

}
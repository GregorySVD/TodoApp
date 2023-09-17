import React, {useEffect, useState} from 'react';
import './GetDate.css'

export const GetDate = () => {
    const [getYear, setGetYear] = useState<number>(0);
    const [getMonth, setGetMonth] = useState<string>('Jan');
    const [getDayNumber, setGetDayNumber] = useState<number>(0);
    const [getDatOfWeek, setGetDatOfWeek] = useState<string>("Tuesday");


    useEffect(() => {
        const currentDate = new Date();
        setGetYear(currentDate.getFullYear());
        setGetDayNumber(currentDate.getDate());
        setGetMonth(getMonthString(currentDate));
        setGetDatOfWeek(getDayOfWeek(currentDate));
    }, [])
    const getMonthString = (date: Date): string => {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return months[(date.getMonth())];
    }
    const getDayOfWeek = (date: Date): string => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysOfWeek[date.getDay()];
    }
    return (
        <div className="GetDate__container">
            <div className="GetDate__date">
                <div className="GetDate__date_day_number">
                    {getDayNumber}
                </div>
                <div className="GetDate__month_and_year">
                    <div className="GetDate__date_month">{getMonth}</div>
                    <div className="GetDate__date_year">{getYear}</div>
                </div>
            </div>
            <div className="GetDate__date_day_of_week">{getDatOfWeek}</div>
        </div>
    );


}

import React, {useEffect, useState} from 'react';
import './GetDate.css'
import { useErrorContext} from "../context/ErrorContext";
import {ErrorPage} from "../components/layouts/ErrorPage/ErrorPage";

export const GetDate = () => {
    const [getYear, setGetYear] = useState<number>(0);
    const [getMonth, setGetMonth] = useState<string>('Jan');
    const [getDayNumber, setGetDayNumber] = useState<number>(0);
    const [getDatOfWeek, setGetDatOfWeek] = useState<string>("Tuesday");
    const contextError = useErrorContext();
    const {error, setError} = contextError;


    useEffect(() => {
        try {
        const currentDate = new Date();
        setGetYear(currentDate.getFullYear());
        setGetDayNumber(currentDate.getDate());
        setGetMonth(getMonthString(currentDate));
        setGetDatOfWeek(getDayOfWeek(currentDate));
        } catch (e) {
            setError(e as Error);
        }
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
    if (error) {
        return <ErrorPage error={error}/>
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

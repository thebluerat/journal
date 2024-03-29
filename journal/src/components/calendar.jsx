import React, {useState} from 'react';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay, parse, addDays
} from 'date-fns';
import {Icon} from '@iconify/react';
import '../index.css';

const RenderHeader = ({currentMonth, prevMonth, nextMonth}) =>{
    return (
        <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="block">
                    <span className="text">
                        <span className="text month">
                            {format(currentMonth, 'M')}월
                        </span>
                        {format(currentMonth, 'yyyy')}
                    </span>
                </div>
                <div className="col col-end">
                    <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth}/>
                    <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth}/>
                </div>
            </div>
        </>
    )
}

const RenderDays =()=> {
    const days = [];
    const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i=0; i<7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>
        );
    }
    return <div className="days row">{days}</div>
}

const RenderCells = ({currentMonth, selectedDate, onDateClick}) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i=0; i<7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(day, 'M')
                            ? 'not-valid' 
                            : 'valid'
                    }`}
                    key={day}
                    onClick={()=> onDateClick(parse(cloneDay))}
                >
                    <span
                        className={
                            format(currentMonth, 'M') !== format(day, 'M')
                                ? 'text not-valid'
                                : ''
                        }
                    >
                        {formattedDate}
                    </span>
                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>,
        );
        days = [];
    }
    return <div className="body">{rows}</div>
}
export const Calendar =()=> {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth =()=> {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth =()=> {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick =(day)=> {
        setSelectedDate(day);
    }
    return (
        <>
            <div className="calendar">
                <RenderHeader
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                />
                <RenderDays/>
                <RenderCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={onDateClick}
                />
            </div>
        </>
    )
}
export default Calendar;
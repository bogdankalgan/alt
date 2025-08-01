import React, { useEffect, useState } from "react";
import  {supabase} from "../supabaseClient";
import EventsCalendar from "../components/events/EventsCalendar";
import EventList from "../components/events/EventList";
import EventNotificationSetup from "../components/events/EventNotificationSetup";
import ExportEventsButton from "../components/events/ExportEventsButton";

const EventsPlannerPage = () => {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        const { data, error } = await supabase
            .from("events")
            .select("*")
            .order("event_date", { ascending: true });
        if (!error) setEvents(data);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">HR-планировщик событий</h1>
            <EventNotificationSetup onRefresh={fetchEvents} />
            <EventsCalendar events={events} />
            <EventList events={events} onRefresh={fetchEvents} />
            <ExportEventsButton events={events} />
        </div>
    );
};

export default EventsPlannerPage;
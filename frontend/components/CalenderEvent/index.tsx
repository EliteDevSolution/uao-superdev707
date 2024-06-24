"use client";

import InputComponent from "./InputEvent";
import { EventList } from "./EventList";

export const CalendarEvent = () => {
  return (
    <div className="w-full h-full relative block sm:justify-between sm:flex">
      <InputComponent />
      <EventList />
    </div>
  );
};

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { RootState } from "@/redux/store";
import { getAllEvents } from "@/apis";
import { eventData } from "@/redux/types";
import CardComponent from "./EventCard";

export const EventList = () => {
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state: RootState) => state.calendar);

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  return (
    <div className=" block sm:overflow-auto p-5 h-[100vh] m-auto">
      <div className="w-full gap-10 grid  grid-cols-1 m-atuo lg:grid-cols-2 2xl:grid-cols-3">
        {events?.map((item: eventData, index: number) => (
          <CardComponent key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

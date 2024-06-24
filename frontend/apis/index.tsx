import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { eventData, addEventData } from "@/redux/types";

export const getAllEvents = createAsyncThunk("event/getAllEvents", async () => {
  const response = await axios.get("http://localhost:5000/event");
  return response.data;
});

export const addEvent = createAsyncThunk(
  "event/addEvent",
  async (event: addEventData) => {
    const response = await axios.post("http://localhost:5000/event", event);
    return response.data;
  }
);

export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (_id: string) => {
    const response = await axios.delete(`http://localhost:5000/event/${_id}`);
    return response.data;
  }
);

export const changeEvent = createAsyncThunk(
  "event/updateEvent",
  async (updatedEvent: eventData) => {
    const response = await axios.put(
      `http://localhost:5000/event/${updatedEvent._id}`,
      updatedEvent
    );
    return response.data;
  }
);

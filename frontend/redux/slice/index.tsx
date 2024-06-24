import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { eventRes, EventState } from "../types";
import { getAllEvents, addEvent, deleteEvent, changeEvent } from "@/apis";

const initialState: EventState = {
  events: [],
  status: "idle",
  error: null,
  updateEvent: null,
  isUpdate: false,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    toUpdateEvent: (state, action) => {
      state.isUpdate = action.payload.isUpdate;
      state.updateEvent = action.payload.updateData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllEvents.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.status = "succeeded";
          const response = action.payload as unknown as eventRes;
          state.events = response.eventData;
        }
      )
      .addCase(addEvent.fulfilled, (state, action) => {
        if (action.payload.message === "Event has been created successfully") {
          state.status = "succeeded";
          state.events = [...state.events, action.payload.newEvent];
        } else {
          state.status = "failed";
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        if (action.payload.message === "Event deleted successfully") {
          state.status = "succeeded";
          state.events = state.events.filter(
            (event) => event._id !== action.payload.deletedEvent._id
          );
        } else {
          state.status = "failed";
        }
      })
      .addCase(changeEvent.fulfilled, (state, action) => {
        if (action.payload.message === "Event has been successfully updated") {
          state.status = "succeeded";
          state.events.map((event, index) => {
            if (event._id === action.payload.existingEvent._id) {
              delete action.payload.existingEvent._v;
              state.events[index] = action.payload.existingEvent;
            }
          });
        }
      });
  },
});
export const CalenderReducer = eventSlice.reducer;
export const { toUpdateEvent } = eventSlice.actions;

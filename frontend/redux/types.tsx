export type eventData = {
  _id: string;
  title: string;
  price: number;
  start_date: string;
  end_date: string;
};

export type addEventData = {
  title: string;
  price: number;
  start_date: string;
  end_date: string;
};

export type eventRes = {
  message: string;
  eventData: eventData[];
};

export interface EventState {
  events: eventData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isUpdate: boolean;
  updateEvent: eventData | null;
}

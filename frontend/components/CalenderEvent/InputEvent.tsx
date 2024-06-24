"use client";

import React, { useState, useEffect } from "react";
import { Input, Button, Tooltip } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { RootState } from "@/redux/store";
import {
  CREATE_NOTIFICATION,
  UPDATE_NOTIFICATION,
  REQUIRED_NOTIFICATION,
  SERVER_ERROR,
} from "../../utilis/define";
import { getCurrentDate, formatDateToString } from "@/utilis/helper";
import { addEvent, changeEvent } from "@/apis";
import { toUpdateEvent } from "@/redux/slice";

export default function InputComponent() {
  const dispatch = useAppDispatch();

  const { status, isUpdate, updateEvent } = useAppSelector(
    (state: RootState) => state.calendar
  );

  const [inputEvent, setInputEvent] = useState({
    title: "",
    price: 0,
  });

  const [date, setDate] = useState({
    start: parseDate(getCurrentDate()),
    end: parseDate(getCurrentDate()),
  });

  const [isInvalid, setValid] = useState(false);

  useEffect(() => {
    if (isUpdate) {
      setInputEvent({
        ...inputEvent,
        title: updateEvent?.title as string,
        price: updateEvent?.price as number,
      });
      setDate({
        start: parseDate(updateEvent?.start_date as string),
        end: parseDate(updateEvent?.end_date as string),
      });
    }
  }, [updateEvent]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "title") {
      setValid(false);
    }
    setInputEvent({
      ...inputEvent,
      [name]: value,
    });
  };

  const handleAddEvent = () => {
    const toSendData = {
      title: inputEvent.title,
      price: Number(inputEvent.price),
      start_date: formatDateToString(date.start.toDate(getLocalTimeZone())),
      end_date: formatDateToString(date.end.toDate(getLocalTimeZone())),
    };
    if (toSendData.title === "") {
      setValid(true);
      return;
    }
    dispatch(addEvent(toSendData));

    /*---------go back to initial state-------*/
    setInputEvent({
      ...inputEvent,
      title: "",
      price: 0,
    });
    setDate({
      start: parseDate(getCurrentDate()),
      end: parseDate(getCurrentDate()),
    });
    /*---------go back to initial state-------*/

    if (status === "succeeded") {
      toast(CREATE_NOTIFICATION);
    } else {
      toast(SERVER_ERROR);
    }
  };

  const handleUpdateEvent = () => {
    const toSendData = {
      _id: updateEvent?._id as string,
      title: inputEvent.title,
      price: Number(inputEvent.price),
      start_date: formatDateToString(date.start.toDate(getLocalTimeZone())),
      end_date: formatDateToString(date.end.toDate(getLocalTimeZone())),
    };
    if (toSendData.title === "") {
      setValid(true);
      return;
    }
    dispatch(changeEvent(toSendData));
    /*---------go back to initial state-------*/
    dispatch(
      toUpdateEvent({
        isUpdate: false,
        updateData: null,
      })
    );
    setInputEvent({
      ...inputEvent,
      title: "",
      price: 0,
    });
    setDate({
      start: parseDate(getCurrentDate()),
      end: parseDate(getCurrentDate()),
    });
    /*---------go back to initial state-------*/

    if (status === "succeeded") {
      toast(UPDATE_NOTIFICATION);
    } else {
      toast(SERVER_ERROR);
    }
  };
  const handleClickBtn = () => {
    if (isUpdate) {
      handleUpdateEvent();
    } else {
      handleAddEvent();
    }
  };

  return (
    <div className="m-auto my-[30px] p-12 h-full top-0 bg-white z-50 flex overflow-hidden sm:sticky">
      <div className="m-auto">
        <p className="text-slate-700 text-1xl font-bold mb-2 m-auto">
          Event Mangement
        </p>
        <DateRangePicker
          granularity="day"
          label="Date range"
          value={date}
          onChange={setDate}
          className="max-full m-auto"
        />
        <Input
          label="Event"
          name="title"
          isInvalid={isInvalid}
          errorMessage={REQUIRED_NOTIFICATION}
          labelPlacement="outside"
          variant="bordered"
          className="w-full pt-1"
          value={inputEvent.title}
          onChange={handleInputChange}
        />
        <Input
          type="number"
          label="Price"
          name="price"
          labelPlacement="outside"
          variant="bordered"
          value={inputEvent.price.toString()}
          onChange={handleInputChange}
          className="w-full pt-1"
        />
        <div className="flex w-full gap-3 mt-8">
          <Button
            color="primary"
            variant="bordered"
            className="w-full"
            onClick={() => handleClickBtn()}
          >
            {!isUpdate ? "Save" : "Update"}
          </Button>
          {!isUpdate ? (
            ""
          ) : (
            <Tooltip
              content="Cancel Update"
              placement="bottom-start"
              color="secondary"
              className="capitalize"
            >
              <XMarkIcon
                className="w-9 h-9 bg-slate-200  m-auto p-2 rounded-xl"
                onClick={() => {
                  dispatch(
                    toUpdateEvent({
                      isUpdate: false,
                      updateData: null,
                    })
                  );
                }}
              />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}

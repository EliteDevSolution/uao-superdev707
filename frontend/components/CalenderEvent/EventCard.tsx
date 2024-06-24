"use client";

import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { RootState } from "@/redux/store";
import { DELTE_NOTIFICATION, SERVER_ERROR } from "@/utilis/define";
import { deleteEvent } from "@/apis";
import { toUpdateEvent } from "@/redux/slice";

type Props = {
  _id: string;
  title: string;
  price: number;
  start_date: string;
  end_date: string;
};

export default function CardComponent(props: Props) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state: RootState) => state.calendar);

  const handleUpdate = () => {
    dispatch(
      toUpdateEvent({
        isUpdate: true,
        updateData: props,
      })
    );
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (props._id) {
          dispatch(deleteEvent(props._id));
          if (status === "succeeded") {
            toast(DELTE_NOTIFICATION);
          } else {
            toast(SERVER_ERROR);
          }
        }
      }
    });
  };

  return (
    <div
      className="max-w-[23rem] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer m-auto"
      onClick={handleUpdate}
    >
      <div className="flex justify-between">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {props?.title}
        </h5>
        <TrashIcon
          className="w-[16px] align-middle pb-2 z-40 hover:text-red-500"
          onClick={handleDelete}
        />
      </div>
      <div className="flex justify-between">
        <h6 className="mb-2 text-1xl font-bold tracking-tight text-gray-900">
          {props?.start_date} {" ~ "} {props?.end_date}
        </h6>
        <h6 className="mb-2 text-1xl font-bold tracking-tight text-slate-500">
          {"$"}
          {props?.price}
        </h6>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Welcome!. This is calendar event card.I hope all of your work is doing
        well. Have a good day!
      </p>
    </div>
  );
}

"use client";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "@/lib/redux/authSlice";
import { IGetUserProfileAPIResponse } from "@/types/types";

export default function UserHydrator({ user }: {user: IGetUserProfileAPIResponse}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(setUser(user));
  }, [user]);

  return null;
}

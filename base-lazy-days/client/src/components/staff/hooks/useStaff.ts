import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Staff } from "@shared/types";

import { filterByTreatment } from "../utils";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

export function useStaff() {
  // for filtering staff by treatment
  const [filter, setFilter] = useState("all");

  // get data from server via useQuery
  const fallback: Staff[] = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff
  });

  return { staff: data, filter, setFilter };
}

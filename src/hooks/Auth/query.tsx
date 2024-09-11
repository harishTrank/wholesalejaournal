import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../store/Services/Auth";

export const GetUserDetailsApi = () =>
  useQuery(["getUserDetails"], getUserDetails);

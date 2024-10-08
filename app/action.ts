import { fetchUpdateToken } from "@/fetch/responsseserver";

export const updateToken = async (refresh: {
  refresh: string;
}) => {
  setTimeout(() => {fetchUpdateToken(refresh)}, 36000000);
};

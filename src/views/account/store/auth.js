import ls from "local-storage";

export function getToken() {
  const token = ls.get("authen", "");
  return token.data.accessToken;
}

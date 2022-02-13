import { useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-requests";

export default () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []); //,[] to indicate that we only want to call it one time

  return <div>Signing you out...</div>;
};

import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
      id
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });

  //   console.log("data : ", data);

  useEffect(() => {
    if (data?.me === null) {
      console.log(
        "there is a token a ls but the token did not work on the backend"
      );
      logUserOut();
    }
  }, [data]);

  return { data };
}

export default useUser;

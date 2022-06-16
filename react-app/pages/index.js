import { useContext, useEffect } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import { Alert } from "antd";

const index = () => {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  if (state == null) {
    // alert("Login first");
    router.push("/login");
  }

  return (
    <div className="container">
      <div iv className="row">
        <div className="col">
          <h1 className="dispaly-1 text-center py-5">HomePage</h1>
          {JSON.stringify(state)}
          <img src="/images/panor.jpg" alt="image" />
        </div>
      </div>
    </div>
  );
};

export default index;

import { useContext } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/userRoute";

const dashboard = () => {
  const [state, setState] = useContext(UserContext);
  return (
    <UserRoute>
      <div className="container">
        <div iv className="row">
          <div className="col">
            <h1 className="dispaly-1 text-center py-5">Dashboard</h1>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default dashboard;

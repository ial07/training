import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthForm from "../components/form/AuthForm";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(process.env.NEXT_PUBLIC_API);
    try {
      // console.log(name, email, password, secret);
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/login`,
        {
          email: email,
          password: password,
        }
      );

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-2 bg-default-img text-light">
        <div className="col text-center">
          <h1 className="dispaly-1 text-center py-5">Login</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <AuthForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            setLoading={setLoading}
            page="login"
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="text-center">
            Not yet registered?{" "}
            <Link href="/register">
              <a>Register</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default login;

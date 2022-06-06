import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {page === "login" ? (
        ""
      ) : (
        <div className="form-group mt-3">
          <label className="text-muted">Your Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
      )}

      <div className="form-group mt-3">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <div className="form-group mt-3">
        <label className="text-muted">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      {page === "login" ? (
        ""
      ) : (
        <>
          <div className="form-group mt-3">
            <small>
              <label className="text-muted">Secret</label>
            </small>
            <select className="form-control">
              <option>What is your favorite color?</option>
              <option>What is your bestfriend name?</option>
              <option>What city is your born?</option>
            </select>

            <small className="form-text text-muted">
              You can use this to reset yout password if forggoten
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Write your answer"
              onChange={(e) => setSecret(e.target.value)}
              value={secret}
            />
          </div>
        </>
      )}
      <div className="form-group">
        <button className="btn btn-primary col-12 mt-3">
          {loading ? (
            <LoadingOutlined />
          ) : page === "login" ? (
            "Login"
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;

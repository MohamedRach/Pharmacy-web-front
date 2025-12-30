import { Link } from "react-router-dom";
import LoginUserForm from "../components/LoginUserForm";

export default function LoginUserPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-card-title">Sign in</h1>
        <p className="login-card-subtitle">Access your account</p>

        <LoginUserForm />
        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/register">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

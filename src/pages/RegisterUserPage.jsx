import RegisterUserForm from "../components/RegisterUserForm";


export default function RegisterUserPage() {
    return (
        <div className="register-page">
            <div className="register-card">
                <h1 className="register-card-title">Create your account</h1>
                <p className="register-card-subtitle">Fill in the information below</p>
                <RegisterUserForm />
            </div>
        </div>
    );
}
import SectionTitle from "@/components/shared/SectionTitle";
import LoginFrom from "@/features/auth/components/LoginForm";

function Login() {
  return (
    <div className="bg-bg-card p-12 rounded-md flex flex-col items-center">
      <SectionTitle
        title="Welcome Back"
        des="Please enter your details to access your workspace"
      />

      {/* form component */}
      <LoginFrom />
    </div>
  );
}

export default Login;

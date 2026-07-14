import FormComponent from "@/components/forms/SignUpFormComponent";
import SectionTitle from "@/components/shared-ui/SectionTitle";

function SignUp() {
  return (
    <div className="bg-card-background p-12 rounded-md flex flex-col  items-center">
      {/* section title component */}
      <SectionTitle
        title="Create your workspace"
        des="Join the editorial approach to task management."
      />

      {/* form component */}
      <FormComponent />
    </div>
  );
}

export default SignUp;

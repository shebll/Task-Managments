import FormComponent from "@/features/auth/components/SignUpFormComponent";
import SectionTitle from "@/components/shared/SectionTitle";

function SignUp() {
  return (
    <div
      className="md:bg-bg-card p-0 md:p-12 rounded-md flex w-full md:w-fit
     flex-col items-center"
    >
      {/* section title component */}
      <div className="text-start md:text-center">
        <SectionTitle
          title="Create your workspace"
          des={{
            desktop: "Join the editorial approach to task management.",
            mobile:
              "Join the curated environment for institutional trustand task precision.",
          }}
        />
      </div>

      {/* form component */}
      <FormComponent />
    </div>
  );
}

export default SignUp;

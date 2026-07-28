import Image from "next/image";
import Button from "../ui/Button";

function ErrorApi() {
  return (
    <div className="w-full h-full items-center flex justify-center">
      <div className="w-sm flex flex-col justify-between items-center gap-6">
        <div className="p-4 bg-bg-error rounded-md">
          <Image
            src={"/assets/icons/error.svg"}
            alt="error icon"
            height={24}
            width={27}
          />
        </div>
        <h4 className="text-xl font-semibold">Something went wrong</h4>
        <p className="text-text-muted text-center">
          We&apos;re having trouble retrieving your project members right now.
          Please try again in a moment.
        </p>
        <Button variant="primary">Retry Connection</Button>
      </div>
    </div>
  );
}

export default ErrorApi;

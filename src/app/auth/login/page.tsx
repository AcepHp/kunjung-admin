import HomeOwnerLoginForm from "@/components/Auth/HomeAdminLogin";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex mt-20 items-center justify-center px-6 text-gray-900 font-secondary">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-[64px] text-center font-serif mb-2">
          <span className="block">Home owner</span>
          <span className="block -mt-7">log in</span>
        </h1>

        <p className="text-[16px] text-gray-600 mb-8 text-center">
          Not got an account?{" "}
          <Link
            href="/auth/register/home-owner"
            className="underline hover:text-gray-800"
          >
            Create an account
          </Link>
        </p>

        <HomeOwnerLoginForm />
      </div>
    </div>
  );
}

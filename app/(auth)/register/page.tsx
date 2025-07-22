import { RegisterForm } from "@/components/RegisterForm";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-[calc(100svh-80px)] w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
};

export default page;

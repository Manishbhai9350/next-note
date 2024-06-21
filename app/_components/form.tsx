"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Loading from "./Loading";
import Link from "next/link";

interface FormProps {
  type: "login" | "signup";
  handleSubmition: ({ data, setIsLoading }: any) => void;
}

interface LoginDetails {
  email: string;
  password: string;
}

interface SignupDetails {
  username: string;
  email: string;
  password: string;
}

const MyForm = ({ type, handleSubmition }: FormProps) => {
  const [LoginDetails, setLoginDetails] = useState<LoginDetails>({
    email: "",
    password: "",
  });
  const [SignupDetails, setSignupDetails] = useState<SignupDetails>({
    email: "",
    password: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDiabled, setIsDiabled] = useState(false)

  return type == "login" ? (
    <div className="flex h-[80%] w-full flex-col items-start justify-evenly gap-3">
      <h1 className="text-center w-full text-2xl uppercase">Login</h1>
      <Input
        className="border border-zinc-400"
        type="email"
        name="email"
        placeholder="email"
        value={LoginDetails.email}
        onChange={(e) => {
          setLoginDetails({ ...LoginDetails, email: e.target.value });
        }}
      />
      <Input
        className="border border-zinc-400"
        type="password"
        name="password"
        placeholder="password"
        value={LoginDetails.password}
        onChange={(e) => {
          setLoginDetails({ ...LoginDetails, password: e.target.value });
        }}
      />
      <Button
        disabled={isDiabled}
        onClick={() => {
          handleSubmition({ data: LoginDetails, setIsLoading , setIsDiabled });
        }}
        className="w-full"
        type="submit"
      >
        {isLoading ? <Loading /> : <h1 className="text-xl">Login</h1>}
      </Button>
      {!isDiabled && <Link className="w-full" href="/signup">
        
        <p className="text-[14.5px] w-full text-center text-zinc-500">
          Dont Have Account
        </p>
      </Link>}
    </div>
  ) : (
    <div className="flex h-full w-full flex-col items-start justify-evenly gap-3">
      <h1 className="text-center w-full text-2xl uppercase">Sign UP</h1>
      <Input
        className="border border-zinc-400"
        type="text"
        name="username"
        placeholder="username"
        value={SignupDetails.username}
        onChange={(e) => {
          setSignupDetails({ ...SignupDetails, username: e.target.value });
        }}
      />
      <Input
        className="border border-zinc-400"
        type="email"
        name="email"
        placeholder="email"
        value={SignupDetails.email}
        onChange={(e) => {
          setSignupDetails({ ...SignupDetails, email: e.target.value });
        }}
      />
      <Input
        className="border border-zinc-400"
        type="password"
        name="password"
        placeholder="password"
        value={SignupDetails.password}
        onChange={(e) => {
          setSignupDetails({ ...SignupDetails, password: e.target.value });
        }}
      />
      <Button
        disabled={isDiabled}
        onClick={() => {
            handleSubmition({ data: SignupDetails, setIsLoading , setIsDiabled });
        }}
        className="w-full"
        type="submit"
      >
        {isLoading ? <Loading /> : <h1 className="text-xl">Sign Up</h1>}
      </Button>
      {!isDiabled && <Link className="w-full" href="/login">
        <p className="text-[14.5px] w-full text-center text-zinc-500">
          Already Have Account
        </p>
      </Link>}
    </div>
  );
};

export default MyForm;

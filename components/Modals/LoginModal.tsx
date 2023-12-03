"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Modal from "@/components/Modals/Modal";
import Heading from "@/components/Heading";
import Input from "@/components/Inputs/Input";
import Button from "@/components/Button";
import { signIn } from "next-auth/react";
import RegisterModal from "./RegisterModal";

interface LoginModalProps {}

const LoginModal: React.FC<LoginModalProps> = ({}) => {
  const router = useRouter();
  const LoginModal = useLoginModal();
  const RegisterModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success(`Welcome back, !`);
        router.refresh();
        LoginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error, {
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      }
    });
  };

  const bodyContent = (
    <div>
      <Heading title="Welcome back," subTitle="Log in your account" center />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Password"
        type={"password"}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />

      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />

      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />

      <div className="text-neutral-500 text-center font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>{`Don't have an account?`}</div>

          <div
            className="text-neutral-800 cursor-pointer hover-underlined"
            onClick={() => {
              LoginModal.onClose();
              RegisterModal.onOpen();
            }}
          >
            Register here!
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={LoginModal.isOpen}
      title="Log In"
      actionLabel="Continue"
      onClose={LoginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;

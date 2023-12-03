"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import EmptyState from "@/components/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const Error: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <div>
    <EmptyState title="Oops" subTitle="Something when wrong :(" />
  </div>;
};

export default Error;

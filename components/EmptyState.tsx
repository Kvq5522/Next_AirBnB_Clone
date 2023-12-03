"use client";

import { useRouter } from "next/navigation";
import Heading from "@/components/Heading";
import Button from "@/components/Button";

interface EmptyStateProps {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No results found",
  subTitle = "Try adjusting your search or filter to find what you're looking for",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subTitle={subTitle} center />

      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          ></Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;

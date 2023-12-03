"use client";

import Image from "next/image";

interface AvatarProps {
  imgSrc?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ imgSrc }) => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      src={imgSrc ?? "/images/placeholder.jpg"}
      alt=""
    />
  );
};

export default Avatar;

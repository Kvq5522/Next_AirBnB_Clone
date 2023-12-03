"use client";

import useCountries from "@/hooks/useCountries";
import { User } from "@prisma/client";
import Heading from "../Heading";

import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  imgSrc: string;
  locationValue: string;
  id: string;
  currentUser: User | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imgSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return <>
    <Heading title={title} subTitle={`${location?.region} ${location?.label}`} center />

    <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
      <Image 
        src={imgSrc}
        alt={title}
        fill
        className="object-cover object-center w-full"
      />

      <div className="absolute top-5 right-5">
        <HeartButton listingId={id} currentUser={currentUser} />
      </div>
    </div>
  </>;
};

export default ListingHead;
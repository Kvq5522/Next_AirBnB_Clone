"use client";

import Container from "@/components/Container";
import Logo from "@/components/Navbar/Logo";
import Search from "@/components/Navbar/Search";
import UserMenu from "@/components/Navbar/UserMenu";
import { User } from "@prisma/client";
import Categories from "@/components/Navbar/Categories";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm text-black">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      
      <Categories />
    </div>
  );
};

export default Navbar;

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <NavigationMenu className="mx-auto mt-4 rounded-full bg-black p-1">
      <NavigationMenuList className="flex items-center justify-between">
        <NavigationMenuItem className="rounded-full bg-white p-1">
          <Link href="https://artsbymat.vercel.app">
            <Image
              src="/artsbymat-logo.svg"
              alt="Arts by Mat Logo"
              width={30}
              height={30}
              className="inline-block"
            />
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="mr-2 ml-4 text-white">
          <Link href="/">Home</Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="mr-4 ml-2 text-white">
          <Link href="/about">About</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-full">
            <Link href="/login">Account</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/login">
                    <div className="font-medium">Login</div>
                    <div className="text-muted-foreground">
                      Access your account to manage your profile and settings.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/register">
                    <div className="font-medium">Register</div>
                    <div className="text-muted-foreground">
                      Create a new account to get started.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;

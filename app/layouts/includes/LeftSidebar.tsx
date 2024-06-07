import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import Image from "next/image";

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;


          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link hover:bg-dark-5 ${isActive && "bg-red-1"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p className='text-light-orange max-lg:hidden'>{link.label}</p>
            </Link>
          );
        })}
      </div>
      
    </section>
  );
};


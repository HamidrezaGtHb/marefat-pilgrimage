"use client";

import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isToursOpen, setIsToursOpen] = useState(true);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
  };

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: "📊",
    },
    {
      title: "Tours",
      icon: "✈️",
      submenu: [
        { title: "All Tours", href: "/admin/tours" },
        { title: "Create New Tour", href: "/admin/tours/new" },
      ],
    },
    {
      title: "Bookings",
      href: "/admin/bookings",
      icon: "📝",
    },
    {
      title: "Consultations",
      href: "/admin/consultations",
      icon: "📅",
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: "👥",
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: "⚙️",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-charcoal/10 bg-white">
      <div className="flex h-full flex-col">
        {/* Logo/Brand */}
        <div className="border-b border-charcoal/10 p-6">
          <h1 className="font-display text-xl text-charcoal">Marefat Admin</h1>
          {session?.user?.email && (
            <p className="mt-1 text-xs text-charcoal/60">{session.user.email}</p>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.title}>
                {item.submenu ? (
                  // Item with submenu
                  <div>
                    <button
                      onClick={() => setIsToursOpen(!isToursOpen)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-charcoal transition hover:bg-charcoal/5"
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                      </span>
                      <span className={`transition-transform ${isToursOpen ? "rotate-90" : ""}`}>
                        ›
                      </span>
                    </button>
                    {isToursOpen && (
                      <ul className="ml-4 mt-1 space-y-1 border-l-2 border-charcoal/10 pl-3">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.href}>
                            <button
                              onClick={() => router.push(subItem.href as any)}
                              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                                pathname === subItem.href
                                  ? "bg-gold/10 text-gold-dark font-medium"
                                  : "text-charcoal/70 hover:bg-charcoal/5 hover:text-charcoal"
                              }`}
                            >
                              {subItem.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  // Regular item
                  <button
                    onClick={() => router.push(item.href as any)}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                      pathname === item.href
                        ? "bg-gold/10 text-gold-dark font-medium"
                        : "text-charcoal hover:bg-charcoal/5"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-charcoal/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-charcoal transition hover:bg-red-50 hover:text-red-600"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

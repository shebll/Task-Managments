"use client";

import { useEffect, useState } from "react";
import { authStorage } from "@/features/auth/lib/authStorage";
import { User } from "@/features/auth/types/types";

export default function DashboardHeader() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(authStorage.getUserData());
  }, []);
  return (
    <header className="border-b border-border-default px-6 py-3 flex justify-end">
      <div className="flex justify-end items-center gap-3.5 pl-4 border-l border-border-divider">
        <div className="text-right text-text-primary font-bold text-sm">
          <p>{user?.user_metadata.name}</p>

          <p className="text-2xs font-bold text-text-primary-accent">
            {user?.user_metadata.department}
          </p>
        </div>

        <div className="bg-bg-avatar text-base rounded-md font-bold text-avatar-text w-10 h-10 flex justify-center items-center">
          {user?.user_metadata.name.split(" ")[0].slice(0, 1).toUpperCase()}
          {user?.user_metadata.name.split(" ")[1].slice(0, 1).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

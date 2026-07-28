import { logout } from "@/features/auth/api/auth-api";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../ui/Button";
import { LogOut } from "lucide-react";

function LogOutButton({ sidebarCollapsed }: { sidebarCollapsed: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { logout: logoutStorage } = useAuth();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      setLoading(false);
      logoutStorage();
      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      className="flex items-center justify-start gap-3"
      onClick={handleLogout}
      disabled={loading}
      variant="secondary"
    >
      <LogOut size={18} className="text-sidebar-danger" />
      {!sidebarCollapsed && <p className="text-sidebar-danger">LogOut </p>}
    </Button>
  );
}

export default LogOutButton;

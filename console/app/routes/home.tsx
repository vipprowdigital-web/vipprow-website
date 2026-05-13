import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";
import vipprow_logo from "@/welcome/vipprow.png";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vipprow Admin Console" },
    { name: "description", content: "Welcome to Vipprow!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1E4EC8] dark:bg-[#1E4EC8] p-4">
      <div className="w-full max-w-md flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9 w-full">
          <div className="w-full max-w-[400px] p-4 flex justify-center gap-5">
            <img
              src={vipprow_logo}
              alt="Vipprow Logo"
              className="h-auto flex-1 w-auto"
            />
          </div>
        </header>

        <div className="flex flex-col items-center justify-center w-full">
          <Button
            onClick={() => navigate("/sign-in")}
            className="w-full max-w-sm bg-white text-[#1E4EC8] hover:bg-white cursor-pointer"
          >
            Login to Console
          </Button>
        </div>
      </div>
    </main>
  );
}

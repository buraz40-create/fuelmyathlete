import { ProfileSetup } from "@/components/onboarding/ProfileSetup";

export const metadata = {
  title: "Welcome to FuelMyAthlete",
};

export default function OnboardingPage() {
  return (
    <main
      id="main"
      className="flex min-h-screen items-center justify-center bg-background px-4 py-10"
    >
      <ProfileSetup />
    </main>
  );
}

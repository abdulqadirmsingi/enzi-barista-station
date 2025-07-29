import { RegisterForm } from "@/components/auth/RegisterForm";
import { Coffee } from "lucide-react";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Coffee className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Enzi Coffee</h1>
          <p className="text-muted-foreground">Point of Sale System</p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}

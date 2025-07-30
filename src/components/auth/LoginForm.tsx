import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuthStore } from "@/stores/authStore";
import { loginSchema, LoginFormData } from "@/utils/validation";
import { LoginRequest } from "@/types";
import { AlertCircle } from "lucide-react";
import { ZodError } from "zod";

export const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoginLoading, error, clearError } = useAuthStore();

  // Get the intended destination or default to POS
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    "/pos";

  const handleInputChange =
    (field: keyof LoginFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      // Clear validation error for this field
      if (validationErrors[field]) {
        setValidationErrors((prev) => ({ ...prev, [field]: "" }));
      }
      // Clear general error
      if (error) {
        clearError();
      }
    };

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Type assertion is safe here because we've validated the form
    const result = await login(formData as LoginRequest);

    if (result.success) {
      navigate(from, { replace: true });
    }
    // Error handling is now done in the auth store with toasts
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <p className="text-muted-foreground">
          Sign in to access the POS system
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="barista@enzi.coffee"
              value={formData.email}
              onChange={handleInputChange("email")}
              required
              className={validationErrors.email ? "border-red-500" : ""}
            />
            {validationErrors.email && (
              <p className="text-sm text-red-500">{validationErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange("password")}
              required
              className={validationErrors.password ? "border-red-500" : ""}
            />
            {validationErrors.password && (
              <p className="text-sm text-red-500">
                {validationErrors.password}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoginLoading}>
            {isLoginLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Don't have an account?{" "}
            </span>
            <Link
              to="/register"
              className="text-primary hover:underline font-medium"
            >
              Create account
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

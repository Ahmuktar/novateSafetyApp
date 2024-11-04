"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  Mail,
  Lock,
  Loader2,
  LogInIcon,
  UserCircle,
  CircleUser,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/constant";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { revalidatePath } from "next/cache";
import { usePathname } from "next/navigation";

export default function LoginModal() {
  const pathname = usePathname();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(false);

  useEffect(() => {
    const storedSession = sessionStorage.getItem("APP_SESSION");
    if (storedSession) {
      setSession(true);
    }
  }, []);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sending OTP
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const response = await fetch(`${API_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.status === "success") {
        toast({
          title: "OTP sent successfully",
        });
        setStep(2);
      } else {
        toast({
          title: `${data.error}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sendingOtp", error);
      toast({
        title: "Error",
        description:
          error?.error ||
          error?.response?.message ||
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        toast({
          title: "Login successfully",
        });
        sessionStorage.setItem("APP_SESSION", data.token);

        // Revalidate the current path after successful login
        setOtp("");
        setEmail("");
        window.location.reload();
        setIsOpen(false);
      } else {
        toast({
          title: `${data.error}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP", error);
      toast({
        title: "Error",
        description:
          error?.error ||
          error?.response?.message ||
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {session ? (
        <Button
          onClick={() => {
            sessionStorage.removeItem("APP_SESSION");
            setSession(null);
            window.location.reload();
          }}
          className="bg-red-700"
        >
          <LogInIcon className="mr-2 h-4 w-4" />
          Logout
        </Button>
      ) : (
        <Button onClick={() => setIsOpen(true)}>
          <LogInIcon className="mr-2 h-4 w-4" />
          Login
        </Button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="relative p-6">
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-4"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <h2 className="text-2xl text-gray-800 font-bold mb-4">
                    Login
                  </h2>
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.form
                        key="email"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmitEmail}
                        className="space-y-4"
                      >
                        <p className="text-sm text-gray-600 mb-4">
                          Enter your email address to receive a one-time
                          password (OTP) for secure login.
                        </p>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-800">
                            Email
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <ArrowRight className="mr-2 h-4 w-4" />
                          )}
                          {isLoading ? "Sending OTP..." : "Next"}
                        </Button>
                      </motion.form>
                    ) : (
                      <motion.form
                        key="otp"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmitOTP}
                        className="space-y-4"
                      >
                        <p className="text-sm text-gray-600 mb-4">
                          We've sent a one-time password to your email. Please
                          enter it below to complete your login.
                        </p>
                        <div className="space-y-2">
                          <Label htmlFor="otp" className="text-gray-800">
                            OTP
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                              id="otp"
                              type="text"
                              placeholder="Enter OTP"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            "Verify OTP"
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            setStep(1);
                            setOtp("");
                          }}
                          className="w-full"
                          disabled={isLoading}
                        >
                          Back to Email
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

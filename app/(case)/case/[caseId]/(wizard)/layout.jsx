"use client";

import { usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { Suspense } from "react";
import Loader from "@/components/Loader";

const steps = [
  {
    path: "/reporter",
    title: "Reporter Information",
    subtitle: "Provide further information about yourself",
    description:
      "We need basic details about you for tracking the report and contacting you if necessary. Your information remains confidential.",
  },
  {
    path: "/patient",
    title: "Patient Information",
    subtitle: "Provide information about the affected patient",
    description:
      "Provide details about the patient experiencing the reaction. If it's you, enter your own information.",
  },
  {
    path: "/medicine",
    title: "Medicine Information",
    subtitle: "Enter information about the involved medicine",
    description:
      "Enter the details of the medicine(s) involved in the reaction for accurate assessment.",
  },
  {
    path: "/reaction",
    title: "Reaction Information",
    subtitle: "Describe the observed reaction or symptoms",
    description:
      "Describe the symptoms and effects of the reaction as clearly as possible for proper analysis.",
  },
  {
    path: "/summary",
    title: "Summary",
    subtitle: "Review all information and submit report",
    description: "Review and submit",
  },
];

export default function CaseLayout({ children, params }) {
  const pathname = usePathname();
  const currentStepIndex = steps.findIndex((step) =>
    pathname.endsWith(step.path)
  );

  return (
    <div className="container mx-auto lg:px-4 py-6 sm:py-10">
      <Card className="w-full max-w-2xl border-none shadow-none lg:max-w-7xl mx-auto">
        <CardContent className="p-0 px-4 sm:px-6 w-full">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar for larger screens */}
            <div className="hidden md:block w-full md:w-1/3 lg:w-1/4">
              <ol className="relative border-l border-gray-200 dark:border-gray-700">
                {steps.map((step, index) => (
                  <li key={index} className="mb-12 ml-6">
                    <span
                      aria-current={
                        index === currentStepIndex ? "step" : undefined
                      }
                      className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 ${
                        index < currentStepIndex
                          ? "bg-green-500"
                          : index === currentStepIndex
                          ? "bg-blue-500"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      {index < currentStepIndex ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <span
                          className={`text-sm font-medium ${
                            index === currentStepIndex
                              ? "text-white"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {index + 1}
                        </span>
                      )}
                    </span>
                    <h3
                      className={`font-medium leading-tight ${
                        index === currentStepIndex
                          ? "text-blue-600 dark:text-blue-500"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {step.subtitle}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Mobile step navigation */}
            <div className="mb-8 md:hidden">
              <ol className="flex items-center justify-between w-full text-xs sm:text-sm font-medium text-center text-gray-500 dark:text-gray-400 overflow-x-auto">
                {steps.map((step, index) => (
                  <li
                    key={index}
                    className={`flex flex-col items-center min-w-[60px] sm:min-w-[80px] ${
                      index === currentStepIndex
                        ? "text-blue-600 dark:text-blue-500"
                        : ""
                    } ${
                      index < currentStepIndex
                        ? "text-green-600 dark:text-green-500"
                        : ""
                    }`}
                  >
                    <span className="flex items-center">
                      {index < currentStepIndex ? (
                        <CheckCircle2 className="w-5 h-5 mr-1.5" />
                      ) : (
                        <Circle className="w-5 h-5 mr-1.5" />
                      )}
                      <span>{index + 1}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Main content */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                {steps[currentStepIndex].title}
              </h2>
              <p className="text-gray-500 text-sm sm:text-base mb-6">
                {steps[currentStepIndex].description}
              </p>
              <Suspense fallback={<Loader />}>{children}</Suspense>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

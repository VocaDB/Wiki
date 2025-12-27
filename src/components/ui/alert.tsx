import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  CheckIcon,
  Cross2Icon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Box } from "@/components/Box";

const alertVariants = cva("px-4", {
  variants: {
    variant: {
      default: "",
      destructive:
        "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <Box
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("my-3 mt-5 font-semibold leading-none", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mb-5 [&>:first-child]:mt-0 [&_p]:leading-relaxed",
      className,
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

const alertTitleIconVariants = {
  success: {
    title: "Success",
    icon: CheckIcon,
  },
  correct: {
    title: "Correct",
    icon: CheckIcon,
  },
  incorrect: {
    title: "Incorrect",
    icon: Cross2Icon,
  },
  caution: {
    title: "Caution",
    icon: ExclamationTriangleIcon,
  },
  danger: {
    title: "Danger",
    icon: ExclamationTriangleIcon,
  },
  note: {
    title: "Note",
    icon: InfoCircledIcon,
  },
};

const SimpleAlert = React.forwardRef<
  HTMLDivElement,
  Omit<
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>,
    "variant"
  > & {
    alertTitle?: string;
    variant: keyof typeof alertTitleIconVariants;
  }
>(({ className, variant, alertTitle, ...props }, ref) => {
  const Icon = alertTitleIconVariants[variant].icon;
  return (
    <Alert ref={ref} className={className} {...props}>
      <AlertTitle>
        <Icon className="mr-1 h-5 w-5 inline-block" />
        {alertTitle || alertTitleIconVariants[variant].title}
      </AlertTitle>
      <AlertDescription>{props.children}</AlertDescription>
    </Alert>
  );
});
SimpleAlert.displayName = "SimpleAlert";

export {
  Alert as RawAlert,
  AlertTitle,
  AlertDescription,
  SimpleAlert as Alert,
};

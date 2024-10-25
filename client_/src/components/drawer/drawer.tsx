// Tremor Raw Drawer [v0.0.0]

import * as React from "react";

import * as DrawerPrimitives from "@radix-ui/react-dialog";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { JoinClasses, focusRing } from "../../utils/utils";

// import { Button } from "./Button";

import styles from "./drawer.module.scss";

const Drawer = (
  props: React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Root>
) => {
  return <DrawerPrimitives.Root {...props} />;
};
Drawer.displayName = "Drawer";

const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Trigger>
>(({ className, ...props }, ref) => {
  return (
    <DrawerPrimitives.Trigger
      ref={ref}
      className={JoinClasses(className ? className : "")}
      {...props}
    />
  );
});
DrawerTrigger.displayName = "Drawer.Trigger";

const DrawerClose = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Close>
>(({ className, ...props }, ref) => {
  return (
    <DrawerPrimitives.Close
      ref={ref}
      className={JoinClasses(className ? className : "")}
      {...props}
    />
  );
});
DrawerClose.displayName = "Drawer.Close";

const DrawerPortal = DrawerPrimitives.Portal;

DrawerPortal.displayName = "DrawerPortal";

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitives.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Overlay>
>(({ className, ...props }, forwardedRef) => {
  return (
    <DrawerPrimitives.Overlay
      ref={forwardedRef}
      className={JoinClasses(
        // base
        "fixed inset-0 z-50 overflow-y-auto",
        // background color
        "bg-black/30",
        // transition
        "data-[state=closed]:animate-hide data-[state=open]:animate-dialogOverlayShow",
        className
      )}
      {...props}
      style={{
        animationDuration: "400ms",
        animationFillMode: "backwards",
      }}
    />
  );
});

DrawerOverlay.displayName = "DrawerOverlay";

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Content>
>(({ className, ...props }, forwardedRef) => {
  return (
    <DrawerPortal>
      <DrawerOverlay>
        <DrawerPrimitives.Content
          ref={forwardedRef}
          className={JoinClasses(
            // base
            "fixed inset-y-2 mx-auto flex flex-1 flex-col shadow-lg pt-2 focus:outline-none max-sm:right-2 sm:inset-y-2 sm:right-2",
            // border color
            "border-gray-200 dark:border-gray-900",
            // background color
            "bg-white dark:bg-[#090E1A]",
            styles.content,
            focusRing,
            className
          )}
          {...props}
        />
      </DrawerOverlay>
    </DrawerPortal>
  );
});

DrawerContent.displayName = "DrawerContent";

const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className="flex items-start justify-between" {...props}>
      <div className={JoinClasses("flex flex-col gap-y-1", className)}>
        {children}
      </div>

      <DrawerPrimitives.Close asChild>
        <button
          className="aspect-square p-1 hover:bg-gray-2 hover:dark:bg-gray-400/10"
          type="button"
        >
          <CloseOutlinedIcon className="size-6" aria-hidden="true" />
        </button>
      </DrawerPrimitives.Close>
    </div>
  );
});

DrawerHeader.displayName = "Drawer.Header";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Title>
>(({ className, ...props }, forwardedRef) => (
  <DrawerPrimitives.Title
    ref={forwardedRef}
    className={JoinClasses(
      // base
      "text-base font-semibold",
      // text color
      "text-gray-900 dark:text-gray-50",
      className
    )}
    {...props}
  />
));

DrawerTitle.displayName = "DrawerTitle";

const DrawerBody = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={JoinClasses("flex-1", className)} {...props} />
  );
});

DrawerBody.displayName = "Drawer.Body";

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Description>
>(({ className, ...props }, forwardedRef) => {
  return (
    <DrawerPrimitives.Description
      ref={forwardedRef}
      className={JoinClasses("text-gray-500 dark:text-gray-500", className)}
      {...props}
    />
  );
});

DrawerDescription.displayName = "DrawerDescription";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={JoinClasses(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  );
};

DrawerFooter.displayName = "DrawerFooter";

export {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
};

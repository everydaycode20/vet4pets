import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import {
  Root,
  Item,
  Trigger,
  Content,
  Header,
} from "@radix-ui/react-accordion";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import JoinClasses from "../../utils/join-classes";

const Accordion = Root;

const AccordionItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(function ({ className, ...props }, ref) {
  return <Item ref={ref} className={JoinClasses("", className)} {...props} />;
});

const AccordionTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(function ({ className, children, ...props }, ref) {
  return (
    <Header>
      <Trigger
      
        ref={ref}
        className={JoinClasses(
          "flex items-center justify-between transition-all [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}

        <KeyboardArrowDownOutlinedIcon htmlColor="#778CA2" />
      </Trigger>
    </Header>
  );
});

const AccordionContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(function ({ className, children, ...props }, ref) {
  return (
    <Content
      ref={ref}
      className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={JoinClasses("", className)}>{children}</div>
    </Content>
  );
});

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

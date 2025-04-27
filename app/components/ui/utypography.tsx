import { ComponentProps } from "react";

import { cn } from "@/lib/utils";
export const X1 = ({ className, ...props }: h1Props) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-9xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    />
  );
};

type h1Props = ComponentProps<"h1">;
export const H1 = ({ className, ...props }: h1Props) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    />
  );
};

type h2Props = ComponentProps<"h2">;
export const H2 = ({ className, ...props }: h2Props) => {
  return (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className
      )}
      {...props}
    />
  );
};

type h3Props = ComponentProps<"h3">;
export const H3 = ({ className, ...props }: h3Props) => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
};

type h4Props = ComponentProps<"h4">;
export const H4 = ({ className, ...props }: h4Props) => {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
};

type pProps = ComponentProps<"p">;
export const P = ({ className, ...props }: pProps) => {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  );
};

type blockquoteProps = ComponentProps<"blockquote">;
export const Blockquote = ({ className, ...props }: blockquoteProps) => {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  );
};

type codeProps = ComponentProps<"code">;
export const CodeBlock = ({ className, ...props }: codeProps) => {
  return (
    <pre>
      <code
        className={cn(
          "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
          className
        )}
        {...props}
      />
    </pre>
  );
};

export const Lead = ({ className, ...props }: pProps) => {
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...props} />
  );
};
type divProps = ComponentProps<"div">;
export const Large = ({ className, ...props }: divProps) => {
  return <div className={cn("text-lg font-semibold", className)} {...props} />;
};

type smallProps = ComponentProps<"small">;
export const Small = ({ className, ...props }: smallProps) => {
  return (
    <small
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  );
};

export const muted = ({ className, ...props }: pProps) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
};

"use client";

import { motion } from "framer-motion";
import Markdown from "react-markdown";
import { CodeBlock } from "./code-block";
import { springs } from "@/lib/animations";

interface MarkdownRendererProps {
  content: string;
}

function AnimatedBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-30px" }}
      transition={springs.smooth}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose max-w-none">
      <Markdown
        components={{
          pre({ children }) {
            const codeChild = children as React.ReactElement<{
              className?: string;
              children?: string;
            }>;
            if (
              codeChild?.type === "code" &&
              typeof codeChild.props?.children === "string"
            ) {
              const raw = codeChild.props.children.replace(/\n$/, "");
              return (
                <AnimatedBlock>
                  <CodeBlock
                    className={codeChild.props.className}
                    filename={undefined}
                  >
                    {raw}
                  </CodeBlock>
                </AnimatedBlock>
              );
            }
            return (
              <AnimatedBlock>
                <pre>{children}</pre>
              </AnimatedBlock>
            );
          },
          h2({ children }) {
            return (
              <AnimatedBlock>
                <h2>{children}</h2>
              </AnimatedBlock>
            );
          },
          h3({ children }) {
            return (
              <AnimatedBlock>
                <h3>{children}</h3>
              </AnimatedBlock>
            );
          },
          p({ children }) {
            return (
              <AnimatedBlock>
                <p>{children}</p>
              </AnimatedBlock>
            );
          },
          blockquote({ children }) {
            return (
              <AnimatedBlock>
                <blockquote>{children}</blockquote>
              </AnimatedBlock>
            );
          },
          ul({ children }) {
            return (
              <AnimatedBlock>
                <ul>{children}</ul>
              </AnimatedBlock>
            );
          },
          ol({ children }) {
            return (
              <AnimatedBlock>
                <ol>{children}</ol>
              </AnimatedBlock>
            );
          },
          table({ children }) {
            return (
              <AnimatedBlock>
                <table>{children}</table>
              </AnimatedBlock>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}

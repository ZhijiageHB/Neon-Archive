"use client";

import Markdown from "react-markdown";
import { CodeBlock } from "./code-block";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert max-w-none">
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
                <CodeBlock
                  className={codeChild.props.className}
                  filename={undefined}
                >
                  {raw}
                </CodeBlock>
              );
            }
            return <pre>{children}</pre>;
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}

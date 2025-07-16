import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css"; // Matches dark theme
import { LuCheck, LuCode, LuCopy } from "react-icons/lu";

const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-[14px] prose prose-slate dark:prose-invert prose-headings:text-violet-700 dark:prose-headings:text-violet-300 max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "plaintext";
              const isInline = !className || !className.startsWith("language-");

              return !isInline ? (
                <CodeBlock
                  code={(children || []).map(String).join("")}
                  language={language}
                  node={node}
                />
              ) : (
                <code className="px-1 py-0.5 bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 text-sm rounded" {...props}>
                  {children}
                </code>
              );
            },
            p: ({ children }) => <p className="leading-relaxed">{children}</p>,
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            ul: ({ children }) => <ul className="list-disc pl-6 space-y-2 my-4">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-6 space-y-2 my-4">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-violet-400 pl-4 italic text-zinc-700 dark:text-zinc-200 my-4 bg-violet-50 dark:bg-violet-900/30 rounded-md">
                {children}
              </blockquote>
            ),
            h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-bold mt-6 mb-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-semibold mt-5 mb-2">{children}</h3>,
            h4: ({ children }) => <h4 className="text-base font-semibold mt-4 mb-2">{children}</h4>,
            a: ({ children, href }) => (
              <a href={href} className="text-violet-600 dark:text-violet-400 hover:underline" target="_blank" rel="noreferrer">
                {children}
              </a>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full divide-y divide-gray-300 border border-gray-300 dark:divide-zinc-700 dark:border-zinc-700">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => <thead className="bg-zinc-100 dark:bg-zinc-800">{children}</thead>,
            tbody: ({ children }) => <tbody className="divide-y divide-zinc-300 dark:divide-zinc-700">{children}</tbody>,
            tr: ({ children }) => <tr>{children}</tr>,
            th: ({ children }) => (
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wide">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-3 py-2 whitespace-nowrap text-sm text-zinc-700 dark:text-zinc-300">
                {children}
              </td>
            ),
            hr: () => <hr className="my-6 border-gray-300 dark:border-gray-700" />,
            img: ({ src, alt }) => (
              <img src={src} alt={alt} className="my-4 max-w-full rounded shadow-sm" />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

function CodeBlock({ code, language, node }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-md bg-[#1e1e2e] text-white overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-violet-900 border-b border-violet-800 text-sm">
        <div className="flex items-center gap-2">
          <LuCode className="text-violet-300" size={16} />
          <span className="uppercase text-violet-200 font-semibold text-xs">
            {language || "Code"}
          </span>
        </div>
        <button
          onClick={copyCode}
          className="flex items-center gap-1 text-xs text-white bg-violet-700 hover:bg-violet-600 px-2 py-1 rounded transition"
          aria-label="Copy Code"
        >
          {copied ? (
            <>
              <LuCheck className="text-green-400" size={14} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <LuCopy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="text-sm overflow-x-auto px-4 py-3">
        <code
          className={`hljs language-${language}`}
          dangerouslySetInnerHTML={{ __html: node?.value || code }}
        />
      </pre>
    </div>
  );
}

export default AIResponsePreview;

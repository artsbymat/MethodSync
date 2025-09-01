"use client";
import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";

export default function RenderInstruction({ content }) {
  const [contentHtml, setContentHtml] = useState("");

  useEffect(() => {
    if (!content) {
      setContentHtml("");
      return;
    }
    remark()
      .use(html)
      .process(content)
      .then((processedContent) => {
        setContentHtml(processedContent.toString());
      });
  }, [content]);

  return (
    <article className="prose prose-invert" dangerouslySetInnerHTML={{ __html: contentHtml }} />
  );
}

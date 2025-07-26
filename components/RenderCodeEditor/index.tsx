"use client";

import Editor from "react-simple-code-editor";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

hljs.registerLanguage("javascript", javascript);

const RenderCodeEditor = ({ code, setCode }: { code: string; setCode: (code: string) => void }) => {
  return (
    <div className="h-full overflow-y-auto rounded border">
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={(code) => hljs.highlight(code, { language: "javascript" }).value}
        padding={16}
        textareaClassName="font-jetbrains-mono h-full w-full "
        preClassName="overflow-y-auto"
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 16,
          minHeight: "100%"
        }}
      />
    </div>
  );
};

export default RenderCodeEditor;

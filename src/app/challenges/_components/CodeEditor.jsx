import { Editor } from "@monaco-editor/react";

export default function CodeEditor({ code, setCode }) {
  const handleOnChange = (value) => {
    setCode(value);
  };

  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      theme="vs-dark"
      options={{
        fontSize: 16,
        fontFamily: "var(--font-jetbrains)",
        contextMenu: false,
        minimap: { enabled: false }
      }}
      defaultValue={code}
      onChange={handleOnChange}
    />
  );
}

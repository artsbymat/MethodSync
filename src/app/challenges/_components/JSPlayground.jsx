"use client";

import { useEffect, useRef, useState } from "react";

const JSPlayground = ({ code }) => {
  const iframeRef = useRef(null);
  const [output, setOutput] = useState("Run your code to see output..");
  const debounceTimer = useRef(null);

  // Debounce kirim code ke iframe
  useEffect(() => {
    if (!iframeRef.current) return;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      // reset output lama sebelum run
      setOutput("");
      iframeRef.current.contentWindow.postMessage({ type: "run", code }, "*");
    }, 500);

    return () => clearTimeout(debounceTimer.current);
  }, [code]);

  // Terima pesan dari iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "log") {
        setOutput((prev) => prev + (prev ? "\n" : "") + event.data.message);
      }
      if (event.data.type === "error") {
        setOutput((prev) => prev + (prev ? "\n" : "") + "❌ " + event.data.message);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // HTML sandbox untuk iframe
  const sandboxHtml = `
    <html>
      <body>
        <script>
          (function(){
            const send = (type, msg) => {
              window.parent.postMessage({ type, message: msg }, "*");
            };
            console.log = (...args) => send("log", args.join(" "));
            window.onerror = (msg, url, line, col, err) => {
              send("error", msg + " (line " + line + ")");
            };

            window.addEventListener("message", (event) => {
              if(event.data.type === "run"){
                try {
                  new Function(event.data.code)();
                } catch(e){
                  send("error", e.message);
                }
              }
            });
          })();
        </script>
      </body>
    </html>
  `;

  return (
    <div className="h-full w-full">
      <iframe ref={iframeRef} sandbox="allow-scripts" srcDoc={sandboxHtml} className="hidden" />
      <pre className="text-foreground font-jetbrains m-2 whitespace-pre-wrap">
        {output || "Run your code to see output.."}
      </pre>
    </div>
  );
};

export default JSPlayground;

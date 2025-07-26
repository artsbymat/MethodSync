import React, { forwardRef } from "react";

interface IFramePlaygroundProps {
  ref?: React.Ref<HTMLIFrameElement>;
}

const IFramePlayground = forwardRef<HTMLIFrameElement, IFramePlaygroundProps>((props, ref) => {
  const getIframeHTML = () => {
    const scriptContent = `
      window.addEventListener('message', (event) => {
        if (event.data.type === 'run') {
          let logs = [];
          try {
            const originalLog = console.log;
            console.log = (...args) => {
              const formattedArgs = args.map(arg => {
                if (typeof arg === 'object' && arg !== null) {
                  try {
                    return JSON.stringify(arg, null, 2);
                  } catch {
                    return String(arg);
                  }
                }
                return String(arg);
              });
              logs.push(formattedArgs.join(' '));
              originalLog.apply(console, args);
            };
            eval(event.data.code);
          } catch (err) {
            logs = ['Error: ' + err.message];
          } finally {
            console.log = console.log;
            window.parent.postMessage({ 
              type: 'playground-result', 
              payload: logs.join('\\n') 
            }, '*');
          }
        }
        if (event.data?.type === 'run-tests') {
          const { code, testCases, functionName } = event.data;
          const results = [];

          try {
            const fullCode = [
              '(function() {',
              code,
              'return typeof ' + functionName + ' === "function"',
              '? ' + functionName,
              ': null;',
              '})()'
            ].join('');
            const userFunc = eval(fullCode);

            if (typeof userFunc !== "function") {
              throw new Error(functionName + " is not a function");
            }

            for (let i = 0; i < testCases.length; i++) {
              const { input, expectedOutput } = testCases[i];
              try {
                const actualOutput = userFunc(input);
                const pass = JSON.stringify(actualOutput) === JSON.stringify(expectedOutput);
                // Simpan hasil test dalam format baru tanpa actualOutput
                results.push({
                  input: JSON.stringify(input),
                  output: JSON.stringify(expectedOutput),
                  result: pass ? "Passed" : "Failed"
                });
              } catch (err) {
                results.push({
                  input: JSON.stringify(input),
                  output: JSON.stringify(expectedOutput),
                  result: "Error: " + err.message
                });
              }
            }
          } catch (err) {
            results.push({
              input: "",
              output: "",
              result: "Global Error: " + err.message
            });
          }

          window.parent.postMessage({ 
            type: 'playground-test-result', 
            payload: results 
          }, '*');
        }
      });
    `;

    return `
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Sandbox</title></head>
        <body>
          <script>
            ${scriptContent}
          </script>
        </body>
      </html>
    `;
  };

  return (
    <iframe
      ref={ref}
      sandbox="allow-scripts"
      srcDoc={getIframeHTML()}
      style={{ display: "none" }}
      {...props}
    />
  );
});

IFramePlayground.displayName = "IFramePlayground";
export default IFramePlayground;

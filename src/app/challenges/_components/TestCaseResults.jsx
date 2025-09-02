"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

function extractFunctionName(src = "") {
  // function declaration
  const m1 = src.match(/function\s+([A-Za-z0-9_$]+)\s*\(/);
  if (m1) return m1[1];
  // const/let/var assignment to function/arrow
  const m2 = src.match(
    /(const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s*)?(?:function\b|\(?[A-Za-z0-9_$,\s]*\)?\s*=>)/
  );
  if (m2) return m2[2];
  // export default function name() {}
  const m3 = src.match(/export\s+default\s+function\s+([A-Za-z0-9_$]+)\s*\(/);
  if (m3) return m3[1];
  return null;
}

export default function TestCaseResults({ code, challenge }) {
  const iframeRef = useRef(null);
  const [results, setResults] = useState([]);
  const [ready, setReady] = useState(false);

  const derivedFunctionName =
    extractFunctionName(code) || extractFunctionName(challenge?.starter_code || "") || "fn";

  useEffect(() => {
    const handleMessage = (event) => {
      if (iframeRef.current && event.source !== iframeRef.current.contentWindow) {
        return;
      }
      if (!event.data) return;
      if (event.data.type === "iframe-ready") {
        setReady(true);
      } else if (event.data.type === "test-results") {
        setResults(event.data.results || []);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!iframeRef.current || !challenge?.test_cases) return;

    iframeRef.current.contentWindow.postMessage(
      {
        type: "run-tests",
        code,
        testCases: challenge.test_cases,
        functionName: derivedFunctionName
      },
      "*"
    );
  }, [ready, code, challenge, derivedFunctionName]);

  const sandboxHtml = `
    <!doctype html>
    <html>
      <head><meta charset="utf-8"/></head>
      <body>
        <script>
          function normalizeTests(tc) {
            if (Array.isArray(tc)) return tc;
            try { return JSON.parse(tc); } catch (_) { return []; }
          }

          function tryParseInput(i) {
            if (typeof i === 'string') {
              try { return JSON.parse(i); } catch (_) { return i; }
            }
            return i;
          }

          window.parent.postMessage({ type: 'iframe-ready' }, '*');

          window.addEventListener('message', function(event) {
            if (!event.data || event.data.type !== 'run-tests') return;
            const { code, testCases, functionName } = event.data;
            const tests = normalizeTests(testCases);
            (function run() {
              let results = [];
              try {
                try {
                  eval('(function(){' + code + '\\n; try{ window.__user_fn__ = (typeof ' + functionName + " !== 'undefined') ? " + functionName + ' : undefined;}catch(e){ window.__user_fn__ = undefined;} })();');
                } catch (e) {
                  throw new Error('Compilation error: ' + (e && e.message ? e.message : String(e)));
                }

                var fn = window.__user_fn__;
                delete window.__user_fn__;

                if (typeof fn !== 'function') {
                  throw new Error('Function "' + functionName + '" not found or not a function.');
                }

                var fnSrc = '';
                try { fnSrc = fn.toString(); } catch (e) { fnSrc = ''; }
                // deteksi rest parameter hanya di dalam deklarasi param
                var fnHeader = fnSrc.slice(0, fnSrc.indexOf("{"));
                var hasRest = /\\(.*\\.\\.\\..*\\)/.test(fnHeader);
                var paramCount = typeof fn.length === 'number' ? fn.length : 0;

                for (var ti = 0; ti < tests.length; ++ti) {
                  var test = tests[ti];
                  var passed = false, error = null, output;
                  try {
                    var rawInput = test.hasOwnProperty('input') ? test.input : undefined;
                    var input = tryParseInput(rawInput);

                    var args;
                    if (typeof input === 'undefined') {
                      args = [];
                    } else if (Array.isArray(input)) {
                      if (hasRest) {
                        args = input;
                      } else if (paramCount > 1) {
                        args = input;
                      } else if (paramCount === 1) {
                        // satu parameter → kirim array apa adanya (biar spread ...arr jalan)
                        args = [input];
                      } else {
                        args = (input.length > 1) ? input : [input];
                      }
                    } else {
                      args = [input];
                    }

                    output = fn.apply(null, args);
                    passed = JSON.stringify(output) === JSON.stringify(test.output);
                  } catch (e) {
                    error = e && e.message ? e.message : String(e);
                  }
                  results.push({
                    input: test && test.input,
                    expected: test && test.output,
                    output: typeof output === 'undefined' ? output : output,
                    passed,
                    error
                  });
                }
              } catch (e) {
                results = tests.map(function(tc) {
                  return {
                    input: tc && tc.input,
                    expected: tc && tc.output,
                    output: undefined,
                    passed: false,
                    error: e && e.message ? e.message : String(e)
                  };
                });
              }

              window.parent.postMessage({ type: 'test-results', results }, '*');
            })();
          }, false);
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={sandboxHtml}
        style={{ display: "none" }}
      />
      <ul className="space-y-2">
        {results.map((result, idx) => (
          <li
            key={idx}
            className={`flex flex-wrap items-center gap-2 rounded p-2 ${
              result.passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {result.passed ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <span>
              Input: <code>{JSON.stringify(result.input)}</code>
            </span>
            <span>
              Expected: <code>{JSON.stringify(result.expected)}</code>
            </span>
            <span>
              Output: <code>{JSON.stringify(result.output)}</code>
            </span>
            {result.error && <span className="ml-2">Error: {result.error}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

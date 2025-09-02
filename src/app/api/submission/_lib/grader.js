import ivm from "isolated-vm";

// Helper untuk mendeteksi jumlah parameter dan apakah ada rest parameter
function getFunctionParamInfo(code, functionName) {
  const fnRegex = new RegExp(
    `function\\s+${functionName}\\s*\\(([^)]*)\\)|` +
      `${functionName}\\s*=\\s*\\(([^)]*)\\)\\s*=>|` +
      `${functionName}\\s*=\\s*function\\s*\\(([^)]*)\\)`
  );
  const match = code.match(fnRegex);
  let params = "";
  if (match) {
    params = match[1] || match[2] || match[3] || "";
  }
  const hasRest = params.includes("...");
  const paramCount = params
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean).length;
  return { hasRest, paramCount };
}

export async function runUserCode(code, functionName, testCases) {
  const results = [];
  let isolate;

  try {
    isolate = new ivm.Isolate({ memoryLimit: 16 });
    const context = await isolate.createContext();
    const jail = context.global;

    await jail.set("global", jail.derefInto());

    const scriptTemplate = `
      (function() {
        ${code}
        if (typeof ${functionName} !== 'function') {
          throw new Error('Function "${functionName}" not found in user code');
        }
        return ${functionName};
      })()
    `;

    const userScript = await isolate.compileScript(scriptTemplate, { filename: "user-code.js" });
    const userFunction = await userScript.run(context);

    // --- Ambil info parameter
    const { hasRest, paramCount } = getFunctionParamInfo(code, functionName);

    for (const testCase of testCases) {
      const { input, output } = testCase;
      try {
        let args;
        if (typeof input === "undefined") {
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
            args = input.length > 1 ? input : [input];
          }
        } else {
          args = [input];
        }

        const actualOutput = await userFunction.apply(undefined, args, {
          result: { copy: true },
          arguments: { copy: true }
        });

        const passed = JSON.stringify(actualOutput) === JSON.stringify(output);
        results.push({
          input,
          expectedOutput: output,
          actualOutput,
          passed,
          error: null
        });
      } catch (e) {
        results.push({
          input,
          expectedOutput: output,
          actualOutput: null,
          passed: false,
          error: e.message
        });
      }
    }
  } catch (error) {
    results.push({
      input: null,
      expectedOutput: null,
      actualOutput: null,
      passed: false,
      error: error.message
    });
  } finally {
    if (isolate) {
      isolate.dispose();
    }
  }

  return { results, status: results.every((r) => r.passed) ? "PASSED" : "FAILED" };
}

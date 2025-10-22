import {Injectable} from '@nestjs/common';
import vm from 'vm';
import {performance} from 'perf_hooks';

type ExecutionResult = {
  passed: boolean;
  output?: unknown;
  error?: string;
  executionTimeMs: number;
};

@Injectable()
export class CodeRunnerService {
  async runJavaScript(
    source: string,
    tests: Array<{input: unknown; expected: unknown}>,
    functionName: string
  ) {
    const sandbox: Record<string, unknown> = {
      module: {exports: {}} as {exports: unknown},
      exports: {},
      console
    };

  const wrappedSource = `${source}\nmodule.exports = typeof ${functionName} !== 'undefined' ? ${functionName} : null;`;
  const script = new vm.Script(wrappedSource);
    const context = vm.createContext(sandbox, {codeGeneration: {strings: true, wasm: false}});

    const results: ExecutionResult[] = [];

    script.runInContext(context, {timeout: 1500});
    const exported = (sandbox.module as {exports: unknown}).exports as
      | ((input: unknown) => unknown)
      | null;

    if (typeof exported !== 'function') {
      return {
        passed: false,
        error: `Function ${functionName} not found`,
        executionTimeMs: 0
      };
    }

    for (const test of tests) {
      const start = performance.now();
      try {
        const value = exported(test.input);
        const executionTimeMs = performance.now() - start;
        const passed = this.deepEqual(value, test.expected);
        results.push({passed, output: value, executionTimeMs});
        if (!passed) {
          return {passed, executionTimeMs, output: value};
        }
      } catch (error) {
        const executionTimeMs = performance.now() - start;
        return {
          passed: false,
          error: error instanceof Error ? error.message : String(error),
          executionTimeMs
        };
      }
    }

    const totalTime = results.reduce((sum, test) => sum + test.executionTimeMs, 0);
    return {
      passed: true,
      executionTimeMs: Math.round(totalTime)
    };
  }

  private deepEqual(a: unknown, b: unknown): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }
}

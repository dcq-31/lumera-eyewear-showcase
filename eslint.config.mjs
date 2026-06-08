import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      // The React Compiler ruleset (new in eslint-config-next 16) flags two
      // patterns this codebase uses intentionally. Keep them as warnings so
      // they stay visible without failing lint on correct code:
      //  - set-state-in-effect: SSR-safe hydration in matchMedia/localStorage/
      //    WebGL hooks — state must be synced on mount, not during SSR.
      //  - immutability: react-three-fiber requires mutating the `camera`
      //    object returned by useThree(); that is the supported r3f API.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

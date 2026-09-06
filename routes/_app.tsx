import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pythagorean Numerology Report Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body class="bg-slate-50 antialiased min-h-screen">
        <Component />
      </body>
    </html>
  );
});

export const mockBlogPostResponse = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  title: "Getting Started with TypeScript",
  createdAt: "2026-02-22T10:30:00Z",
  author: {
    username: "janedoe1996",
    id: "skibidi",
    displayName: "Jane Doe",
    avatarUrl: "https://static.wikia.nocookie.net/eric-thompson/images/d/d4/Mickey_Mouse.png/revision/latest?cb=20180125203245"
  },
  content: `
    <p>TypeScript is a <strong>strongly typed</strong> superset of JavaScript that compiles to plain JS.
    It was developed by <em>Microsoft</em> and has grown <u>tremendously</u> in adoption.</p>

    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript Logo" title="TypeScript" />

    <h2>Why TypeScript?</h2>
    <p>There are several reasons developers prefer TypeScript over plain JavaScript:</p>
    <ul>
      <li>Static type checking catches errors <strong>at compile time</strong></li>
      <li>Better IDE support with <em>autocompletion</em> and inline docs</li>
      <li>Supports modern JavaScript features with <u>backward compatibility</u></li>
      <li><s>It's optional</s> — it's basically the industry standard now</li>
    </ul>

    <h2>Setting Up</h2>
    <p>To install TypeScript globally, run the following in your terminal:</p>
    <pre><code>npm install -g typescript
tsc --init</code></pre>

    <p>Your <code>tsconfig.json</code> will be generated. A minimal config looks like:</p>
    <pre><code>{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "outDir": "./dist"
  }
}</code></pre>

    <h2>Basic Types</h2>
    <p>TypeScript supports several primitive types. Here is a quick overview:</p>
    <ol>
      <li><mark>string</mark> — textual data</li>
      <li><mark>number</mark> — integers and floats</li>
      <li><mark>boolean</mark> — true or false</li>
      <li><mark>unknown</mark> — safer alternative to <code>any</code></li>
    </ol>

    <h2>Conclusion</h2>
    <p>Whether you are building a <strong>small script</strong> or a
    <em>large-scale application</em>, TypeScript gives you the tools to write
    <mark>safer, more maintainable</mark> code. Give it a try — you
    <s>might not</s> will love it.</p>
  `
};

export const languageOptions = [
  {
    id: 63,
    name: "JavaScript (Node.js 12.14.0)",
    label: "JavaScript (Node.js 12.14.0)",
    value: "javascript",
    template: "<p>console.log(\"Hello World!\");</p>"
  },
  {
    id: 48,
    name: "C (GCC 7.4.0)",
    label: "C (GCC 7.4.0)",
    value: "c",
    template: `<p>#include &lt;stdio.h&gt;</p>
    <p>int main() &#123;</p>
    <p>&emsp;// Write C code here</p>
    <p>&emsp;printf(\"Hello world\");</p>
    <p>&emsp;return 0;</p>
    <p>&#125;</p>
    `
  },
  {
    id: 52,
    name: "C++ (GCC 7.4.0)",
    label: "C++ (GCC 7.4.0)",
    value: "cpp",
    template: `<p>#include &lt;iostream&gt;</p>
    <p>int main() &#123;</p>
    <p>&emsp;// Write C++ code here</p>
    <p>&emsp;std::cout &lt;&lt; "Hello world!";</p>
    <p>&emsp;return 0;</p>
    <p>&#125;</p>
    `
  },
  {
    id: 51,
    name: "C# (Mono 6.6.0.161)",
    label: "C# (Mono 6.6.0.161)",
    value: "csharp",
    template: `<p>using System;</p>
    <p>public class HelloWorld</p>
    <p>&#123;</p>
    <p>&emsp;public static void Main(string[] args)</p>
    <p>&emsp;&#123;</p>
    <p>&emsp;&emsp;Console.WriteLine ("Hello Mono World");</p>
    <p>&emsp;&#125;</p>
    <p>&#125;</p>
    `
    // template: 'using System;\n public class HelloWorld\n{\n public static void Main(string[] args)\n {\n Console.WriteLine ("Hello Mono World");\n }\n }'
  },
  {
    id: 60,
    name: "Go (1.13.5)",
    label: "Go (1.13.5)",
    value: "go",
    template: `
      <p>package main</p>
      <p>import "fmt"</p>
      <br/>
      <p>function main()&#123;</p>
      <p>&emsp;fmt.Println("Hello World!")</p>
      <p>&#125;</p>
    `
    // template: "package main\n import \"fmt\"\nfunc main() {\n fmt.Println(\"Hello World!\")\n}"
  },
  {
    id: 62,
    name: "Java (OpenJDK 13.0.1)",
    label: "Java (OpenJDK 13.0.1)",
    value: "java",
    template: `
      <p>class Main &#123;</p>
      <p>&emsp;public static void main(String[] args) &#123;</p>
      <br/>
      <p>&emsp; &#125;</p>
      <p>&#125;</p>
    `
    // template: "class Main {\npublic static void main(String[] args) {\n}\n}"
  },
  {
    id: 67,
    name: "Pascal (FPC 3.0.4)",
    label: "Pascal (FPC 3.0.4)",
    value: "pascal",
    template: `
      <p>program Hello;</p>
      <p>begin</p>
      <p>&emsp;writeln (\'Hello World\')</p>
      <p>end.</p>
    `
  },
  {
    id: 68,
    name: "PHP (7.4.1)",
    label: "PHP (7.4.1)",
    value: "php",
    template: "echo \"Hello World!\";"
  },
  {
    id: 71,
    name: "Python (3.8.1)",
    label: "Python (3.8.1)",
    value: "python",
    template: "print(\"Hello world\")"
  },
  {
    id: 80,
    name: "R (4.0.0)",
    label: "R (4.0.0)",
    value: "r",
    template: "message <-\"Hello World!\"\nprint(message)"
  },
  {
    id: 72,
    name: "Ruby (2.7.0)",
    label: "Ruby (2.7.0)",
    value: "ruby",
    template: 'puts \"Hello, World!\"'
  },
  {
    id: 83,
    name: "Swift (5.2.3)",
    label: "Swift (5.2.3)",
    value: "swift",
    template: "print(\"Hello, World!\")"
  },
  {
    id: 74,
    name: "TypeScript (3.7.4)",
    label: "TypeScript (3.7.4)",
    value: "typescript",
    template: "console.log(\"Hello World!\");"
  },
];
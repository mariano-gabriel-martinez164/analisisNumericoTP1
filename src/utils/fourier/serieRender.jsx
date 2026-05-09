//katex generator
import katex from "katex";

export function Latex({ expression }) {
  console.log(JSON.stringify(expression));

  return (
    <div className="katex-container">
      <span
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(expression, {
            throwOnError: false,
            displayMode: true
          })
        }}
      />
    </div>
  );
}

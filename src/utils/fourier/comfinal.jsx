//ui
import { Latex } from "./serieRender";
import { generarSerieLatex } from "./generarSerie";
import "./fs.css";

export default function SerieFourier({ coef, L, N }) {
  const latex = generarSerieLatex(coef, L, N);

  return (
    <div className="serie">
      <Latex expression={latex} />
    </div>
  );
}


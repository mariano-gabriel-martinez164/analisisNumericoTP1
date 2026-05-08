import "./fs.css";

export default function DirichletTable({ f, puntos }) {
  return (
    <div>
      <h2 className="dirichlet-title">CONVERGENCIA DE DIRICHLET</h2>

      <table className="dirichlet-table">
        <thead>
          <tr>
            <th>x</th>
            <th>S(x)</th>
          </tr>
        </thead>

        <tbody>
          {puntos.map((x) => (
           <tr key={x}>
              <td>{x}</td>
              <td>{f(x)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

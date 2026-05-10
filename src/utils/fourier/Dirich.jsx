import "./fs.css";

export default function DirichletTable({ f, puntos }) {
  return (
    <div style={{ width: "100%" }}>
      <table className="dirichletTable">
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
              <td>{typeof f(x) === 'number' ? f(x).toFixed(4) : f(x)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


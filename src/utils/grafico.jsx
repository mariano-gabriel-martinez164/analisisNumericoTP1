import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Graph({ data }) {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="y" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;
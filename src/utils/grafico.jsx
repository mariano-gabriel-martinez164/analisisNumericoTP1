import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function Graph({ data, dataComparison }) {
  // Si tenemos datos de comparación, mostramos ambas funciones
  if (dataComparison && dataComparison.length > 0) {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dataComparison} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="x" 
              stroke="rgba(255,255,255,0.5)"
              style={{ fontSize: '0.85rem' }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              style={{ fontSize: '0.85rem' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#2A2A3C',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: '#E5E7EB'
              }}
              formatter={(value) => value.toFixed(4)}
              labelStyle={{ color: '#E5E7EB' }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '1rem',
                color: '#E5E7EB'
              }}
              iconType="line"
            />
            <Line 
              type="monotone" 
              dataKey="yOriginal" 
              dot={false} 
              stroke="#93C5FD"
              strokeWidth={2}
              isAnimationActive={false}
              name="Función Original"
            />
            <Line 
              type="monotone" 
              dataKey="yFourier" 
              dot={false} 
              stroke="#6EE7B7"
              strokeWidth={2}
              isAnimationActive={false}
              name="Serie de Fourier"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Si solo tenemos una función, la mostramos
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="x" 
            stroke="rgba(255,255,255,0.5)"
            style={{ fontSize: '0.85rem' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.5)"
            style={{ fontSize: '0.85rem' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#2A2A3C',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: '#E5E7EB'
            }}
            formatter={(value) => value.toFixed(4)}
            labelStyle={{ color: '#E5E7EB' }}
          />
          <Line 
            type="monotone" 
            dataKey="y" 
            dot={false}
            stroke="#93C5FD"
            strokeWidth={2}
            isAnimationActive={false}
            name="Función"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;
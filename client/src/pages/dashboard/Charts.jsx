import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const barData = [
  { subject: "Java", marks: 90 },
  { subject: "Python", marks: 80 },
  { subject: "DBMS", marks: 85 },
  { subject: "CN", marks: 70 }
];

const pieData = [
  { name: "CO1", value: 30 },
  { name: "CO2", value: 25 },
  { name: "CO3", value: 20 },
  { name: "CO4", value: 25 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Charts() {
  return (
    <div>

      <h2>Marks Distribution</h2>

      <BarChart width={500} height={300} data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="subject" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="marks" fill="#3498db" />
      </BarChart>

      <h2>CO Distribution</h2>

      <PieChart width={400} height={300}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
        >
          {pieData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

    </div>
  );
}

export default Charts;
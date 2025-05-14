import React from "react";
import {
  BarChart,
  Bar,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    Absent: 4000,
    Present: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    Absent: 3000,
    Present: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    Absent: 2000,
    Present: 5000,
    amt: 2290,
  },
  {
    name: "Page D",
    Absent: 2780,
    Present: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    Absent: 1890,
    Present: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    Absent: 2390,
    Present: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    Absent: 3490,
    Present: 4300,
    amt: 2100,
  },
];

export default function Chart() {
  return (
    <ResponsiveContainer width={"100%"} height={300} className="mt-9" >
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="name" /> */}
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Present" stackId="a" fill="#8884d8" />
        <Bar dataKey="Absent" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

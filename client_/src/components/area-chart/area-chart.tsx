import { AreaChart as Chart, Area, ResponsiveContainer } from "recharts";

export default function AreaChart({
  data,
  fill,
  stroke,
  dataKey,
}: {
  data: Record<string, any>[];
  fill: string;
  stroke: string;
  dataKey: string;
}) {
  console.log(data);
  return (
    <ResponsiveContainer className="flex-1" width="100%" height={56}>
      <Chart
        width={194}
        height={56}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <Area
          isAnimationActive={false}
          type="monotone"
          dataKey={dataKey}
          stroke={stroke}
          fill={fill}
        />
      </Chart>
    </ResponsiveContainer>
  );
}

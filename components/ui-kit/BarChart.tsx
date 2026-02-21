import React from "react";

type BarChartProps<T> = {
  data: T[];
  labelFn: (dp: T) => string;
  shareFn: (dp: T) => number;
  fillFn: (dp: T) => string;
  valueFn: (dp: T) => React.ReactNode;
};

export const BarChart = <T,>({
  data,
  fillFn,
  valueFn,
  labelFn,
  shareFn,
}: BarChartProps<T>) => {
  console.log(data);
  return (
    <div className="flex h-full w-full items-center p-5">
      <div className="grid grid-cols-[auto_1fr_1fr] items-center gap-2">
        {data.map((d, i) => (
          <React.Fragment key={i}>
            <div style={{ backgroundColor: fillFn(d) }} className="size-5" />
            <div>: {labelFn(d)}</div>
            <div>| {valueFn(d)}</div>
          </React.Fragment>
        ))}
      </div>
      <div className="flex h-[50%] border-1 border-foreground grow mx-5">
        {data.map((d, i) => (
          <div
            key={i}
            className="h-full first:border-none last:border-none border-x-2 border-foreground"
            style={{
              width: `${shareFn(d).toFixed()}%`,
              backgroundColor: fillFn(d),
            }}
          />
        ))}
      </div>
    </div>
  );
};

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
  return (
    <div className="flex flex-col h-full w-full items-center px-5">
      <div className="flex order-2 sm:order-1 shrink-0 items-center flex-wrap my-2">
        {data.map((d, i) => (
          <div
            className="sm:flex grid grid-cols-[auto_1fr_1fr] items-center gap-2 m-2 grow sm:mx-5"
            key={i}
          >
            <div style={{ backgroundColor: fillFn(d) }} className="size-5" />
            <span className="truncate">: {labelFn(d)}</span>
            <span>| ${valueFn(d)}</span>
          </div>
        ))}
      </div>
      <div className="flex w-full h-10 border-1 border-foreground grow mx-5">
        {data.map((d, i) => {
          if (shareFn(d) === 0) return;
          return (
            <div
              key={i}
              className="h-full first:border-none last:border-none border-l-2 border-foreground"
              style={{
                width: `${shareFn(d).toFixed()}%`,
                backgroundColor: fillFn(d),
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

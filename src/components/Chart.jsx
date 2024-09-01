import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

const getDayName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

const generateChartConfig = (type) => {
  if (type === "BP") {
    return {
      CurrWeek_S: {
        label: "Systolic",
        color: "#2563eb",
      },
      CurrWeek_D: {
        label: "Diastolic",
        color: "#2563eb",
      },
      PrevWeek_S: {
        label: "Systolic",
        color: "#60a5fa",
      },
      PrevWeek_D: {
        label: "Diastolic",
        color: "#60a5fa",
      },
    };
  }
  return {
    CurrWeek: {
      label: "CurrWeek",
      color: "#2563eb",
    },
    PrevWeek: {
      label: "PrevWeek",
      color: "#60a5fa",
    },
  };
};

const generateChartData = (dataArray, type) => {
  const currentDate = new Date();
  const chartData = [];

  for (let i = 0; i < 7; i++) {
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() - i);

    const currentDayEntry = dataArray.find(entry =>
      new Date(entry.date).toDateString() === targetDate.toDateString()
    );

    const prevDate = new Date(targetDate);
    prevDate.setDate(targetDate.getDate() - 7);
    const prevDayEntry = dataArray.find(entry =>
      new Date(entry.date).toDateString() === prevDate.toDateString()
    );
    if(type==='BP'){
    const CurrWeek_S = currentDayEntry?currentDayEntry.value.systolic:0;
    const PrevWeek_S = prevDayEntry?prevDayEntry.value.systolic:0;
    const CurrWeek_D = currentDayEntry?currentDayEntry.value.diastolic:0;
    const PrevWeek_D = prevDayEntry?prevDayEntry.value.diastolic:0;

    chartData.push({
      weekday: getDayName(targetDate.toISOString()),
      CurrWeek_S,
      CurrWeek_D,
      PrevWeek_S,
      PrevWeek_D
    });
  }
  else {
    const CurrWeek = currentDayEntry?currentDayEntry.value:0;
    const PrevWeek = prevDayEntry?prevDayEntry.value:0;

    chartData.push({
      weekday: getDayName(targetDate.toISOString()),
      CurrWeek,
      PrevWeek,
    });
  }


  }

  return chartData.reverse();
};

export function Chart(props) {
  const [chartConfig, setChartConfig] = useState(generateChartConfig(props.type));
  let name;
  switch(props.type){
    case "BP":{name="Blood Pressure";break;}
    case "BO":{name="Blood Oxygen";break;}
    case "BSL":{name="Blood Sugar Level";break;}
    case "HR":{name="Heart Rate";break;}
    case "BW":{name="Body Weight";break;}
  }

  const tempArr = [
    { weekday: "Sunday", CurrWeek: 186, PrevWeek: 80 },
    { weekday: "Monday", CurrWeek: 305, PrevWeek: 200 },
    { weekday: "Tuesday", CurrWeek: 237, PrevWeek: 120 },
    { weekday: "Wednesday", CurrWeek: 73, PrevWeek: 190 },
    { weekday: "Thursday", CurrWeek: 209, PrevWeek: 130 },
    { weekday: "Friday", CurrWeek: 214, PrevWeek: 140 },
    { weekday: "Saturday", CurrWeek: 214, PrevWeek: 140 },
  ];

  const updatedTempArr = tempArr.map(item => ({
    weekday: item.weekday,
    CurrWeek_S: item.CurrWeek,
    CurrWeek_D: item.CurrWeek,
    PrevWeek_S: item.PrevWeek,
    PrevWeek_D: item.PrevWeek,
  }));

  const [chartData, setChartData] = useState(tempArr);

  useEffect(() => {
    if (props.obj) {
      const chartt = generateChartData(props.obj, props.type);
      const chartConfigg = generateChartConfig(props.type);
      
      setChartConfig(chartConfigg);
      console.log('chart arr:',chartt);
      console.log('temp arr:',tempArr);
      if (props.type === 'BP') {
        setChartData(chartt);
        
      } else {
        setChartData(chartt);
      }
    }
  }, [props.obj, props.type]);

  return (
    <ChartContainer config={props.chartConfig || chartConfig} className=" h-2/3 w-full md:w-2/3">
      <BarChart accessibilityLayer data={props.chartData || chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="weekday"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        {props.type === 'BP' ? (
          <>
            <Bar dataKey="CurrWeek_S" fill={chartConfig.CurrWeek_S.color} radius={4} />
            <Bar dataKey="CurrWeek_D" fill={chartConfig.CurrWeek_D.color} radius={4} />
            <Bar dataKey="PrevWeek_S" fill={chartConfig.PrevWeek_S.color} radius={4} />
            <Bar dataKey="PrevWeek_D" fill={chartConfig.PrevWeek_D.color} radius={4} />
          </>
        ) : (
          <>
            <Bar dataKey="CurrWeek" fill={chartConfig.CurrWeek.color} radius={4} />
            <Bar dataKey="PrevWeek" fill={chartConfig.PrevWeek.color} radius={4} />
          </>
        )}
      </BarChart>
      <p className="text-center text-xl font-semibold font-serif">{name}</p>
    </ChartContainer>
  );
}

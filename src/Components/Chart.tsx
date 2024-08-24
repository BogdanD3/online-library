import { BarChart } from "@mui/x-charts/BarChart";

interface ChartsOverviewDemoProps {
  borrowedBooks: number;
  reservedBooks: number;
  overdueBooks: number;
}

function ChartsOverviewDemo({
  borrowedBooks,
  reservedBooks,
  overdueBooks,
}: ChartsOverviewDemoProps) {
  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: ["Izdate Knjige", "Rezervisane Knjige", "Prekoracene Knjige"],
          scaleType: "band",
        },
      ]}
      series={[
        {
          data: [borrowedBooks, reservedBooks, overdueBooks],
        },
      ]}
      width={500}
      height={300}
    />
  );
}

export default ChartsOverviewDemo;

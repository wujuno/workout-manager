import styled from "styled-components";
import AllExcColumnChart from "../../components/chart/AllExcColumnChart";
import useRecordItems from "../../hooks/useRecordItems";

const Wrapper = styled.div`
  margin-top: 20px;
  width: 900px;
  padding: 0px 10px;
`;
interface ExerciseCount {
  name: string;
  count: number;
}

interface Idata {
  seeRecords: {
    items: {
      id: number;
      name: string;
      times: number;
      setTimes: number;
      weight: number;
      restTime: number;
    }[];
  }[];
}

function AllNames() {
  const { data } = useRecordItems();
  const nameArr: string[] | undefined = data?.seeRecords
    .map((obj) => obj.items.map((obj2) => obj2.name))
    .flat();
  const counts: ExerciseCount[] | undefined = nameArr?.reduce(
    (acc: ExerciseCount[], curr: string) => {
      const index = acc.findIndex((item) => item.name === curr);
      if (index !== -1) {
        acc[index].count++;
      } else {
        acc.push({ name: curr, count: 1 });
      }
      return acc;
    },
    []
  );

  counts?.sort((a: ExerciseCount, b: ExerciseCount) => b.count - a.count);

  const exerciseNames: string[] | undefined = counts?.map((item) => item.name);
  const exerciseCounts: number[] | undefined = counts?.map(
    (item) => item.count
  );

  console.log(data);
  console.log(exerciseCounts);
  return (
    <Wrapper>
      <AllExcColumnChart
        visible={true}
        categories={exerciseNames}
        counts={exerciseCounts}
      />
    </Wrapper>
  );
}

export default AllNames;

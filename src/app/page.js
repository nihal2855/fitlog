import Banner from "@/components/home/Banner";
import ApiTitle from "@/components/title/ApiTitle";
import WorkoutCard from "@/components/workout/WorkoutCards";

export default function Home() {
  return (<>
    <Banner />
    <ApiTitle />
    <WorkoutCard />
  </>);
}
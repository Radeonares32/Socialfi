import { Navbar } from "./navbar/Navbar";
import { Leftbar } from "./leftbar/Leftbar";
import { Flow } from './flow/Flow'

export const Home = () => {
  return (
    <div className="main-wrapper">
      <Navbar />
      <Leftbar />
      <Flow/>
    </div>
  );
};

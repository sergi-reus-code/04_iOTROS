import { TwitterFollowCard } from "./ui/components/TwitterFollowCard";
import './App.css'

export function App() {
  return (
    <section className="App">
      <TwitterFollowCard 
        userName="midudev"
        name="Miguel Angel Duran"
      />
      <TwitterFollowCard
        userName="pheralb"
        name="Pablo Hernandez"
      />
      <TwitterFollowCard 
        userName="elonmusk" 
        name="Elon Musk" 
      />
    </section>
  );
}

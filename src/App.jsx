import useLenis from './hooks/useLenis'
import Hero from './components/Hero'
import InvitationCard from './components/InvitationCard'
import Celebration from './components/Celebration'
import Countdown from './components/Countdown'
import Venue from './components/Venue'
import BackgroundMusic from './components/BackgroundMusic'

export default function App() {
  useLenis()

  return (
    <main className="w-full overflow-x-hidden bg-ivory">
      <Hero />
      <InvitationCard />
      <Celebration />
      <Countdown />
      <Venue />
      <BackgroundMusic />
    </main>
  )
}

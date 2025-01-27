import { PlusIcon } from "./components/Icons/PlusIcon"
import { ShareIcon } from "./components/Icons/ShareIcon"
import { Button } from "./components/Ui/Button"

function App() {



  return (
    <>
      <Button title ="Add Content" size="md" variant="primary" startIcon={<PlusIcon/>}/>
      <Button title ="Share Brain" size="md" variant="secondary" startIcon={<ShareIcon/>} />
    </>
  )
}

export default App

import { DeletIcon } from "./Icons/DeleteIcon"
import { PlusIcon } from "./Icons/PlusIcon"
import { ShareIcon } from "./Icons/ShareIcon"
import { Button } from "./Ui/Button"
import { Card } from "./Ui/Card"

export const Dashboard = ()=>{
    return <>
        <div>
            <Card title="First One" link="https://www.youtube.com/watch?v=Q9OW4iaQl-k" type="youtube" shareIcon={<ShareIcon/>} deleteIcon={<DeletIcon/>}/>
            <Card title="Second One" link="https://x.com/NabhanilCh2513/status/1883104899761938877" type="twitter" shareIcon={<ShareIcon/>} deleteIcon={<DeletIcon/>}/>
        </div>
        <Button title ="Add Content" size="md" variant="primary" startIcon={<PlusIcon/>}/>
        <Button title ="Share Brain" size="md" variant="secondary" startIcon={<ShareIcon/>} />
    </>
}
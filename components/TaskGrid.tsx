import { CreateTask } from "./CreateTask"
import { TaskCard } from "./TaskCard"


export const TaskGrid = () =>{
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
            <TaskCard title={"Complete Assignment"} description={"Complete Yardstick assignment of task application in nextjs "} dueDate={"02/06/2025"} completed={false} createdAt={"02/02/2025"}/>
            <TaskCard title={"Complete Assignment"} description={"Complete Yardstick assignment of task application in nextjs "} dueDate={"02/06/2025"} completed={false} createdAt={"02/02/2025"}/>
            <TaskCard title={"Complete Assignment"} description={"Complete Yardstick assignment of task application in nextjs "} dueDate={"02/06/2025"} completed={false} createdAt={"02/02/2025"}/>
        </div>
    )
}
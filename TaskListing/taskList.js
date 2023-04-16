import {task} from "."


class taskList {
    constructor(calculatePriorities=false){
        // First, query the database to get a list of tasks
        databaseTaskList = []; // TODO
        // Next, initialize the list to get the order of tasks.
        this.listOfTasks = [];
        for (element in databaseTaskList){
            el = new task.task(element.name, element.description, element.priority, element.time, element.deadline);
            if (calculatePriorities){
                el.calculatePriority()
            }
            this.listOfTasks.push(element);
        }
        this.listOfTasks.sort((a,b) => a.priority - b.priority);
    }




    // sortOrdering(a, b) {
    //     // Adjust to incorporate priority, perhaps as a weight?
    //     if (a.deadline < b.deadline){
    //         return -1;
    //     }
    //     else if (a.deadline > b.deadlien){
    //         return 1;
    //     }
    //     else{
    //         return 0;
    //     }
    // }

    estimateTaskTimes(){
        for (task in this.listOfTasks){
            task.getGPTEstimate()
        }
    }
}
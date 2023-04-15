import {tasks} from "."


class taskList {
    constructor(){
        // First, query the database to get a list of tasks
        databaseTaskList = []; // from query
        // Next, initialize the list to get the order of tasks.
        this.listOfTasks = [];
        for (element in databaseTaskList){
            el = new tasks.task(element.name, element.description, element.priority, element.time, element.deadline);
            this.listOfTasks.push(element);
        }
        this.listOfTasks.sort(sortOrdering);
    }

    sortOrdering(a, b) {
        // Adjust to incorporate priority, perhaps as a weight?
        if (a.deadline < b.deadline){
            return -1;
        }
        else if (a.deadline > b.deadlien){
            return 1;
        }
        else{
            return 0;
        }
    }
}
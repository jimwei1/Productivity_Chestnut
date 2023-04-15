import {typeChecking} from "." // fix later?


class task {
    constructor(name="", description="", priority=0, time=1, deadline=new Date()) {
        // Type check
        // typeChecking.checkInputList([name, description, priority, time, deadline], ['string', 'string', 'number', 'number', 'time'])
        this.name = name;
        this.description = description
        this.priority = priority
        this.time = time
        this.deadline = deadline
    }

    updateName(newName="") {
        this.name = newName;
    }

    updateDescription(newDescription="") {
        this.description = newDescription;
    }
    
    updatePriority(newPriority=0){
        this.priority = newPriority
    }

    updateTime(time=0){
        this.time = time
    }

    updateDeadline(deadline=new Date()){
        this.deadline = deadline
    }

    addToDatabase(){
        ;
    }
}
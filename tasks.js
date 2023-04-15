import {typeChecking, gptHandling} from "." // fix later?


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

    getGPTEstimate(){
        query = 'Please estimate how long this task will take in hours given its description, your answer should only be a single number: ${this.description}'
        this.time = gptHandling.getGPTEstimate(query)
    }
}
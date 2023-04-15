import {gptHandling} from "." 
import {constants} from "../constants"


class task {
    constructor(name="", description="", priority=0, time=1, deadline=new Date()) {
        this.name = name;
        this.description = description
        this.priority = priority
        this.time = time
        this.deadline = deadline
    }

    calculatePriority(){
        // Formula basically is: (timeNeeded)/(timeLeft) but with huge multiplier of absolute value if negative (b/c overdue bad)
        // Intuition is that tasks that will take a larger portion of the time left should be prioritized, with lower priority coming first
        const now = new Date();
        const workedNow = new Date(now.getTime() + this.time * 60 * 60 * 1000);
        const timeLeft = this.deadline.getTime() - workedNow.getTime();
        const timeLeftInHours = timeLeft/ (1000 * 60 * 60);
        if (timeLeftInHours == 0){
            timeLeftInHours = -0.0000001
        }
        priority = this.time / timeLeftInHours
        if (priority < 0){
            priority = Math.abs(priority) * constants.overdueMultiplier 
        }
        this.priority = priority
        return this.priority;
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
        this.time = gptHandling.queryGPT(query)
    }
}
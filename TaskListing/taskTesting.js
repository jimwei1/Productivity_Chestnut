import {constants} from "../constants"
const Task = require('./task');



describe('Task', () => {
    testTask = task();
    
    test('Initialization Correct', () => {
        // name="", description="", priority=0, time=1, deadline=new Date()
        expect(testTask.name).toBe("")
        expect(testTask.description).toBe("")
        expect(testTask.priority).toBe(0)
        expect(testTask.time).toBe(1)
    });

    test('Test Priority Calculator', () =>{
        deadlineString = "12/21/2023"
        // First test to see if far-off deadline w low time gives low priority
        testTask.updateDeadline(new Date(deadlineString));
        expect(testTask.calculatePriority()).toBeLessThan(1);
        // Next test soon deadline w high time but not more than left gives decent priority
        timeDiff = testTask.deadline.getTime() - now.getTime();
        hoursDiff = timeDiff / (1000 * 60 * 60);
        testTask.updateTime(hoursDiff-1)
        expect(testTask.calculatePriority()).toBeLessThan(1);
        // Now don't have enough time but deadline not passed
        testTask.updateTime(hoursDiff+2)
        expect(testTask.calculatePriority()).toBeGreaterThan(1);
        // Deadline passed 
        testTask.updateDeadline()
        expect(testTask.calculatePriority()).toBeGreaterThan(constants.overdueMultiplier)
    })
})
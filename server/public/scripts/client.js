$(document).ready(onReady);

function onReady(){
    $('#enterTaskButton').on('click', sendTask)
}


function getTask(){
    $.ajax({
        method:'GET',
        url:'/list'
    }).then (function(response){
        let el= $('#outputTasks')
        el.empty()
        for(let i=0; i<response.length;i++){
            let appendTask= `<li>${ response[i].tasks }: ${ response[i].task_completed }</li>`;
            el.append(appendTask)
        }
    }).catch(function(err){
        console.log(err);
        alert('There was an issue adding items')
    })
}
function sendTask(){
    let taskToSend={
        tasks: $('#taskIn').val(),
        task_completed:$('#taskCompleteIn').val()
    }
    console.log('sending', taskToSend);
    $.ajax({
        method:'POST',
        url:'/list',
        data: taskToSend
    }).then (function(response){
        console.log('back from POST', response);
        $('#taskIn').val('');
        getTask()
    }).catch(function(err){
        alert('Issue posting tasks')
        console.log(err)
    })
}
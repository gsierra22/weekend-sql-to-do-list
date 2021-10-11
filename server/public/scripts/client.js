$(document).ready(onReady);

function onReady(){
    $('#enterTaskButton').on('click', sendTask)
    $('#outputTasks').on('click', '.deleteButton', deleteTask);
}


function getTask(){
    $.ajax({
        method:'GET',
        url:'/list'
    }).then (function(response){
        let el= $('#outputTasks')
        el.empty()
        for(let i=0; i<response.length;i++){
            let appendTask= `<li>${ response[i].tasks }: ${ response[i].task_completed }<input type="button" class="btn btn-primary deleteButton" value="Delete" data-id="${response[i].id}"></li>`;
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
function deleteTask(){
    console.log('in deleteTask:', $(this).data('id'));
    $.ajax({
        method: 'DELETE',
        url: '/list?id=' + $( this ).data( 'id' ),
    }).then (function(response){
        console.log('back from delete:', response);
        getTask()
    }).catch(function(err){
        console.log(err);
        alert('could not delete task');
    })
}
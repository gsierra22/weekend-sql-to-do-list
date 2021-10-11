$(document).ready(onReady);

function onReady(){
    $('#enterTaskButton').on('click', sendTask)
    $('#outputTasks').on('click', '.deleteButton', deleteTask)
    $('#outputTasks').on('click', '.updateButton', updateTask );
}


function getTask(){
    $.ajax({
        method:'GET',
        url:'/list'
    }).then (function(response){
        let el= $('#outputTasks')
        el.empty()
        for(let i=0; i<response.length;i++){
            if( !response[i].task_completed){
            let appendTask= `<tr>
            <td style="border: 3px solid">${ response[i].tasks }</td>
            <td style="border: 3px solid">${ response[i].task_completed }</td>
            <td style="border: 3px solid"><input type="button" class="btn btn-primary deleteButton" value="Delete" data-id="${response[i].id}"></td>
            <td style="border: 3px solid"><input type="button" class="updateButton" value="Task Completed" data-id="${response[i].id}"></td>
            <td style="border: 3px solid">Please Complete Task!</td>
            </tr>`;
            el.append(appendTask)
        }
        else{
            el.append(`<tr>
            <td style="border: 3px solid">${ response[i].tasks }</td>
            <td style="border: 3px solid">${ response[i].task_completed }</td>
            <td style="border: 3px solid"><input type="button" class="btn btn-primary deleteButton" value="Delete" data-id="${response[i].id}"></td>
            </tr>`
            );
        }
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
    if (taskToSend.tasks===''){
        alert('Please enter a task')
    }
    else{
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

function updateTask() {
    console.log('in updateTask!', $(this).data('id'));
    const taskChange = $(this).data('id');
  
    $.ajax({
      method: 'PUT',
      url: `/list?id=` + taskChange
    }).then(function (response) {
      getTask;
    }).catch(function (err) {
      console.log(err);
      alert('Could not update task');
    })
  }
$(document).ready(function(){  
    // CheckboxUpdateStartDate();
    $('#MonitoringList').hide();    
    $('#StartWorkDesc').hide();
    $(document).on('click', '.BtnShowModal', function () {
        // alert('Freshmorning!! Reminder: Dont Forget To set the Actual Start Date!');        
        $('#AssignedProjectList').hide();
        $('#MonitoringList').show(); 
        $('#StartWorkDesc').show();
        var CapexNum = $(this).val();
        
            function fetch_data()   
            {
                $.ajax({
                    url:"AssignedWorks/Selectworks.php",
                    method:"POST",
                    data:{CapexNumber:CapexNum},
                    dataType:"json",
                    success:function(data)
                    {
                        var html = '';
                        for(var count = 0; count < data.length; count++)
                        {
                            html += '<tr>';
                            html += '<td><input type="checkbox" id="'+data[count].id+'" data-gen_scope="'+data[count].gen_scope+'" data-subscopes="'+data[count].subscopes+'" data-subscope_percent="'+data[count].subscope_percent+'" data-planned_start="'+data[count].planned_start+'" data-planned_end="'+data[count].planned_end+'" data-actual_start="'+data[count].actual_start+'"  class="check_box" /></td>';
                            html += '<td>'+data[count].gen_scope+'</td>';
                            html += '<td>'+data[count].subscopes+'</td>';
                            html += '<td>'+data[count].subscope_percent+'</td>';
                            html += '<td>'+data[count].planned_start+'</td>';
                            html += '<td>'+data[count].planned_end+'</td>';
                            html += '<td>'+data[count].actual_start+'</td>';
                           
                    
                        }
                        $('tbody').html(html);
                        
                    }
                });
            }

            fetch_data();

            $(document).on('click', '.check_box', function(){
                var html = '';
                if(this.checked)
                {
                    var r = confirm("Are You sure? You want to Update the progress of this work??");
                    if (r == true) {
                        html = '<td><input type="checkbox" id="'+$(this).attr('id')+'" data-gen_scope="'+$(this).data('gen_scope')+'" data-subscopes="'+$(this).data('subscopes')+'" data-subscope_percent="'+$(this).data('subscope_percent')+'" data-planned_start="'+$(this).data('planned_start')+'" data-planned_end="'+$(this).data('planned_end')+'" data-actual_start="'+$(this).data('actual_start')+'" class="check_box" checked /></td>';
                        html += '<td><input type="text" name="scope[]" class="form-control" value="'+$(this).data("gen_scope")+'" readonly/></td>';
                        html += '<td><input type="text" name="work[]" class="form-control" value="'+$(this).data("subscopes")+'" readonly/></td>';
                        html += '<td><input type="text" name="percent[]" id ="percent'+$(this).attr('id')+'" onkeyup="ChangeValue(this.value,'+$(this).attr('id')+')" class="per form-control" value="'+$(this).data("subscope_percent")+'" /><input type="hidden" name="hidden_id[]" value="'+$(this).attr('id')+'"/></td>';
                        html += '<td><input type="text" name="plannedstart[]" class="form-control" value="'+$(this).data("planned_start")+'" readonly/></td>';
                        html += '<td><input type="text" name="plannedend[]" class="form-control" value="'+$(this).data("planned_end")+'" readonly/></td>';
                        html += '<td><input type="date" name="actualStart[]" id="Start" class="form-control" value="'+$(this).data("actual_start")+'" readonly /><input type="hidden" name="ActualEnd[]" value="<?php echo date('Y-m-d');?>" /></td></td>';
                    
                         }
                    else {
                            html = '<td><input type="checkbox" id="'+$(this).attr('id')+'" data-gen_scope="'+$(this).data('gen_scope')+'" data-subscopes="'+$(this).data('subscopes')+'" data-subscope_percent="'+$(this).data('subscope_percent')+'" data-planned_start="'+$(this).data('planned_start')+'" data-planned_end="'+$(this).data('planned_end')+'" data-actual_start="'+$(this).data('actual_start')+'" class="check_box" /></td>';
                            html += '<td>'+$(this).data('gen_scope')+'</td>';
                            html += '<td>'+$(this).data('subscopes')+'</td>';
                            html += '<td>'+$(this).data('subscope_percent')+'</td>';
                            html += '<td>'+$(this).data('planned_start')+'</td>';
                            html += '<td>'+$(this).data('planned_end')+'</td>';
                            html += '<td>'+$(this).data('actual_start')+'</td>';
                        }
                    
                }
                else
                {
                    html = '<td><input type="checkbox" id="'+$(this).attr('id')+'" data-gen_scope="'+$(this).data('gen_scope')+'" data-subscopes="'+$(this).data('subscopes')+'" data-subscope_percent="'+$(this).data('subscope_percent')+'" data-planned_start="'+$(this).data('planned_start')+'" data-planned_end="'+$(this).data('planned_end')+'" data-actual_start="'+$(this).data('actual_start')+'" class="check_box" /></td>';
                    html += '<td>'+$(this).data('gen_scope')+'</td>';
                    html += '<td>'+$(this).data('subscopes')+'</td>';
                    html += '<td>'+$(this).data('subscope_percent')+'</td>';
                    html += '<td>'+$(this).data('planned_start')+'</td>';
                    html += '<td>'+$(this).data('planned_end')+'</td>';
                    html += '<td>'+$(this).data('actual_start')+'</td>';
                
                            
                }
                $(this).closest('tr').html(html);
                $('#work_'+$(this).attr('id')+'').val($(this).data('work'));
            });

            $('#update_form').on('submit', function(event){
            event.preventDefault();
                var r = confirm("Are You sure? You want to update the progress of all Checked works??");
                    if (r == true) {
                        if($('.check_box:checked').length > 0)
                        {
                            $.ajax({
                                url:"AssignedWorks/updateworks.php",
                                method:"POST",
                                data:$(this).serialize(),
                                success:function(response)
                                {
                                    $('#AlertSucess').html(response);
                                
                                    fetch_data();
                                
                                    // console.log(response);
                                }
                            })
                        }
                    }
                    else{
                        
                    }
            });
    });

    $(".BtnShowModal").click(function(){
    var projectcapex = $(this).val();
    document.getElementById('project').value = projectcapex ;
    // alert(projectcapex);
    });

    $( "#Btnback" ).click(function() {
      location.reload();
    });

});    


function ChangeValue(val, Id){
    var a = val;
    var percent = $("#percent"+Id)
    $.ajax({
    type: "POST",
    url: "ProjectMonitoringValidateProgress.php",
    data: {Id:Id},
    success: function(resulta){   
            if(a ==''){
                alert('Progress is Required!!');
                document.getElementById("percent"+Id).style.backgroundColor = "#ff5c33";
                $('#multiple_update').hide();
                $('#percent'+Id).val("");
            }
            else if(a > 100){
                alert('Progress is not greater than 100!!');
                document.getElementById("percent"+Id).style.backgroundColor = "#ff5c33";
                $('#multiple_update').hide();
                $('#percent'+Id).val("");
            }
            // else if(a < resulta){
            //     alert('Progress is not less than current progress!!');
            //     document.getElementById("percent"+Id).style.backgroundColor = "#ff5c33";
            //     $('#multiple_update').hide();
            // }
            else{
                document.getElementById("percent"+Id).style.backgroundColor = "#ccffcc";
                $('#multiple_update').show();
            }
        }
    });
  
}

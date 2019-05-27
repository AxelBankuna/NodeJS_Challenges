$(document).ready(()=>{
    $('.delete-student').on('click', (e) =>{
        $target = $(e.target);
        const id = ($target.attr('data-id'));
        $.ajax({
            type:'DELETE',
            url:'/student/'+id,
            success: (response) =>{
                alert('Deleting Student');
                window.location.href='/';
            },
            error: (err) =>{
                console.log(err);
        }
        });
    });
});
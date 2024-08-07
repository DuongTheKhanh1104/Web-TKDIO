$(document).ready(function () {
    function checkInput() {
        var userName = $("#user").val();
        var pass = $("#password").val();
        if (userName.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Không được để rỗng tên User',
            });
            return false;
        } else if (!/^([A-Z][a-z]*\s*)+$/.test(userName)) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Ghi hóa các kí tự đầu của User',
            });
            return false;
        } else if (pass.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Không được để rỗng Password',
            });
            return false;
        } else if (pass.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Mật khẩu phải lớn hơn 6 kí tự',
            });
            return false;
        }
        
        // Lưu userName vào localStorage để thuận tiện cho việc kiểm soát user
        localStorage.setItem('user', userName);
        $("#welcome").val(userName);
        
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đăng nhập thành công',
            showConfirmButton: false,
            timer: 1500
        });
        
        $("#user").val("");
        $("#password").val("");
        $("#LoginModal").modal("hide");

        // Cập nhật lại savedUser
        savedUser = userName;
        return true;
    }

    $(".Login").click(function (e) {
        e.preventDefault();
        checkInput();
    });

    var savedUser = localStorage.getItem('user');
    if (savedUser) {
        $("#welcome").val(savedUser);
        $("#LoginModal").modal("hide");
    } 

    //. Xử lí khi click vào iconUser
    $("#userIcon").click(function (e) {
        e.preventDefault();
        if (savedUser) {
            var now = new Date().toLocaleString();
            $("#UserIn").val(savedUser);
            $("#time").val(now); 
            $("#userModal").modal("show");
            console.log(now); 
        } else {
            $("#LoginModal").modal("show");
        }
    });

     /// Xử lí nút giảm quantity
     $("#giam").click(function (e) { 
        e.preventDefault();
        var soLuong= parseInt($("#quantityNumber").val());
        if(soLuong>1)
            {
                $("#quantityNumber").val(soLuong -1);
            }
    });

    ///Xử lí nút tăng quantity
    $("#tang").click(function(e){
        e.preventDefault();
        var soLuong2=parseInt($("#quantityNumber").val());
        $("#quantityNumber").val(soLuong2 +1)
    });

    // Xử lý việc chọn size
    var selectedSize = null;
    $(".chooseSize").click(function () {
        selectedSize = $(this).data("size");
        $(".chooseSize").removeClass("selected");
        $(this).addClass("selected");
    });



    //Phần xử lí logout
    $(".Logout").click(function () {
        Swal.fire({
            title: "Bạn chắc chắn muốn đăng xuất?",
            text: "Hành động này không thể hoàn tác!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý, đăng xuất!"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('user');
                savedUser = null; 
                $("#welcome").val("");
                $("#userModal").modal("hide");
        
                Swal.fire({
                    title: "Đã đăng xuất!",
                    text: "Tài khoản của bạn đã được đăng xuất.",
                    icon: "success"
                }).then(() => {
                });
            }
        });
    });
});

function changeImage(thumbnailUrl) {
    document.getElementById('mainImg').src = thumbnailUrl;
}

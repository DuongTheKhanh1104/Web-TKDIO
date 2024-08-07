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

    $(".Logout").click(function () {
        Swal.fire({
            title: "Bạn chắc chắn muốn đăng xuất?",
            text: "Hành động này không thể hoàn tác!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đăng xuất!"
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
// xử lí phần thêm sản phẩm

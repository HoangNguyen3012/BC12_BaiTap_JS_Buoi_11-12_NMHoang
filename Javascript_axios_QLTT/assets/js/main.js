const userOperation = new UserOperation();

// Default functions
function setLocalStorage(userList) {
    localStorage.setItem('UserList', JSON.stringify(userList));
};

function getLocalStorage() {
    if(localStorage.getItem('UserList')){
        return JSON.parse(localStorage.getItem('UserList'));
    };
};

function getEle(id) {
    return document.getElementById(id);
};
// Default functions end

// display list
// edit this function to change the result list appearance
function renderTable(arrUsers) {
    var content = '';
    arrUsers.map(function(user, index){
        content += // Get content from BackEnd url
        `
        <tr>
            <td>${index + 1}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.matKhau}</td>
            <td>${user.hoTen}</td>
            <td>${user.email}</td>
            <td>${user.ngonNgu}</td>
            <td>${user.loaiND}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteUser('${user.id}')">Xóa</button>
                <button class="btn btn-success" onclick="viewUser('${user.id}')">Xem</button>
            </td>
        </tr>
        `
    })
    getEle('tblDanhSachNguoiDung').innerHTML = content;
};
// display list ends

// display function
// call out this function to display a table list of results
function getUserList() {
    userOperation.getUserList()
        .then(function (result) {
            renderTable(result.data);
            setLocalStorage(result.data);
        })
        .catch(function (error) {
            console.log(error);
        })
};
getUserList(); // call out automatically
// display function ends

getEle('btnThemNguoiDung').addEventListener('click',function() {
    getEle('modalBodyForm').reset(); // Clear data from form

    // Add button to Modal Footer
    var modalFooter = document.querySelector('.modal-footer');
    modalFooter.innerHTML = `<button class = "btn btn-success" onclick = "addUser()">Thêm Người Dùng</button>`
    // Button addUser to be visible
});

getEle('ipSearch').addEventListener('keyup', function() {
    var arrUser = getLocalStorage();
    var keyword = getEle('ipSearch').value;
    var arrSearch =  userOperation.findUser(arrUser,keyword);
    renderTable(arrSearch);
})

// addUser button
const addUser = function() {
    // Get input from form
    const taiKhoan = getEle('TaiKhoan').value;
    const hoTen = getEle('HoTen').value;
    const matKhau = getEle('MatKhau').value;
    const email = getEle('Email').value;
    const hinhAnh = getEle('HinhAnh').value;
    const loaiND = getEle('loaiNguoiDung').value;
    const ngonNgu = getEle('loaiNgonNgu').value;
    const moTa = getEle('MoTa').value;

    // Validate input
    var arrUser = getLocalStorage();

    var arrTaiKhoan = []; // Checking duplicates from taiKhoan
    for(var i = 0; i < Object.keys(arrUser).length; i++) {
        arrTaiKhoan.push(arrUser[i].taiKhoan);
    }

    const validator = new Validator();
    var isValid = true;

    isValid &= validator.kiemTraRong(taiKhoan, 'tbTK', '(*) Tai Khoan ko dc rong') && validator.kiemTraTrung(taiKhoan, 'tbTK', '(*) Tai Khoan da co nguoi dung', arrTaiKhoan); // Tai Khoan Validator

    isValid &= validator.kiemTraRong(hoTen, 'tbHoTen', '(*) Ho Ten ko dc rong') && validator.kiemTraChuoi(hoTen, 'tbHoTen', '(*) Ho Ten ko dc chua so hoac ky tu dac biet');

    isValid &= validator.kiemTraRong(matKhau, 'tbPass', '(*) Mat khau ko dc rong') && validator.kiemTraPass(matKhau, 'tbPass', '(*) Mat khau gom 1 chu viet thuong, 1 chu viet hoa, 1 so, 1 ky tu dac biet') && validator.kiemTraDoDaiKiTu(matKhau, 'tbPass', '(*) Mat khau tu 6 toi 8 ky tu', 6, 8); // Password Validator

    isValid &= validator.kiemTraEmail(email, 'tbEmail', '(*) Vui long nhap dung email') && validator.kiemTraRong(email, 'tbEmail', '(*) Email ko duoc rong'); // Email Validator

    isValid &= validator.kiemTraRong(hinhAnh, 'tbHinhAnh', '(*) Hinh anh ko dc rong'); // Hinh anh Validator

    isValid &= validator.kiemTraSelect(loaiND, 'tbLoaiND', '(*) Vui long chon nguoi dung'); // LoaiND Validator

    isValid &= validator.kiemTraSelect(ngonNgu, 'tbLoaiNN', '(*) Vui long chon ngon ngu'); // ngonNgu Validator

    isValid &= validator.kiemTraRong(moTa, 'tbMoTa', '(*) Mo ta ko dc rong')

    if (!isValid) {
        return;
    };
    // Validate input ends

    // Create object from object class
    let user = new User(taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);

    // Call out API to save data to database
    userOperation.addUser(user)
        .then(function (result) {
            // console.log(result);
            getUserList();
        }).catch(function (error) {
            console.log(error);
        });
};
// addUser button ends

// Button deleteUser
function deleteUser(id) {
    // Call out API to save data to database
    userOperation.deleteUser(id)
        .then(function (result) {
            // console.log(result);
            getUserList();
        }).catch(function (error) {
            console.log(error);
        });
};
// Button deleteUser ends

// Button viewUser
function viewUser(id) {
    // Call out API to save data to database
    userOperation.viewUser(id)
        .then(function (result) {
            // Open the Modal
            $('#myModal').modal('show');

            var user = result.data; // call out the current item to view
            // Insert data from database to form
            getEle('TaiKhoan').value = user.taiKhoan;
            getEle('HoTen').value = user.hoTen;
            getEle('MatKhau').value = user.matKhau;
            getEle('Email').value = user.email;
            getEle('HinhAnh').value = user.hinhAnh;
            getEle('loaiNguoiDung').value = user.loaiND;
            getEle('loaiNgonNgu').value = user.ngonNgu;
            getEle('MoTa').value = user.moTa;

            // Add btnCapNhat to form
            var modalFooter = document.querySelector('.modal-footer');
            modalFooter.innerHTML =
                ` <button class="btn btn-success" onclick="updateUser(${user.id})">Cập Nhật</button>`

        }).catch(function (error) {
            console.log(error);
        });
};
// Button viewUser ends


// Button updateUser

// Button updateUser ends

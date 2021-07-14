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

// function getEle(id) {
//     return document.getElementById(id);
// };
// Default functions end

function renderGrid(arrUsers) {
    var content = '';

    arrUsers.map(function (user, index) {
        var i = 1;
        if (user.loaiND == 'GV' && i <= 8) {
            content += // Get content from BackEnd url
                `
                <div class="col mb-4">
                <div class="card">
                <div class="card-img-top">
                    <img src="./img/${user.hinhAnh}" alt="">
                </div>
                <div class="card-body">
                    <span>${user.ngonNgu}</span>
                    <h3 class="">${user.hoTen}</h3>
                    <p>${user.moTa}</p>
                </div>
                </div>
                </div>
                `;
            i++;
        };
    });

    getEle('gridDanhSachNV').innerHTML = content;
};
// display list ends

// display function
// call out this function to display a grid list of results
function getUserList() {
    userOperation.getUserList()
        .then(function (result) {
            renderGrid(result.data);
            setLocalStorage(result.data);
        })
        .catch(function (error) {
            console.log(error);
        })
};
getUserList(); // call out automatically
// display function ends

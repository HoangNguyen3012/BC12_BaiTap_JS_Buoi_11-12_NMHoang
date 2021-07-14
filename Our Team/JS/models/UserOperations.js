function UserOperation() {
    this.getUserList = function() {
        var promise = axios({
            url: 'https://60ea735d5dd7ff0017b39775.mockapi.io/UserType', // comma
            method: 'GET',
        });
        return promise;
    };
    this.addUser = function(user) {
        return axios({
            url: 'https://60ea735d5dd7ff0017b39775.mockapi.io/UserType',
            // Add new data with POST method
            method: 'POST', //comma
            // Add this data to database
            data: user,
        });
    };
    this.deleteUser = function(id) {
        return axios( {
            // Delete data via id, unique for each item
            url: `https://60ea735d5dd7ff0017b39775.mockapi.io/UserType/${id}`, // comma
            method: 'DELETE',
        })
    };
    this.viewUser = function(id) {
        return axios( {
            // Receive data via id, unique for each item
            url: `https://60ea735d5dd7ff0017b39775.mockapi.io/UserType/${id}`, // comma
            method: 'GET',
        })
    };
    this.updateUser = function(id, user) {
        return axios( {
            url: `https://60ea735d5dd7ff0017b39775.mockapi.io/UserType/${id}`,
            method: 'PUT',
            data: user,
        })
    };
    this.findUser = function(userList, keyword) {
        return userList.filter(function(user) {
            return user.hoTen.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        })
    }
};

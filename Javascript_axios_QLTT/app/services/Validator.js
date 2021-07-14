function Validator() {
    // Validates input from user
    this.kiemTraRong = function(value, spanId, mess) {
        /** Falsy vs Truthy values
         * Falsy value = 0, '', "", ``, null, undefined, false, NaN
         * Truthy value = not Falsy values
         */
        // Check blank
        if (!value /**Trigger at false values */){
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }
        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = '';
        return true;
    };

    this.kiemTraTrung = function(value, spanID, mess, arrList) {
        for(var i = 0; i < arrList.length; i++) {
            if(arrList[i] == value) {
                getEle(spanID).style.display = 'block';
                getEle(spanID).innerHTML = mess;
                return false;
            };
        };
        getEle(spanID).style.display = 'none';
        getEle(spanID).innerHTML = '';
        return true;
    }

    this.kiemTraDoDaiKiTu = function(value, spanID, mess, min, max) {
        if (value.length >= min && value.length <= max) {
            getEle(spanID).style.display = 'none';
            getEle(spanID).innerHTML = '';
            return true;
        }

        getEle(spanID).style.display = 'block';
        getEle(spanID).innerHTML = mess;
        return false;
    };

    this.kiemTraChuoi = function(value, spanID, mess){
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +

        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +

        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"); // Use RegExp for validation

        if(pattern.test(value)) {
            getEle(spanID).style.display = 'none';
            getEle(spanID).innerHTML = '';
            return true;
        }
        getEle(spanID).style.display = 'block';
        getEle(spanID).innerHTML = mess;
        return false;
    };

    this.kiemTraEmail = function(email, spanID, mess) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //return re.test(String(email).toLowerCase());
        if(re.test(email)){
            getEle(spanID).style.display = 'none';
            getEle(spanID).innerHTML = '';
            return true;
        }
        getEle(spanID).style.display = 'block';
        getEle(spanID).innerHTML = mess;
        return false;
    };

    this.kiemTraPass = function(pass, spanID, mess) {
        var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"); // begin with string, 1 lower case, 1 upper case, 1 number, 1 special character, 4-10 letters
        if(pattern.test(pass)){
            getEle(spanID).style.display = 'none';
            getEle(spanID).innerHTML = '';
            return true;
        };
        getEle(spanID).style.display = 'block';
        getEle(spanID).innerHTML = mess;
        return false;
    };

    this.kiemTraSelect = function(Select, spanID, mess){
        if(Select !== "0"){
            getEle(spanID).style.display = 'none';
            getEle(spanID).innerHTML = '';
            return true;
        };
        getEle(spanID).style.display = 'block';
        getEle(spanID).innerHTML = mess;
        return false;
    };

};


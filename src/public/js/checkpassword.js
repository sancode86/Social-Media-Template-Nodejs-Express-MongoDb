function register() {
    var password= document.getElementById('password').value ;
    var confirm= document.getElementById('confirm_password').value;

    if ((confirm == password) && (confirm != '')){      
        document.getElementById('submit').disabled = false;
                                }

    if (password != confirm){      
        document.getElementById('submit').disabled = true;
                                }
    }
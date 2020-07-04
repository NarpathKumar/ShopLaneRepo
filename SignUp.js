console.clear();
const loginUrl = "https://5eeba96c5e298b0016b69331.mockapi.io/login";
const signup = $("#signup");
const login = $("#login");
const loginButton = $("#login-button")
const form = $('form')
login.click(()=>{
    if(login.text() === "Login ?."){
        login.text("Sign Up?.");
        loginButton.val("Login")
        signup.text("Login")
    }
    else if(login.text() === "Sign Up?."){
        login.text("Login ?.")
        loginButton.val("Sign Up")
        signup.text("Sign Up")
    }
})
form.on({
    'submit' : (e)=>{
       e.preventDefault();
       let sname = e.target.name.value.trim();
       let spass = e.target.password.value;
       if(loginButton.val() === "Sign Up"){
            let obj = {
                "userName": sname,
                "password": spass
            }
            $.get(loginUrl,(f)=>{
                var bool = false
                for(var i=0; i<f.length; i++){
                    if(f[i].userName === sname){
                        bool = true;
                        break
                    }
                }
                if(bool){
                    alert("Name is Taken, Please enter different userName")
                }
                else {
                    $.post(loginUrl,obj,(e)=>{
                        console.log(e)
                        window.localStorage.setItem("webLaneId",e.id)
                        window.location.assign("./shopLane.html");
                        form.get(0).reset();
                    })
                }
            })
       }
       else if(loginButton.val() === "Login"){
            $.get(loginUrl,(k)=>{
                let pos=-1;
                for(var i=0; i<k.length; i++){
                    if(k[i].userName === sname && k[i].password === spass){
                        pos = k[i].id;
                        break;
                    }
                }
                if(pos>-1){
                    console.log("id pass are correct the position is ")
                    console.log(pos)
                    window.localStorage.setItem("webLaneId",pos)
                    window.location.assign("./shopLane.html");
                    form.get(0).reset();
                }
                else  alert("UserName and password Mismatched")
            })
       }
    }
})
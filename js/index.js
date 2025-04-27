
var email = '', password = '', isOflline = localStorage.getItem("isOffline")

var current_UI = 0, cur_menu = 0

var uis = document.querySelectorAll(".main")

var user_data = null




import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteField } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDWIe4z785-9zR-SJ8k9yO2X2-qSvkgj5I",
  authDomain: "web-engine-1569c.firebaseapp.com",
  projectId: "web-engine-1569c",
  storageBucket: "web-engine-1569c.appspot.com",
  messagingSenderId: "842865177382",
  appId: "1:842865177382:web:8f09c2a0123b8d24c1c7e7",
  measurementId: "G-CS8JQKB049"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function unload_splash(i) {
  setTimeout(() => {
    document.querySelectorAll("div")[0].style.animationName = "splasho"
    setTimeout(() => {
      loadUI(i)
      document.querySelectorAll("div")[0].style.animationName = "splashi"
    }, 900)
  }, 3000)
}

function loadUI(i) {
  uis[current_UI].style.display = "none"
  uis[i].style.display = "flex"
  console.log(uis[i])
  current_UI = i

}

function load_account() {
  if (localStorage.getItem("email") != null && localStorage.getItem("password") != null) { email = localStorage.getItem("email"); password = localStorage.getItem("password") }
  if (isOflline != null) {
    if (isOflline == "n") {
      if ((email == '' || password == '') ||(localStorage.getItem("remember") == "n" && parseInt(localStorage.getItem("lastLog"))!=new Date().getDate())) {
        localStorage.removeItem("remember")
        localStorage.removeItem("email")
        localStorage.removeItem("password")
        localStorage.removeItem("isOffline")
        localStorage.removeItem("lastLog")
        localStorage.removeItem("user_data")
        unload_splash(1)
      } else {
        connectToAccount()
      }
    } else {
      if ((email == '' || password == '') || (email == null || password == null)) {
        localStorage.removeItem("remember")
        localStorage.removeItem("email")
        localStorage.removeItem("password")
        localStorage.removeItem("isOffline")
        localStorage.removeItem("user_data")
        localStorage.removeItem("lastLog")
        unload_splash(1)
      } else {
        user_data = JSON.parse(localStorage.getItem("user_data"))
        load_projects()
        unload_splash(2)
      }

    }
  } else {
    localStorage.removeItem("remember")
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    localStorage.removeItem("isOffline")
    localStorage.removeItem("user_data")
    localStorage.removeItem("lastLog")
    unload_splash(1)

  }

}

if (isOflline == "y") {
  window.addEventListener("beforeunload", () => {

    localStorage.setItem("user_data", JSON.stringify(user_data))

  })
}

async function load_projects() {
  var projects = user_data.projects
  var html = ''
  let c = 0
  document.getElementsByClassName("projects")[0].innerHTML = '<h2 style="width: 95%;text-align: left;font-size: 50px;margin:2%;padding-left: 3%;">Projects</h2>'
  if (projects != null && Object.keys(projects).length != 0) {
    if (!document.getElementById("no-projects").classList.contains("hide")) {
      document.getElementById("no-projects").classList.toggle("hide")

    }
    if (document.getElementsByClassName("projects")[0].classList.contains("hide")) {
      document.getElementsByClassName("projects")[0].classList.toggle("hide")

    }
    for (const [k, v] of Object.entries(projects)) {
      html = `
      <div class="project">
      <div class="project-detail">
          <h4 id="header-`+ k + `" style="cursor: pointer;">` + k + `</h4>
          <p>Least Edited: `+ v + `</p>
      </div>
      <div  class="project-action">
                <div title="Download as project" id="down-proj-`+ k + `" >
                <i class="fi fi-rr-cloud-download-alt"></i>
            </div>
            <div title="Download as Website" id="down-web-`+ k + `" >
            <i class="fi fi-rr-folder-download"></i> 
            </div>
            <div title="Delete" id="del-`+ k + `">
            <i  class="fi fi-rr-trash"></i>
            </div>
                </div>
  </div>
      `
      document.getElementsByClassName("projects")[0].insertAdjacentHTML("beforeend", html)
      document.getElementById("header-" + k).onclick = function () { load_project(k) }
      document.getElementById("del-" + k).onclick = function () { del_project(k) }
      document.getElementById("down-web-" + k).onclick = function () { down_web(k) }
      document.getElementById("down-proj-" + k).onclick = function () { down_proj(k) }
      c += 1
    }
  } else {
    console.log("no proj")
    document.getElementById("no-projects").classList.toggle("hide")
    document.getElementsByClassName("projects")[0].classList.toggle("hide")
  }
}

function down_proj(name) {
  let d = JSON.stringify(user_data[name])
  var a = document.createElement("a");
  a.href = window.URL.createObjectURL(new Blob([d], { type: "text/plain" }));
  a.download = name + ".dat";
  a.click();
}

function down_web(name) {
  let new_window = window.open("http://" + location.host + "/Web-engine/engine/download?pid=" + name);

}

async function del_project(name) {
  var confirm = window.confirm("Are you sure to delete site")
  if (confirm) {
    delete user_data.projects[name]
    delete user_data[name]
    console.log(user_data)
    if (isOflline == "n") {
      const userref = doc(db, "users", email);
      await updateDoc(userref, {
        [name]: deleteField(),
        projects: user_data.projects
      });
    }
    load_projects()
  }
}

function load_project(name) {
  if (isOflline == "n") {
    window.location.replace("http://" + location.host + "/Web-engine/engine?pid=" + name);
  } else {
    localStorage.setItem("user_data", JSON.stringify(user_data))
    window.location.replace("http://" + location.host + "/Web-engine/engine/offline?pid=" + name);

  }
}

function load_celems() {
  window.location.replace("http://" + location.host + "/Web-engine/engine/customElements");
}


function toggle_panel() {
  console.log("togling")
  document.getElementsByClassName("add-project")[0].classList.toggle("hide")
  uis[2].classList.toggle("blur")
}

document.getElementById("close-panel").onclick = toggle_panel

document.getElementById("add-project-bt").onclick = toggle_panel

document.getElementsByClassName("guest")[0].onclick = toggle_offline

function toggle_offline() {
  document.getElementsByClassName("login_box")[0].classList.toggle("hide")
  document.getElementsByClassName("guest_box")[0].classList.toggle("hide")

}
document.body.onload = load_account

function log_out() {
  user_data = null
  email = ''
  password = ''
  localStorage.removeItem("remember")
  localStorage.removeItem("email")
  localStorage.removeItem("password")
  localStorage.removeItem("isOffline")
  localStorage.removeItem("user_data")
  localStorage.removeItem("lastLog")
  loadUI(0)
  location.reload()
}

document.getElementById("log-out-bt").onclick = log_out

document.getElementById("en-c-elm-bt").onclick = load_celems



async function connectToAccount() {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    user_data = docSnap.data()
    if (user_data.password == password) {
      console.log("loading")
      load_projects()
      unload_splash(2)
    } else {
      password = null
      email = null
      user_data = null
      localStorage.removeItem("email")
      localStorage.removeItem("password")
      document.getElementsByClassName("login_box")[0].children[4].innerHTML = "Incorrect Password!"
    }
  } else {
    loadUI(1)
  }
}



async function add_project() {
  let projectName = document.getElementById("site-name").value
  if (projectName != null && projectName != "") {
    let projects = user_data.projects
    if (projects == null) {
      projects = {}
    }
    const userref = doc(db, "users", email);
    projects[projectName] = new Date().toLocaleDateString()
    user_data.projects = projects
    user_data[projectName] = { pages: { "home": { "elements": {}, } } }
    if (isOflline == "n") {
      await updateDoc(userref, {
        "projects": projects,
        [projectName]: { pages: { "home": { "elements": {}, } } }
      });
    }
    load_projects()
    toggle_panel()

  } else {
    document.getElementsByClassName("panel")[0].children[4].innerHTML = "Enter Site Name"
    setTimeout(() => {
      document.getElementsByClassName("panel")[0].children[4].innerHTML = ""
    }, 4000)
  }
}

document.getElementById("add-site-bt").onclick = add_project

function toggle_ltype() {
  document.getElementsByClassName("login_box")[0].classList.toggle("hide")
  document.getElementsByClassName("signup_box")[0].classList.toggle("hide")
}


//event listeners

document.getElementsByClassName("acc_ls")[0].children[0].onclick = toggle_ltype
document.getElementsByClassName("acc_ls")[1].children[0].onclick = toggle_ltype
document.getElementsByClassName("acc_ls")[2].children[0].onclick = toggle_offline

document.querySelectorAll("button")[0].onclick = login_acc
document.querySelectorAll("button")[1].onclick = signup_acc
document.querySelectorAll("button")[2].onclick = create_user
document.querySelectorAll("button")[3].onclick = open_imp_user


var file_inp = document.createElement("input")

file_inp.type = "file"

file_inp.oninput = imp_user

function open_imp_user() {
  file_inp.click()

}

function imp_user() {
  let us_dat = file_inp.files[0]
  let reader = new FileReader();
  reader.addEventListener("loadend", async () => {

    user_data = JSON.parse(reader.result);
    let un =us_dat.name.split(".")
    delete un[un.length-1]
    email = un.join(".").slice(0,(un.join(".").length-1))
    password = user_data.password
    localStorage.setItem("isOffline", "y")
    localStorage.setItem("email", email)
    localStorage.setItem("password", password)
    localStorage.setItem("remember", "y")
    localStorage.setItem("user_data", JSON.stringify(user_data))
    load_projects()
    unload_splash(2)
  })

  reader.readAsText(us_dat);
}

function create_user() {
  let temp_email = document.getElementsByClassName("guest_box")[0].children[2].value,
    temp_password = document.getElementsByClassName("guest_box")[0].children[3].value,
    temp_r_password = document.getElementsByClassName("guest_box")[0].children[4].value
  if (temp_email != "") {
    if (temp_password != "") {

      if (temp_password == temp_r_password) {

        user_data = { password: temp_password, email: temp_email, customelems: {} }
        email = temp_email
        password = temp_password
        load_projects()
        localStorage.setItem("email", temp_email)
        localStorage.setItem("password", temp_password)
        localStorage.setItem("isOffline", "y")
        localStorage.setItem("remember", "y")
        localStorage.setItem("user_data", JSON.stringify(user_data))
        loadUI(2)
      } else {
        document.getElementsByClassName("guest_box")[0].children[8].innerHTML = "Password Do not Match"
        setTimeout(() => {
          document.getElementsByClassName("guest_box")[0].children[8].innerHTML = ""
        }, 4000)

      }

    } else {
      document.getElementsByClassName("guest_box")[0].children[8].innerHTML = "Enter your Password"
      setTimeout(() => {
        document.getElementsByClassName("guest_box")[0].children[8].innerHTML = ""
      }, 4000)

    }
  } else {
    document.getElementsByClassName("guest_box")[0].children[8].innerHTML = "Enter your Email"
    setTimeout(() => {
      document.getElementsByClassName("guest_box")[0].children[8].innerHTML = ""
    }, 4000)

  }
}

async function login_acc() {
  let temp_email = document.getElementsByClassName("login_box")[0].children[2].value, temp_password = document.getElementsByClassName("login_box")[0].children[3].value
  if (temp_email != "") {
    if (temp_password != "") {
      const docRef = doc(db, "users", temp_email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        user_data = docSnap.data()
        email = temp_email
        password = temp_password
        load_projects()
        if (user_data.password == temp_password) {
          if (document.getElementsByClassName("login_box")[0].children[6].children[0].checked) {

            localStorage.setItem("remember", "y")

          } else {

            localStorage.setItem("remember", "n")
            localStorage.setItem("lastLog",new Date().getDate())
          }
          localStorage.setItem("email", temp_email)
          localStorage.setItem("password", temp_password)
          localStorage.setItem("isOffline", "n")
          isOflline="n"
          loadUI(2)
        } else {
          user_data = null
          document.getElementsByClassName("login_box")[0].children[5].innerHTML = "Incorrect Password!"
        }

      } else {
        document.getElementsByClassName("login_box")[0].children[5].innerHTML = "Email was not found!"
        setTimeout(() => {
          document.getElementsByClassName("login_box")[0].children[5].innerHTML = ""
        }, 4000)
      }
    } else {
      document.getElementsByClassName("login_box")[0].children[5].innerHTML = "Enter your Password"
      setTimeout(() => {
        document.getElementsByClassName("login_box")[0].children[5].innerHTML = ""
      }, 4000)

    }
  } else {
    document.getElementsByClassName("login_box")[0].children[5].innerHTML = "Enter your Email"
    setTimeout(() => {
      document.getElementsByClassName("login_box")[0].children[5].innerHTML = ""
    }, 4000)

  }
}

async function signup_acc() {
  let temp_email = document.getElementsByClassName("signup_box")[0].children[2].value, temp_password = document.getElementsByClassName("signup_box")[0].children[3].value,
    temp_repassword = document.getElementsByClassName("signup_box")[0].children[4].value
  if (temp_email != "") {
    if (temp_password == temp_repassword) {
      if (temp_password != "") {
        const docRef = doc(db, "users", temp_email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          document.getElementsByClassName("signup_box")[0].children[6].innerHTML = "Emailalready Exists!"
          setTimeout(() => {
            document.getElementsByClassName("signup_box")[0].children[6].innerHTML = ""
          }, 4000)
        } else {
          const data = {
            password: temp_password,
            customelems: {}
          };

          await setDoc(doc(db, "users", temp_email), data);
          toggle_ltype()
        }
      } else {
        document.getElementsByClassName("signup_box")[0].children[6].innerHTML = "Enter your Password"
        setTimeout(() => {
          document.getElementsByClassName("signup_box")[0].children[6].innerHTML = ""
        }, 4000)

      }
    } else {
      document.getElementsByClassName("signup_box")[0].children[6].innerHTML = "Password doesn't match"
      setTimeout(() => {
        document.getElementsByClassName("signup_box")[0].children[6].innerHTML = ""
      }, 4000)

    }
  } else {
    document.getElementsByClassName("signup_box")[0].children[6].innerHTML = "Enter your Email"
    setTimeout(() => {
      document.getElementsByClassName("signup_box")[0].children[6].innerHTML = ""
    }, 4000)

  }
}

document.getElementById("imp-project-bt").onclick = imp_proj
document.getElementById("exp-data-bt").onclick = exp_data

var input = document.createElement('input');

function imp_proj() {
  input.type = 'file';
  input.click();
  input.oninput = importp
}

async function importp() {
  let selected = input.files[0];
  let name = selected.name.split(".")[0]
  let reader = new FileReader();
  reader.addEventListener("loadend", async () => {
    if (user_data[name] == null) {
      user_data[name] = JSON.parse(reader.result);
      if (user_data.projects != null) {
        user_data.projects[name] = new Date().toLocaleDateString()
      } else {
        user_data.projects = { [name]: new Date().toLocaleDateString() }
      }
      const userref = doc(db, "users", email);
      await updateDoc(userref, {
        "projects": user_data.projects,
        [name]: user_data[name]
      });
      load_projects()

    } else {
      alert("Project with name " + name + " already exists")
    }
  });
  reader.readAsText(selected);
}


function exp_data() {
  let d = JSON.stringify(user_data)
  var a = document.createElement("a");
  a.href = window.URL.createObjectURL(new Blob([d], { type: "text/plain" }));
  a.download = email + ".dat";
  a.click();
}

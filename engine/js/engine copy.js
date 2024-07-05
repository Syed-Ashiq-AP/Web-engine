var current = 'en-live-page', elements = {}, currentc = ''

var classes = {}, def_classes = {}, animations = {}, cclass = "", pageClasses = {}, pageDefClasses = {}, ffs = {}

var mave_e = false, zoom = 100, defc = false

var pages = [], isHome = false, move_el


var c_e_tab = document.getElementsByClassName("edit-tabs")[0]
    , c_c_tab = document.getElementsByClassName("class-tabs")[0],
    c_a_tab = document.getElementsByClassName("anim-tabs")[0]

var c_e_tab_bt = document.getElementsByTagName("view-tabs")[0].children[0],
    c_c_tab_bt = document.getElementsByTagName("view-tabs")[1].children[0],
    c_a_tab_bt = document.getElementsByTagName("view-tabs")[2].children[0]

var dbt = document.createElement("button")
dbt.id = "dbt"
dbt.style.display = "none"
document.body.appendChild(dbt)

var ibt = document.createElement("button")
ibt.id = "ibt"
ibt.style.display = "none"
document.body.appendChild(ibt)

var lbt = document.createElement("button")
lbt.id = "lbt"
lbt.style.display = "none"
document.body.appendChild(lbt)

var data = null,
    pageData = null,
    pageElements = {},
    currentPage = ''

var celem_list = []

var animations = {},
    cur_anim = "",
    pageAnim = {},
    cur_key = 0.0
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

var pids = urlParams.get('pid')

var current_pres = document.getElementsByClassName("action-active")[0]

built = ["heading", "paragraph", "input", "button", "section", "Link", "img"]
var avail_properties = { 'Alt': 'Alt', 'Content (HTML)': "innerHTML", 'Content (TEXT)': "innerText", "Input Type": "Type", 'Placeholder': "placeholder", 'Tooltip': 'Title', 'URL': "URL", 'Image (URL)': "srcURL", 'Image (MEDIA)': "srcMEDIA" }
var avail_styles = { 'Border': 'Border', 'Border Top': 'BorderTop', 'Border Left': 'BorderLeft', 'Border Bottom': 'BorderBottom', 'Border Right': 'BorderRight', 'Animation Name': "AnimationName", 'Animation Duration': "AnimationDuration", 'Background blur': "Bgblur", 'Padding': "Padding", 'Margin': "Margin", 'Display as': "Display", 'Text Style': "TextStyle", 'Background Color': "BackgroundColor", 'Flex Direction': "FlexDirection", 'Border Radius': "BorderRadius", 'Width': "Width", 'Height': "Height", 'Aling content': "AlignItems", 'Justify Content': "JustifyContent", 'Background Image (URL)': "BackgroundURL", 'Background Image (MEDIA)': "BackgroundMEDIA" }
var avail_listeners = { 'Hover': "Hover", 'Focus': "Focus", 'Visited': "Visited", 'Target': "Target" }
var style = [], media_data = []
var tags = { "heading": "h1", "paragraph": "p", "input": "input", "button": "button", "section": "section", "Link": "a", "img": "img" }
var btn_c = null, btn_a = null, btn_p = null


var images = { "default.jpg": "./img/default.jpg" }, selmedia = "default.jpg"

var img_input = document.createElement('input');
img_input.type = 'file';
img_input.oninput = import_img;
img_input.multiple = "true"
try {
    function init_upload_img() {


        img_input.click();


    }

    function create_default_classes() {
        for (const [k, v] of Object.entries(built)) {
            def_classes[v + "-en-default-class"] = new Class(v + "-en-default-class")
        }
    }

    function import_droped(event) {
        event.preventDefault()
        var imgs = event.dataTransfer.files
        for (const [k, img] of Object.entries(imgs)) {
            if (images[img.name] == null) {
                selmedia = img.name
                var durl = window.URL.createObjectURL(img)
                images[img.name] = durl
                ibt.click()
            }
        }
        load_images_tab()
    }

    function import_img() {
        var imgs = img_input.files
        for (const [k, img] of Object.entries(imgs)) {
            if (images[img.name] == null) {
                selmedia = img.name
                var durl = window.URL.createObjectURL(img)
                images[img.name] = durl
                ibt.click()
            }
        }
        load_images_tab()
    }

    function load_images() {
        var img_html = ''
        for (const [k, v] of Object.entries(images)) {
            img_html += `    
    <image-cont>
                    <img src="` + v + `">
                    <image-details onclick="set_media(event,'` + k + `')">
                    <image-name id="t-` + k + `">` + k + `</image-name>
                    </image-details>
                </image-cont>   `
        }
        if (img_html == '') {
            img_html = `<error-msg>No Images are stored</error-msg>`
        }
        document.getElementsByTagName('window-content')[0].innerHTML = img_html
    }

    function load_images_tab() {
        var img_html = ''
        for (const [k, v] of Object.entries(images)) {
            img_html += `    
    <image-cont onclick='set_sel_media("`+ k + `")'>
                    <img src="` + v + `">
                </image-cont>   `
        }
        if (img_html == '') {
            img_html = `<error-msg style="position:absolute;color:#474747">Drop mages here or click on the button to import Image</error-msg>`
        }
        document.getElementsByTagName('media-list')[0].innerHTML = img_html
        set_sel_media(Object.keys(images)[0])
    }

    function toggle_en_media(v = false, nclass = '', d = '') {
        media_data = [nclass, d]
        document.getElementsByTagName("window")[0].classList.toggle("hidden")
    }

    function rename_media() {
        var rename = document.getElementById("image-h-r").innerText
        let repeated = false
        if (rename != selmedia.split(".")[0]) {
            let names = Object.keys(images)
            for (const [k, v] of Object.entries(names)) {
                if (rename == v.split(".")[0]) {
                    repeated = true
                }
            }
        }
        if (!repeated) {
            var e = images[selmedia]
            let nid = rename + "." + selmedia.split(".")[1]
            delete images[selmedia]
            dbt.click()
            images[nid] = e
            selmedia = nid
            ibt.click()
            hide_rename_media()
            load_images_tab()
        }
    }

    function set_sel_media(m) {
        selmedia = m
        document.getElementById("image-h-r").innerText = m

    }

    function show_rename_media() {
        document.getElementById("image-h-r").contentEditable = "true"
        document.getElementById("image-h-r").innerText = selmedia.split(".")[0]
        document.getElementById("image-h-r").style.background = "white"
        document.getElementById("image-h-r").style.color = "black"
        document.getElementById("image-r-bt").style.display = "none"
        document.getElementById("image-c-bt").style.display = ""
        document.getElementById("image-n-bt").style.display = ""
    }
    function hide_rename_media() {
        document.getElementById("image-h-r").contentEditable = "false"
        document.getElementById("image-h-r").innerText = selmedia
        document.getElementById("image-h-r").style.background = ""
        document.getElementById("image-h-r").style.color = ""
        document.getElementById("image-r-bt").style.display = ""
        document.getElementById("image-c-bt").style.display = "none"
        document.getElementById("image-n-bt").style.display = "none"
    }
    function show_rename_page() {
        document.getElementsByTagName("pa-action")[0].style.display = "none"
        document.getElementsByTagName("pa-action")[1].style.display = "block"
        document.getElementsByTagName("pa-action")[2].style.display = "block"
        document.getElementsByTagName("pa-action")[3].style.display = "none"
        document.getElementsByTagName("page-name")[0].style.backgroundColor = "white"
        document.getElementsByTagName("page-name")[0].style.color = "black"
        document.getElementsByTagName("page-name")[0].contentEditable = "true"
    }
    function hide_rename_page() {
        document.getElementsByTagName("pa-action")[1].style.display = "none"
        document.getElementsByTagName("pa-action")[0].style.display = "block"
        document.getElementsByTagName("pa-action")[3].style.display = "block"
        document.getElementsByTagName("pa-action")[2].style.display = "none"
        document.getElementsByTagName("page-name")[0].style.backgroundColor = ""
        document.getElementsByTagName("page-name")[0].style.color = ""
        document.getElementsByTagName("page-name")[0].contentEditable = "false"
    }

    function rename_page() {
        let name = document.getElementsByTagName("page-name")[0].innerText
        if (name != "" && name != currentPage) {
            var elem_dic = {}
            var elem_key = []
            var elem_value = []
            for (const [k, v] of Object.entries(elements)) {
                elem_value.push(JSON.parse(JSON.stringify(v)))
                elem_key.push(k)
            }
            elem_dic.key = elem_key
            elem_dic.value = elem_value



            var class_dic = {}
            var class_key = []
            var class_value = []
            for (const [k, v] of Object.entries(classes)) {
                class_value.push(JSON.parse(JSON.stringify(v)))
                class_key.push(k)
            }
            class_dic.key = class_key
            class_dic.value = class_value


            var anim_dic = {}
            var anim_key = []
            var anim_value = []
            for (const [k, v] of Object.entries(animations)) {
                anim_value.push(JSON.parse(JSON.stringify(v)))
                anim_key.push(k)
            }
            anim_dic.key = anim_key
            anim_dic.value = anim_value
            data[pids].pages[name] = {}
            data[pids].pages[name].elements = elem_dic
            data[pids].pages[name].classes = class_dic
            data[pids].pages[name].animations = anim_dic
            delete data[pids].pages[currentPage]
            let np = []
            for (const [k, v] of Object.entries(pages)) {
                if (v != currentPage) {
                    np.push(v)
                } else {
                    np.push(name)
                }
            }
            pages = np
            currentPage = name

            pageData = data[pids].pages[currentPage]

            load_pages()
            hide_rename_page()
        }
    }

    async function delete_media() {
        await dbt.click()
        delete images[selmedia]
        load_images_tab()
    }


    const uniqueId = () => {
        const dateString = Date.now().toString(36);
        const randomness = Math.random().toString(36).substr(2);
        var uid = dateString + randomness
        return uid;
    };



    function setup_offline() {
        pages = []
        pages.push("Home")
        currentPage = "Home"
        data = {}
        data[pids] = { "pages": { "Home": { "elements": {} } } }
        pageData = data[pids].pages[currentPage]
        create_default_classes()
        if (data[pids].home == null) {
            data[pids].home = pages[0]
        }
        set_up_page()

        load_pages()
    }


    function load_pages() {

        var html = ''
        for (const [i, v] of Object.entries(pages)) {
            html += `<p-item onclick='change_page("` + v + `");toggle_dropdown("pg-en-drop")'>` + v + `</p-item>`
        }
        document.getElementsByTagName("pages-dropdown")[0].innerHTML = html
        document.getElementsByTagName("page-name")[0].innerHTML = currentPage
    }
    function load_cpages() {

        var html = ''
        for (const [i, v] of Object.entries(pages)) {
            html += `<p-item onclick='change_elem("` + v + `");toggle_dropdown("pg-en-drop")'>` + v + `</p-item>`
        }
        document.getElementsByTagName("pages-dropdown")[0].innerHTML = html
        document.getElementsByTagName("page-name")[0].innerHTML = currentPage
    }


    function change_page(v) {
        var elem_dic = {}
        var elem_key = []
        var elem_value = []
        for (const [k, v] of Object.entries(elements)) {
            elem_value.push(JSON.parse(JSON.stringify(v)))
            elem_key.push(k)
        }
        elem_dic.key = elem_key
        elem_dic.value = elem_value



        var class_dic = {}
        var class_key = []
        var class_value = []
        for (const [k, v] of Object.entries(classes)) {
            class_value.push(JSON.parse(JSON.stringify(v)))
            class_key.push(k)
        }
        class_dic.key = class_key
        class_dic.value = class_value

        var class_dic = {}
        var class_key = []
        var class_value = []
        for (const [k, v] of Object.entries(classes)) {
            class_value.push(JSON.parse(JSON.stringify(v)))
            class_key.push(k)
        }
        class_dic.key = class_key
        class_dic.value = class_value


        var anim_dic = {}
        var anim_key = []
        var anim_value = []
        for (const [k, v] of Object.entries(animations)) {
            anim_value.push(JSON.parse(JSON.stringify(v)))
            anim_key.push(k)
        }
        anim_dic.key = anim_key
        anim_dic.value = anim_value


        data[pids].pages[currentPage].elements = elem_dic
        data[pids].pages[currentPage].classes = class_dic
        data[pid].pages[currentPage].def_classes = d_class_dic
        data[pids].pages[currentPage].animations = anim_dic
        currentPage = v

        pageData = data[pids].pages[currentPage]
        elements = {}
        classes = {}
        animations = {}

        if (data[pids].pages[currentPage].elements != null && Object.keys(data[pids].pages[currentPage].elements).length != 0) {
            pageElements = createDict(pageData.elements.key, pageData.elements.value)
            pageClasses = createDict(pageData.classes.key, pageData.classes.value)
            pageDefClasses = createDict(pageData.def_classes.key, pageData.def_classes.value)
            pageAnim = createDict(pageData.animations.key, pageData.animations.value)
            load_page_data()

        } else {
            current = "en-live-page"
            document.getElementById("en-live-page").innerHTML = ""
            set_up_page()

        }
        document.getElementsByTagName("page-name")[0].innerHTML = currentPage

    }

    function createDict(keys, values) {
        let obj = {};
        for (let i = 0; i < keys.length; i++) {
            obj[keys[i]] = values[i] != undefined ? values[i] : null;
        }
        return obj
    }
    function load_page_data() {
        if (!location.pathname.includes("customElements")) {
            if (data[pids].home == currentPage) {
                document.getElementById("setHome").classList.add("home")
                document.getElementById("setHome").classList.remove("nothome")
            } else {
                document.getElementById("setHome").classList.remove("home")
                document.getElementById("setHome").classList.add("nothome")

            }
        }
        load_page_classes()
        current = "en-live-page"
        document.getElementById("en-live-page").innerHTML = ""
        var adata = pageElements["live-page"]
        current = adata.element.childof
        var cid = adata.element.id

        elements[cid] = eval("new " + adata.element.Ename + "(cid)")

        elements[cid].element.id = cid
        elements[cid].element.styles = {}
        elements[cid].element.properties = {}
        elements[cid].styles = {}
        elements[cid].properties = {}
        elements[cid].element.ref.removeAttribute("style")
        elements[cid].element.classes = adata.element.classes
        elements[cid].element.childof = adata.element.childof
        elements[cid].element.childs = adata.element.childs
        elements[cid].element.Ename = adata.element.Ename
        let cv = adata.element.classes
        if (cv != '') {
            elements[cid].element.ref.classList.add(cv)
        }
        let np = {}
        let dp = adata.properties
        let ns = {}
        let ds = adata.styles
        for (const [a, b] of Object.entries(dp)) {
            np[a] = eval("new " + b.property.nclass + "(cid)")
            np[a].property.value = b.property.value
        }
        for (const [a, b] of Object.entries(ds)) {
            ns[a] = eval("new " + b.style.nclass + "(cid)")
            ns[a].style.value = b.style.value
            if (ns[a].style.type == "multiple") {
                for (const [c, d] of Object.entries(ns[a].style.options)) {
                    d.style.value = b.style.options[c].style.value
                }
            }
        }
        elements[cid].properties = np
        elements[cid].element.properties = np
        elements[cid].styles = ns
        elements[cid].element.styles = ns
        elements["live-page"].element.ref.classList.add("en-live-page")
        elements["live-page"].element.reload_element()
        load_childs(pageElements["live-page"].element.childs)


        for (const [k, v] of Object.entries(def_classes)) {
            for (const [x, y] of Object.entries(v.listeners)) {
                y.set_listen_style()
            }
            v.reload_elements()
        }

        for (const [k, v] of Object.entries(classes)) {
            for (const [x, y] of Object.entries(v.listeners)) {
                y.set_listen_style()
            }
            v.reload_elements()
        }

        current = Object.keys(elements)[0]
        if (current != "") {
            elements[current].element.get_class()
        }

        load_property(event, "delete", Object.keys(elements)[0])
    }


    function load_childs(v) {
        for (const [k, vs] of Object.entries(v)) {
            var ldata = pageElements[vs]
            current = ldata.element.childof
            var cid = ldata.element.id

            elements[cid] = eval("new " + ldata.element.Ename + "(cid)")

            elements[cid].element.id = cid
            elements[cid].element.classes = ldata.element.classes
            elements[cid].element.childof = ldata.element.childof
            elements[cid].element.childs = ldata.element.childs
            elements[cid].element.Ename = ldata.element.Ename
            elements[cid].element.styles = {}
            elements[cid].element.properties = {}
            elements[cid].styles = {}
            elements[cid].properties = {}
            elements[cid].element.ref.removeAttribute("style")
            let cv = ldata.element.classes
            if (cv != '') {
                elements[cid].element.ref.classList.add(cv)
            }
            let np = {}
            let dp = ldata.properties
            let ns = {}
            let ds = ldata.styles
            for (const [a, b] of Object.entries(dp)) {
                np[a] = eval("new " + b.property.nclass + "(cid)")
                np[a].property.value = b.property.value
            }
            for (const [a, b] of Object.entries(ds)) {
                ns[a] = eval("new " + b.style.nclass + "(cid)")
                ns[a].style.value = b.style.value
                if (ns[a].style.type == "multiple") {
                    for (const [c, d] of Object.entries(ns[a].style.options)) {
                        d.style.value = b.style.options[c].style.value
                    }
                }
            }
            elements[cid].properties = np
            elements[cid].element.properties = np
            elements[cid].styles = ns
            elements[cid].element.styles = ns
            elements[cid].element.reload_element()
            load_childs(elements[cid].element.childs)
        }

    }

    function set_up_page() {
        if (!location.pathname.includes("customElements")) {
            if (data[pids].home == currentPage) {
                document.getElementById("setHome").classList.add("home")
                document.getElementById("setHome").classList.remove("nothome")
            } else {
                document.getElementById("setHome").classList.remove("home")
                document.getElementById("setHome").classList.add("nothome")

            }
        }
        var templ = new section("live-page")
        elements["live-page"] = templ
        elements["live-page"].element.childof = "en-live-page"
        elements["live-page"].element.Ename = "section"
        elements["live-page"].element.html.classList.add("en-live-page")
        elements["live-page"].element.reload_element()
        current = "live-page"

        if (!location.pathname.includes("customElements")) {
            load_list()
        }
        load_images()
        load_classes()
        list_anims()
        load_property(event, "delete", current)

    }

    function add(e, tag) {
        let id = tag + "-" + uniqueId()
        while (elements[id] != null) {
            id = tag + "-" + uniqueId()

        }
        elements[current].element.childs.push(id)

        elements[id] = eval("new " + tag + "(id)")
        elements[id].element.childof = current
        elements[id].element.Ename = tag
        en_set_style(current, id)
        current = id



    }

    function load_list(v = '') {
        let html = `<block-h>Basic Blocks</block-h>`
        if (v == '') {
            for (const [i, val] of Object.entries(built)) {
                html += `
        
       <block draggable="true" id="b-`+ val + `" ondragend="reset_drag(event)" ondragstart="en_drag(event,'` + val + `')" onclick="add(event,'` + val + `')">` + val + `</block>
       `
            }
        } else {
            for (const [i, val] of Object.entries(built)) {
                if (val.includes(v)) {
                    html += `
        
       <block draggable="true" id="b-`+ val + `" ondragend="reset_drag(event)" ondragstart="en_drag(event,'` + val + `')" onclick="add(event,'` + val + `')">` + val + `</block>
       `
                }
            }
        }
        document.getElementsByTagName("blocks")[0].innerHTML = html
    }

    function load_custom_elems(f = '') {
        html = `<block-h>Custom Blocks</block-h>`
        if (f == '') {
            for (const [i, v] of Object.entries(celem_list)) {
                html += `
        
       <block draggable="true" id="b-`+ v + `" ondragend="reset_drag(event)" ondragstart="en_drag(event,'` + v + `','y')" onclick="add_celem(event,'` + v + `')">` + v + `</block>
       `
            }
        } else {

            for (const [i, v] of Object.entries(celem_list)) {
                if (v.includes(f)) {
                    html += `
        
       <block draggable="true" id="b-`+ v + `" ondragend="reset_drag(event)" ondragstart="en_drag(event,'` + v + `','y')" onclick="add_celem(event,'` + v + `')">` + v + `</block>
       `
                }
            }
        }
        document.getElementsByTagName("blocks")[0].insertAdjacentHTML("beforeend", html)
    }

    function filter_blocks(f) {
        load_list(f)
        load_custom_elems(f)
    }


    function setUpAnimTab() {
        document.getElementsByTagName("viewport")[0].style.display = "flex"
        document.getElementsByTagName("viewport")[1].style.display = "none"
        document.getElementById("add_en_style_bt").style.display = "none"
        document.getElementById("add_en_anim_bt").style.display = ""
        document.getElementsByTagName("bottom-tab")[0].style.display = ""
    }

    function setUpStyleTab() {
        document.getElementsByTagName("viewport")[0].style.display = "flex"
        document.getElementsByTagName("viewport")[1].style.display = "none"
        document.getElementById("add_en_style_bt").style.display = ""
        document.getElementById("add_en_anim_bt").style.display = "none"
        document.getElementsByTagName("bottom-tab")[0].style.display = "none"
    }

    function setUpEditTab() {
        document.getElementsByTagName("viewport")[0].style.display = "flex"
        document.getElementsByTagName("viewport")[1].style.display = "none"
        document.getElementById("add_en_style_bt").style.display = "none"
        document.getElementById("add_en_anim_bt").style.display = "none"
        document.getElementsByTagName("bottom-tab")[0].style.display = "none"
    }

    function setUpMediaTab(item) {
        document.getElementsByTagName("viewport")[0].style.display = "none"
        document.getElementsByTagName("viewport")[1].style.display = "flex"
        for (const [k, v] of Object.entries(document.getElementsByTagName("tab"))) {
            v.classList.remove("tab-active")
        }
        item.classList.add("tab-active")
        load_images_tab()
    }


    function load_classes(f = '') {
        let html = `<block-h>Default Styles</block-h>`
        for (const [i, val] of Object.entries(def_classes)) {
            if (i.toLowerCase().includes(f.toLowerCase())) {
                html += `
       <block style="cursor:pointer;" id="b-`+ i + `"  onclick="load_def_class('` + i + `');class_switch_ui(1)">` + i.split("-")[0] + `</block>
       `
            }
        }
        html += `<block-h>Class</block-h>`
        for (const [a, b] of Object.entries(classes)) {
            if (a.toLowerCase().includes(f.toLowerCase())) {
                html += `<block style="cursor:pointer;" onclick="load_class('` + a + `');class_switch_ui(1)">` + a.split("-")[0] + `</block>`
            }
        }
        if (cclass == "") {
            document.getElementById('en_class_cont').innerHTML = "<error-msg>Select an item from STYLES to Edit</error-msg>"
            document.getElementById("en_class_drop_bt").style.display = "none"
        } else {
            cclass = Object.keys(classes)[0]
            document.getElementById("en_class_drop_bt").style.display = "flex"
            load_class()
        }
        document.getElementById("en_class_tab").innerHTML = html
    }


    function list_anims(f = '') {
        let html = '<block-h>Animations</block-h>'
        for (const [k, v] of Object.entries(animations)) {
            if (k.toLowerCase().includes(f.toLowerCase())) {
                html += `<block style="cursor:pointer;" id="b-` + k + `"  onclick="load_anim('` + k + `');reset_keys();anim_switch_ui(5)">` + k + `</block>`
            }
        }
        document.getElementById("en-anim-l").innerHTML = html
        load_anim()
    }

    function reset_keys() {
        document.getElementsByTagName("keys")[0].innerHTML = ''
        let ks = animations[cur_anim].keyframes
        for (const [k, v] of Object.entries(ks)) {
            let html = `<key id="key-en-` + k + `"><k-ui></k-ui></key>`
            document.getElementsByTagName("keys")[0].insertAdjacentHTML("beforeend", html)
            document.getElementById("key-en-" + k).style.width = (k) + "%"
        }
        load_anim()
    }

    function list_property() {
        let c_p = elements[current].element.properties
        let c_s = elements[current].element.styles
        let phtml = "<p class='en-prop-title'>Attributes</p>",
            shtml = '<p class="en-prop-title">Styles</p> '
        for (const [i, v] of Object.entries(avail_properties)) {
            if (v in c_p == false) {
                phtml += "<item onclick='en_add_property(`" + v + "`)'>" + i + "</item>"
            }
        }
        for (const [i, v] of Object.entries(avail_styles)) {
            if (v in c_s == false) {
                shtml += "<item onclick='en_add_style(`" + v + "`)'>" + i + "</item>"
            }
        }
        document.getElementsByTagName("menu-c")[0].innerHTML = ''
        document.getElementsByTagName("menu-c")[0].insertAdjacentHTML('beforeend', phtml)
        document.getElementsByTagName("menu-c")[0].insertAdjacentHTML('beforeend', shtml)
    }

    function filter_prop(f) {
        f = f.toLowerCase()
        let c_p = elements[current].element.properties
        let c_s = elements[current].element.styles
        let phtml = "<p class='en-prop-title'>Attributes</p>",
            shtml = '<p class="en-prop-title">Styles</p> '
        for (const [i, v] of Object.entries(avail_properties)) {
            if (v in c_p == false && i.toLowerCase().includes(f)) {
                phtml += "<item onclick='en_add_property(`" + v + "`)'>" + i + "</item>"
            }
        }
        for (const [i, v] of Object.entries(avail_styles)) {
            if (v in c_s == false && i.toLowerCase().includes(f)) {
                shtml += "<item onclick='en_add_style(`" + v + "`)'>" + i + "</item>"
            }
        }
        document.getElementsByTagName("menu-c")[0].innerHTML = ''
        document.getElementsByTagName("menu-c")[0].insertAdjacentHTML('beforeend', phtml)
        document.getElementsByTagName("menu-c")[0].insertAdjacentHTML('beforeend', shtml)

    }


    function list_property_class() {
        let c_s = null
        if (defc) {
            c_s = def_classes[cclass].styles
        }
        else {
            c_s = classes[cclass].styles
        }
        let shtml = '<p class="en-prop-title">Styles</p> '
        for (const [i, v] of Object.entries(avail_styles)) {
            if (v in c_s == false) {
                shtml += "<item onclick='cen_add_style(`" + v + "`)'>" + i + "</item>"
            }
        }
        document.getElementsByTagName("menu-c")[1].innerHTML = ''
        document.getElementsByTagName("menu-c")[1].insertAdjacentHTML('beforeend', shtml)
    }

    function list_styles_lis(menu, id) {
        let c_s = null
        let lis = id.split("-")[1]
        if (defc) {
            c_s = def_classes[cclass].listeners[lis].styles
        }
        else {
            c_s = classes[cclass].listeners[lis].styles
        }
        let shtml = '<p class="en-prop-title">Styles</p> '
        for (const [i, v] of Object.entries(avail_styles)) {
            if (v in c_s == false) {
                shtml += "<item onclick='cen_add_style_tl(`" + lis + "`,`" + menu + "`,`" + v + "`)'>" + i + "</item>"
            }
        }
        document.getElementById(id).innerHTML = ''
        document.getElementById(id).insertAdjacentHTML('beforeend', shtml)

    }

    function list_listen_class() {
        let c_s = null
        if (defc) {
            c_s = def_classes[cclass].listeners
        }
        else {
            c_s = classes[cclass].listeners
        }
        let shtml = ``
        for (const [i, v] of Object.entries(avail_listeners)) {
            if (v in c_s == false) {
                shtml += "<item onclick='cen_add_listener(`" + v + "`)'>" + i + "</item>"
            }
        }
        document.getElementsByTagName("menu-c")[2].innerHTML = ''
        document.getElementsByTagName("menu-c")[2].insertAdjacentHTML('beforeend', shtml)
    }

    function filter_class(f) {
        f = f.toLowerCase()
        let c_s = null
        if (defc) {
            c_s = def_classes[cclass].styles
        }
        else {
            c_s = classes[cclass].styles
        }
        let shtml = '<p class="en-prop-title">Styles</p> '
        for (const [i, v] of Object.entries(avail_styles)) {
            if (v in c_s == false && i.toLowerCase().includes(f)) {
                shtml += "<item onclick='cen_add_style(`" + v + "`)'>" + i + "</item>"
            }
        }
        document.getElementsByTagName("menu-c")[1].innerHTML = ''
        document.getElementsByTagName("menu-c")[1].insertAdjacentHTML('beforeend', shtml)
    }

    function list_property_anim() {
        let c_s = animations[cur_anim].keyframes[cur_key]
        let shtml = '<p class="en-prop-title">Styles</p> '
        for (const [i, v] of Object.entries(avail_styles)) {
            if (v in c_s == false) {
                shtml += "<item onclick='aen_add_style(`" + v + "`)'>" + i + "</item>"
            }
        }
        document.getElementsByTagName("menu-c")[2].innerHTML = ''
        document.getElementsByTagName("menu-c")[2].insertAdjacentHTML('beforeend', shtml)
    }

    function filter_anim(f) {
        f = f.toLowerCase()
        let c_s = animations[cur_anim].keyframes[cur_key]
        let shtml = '<p class="en-prop-title">Styles</p> '
        for (const [i, v] of Object.entries(avail_styles)) {
            if (v in c_s == false && i.toLowerCase().includes(f)) {
                shtml += "<item onclick='aen_add_style(`" + v + "`)'>" + i + "</item>"
            }
        }
        document.getElementsByTagName("menu-c")[2].innerHTML = ''
        document.getElementsByTagName("menu-c")[2].insertAdjacentHTML('beforeend', shtml)

    }

    function filter_fonts(data,cid, vl) {
        id = uniqueId()
        let ophtml = ""
        for (const [i, val] of Object.entries(ffs)) {
            if (i.toLowerCase().includes(vl.toLowerCase())) {
                if (val ==data[0]) {
                    ft = val
                    ophtml += `<item class="active-menu" onclick="set_font('` + data[1] + `','` + data[2] + `','` + i + `','main-drop-` + id + `');toggle_dropdown('drop-` + id + `')" >` + i + `</item>`
                } else {
                    ophtml += `<item onclick="set_font('` + data[1] + `','` + data[2] + `','` + i + `','main-drop-` + id + `');toggle_dropdown('drop-` + id + `')">` + i + `</item>`
                }
            }
        }

        document.getElementById(cid).innerHTML = ophtml


    }


    async function add_celem(tag) {
        currentc = tag
        await lbt.click()
        load_images_tab()
        add_ceclass(createDict(data.customelems[tag].classes.key, data.customelems[tag].classes.value))
        add_ceanim(createDict(data.customelems[tag].animations.key, data.customelems[tag].animations.value))
        var elemdata = createDict(data.customelems[tag].elements.key, data.customelems[tag].elements.value)
        var pod = {
            [current]: current
        }
        for (const [k, v] of Object.entries(elemdata)) {
            if (v.element.id != "live-page") {

                var cid = v.element.id
                if (elements[cid] != null) {
                    cid = v.element.Ename + "-" + uniqueId()
                }
                current = pod[v.element.childof]
                let cd = current
                elements[cid] = eval("new " + v.element.Ename + "(cid)")
                elements[cid].element.id = cid
                elements[cid].element.classes = v.element.classes
                elements[cid].element.childof = cd
                elements[cid].element.Ename = v.element.Ename
                let np = {}
                let dp = v.properties
                let ns = {}
                let ds = v.styles
                for (const [a, b] of Object.entries(dp)) {
                    np[a] = eval("new " + b.property.nclass + "(cid)")
                    np[a].property.value = b.property.value
                }
                for (const [a, b] of Object.entries(ds)) {
                    ns[a] = eval("new " + b.style.nclass + "(cid)")
                    if (ns[a].style.type == "multiple") {
                        for (const [c, d] of Object.entries(ns[a].style.options)) {
                            d.style.value = b.style.options[c].style.value
                        }
                    } else {
                        ns[a].style.value = b.style.value
                    }
                }
                elements[cid].properties = np
                elements[cid].element.properties = np
                elements[cid].styles = ns
                elements[cid].element.styles = ns
                elements[cid].element.reload_element()
                elements[cd].element.childs[Object.keys(elements[cd].element.childs).length + 1] = cid
                pod[v.element.id] = cid
            }
        }
        current = Object.keys(elements)[0]
        if (current != "") {
            elements[current].element.get_class()
        }


    }


    function add_celems() {
        var pname = document.getElementById("en_add_page_input").value
        if (pname != null && pname != "") {
            data.customelems[pname] = { "elements": {} }
            pages.push(pname)
            if (pages.length == 1) {
                currentPage = pages[0]
                pageData = data.customelems[currentPage]
                if (data.customelems[currentPage].elements != null && Object.keys(data.customelems[currentPage].elements).length != 0) {
                    elements = data.customelems[currentPage].elements
                    pageElements = createDict(pageData.elements.key, pageData.elements.value)
                    pageClasses = createDict(pageData.classes.key, pageData.classes.value)
                    pageDefClasses = createDict(pageData.def_classes.key, pageData.def_classes.value)
                    pageAnim = createDict(pageData.animations.key, pageData.animations.value)
                    load_page_data()
                } else {
                    set_up_page()
                }
                hide_tg()
            }
            load_cpages()
            hide_add_page()
        }
    }


    function change_elem(v) {
        var elem_dic = {}
        var elem_key = []
        var elem_value = []
        for (const [k, v] of Object.entries(elements)) {
            elem_value.push(JSON.parse(JSON.stringify(v)))
            elem_key.push(k)
        }
        elem_dic.key = elem_key
        elem_dic.value = elem_value



        var class_dic = {}
        var class_key = []
        var class_value = []
        for (const [k, v] of Object.entries(classes)) {
            class_value.push(JSON.parse(JSON.stringify(v)))
            class_key.push(k)
        }
        class_dic.key = class_key
        class_dic.value = class_value


        var anim_dic = {}
        var anim_key = []
        var anim_value = []
        for (const [k, v] of Object.entries(animations)) {
            anim_value.push(JSON.parse(JSON.stringify(v)))
            anim_key.push(k)
        }
        anim_dic.key = anim_key
        anim_dic.value = anim_value
        data.customelems[currentPage].elements = elem_dic
        data.customelems[currentPage].classes = class_dic
        data.customelems[currentPage].animations = anim_dic
        data.customelems[currentPage].images = Object.keys(images)
        currentPage = v
        images = {}
        lbt.click()
        pageData = data.customelems[currentPage]
        elements = {}
        classes = {}
        animations = {}


        if (data.customelems[currentPage].elements != null && Object.keys(data.customelems[currentPage].elements).length != 0) {
            pageElements = createDict(pageData.elements.key, pageData.elements.value)
            pageClasses = createDict(pageData.classes.key, pageData.classes.value)
            pageDefClasses = createDict(pageData.def_classes.key, pageData.def_classes.value)
            pageAnim = createDict(pageData.animations.key, pageData.animations.value)
            load_page_data()

        } else {
            current = "en-live-page"
            document.getElementById("en-live-page").innerHTML = ""
            set_up_page()

        }
        document.getElementsByTagName("page-name")[0].innerHTML = currentPage
    }

    function aen_add_style(prop) {
        animations[cur_anim].keyframes[cur_key][prop] = eval("new " + prop + "(elemid='" + prop + "-en-anim-" + cur_key + "')")
        load_anim_properties()
        toggle_dropdown('en_anim_property_drop')
    }

    function load_anim_properties() {

        let keys = animations[cur_anim].keyframes, current_k = keys[cur_key], html = ''
        if (keys[cur_key] == null) {
            document.getElementById("en_anim_add_key_bt").style.display = "flex"
        } else {
            for (const [k, v] of Object.entries(current_k)) {
                html += v.style.propertyHTML(null, null, true)


            }
            document.getElementById("en_anim_cont").innerHTML = html
            document.getElementById("en_anim_add_key_bt").style.display = "none"
            document.getElementById("en_anim_drop_bt").style.display = "flex"
            document.getElementById("en_anim_del_key_bt").style.display = "flex"

        }
    }

    function en_allowDrop(ev) {
        ev.preventDefault();
    }


    function en_endDrop(ev) {
        ev.preventDefault();
        document.getElementById(ev.target.id).classList.remove("en_drop")
    }


    function en_drag(ev, tag, cel = "n") {
        ev.target.style.backgroundColor = "rgba(0,0,0,0)"
        ev.target.style.color = "rgba(0,0,0,0)"

        ev.dataTransfer.setData("tag", tag);
        ev.dataTransfer.setData("id", ev.target.id);
        ev.dataTransfer.setData("cel", cel);
    }

    function en_drop(ev) {
        ev.preventDefault();
        var datag = ev.dataTransfer.getData("tag");
        var cel = ev.dataTransfer.getData("cel");
        if (cel != "y") {
            en_set_style(current, ev.target.id)
            current = ev.target.id
            add(event, datag)
        } else {
            current = ev.target.id
            add_celem(datag)
        }
        document.getElementsByTagName("element-name")[0].innerHTML = current.split("-")[0]
        if (current.split[0] + "-" + current.split("-")[1] == "live-page") {

            document.getElementsByTagName("element-action")[0].style.display = "none"
        } else {
            document.getElementsByTagName("element-action")[0].style.display = "block"
        }
    }


    function en_set_style(bid, aid) {
        try {
            let v = document.getElementsByClassName("en-sel")
            for (const [i, d] of Object.entries(v)) {
                document.getElementById(d.id).classList.remove("en-sel")
            }
            document.getElementById(aid).classList.add("en-sel")
        }
        catch (e) {
        }
    }


    function load_property(e, type, id) {
        if (type == "load") {
            let cid = ''
            if (e == null) {
                cid = id
            } else {
                cid = e.target.id
            }
            en_set_style(id, cid)
            current = cid
            elements[cid].element.get_property()
        } else if (type = "delete") {
            current = id
            elements[current].element.get_property()
            document.getElementById(id).classList.add("en-sel")

        }
        document.getElementsByTagName("element-name")[0].innerHTML = current.split("-")[0]
        if (current.split("-")[0] + "-" + current.split("-")[1] == "live-page") {

            document.getElementsByTagName("element-action")[0].style.display = "none"
        } else {
            document.getElementsByTagName("element-action")[0].style.display = "block"
        }
        //switch_ui(1)


    }


    function change_property(id, name, val, type = '') {

        elements[id].element.set_property([name, val])


    }



    function change_sub_style(o, id, name, val, an, hid) {
        if (!an) {
            if (id != 'null') {
                elements[current].element.set_sub_style([o, name, val])
            } else {
                let d = null
                if (defc) {
                    d = def_classes[cclass]
                } else {
                    d = classes[cclass]
                }
                if (hid == '' || hid == 'undefined') {
                    d.styles[o].style.options[name].style.value = val

                    try {
                        classes[cclass].reload_elements()
                    } catch (e) {
                        def_classes[cclass].reload_elements()

                    }

                } else {
                    d.listeners[hid].styles[o].style.options[name].style.value = val
                    d.listeners[hid].set_listen_style()

                }
            }
        } else {
            let sp = o
            let g = animations[cur_anim].keyframes[cur_key]
            let ig = g.indexOf(sp[0])
            if (ig == -1) {
                ig = 0
            }
            animations[cur_anim].keyframes[cur_key][ig].style.options[name].style.value = val
            let d = animations[cur_anim].keyframes[cur_key][ig]
            if (d.style.ismu) {
                let inputs = d.style.options
                for (const [i, v] of Object.entries(inputs)) {
                    document.getElementById(d.style.options[i].style.title).value = val
                    d.style.options[i].style.value = val
                }
            }
            reload_css_anim()
        }
    }

    function convert_m_data(o, id, name, val, an, t, hd) {
        change_sub_style(o, id, name, val, an, hd)
        if (id == 'null') {

            try {
                classes[cclass].reload_elements()
            } catch (e) {
                def_classes[cclass].reload_elements()

            }
        }
        document.getElementById(t).children[0].innerText = val

    }
    function set_font(o, id, name, val, an, t, hid) {
        let url = ffs[val]
        if (!an) {
        if (id != 'null') {
            elements[current].element.set_sub_style([o, name, val])
        } else {
            let d = null
            if (defc) {
                d = def_classes[cclass]
            } else {
                d = classes[cclass]
            }
            if (hid == '' || hid == 'undefined') {
                d.styles[o].style.options[name].style.value = val

                try {
                    classes[cclass].reload_elements()
                } catch (e) {
                    def_classes[cclass].reload_elements()

                }

            } else {
                d.listeners[hid].styles[o].style.options[name].style.value = val
                d.listeners[hid].set_listen_style()

            }
        }
    } else {
        let sp = o
        let g = animations[cur_anim].keyframes[cur_key]
        let ig = g.indexOf(sp[0])
        if (ig == -1) {
            ig = 0
        }
        animations[cur_anim].keyframes[cur_key][ig].style.options[name].style.value = val
        let d = animations[cur_anim].keyframes[cur_key][ig]
        if (d.style.ismu) {
            let inputs = d.style.options
            for (const [i, v] of Object.entries(inputs)) {
                document.getElementById(d.style.options[i].style.title).value = val
                d.style.options[i].style.value = val
            }
        }
        reload_css_anim()
    }
        if (id == 'null') {

            try {
                classes[cclass].reload_elements()
            } catch (e) {
                def_classes[cclass].reload_elements()

            }
        }
        document.getElementById(t).children[0].innerText = val

    }


    function change_style(id, name, val, an, t, hid = '') {
        if (!an) {
            if (id != 'null') {
                elements[id].element.set_style([name, val], hid + t)
            } else {
                let d = classes[cclass]
                if (defc) {
                    d = def_classes[cclass]
                }
                if (hid == '' || hid == "undefined") {
                    let ld = d.styles[name]
                    ld.style.value = val
                    if (ld.style.ismu) {
                        let inputs = ld.style.options
                        for (const [i, v] of Object.entries(inputs)) {
                            document.getElementById(hid + t + ld.style.options[i].style.title).value = val
                            ld.style.options[i].style.value = val

                        }
                    }

                    try {
                        classes[cclass].reload_elements()
                    } catch (e) {
                        def_classes[cclass].reload_elements()

                    }

                } else {
                    let ld = d.listeners[hid].styles[name]
                    ld.style.value = val
                    if (ld.style.ismu) {
                        let inputs = ld.style.options
                        for (const [i, v] of Object.entries(inputs)) {
                            document.getElementById(hid + t + ld.style.options[i].style.title).value = val
                            ld.style.options[i].style.value = val

                        }
                    }
                    d.listeners[hid].set_listen_style()

                }
            }
        } else {
            let sp = id.split('-')
            let k = sp[sp.length - 1]
            animations[cur_anim].keyframes[k][sp[0]].style.value = val
            let d = animations[cur_anim].keyframes[k][sp[0]]
            if (d.style.type == "multiple") {
                let c = d.style
                let inputs = d.style.options
                for (const [i, v] of Object.entries(inputs)) {
                    document.getElementById(t + c.options[i].style.title).value = val
                    c.options[i].style.value = val
                }
            }
            reload_css_anim()
        }

    }

    function set_media(event, m) {
        if (event.target.tagName == "IMAGE-DETAILS") {
            if (media_data[1] == "style") {
                elements[current].element.styles[media_data[0]].style.value = m
            } else {

                elements[current].element.properties[media_data[0]].property.value = m
            }
            elements[current].element.reload_element()
            toggle_en_media()
        }
    }

    function switch_ui(index) {
        c_e_tab_bt.classList.remove("v-tab-active")
        c_e_tab.style.display = "none"
        var v_tabs = document.getElementsByTagName("view-tabs")[0].children
        var v_div = document.getElementsByClassName("edit-tabs")
        v_tabs[index].classList.add("v-tab-active")
        v_div[index].style.display = "flex"
        c_e_tab = v_div[index]
        c_e_tab_bt = v_tabs[index]
    }
    function class_switch_ui(index) {
        c_c_tab_bt.classList.remove("v-tab-active")
        c_c_tab.style.display = "none"
        var v_tabs = document.getElementsByTagName("view-tabs")[1].children
        var v_div = document.getElementsByClassName("class-tabs")
        v_tabs[index].classList.add("v-tab-active")
        v_div[index].style.display = "flex"
        c_c_tab = v_div[index]
        c_c_tab_bt = v_tabs[index]
    }
    function anim_switch_ui(index) {
        c_a_tab_bt.classList.remove("v-tab-active")
        c_a_tab.style.display = "none"
        var v_tabs = document.getElementsByTagName("view-tabs")[2].children
        var v_div = document.getElementsByClassName("anim-tabs")
        v_tabs[index].classList.add("v-tab-active")
        v_div[index].style.display = "flex"
        c_a_tab = v_div[index]
        c_a_tab_bt = v_tabs[index]
    }

    function show_rename() {
        document.getElementsByTagName("element-name")[0].style.backgroundColor = "white"
        document.getElementsByTagName("element-name")[0].style.color = "black"
        document.getElementsByTagName("element-name")[0].contentEditable = "true"
        document.getElementsByTagName("element-action")[0].style.display = "none"
        document.getElementsByTagName("element-action")[1].style.display = "block"
        document.getElementsByTagName("element-action")[2].style.display = "block"
    }

    function hide_rename() {
        document.getElementsByTagName("element-name")[0].innerText = current.split("-")[0]
        document.getElementsByTagName("element-name")[0].style.backgroundColor = ""
        document.getElementsByTagName("element-name")[0].style.color = ""
        document.getElementsByTagName("element-name")[0].contentEditable = "false"
        document.getElementsByTagName("element-action")[0].style.display = "block"
        document.getElementsByTagName("element-action")[1].style.display = "none"
        document.getElementsByTagName("element-action")[2].style.display = "none"
    }
    function delete_page() {
        if (pages.length != 0) {
            let np = []
            for (const [k, v] of Object.entries(pages)) {
                if (currentPage != v) {
                    np.push(v)
                }
            }
            pages = np
            delete data[pids].pages[currentPage]
            if (pages.length == 0) {
                show_tg("Add new Page to start Editing")
                document.getElementById("live-page").innerHTML = ""
                currentPage = ""
                data[pids].home = ""
                if (!location.pathname.includes("custom")) {
                    load_pages()
                } else {
                    load_cpages()
                }


            } else {
                currentPage = pages[0]
                pageData = data[pids].pages[currentPage]
                if (data[pids].pages[currentPage].elements != null && Object.keys(data[pids].pages[currentPage].elements).length != 0) {
                    pageElements = createDict(pageData.elements.key, pageData.elements.value)
                    pageClasses = createDict(pageData.classes.key, pageData.classes.value)
                    pageDefClasses = createDict(pageData.def_classes.key, pageData.def_classes.value)
                    pageAnim = createDict(pageData.animations.key, pageData.animations.value)
                    load_page_data()
                    if (!location.pathname.includes("custom")) {
                        load_pages()
                    } else {
                        load_cpages()
                    }


                } else {
                    let k = Object.keys(elements)[0],
                        v = Object.values(elements)[0]
                    elements = {}
                    elements[k] = v
                    document.getElementById("live-page").innerHTML = ""
                    if (!location.pathname.includes("custom")) {
                        load_pages()
                    } else {
                        load_cpages()
                    }


                }
            }
        }

    }

    function toggle_home() {
        if (isHome) {
            data[pids].home = pages[0]
            if (data[pids].home == currentPage) {
                document.getElementById("setHome").classList.add("home")
                document.getElementById("setHome").classList.remove("nothome")
            } else {
                document.getElementById("setHome").classList.remove("home")
                document.getElementById("setHome").classList.add("nothome")

            }
            isHome = false
        } else {
            data[pids].home = currentPage
            document.getElementById("setHome").classList.add("home")
            document.getElementById("setHome").classList.remove("nothome")
            isHome = true

        }
    }


    function rename_element() {
        var name = document.getElementsByTagName("element-name")[0].innerText
        let repeated = false
        if (name != current.split("-")[0]) {
            let names = Object.keys(elements)
            for (const [k, v] of Object.entries(names)) {
                if (name == v.split("-")[0]) {
                    repeated = true
                }
            }
        }
        if (repeated) {
            document.getElementsByTagName("element-details")[0].style.animationDuration = "0.5s"
            document.getElementsByTagName("element-details")[0].style.animationName = "error_rename"
            setTimeout(() => { document.getElementsByTagName("element-details")[0].style.animationName = "" }, 1000)
        } else {
            var e = elements[current]
            let nid = name + "-" + current.split("-")[1]
            let oid = current
            e.element.html.id = nid
            e.element.ref.id = nid
            e.element.id = nid
            delete elements[current]
            elements[nid] = e
            let nc = {}
            for (const [k, v] of Object.entries(elements[elements[nid].element.childof].element.childs)) {
                if (v != oid) {
                    nc[k] = v
                } else {
                    nc[k] = nid
                }
            }
            elements[elements[nid].element.childof].element.childs = nc
            for (const [k, v] of Object.entries(elements[nid].element.childs)) {
                elements[v].element.childof = nid
            }
            for (const [k, v] of Object.entries(elements[nid].properties)) {
                v.property.elemid = nid
            }
            for (const [k, v] of Object.entries(elements[nid].styles)) {
                v.style.elemid = nid
                if (v.style.type == "multiple") {
                    for (const [a, b] of Object.entries(v.style.options)) {
                        b.style.elemid = nid
                    }

                }
            }
            current = nid

            document.getElementsByTagName("element-details")[0].style.backgroundColor = "#28cf44"
            setTimeout(() => { document.getElementsByTagName("element-details")[0].style.backgroundColor = "#4598cf" }, 500)

            document.getElementsByTagName("element-name")[0].style.backgroundColor = ""
            document.getElementsByTagName("element-name")[0].style.color = ""
            document.getElementsByTagName("element-name")[0].contentEditable = "false"
            document.getElementsByTagName("element-action")[0].style.display = "block"
            document.getElementsByTagName("element-action")[1].style.display = "none"
            document.getElementsByTagName("element-action")[2].style.display = "none"
        }
    }

    function show_add_class(bt) {
        bt.style.display = "none"
        document.getElementsByTagName("add-class")[0].style.display = "flex"
        setTimeout(() => {
            document.getElementsByTagName("add-class")[0].style.opacity = "1"
            document.getElementsByTagName("add-class")[0].style.marginRight = "0px"
        }, 100)
        btn_c = bt
    }
    function hide_add_class() {
        document.getElementsByTagName("add-class")[0].style.display = "none"
        btn_c.style.display = "block"
        setTimeout(() => {
            document.getElementsByTagName("add-class")[0].style.opacity = "0"
            document.getElementsByTagName("add-class")[0].style.marginRight = "100px"
        }, 100)
    }
    function show_add_page(bt) {
        hide_rename_page()
        document.getElementsByTagName("pa-action")[0].style.display = "none"
        document.getElementsByTagName("page-details")[0].style.display = "none"
        document.getElementById('pg-en-drop').classList.add("hidden")
        document.getElementsByTagName("pa-action")[3].style.display = "none"
        bt.style.display = "none"
        document.getElementsByTagName("add-page")[0].style.display = "flex"
        setTimeout(() => {
            document.getElementsByTagName("add-page")[0].style.opacity = "1"
            document.getElementsByTagName("add-page")[0].style.marginRight = "0px"
        }, 100)
        btn_p = bt
    }
    function hide_add_page() {
        document.getElementsByTagName("pa-action")[0].style.display = "flex"
        document.getElementsByTagName("page-details")[0].style.display = "flex"
        document.getElementsByTagName("pa-action")[3].style.display = "flex"
        document.getElementsByTagName("add-page")[0].style.display = "none"
        btn_p.style.display = "block"
        setTimeout(() => {
            document.getElementsByTagName("add-page")[0].style.opacity = "0"
            document.getElementsByTagName("add-page")[0].style.marginRight = "100px"
        }, 100)
    }
    function show_add_anim(bt) {
        bt.style.display = "none"
        document.getElementsByTagName("add-anim")[0].style.display = "flex"
        setTimeout(() => {
            document.getElementsByTagName("add-anim")[0].style.opacity = "1"
            document.getElementsByTagName("add-anim")[0].style.marginRight = "0px"
        }, 100)
        btn_a = bt
    }
    function hide_add_anim() {
        document.getElementsByTagName("add-anim")[0].style.display = "none"
        btn_a.style.display = "block"
        setTimeout(() => {
            document.getElementsByTagName("add-anim")[0].style.opacity = "0"
            document.getElementsByTagName("add-anim")[0].style.marginRight = "100px"
        }, 100)
    }

    function show_tg(msg) {
        document.getElementsByTagName("msg")[0].innerText = msg
        document.getElementsByTagName("tg-msg")[0].classList.remove("hidden")
    }

    function hide_tg() {

        document.getElementsByTagName("tg-msg")[0].classList.add("hidden")
    }


    function add_page() {
        var pname = document.getElementById("en_add_page_input").value
        if (pname != null && pname != "") {
            data[pids].pages[pname] = { "elements": {} }
            pages.push(pname)
            if (pages.length == 1) {
                data[pids].home = pages[0]
                currentPage = pages[0]
                pageData = data[pids].pages[currentPage]
                if (data[pids].pages[currentPage].elements != null && Object.keys(data[pids].pages[currentPage].elements).length != 0) {
                    elements = data[pids].pages[currentPage].elements
                    pageElements = createDict(pageData.elements.key, pageData.elements.value)
                    pageClasses = createDict(pageData.classes.key, pageData.classes.value)
                    pageDefClasses = createDict(pageData.def_classes.key, pageData.def_classes.value)
                    pageAnim = createDict(pageData.animations.key, pageData.animations.value)
                    load_page_data()
                } else {
                    set_up_page()
                }
            }
            load_pages()
            hide_add_page()
            hide_tg()

        }


    }


    function generate_html(currentPage) {
        document.getElementById("preview").innerHTML = ""
        for (const [k, v] of Object.entries(elements)) {
            if (k != "live-page") {
                if (v.element.classes != '') {
                    v.element.html.classList.add(v.element.classes)
                }
                document.getElementById(v.element.childof).appendChild(v.element.html)

            } else {
                if (v.element.classes != '') {
                    v.element.html.classList.add(v.element.classes)
                }
                document.getElementById("preview").appendChild(v.element.html)

            }
        }
        var pageHTML = `<!DOCTYPE html>
  
      <html>
      
      <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>` + pids + ` - ` + currentPage + `</title>
          <meta name="description" content="">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="styles/engine.css">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Sora&display=swap" rel="stylesheet">
          <link href="./Styles/style.css" rel="stylesheet">
      </head>
      <style>
      *{padding:0;margin:0;}
      body,html{width:100%;height:100%;font-family: 'Sora', sans-serif;}
      </style>
      <body>
      ` + document.getElementById("preview").innerHTML + `
      </body>
      </html>
      `
        return pageHTML
    }


    function generate_css(currentPage) {
        var styles = ``
        var lis_css = ''
        for (const [k, v] of Object.entries(classes)) {
            var cl_st = ''
            for (const [a, b] of Object.entries(v.styles)) {
                cl_st += "\n" + b.style.get_css()
            }
            styles += `\n .` + k + `{` + cl_st + `}`

            for (const [a, b] of Object.entries(v.listeners)) {
                lis_css += b.html.innerText
            }

        }
        for (const [k, v] of Object.entries(def_classes)) {
            var cl_st = ''
            for (const [a, b] of Object.entries(v.styles)) {
                cl_st += "\n" + b.style.get_css()
            }
            styles += `\n .` + k + `{` + cl_st + `}`

            for (const [a, b] of Object.entries(v.listeners)) {
                lis_css += b.html.innerText
            }

        }



        var anim = ``
        for (const [k, v] of Object.entries(animations)) {
            var cl_st = load_css_anim_g(v.duration, v.keyframes, v.name)
            anim += `\n` + cl_st
        }

        var pageCSS = styles + lis_css + anim
        return pageCSS
    }

    if (document.addEventListener) {

        document.getElementById("en-live-page").addEventListener('contextmenu', function (e) {
            if (!move_el) {
                document.getElementsByTagName("menu")[0].style.display = "none";
                menuid = e.target.id
                document.getElementsByTagName("menu")[0].style.top = mouseY(event) + 'px';
                document.getElementsByTagName("menu")[0].style.left = mouseX(event) + 'px';
                setTimeout(() => {
                    document.getElementsByTagName("menu")[0].style.display = "flex";
                }, 100)
                e.preventDefault();
            }
        }, false);
    } else {

        document.getElementById("en-live-page").attachEvent('oncontextmenu', function () {
            if (!move_el) {
                document.getElementsByTagName("menu")[0].style.display = "none";
                document.getElementsByTagName("menu")[0].style.top = mouseY(event) + 'px';
                document.getElementsByTagName("menu")[0].style.left = mouseX(event) + 'px';
                document.getElementsByTagName("menu")[0].style.display = "flex";
                window.event.returnValue = false;
            }
        });
    }

    document.addEventListener("click", function (event) {
        document.getElementsByTagName("menu")[0].style.display = "none";
    });

    document.body.addEventListener("drop", function (event) { reset_drag(event) })

    function mouseX(evt) {
        if (evt.pageX) {
            return evt.pageX;
        } else if (evt.clientX) {
            return evt.clientX + (document.documentElement.scrollLeft ?
                document.documentElement.scrollLeft :
                document.body.scrollLeft);
        } else {
            return null;
        }
    }

    function mouseY(evt) {
        if (evt.pageY) {
            return evt.pageY;
        } else if (evt.clientY) {
            return evt.clientY + (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop);
        } else {
            return null;
        }
    }


    var copy_list = []
    var copyid = ""

    function copy_element(event) {
        copyid = menuid
        copy_list = structuredClone(elements[menuid].element.element_get_list())
        document.getElementsByTagName("menu")[0].style.display = "none";
        show_pop_up("Copied")
    }

    var pid = { "en-live-page": "en-live-page" }

    function paste_element(event) {
        current = menuid
        for (const [i, k] of Object.entries(copy_list)) {
            add_new_html(i, k)
        }
        show_pop_up("Pasted")
    }

    function add_new_html(v, p) {
        let id = elements[v].element.id + "-copy" + "-" + uniqueId()
        while (elements[id] != null) {
            id = elements[v].element.id + "-copy" + "-" + uniqueId()

        }
        if (document.getElementById(id) == null) {
            if (pid[p] != "en-live-page" && pid[p] != null) {
                current = pid[p]
            }
            elements[id] = eval("new " + elements[v].constructor.name + "(id)")
            elements[id].element.classes = elements[v].element.classes
            for (const [h, c] of Object.entries(elements[v].properties)) {
                elements[id].properties[h] = eval("new " + h + "(id)")
                var va = c.property.value
                var ti = c.property.title
                elements[id].properties[h].property.value = va
                elements[id].properties[h].property.title = ti
            }
            for (const [h, c] of Object.entries(elements[v].styles)) {
                elements[id].styles[h] = eval("new " + h + "(id)")
                var va = c.style.value
                var ti = c.style.title
                elements[id].styles[h].style.value = va
                elements[id].styles[h].style.title = ti
                if (elements[id].styles[h].style.type == "multiple") {
                    for (const [n, cl] of Object.entries(elements[v].styles[h].style.options)) {
                        var val = cl.style.value
                        var til = cl.style.title
                        elements[id].styles[h].style.options[n].style.value = val
                        elements[id].styles[h].style.options[n].style.title = til

                    }
                }

            }
            elements[id].element.reload_element()

            elements[id].element.childof = current
            elements[id].element.Ename = elements[v].constructor.name

            elements[id].element.properties = elements[id].properties
            elements[id].element.styles = elements[id].styles
            if (current != "en-live-page") {
                elements[current].element.childs.push(id)
            }

            pid[v] = id
            document.getElementsByTagName("menu")[0].style.display = "none";
        }
    }


    function cancel_move(event) {
        document.getElementsByTagName("overlay")[0].style.display = "none"
        move_el = false
    }


    function toggle_listener(i, id) {
        document.getElementById(id).classList.toggle("hidden")
        if (i.classList.contains("fi-sr-caret-down")) {
            i.classList.remove("fi-sr-caret-down")
            i.classList.add("fi-sr-caret-up")
        } else {
            i.classList.add("fi-sr-caret-down")
            i.classList.remove("fi-sr-caret-up")

        }
    }

    function move_up(event) {
        var ch = elements[elements[menuid].element.childof].element.childs
        for (const [i, v] of Object.entries(ch)) {
            if (v == menuid) {
                if (i != 0) {
                    let u = ch[(i - 1)]
                    ch[(i - 1)] = v
                    ch[i] = u
                }
            }
        }
        let pem = document.getElementById(elements[menuid].element.childof)
        pem.innerHTML = ""
        elements[elements[menuid].element.childof].element.childs = ch
        for (const [i, v] of Object.entries(ch)) {
            pem.appendChild(elements[v].element.ref)
        }
        document.getElementsByTagName("menu")[0].style.display = "none";
    }

    function move_down(event) {
        var ch = elements[elements[menuid].element.childof].element.childs
        for (const [i, v] of Object.entries(ch)) {
            if (v == menuid) {
                let ind = parseInt(i)
                if (ind != (ch.length - 1)) {
                    let u = ch[ind + 1]
                    ch[ind + 1] = v
                    ch[ind] = u
                }
            }
        }
        let pem = document.getElementById(elements[menuid].element.childof)
        pem.innerHTML = ""
        elements[elements[menuid].element.childof].element.childs = ch
        for (const [i, v] of Object.entries(ch)) {
            pem.appendChild(elements[v].element.ref)
        }
        document.getElementsByTagName("menu")[0].style.display = "none";
    }

    function move_to(event) {
        document.getElementsByTagName("overlay")[0].style.display = "flex"
        document.getElementById("en-live-page").addEventListener("click", move_e)
        document.getElementsByTagName("menu")[0].style.display = "none";
        move_el = true
    }


    function move_e(event) {
        let mid = event.target.id
        document.getElementById("en-live-page").removeEventListener("click", move_e)
        if (mid != menuid && !document.getElementById(menuid).contains(document.getElementById(mid))) {
            let chm = elements[elements[menuid].element.childof].element.childs

            let nch = []

            for (const [k, v] of Object.entries(chm)) {
                if (v != menuid) {
                    nch.push(v)
                }
            }

            elements[elements[menuid].element.childof].element.childs = nch
            elements[menuid].element.childof = mid
            elements[mid].element.childs.push(menuid)
            document.getElementById(menuid).remove()
            document.getElementById(mid).appendChild(elements[menuid].element.ref)
            document.getElementsByTagName("overlay")[0].style.display = "none"
        }
        move_el = false

    }

    function delete_element(event) {
        if (menuid.split("-")[0] + "-" + menuid.split("-")[1] != "live-page") {
            var currenti = document.getElementById(menuid).parentElement.id
            var oc = elements[currenti].element.childs,
                nc = []
            for (const [k, v] of Object.entries(oc)) {
                if (v != menuid) {
                    nc.push(v)
                }
            }

            elements[currenti].element.childs = nc
            document.getElementById(menuid).remove()
            for (const [k, v] of Object.entries(elements[menuid].element.childs)) {
                elements[v].element.delete_self()

            }
            load_property(event, "delete", currenti)
            delete elements[menuid]
        }
        document.getElementsByTagName("menu")[0].style.display = "none";
        show_pop_up("Deleted!")
    }


    function reset_drag(ev) {
        try {
            if (ev.target.tagName == "BLOCK") {
                ev.target.style.backgroundColor = ""
                ev.target.style.color = ""

            }
        } catch (e) {

        }
    }

    function toggle_dropdown(id) {
        document.getElementById(id).classList.toggle("hidden")
    }


    function en_add_property(prop) {
        elements[current].element.properties[prop] = eval("new " + prop + "(current)")
        toggle_dropdown("en_property_drop")
        elements[current].element.get_property()
    }

    function convert_data(id, name, val, an, t, hd) {
        //display
        change_style(id, name, val, an, t, hd)
        if (id == 'null') {

            try {
                classes[cclass].reload_elements()
            } catch (e) {
                def_classes[cclass].reload_elements()

            }
        }
        document.getElementById(t).children[0].innerText = val

    }
    function convert_p_data(id, name, val, t) {
        //display
        change_property(id, name, val)
        if (id == 'null') {

            try {
                classes[cclass].reload_elements()
            } catch (e) {
                def_classes[cclass].reload_elements()

            }
        }
        document.getElementById(t).children[0].innerText = val

    }


    function en_add_style(prop) {
        elements[current].element.styles[prop] = eval("new " + prop + "(current)")
        toggle_dropdown("en_property_drop")
        elements[current].element.get_property()
    }


    function cen_add_style(prop) {
        let d = classes[cclass]
        if (defc) {
            d = def_classes[cclass]
        }
        d.styles[prop] = eval("new " + prop + "(null)")
        toggle_dropdown('en_class_property_drop')
        d.get_property()
    }
    function cen_add_style_tl(lis, id, prop) {
        let d = classes[cclass]
        if (defc) {
            d = def_classes[cclass]
        }
        d.listeners[lis].styles[prop] = eval("new " + prop + "(null)")
        toggle_dropdown(id)
        d.get_listeners()
    }

    function cen_add_listener(lis) {
        toggle_dropdown('en_class_listen_drop')
        let d = classes[cclass]
        if (defc) {
            d = def_classes[cclass]
        }
        d.listeners[lis] = new Listener(lis, cclass)
        d.get_listeners()

    }

    function expand_prop(event, id) {
        if (document.getElementById(id).style.display == "none" || document.getElementById(id).style.display == "") {
            document.getElementById(id).style.display = "flex"
            document.getElementById(id).style.height = "auto"
            event.target.classList.remove("fi-sr-caret-down")
            event.target.classList.add("fi-sr-caret-up")
        } else {
            document.getElementById(id).style.height = "0%"
            document.getElementById(id).style.display = "none"
            event.target.classList.add("fi-sr-caret-down")
            event.target.classList.remove("fi-sr-caret-up")
        }

    }

    function full_screen() {
        document.getElementsByTagName("menu")[0].style.display = "none"
        document.getElementsByClassName("en-top-bars")[0].style.display = "none"
        document.getElementsByClassName("en-below-bars")[0].style.display = "none"
        document.getElementsByTagName("fullscreen")[0].style.display = "block"
        document.getElementsByTagName("fullscreen")[0].innerHTML = `<exit-f onclick="exit_fullscreen()"><i class="fi fi-sr-arrow-small-left"></i></exit-f><divide style="left:2%;"></divide>    <action style="left:5%;" onclick="change_prespective('fullscreen-div',0,this)" class="action-active" style="font-size: 15px;"><i class="fi fi-sr-computer"></i></action>    <action style="left:8.5%;" onclick="change_prespective('fullscreen-div',1,this)" style="font-size: 15px;"><i class="fi fi-sr-tablet"></i></action><action style="left:12%;" onclick="change_prespective('fullscreen-div',2,this)" style="font-size: 15px;"><i class="fi fi-sr-mobile-notch"></i></action>` + document.getElementsByTagName("live")[0].innerHTML

    }
    function exit_fullscreen() {
        document.getElementsByTagName("menu")[0].style.display = "flex"
        document.getElementsByClassName("en-top-bars")[0].style.display = "flex"
        document.getElementsByTagName("viewport")[0].style.display = "flex"
        document.getElementsByTagName("fullscreen")[0].style.display = "none"
        document.getElementsByTagName("fullscreen")[0].innerHTML = ``
    }

    function zoom_o_live() {
        if (zoom != 50) {
            zoom -= 50
            document.getElementsByTagName("live")[0].style.zoom = (zoom + "%")
            document.getElementsByTagName("action-t")[0].innerText = (zoom + "%")
        }

    }
    function zoom_i_live() {
        if (zoom != 450) {
            zoom += 50
            document.getElementsByTagName("live")[0].style.zoom = (zoom + "%")
            document.getElementsByTagName("action-t")[0].innerText = (zoom + "%")
        }

    }

    function change_prespective(id, p, e) {
        switch (p) {
            case 0:
                document.getElementById(id).style.width = "100%"
                break;
            case 1:
                document.getElementById(id).style.width = "790px"
                break;
            case 2:
                document.getElementById(id).style.width = "390px"
                break;

            default:
                break;
        }
        current_pres.classList.remove("action-active")
        e.classList.add("action-active")
        current_pres = e
    }

    function switch_tab(index) {
        var v_tabs = document.getElementsByTagName("tab")
        var v_div = document.getElementsByTagName("left-tab")
        for (const [k, v] of Object.entries(v_tabs)) {
            v.classList.remove("tab-active")
        }
        v_tabs[index + 1].classList.add("tab-active")
        for (const [k, v] of Object.entries(v_div)) {
            v.style.display = "none"
        }
        v_div[index].style.display = "flex"
    }



    //class tab


    class Class {
        constructor(name) {
            this.name = name
            this.styles = {}
            this.listeners = {}
            this.html = document.createElement("style")
            document.body.appendChild(this.html)
            this.reload_elements()
        }
        get_data() {

            let property_HTML = ``
            for (const [property, obj] of Object.entries(this.styles)) {
                property_HTML += obj.style.propertyHTML()
            }
            document.getElementById("en_class_cont").innerHTML = "<block-h style='margin:5px;'>Class: " + this.name.split("-")[0] + "</block-h>"
            document.getElementById("en_class_cont").insertAdjacentHTML("beforeend", property_HTML)
        }

        get_property() {

            let property_HTML = ``
            for (const [property, obj] of Object.entries(this.styles)) {
                property_HTML += obj.style.propertyHTML()
            }
            document.getElementsByTagName("property-cont")[1].innerHTML = "<block-h style='margin:5px;'>Class: " + this.name.split("-")[0] + "</block-h>"
            document.getElementsByTagName("property-cont")[1].insertAdjacentHTML("beforeend", property_HTML)
        }

        get_listeners() {
            let lisent_html = ''
            for (const [k, v] of Object.entries(this.listeners)) {
                lisent_html += v.getProperty()
            }
            document.getElementById("en_listen_cont").innerHTML = ""
            document.getElementById("en_listen_cont").insertAdjacentHTML("beforeend", lisent_html)

        }

        reload_elements() {
            let css = ''
            for (const [k, v] of Object.entries(this.styles)) {
                css += v.style.get_css()
            }
            let t = this.name
            if (def_classes[this.name] == null) {

                this.html.innerText = `.` + t + `{` + css + `}`
            } else {
                t = tags[t.split('-')[0]]

                this.html.innerText = t + `{` + css + `}`
            }
        }

    }

    function add_ceclass(data) {
        for (const [k, v] of Object.entries(data)) {

            classes[k] = new Class(v.name)
            let ns = {}
            let ds = v.styles
            for (const [a, b] of Object.entries(ds)) {
                ns[a] = eval("new " + b.style.nclass + "(null)")
                if (ns[a].style.options != null && ns[a].style.options["c1"] == null) {
                    for (const [c, d] of Object.entries(ns[a].style.options)) {
                        d.style.value = b.style.options[c].style.value
                    }
                } else {
                    ns[a].style.value = b.style.value
                }
            }
            classes[k].styles = ns
            classes[k].styles = ns
        }
        if (Object.keys(classes)[0] != null) {
            cclass = Object.keys(classes)[0]
            load_classes()
            load_class()
        }

    }

    function load_page_classes() {
        cclass = ""
        def_classes = {}
        for (const [k, v] of Object.entries(pageDefClasses)) {

            def_classes[k] = new Class(v.name)
            let ns = {}
            let ds = v.styles
            for (const [a, b] of Object.entries(ds)) {
                ns[a] = eval("new " + b.style.nclass + "(null)")
                ns[a].style.value = b.style.value
                if (ns[a].style.type == "multiple") {
                    for (const [c, d] of Object.entries(ns[a].style.options)) {
                        d.style.value = b.style.options[c].style.value
                    }
                }
            }
            def_classes[k].styles = ns
            let ld = {}
            let dl = v.listeners
            for (const [a, b] of Object.entries(dl)) {
                ld[a] = new Listener(b.title, b.clas)
                let ns = {}
                let ds = b.styles
                for (const [a, b] of Object.entries(ds)) {
                    ns[a] = eval("new " + b.style.nclass + "(null)")
                    ns[a].style.value = b.style.value
                    if (ns[a].style.type == "multiple") {
                        for (const [c, d] of Object.entries(ns[a].style.options)) {
                            d.style.value = b.style.options[c].style.value
                        }
                    }
                }
                ld[a].styles = ns
            }
            def_classes[k].listeners = ld
        }
        cclass = ""
        classes = {}
        for (const [k, v] of Object.entries(pageClasses)) {

            classes[k] = new Class(v.name)
            let ns = {}
            let ds = v.styles
            for (const [a, b] of Object.entries(ds)) {
                ns[a] = eval("new " + b.style.nclass + "(null)")
                ns[a].style.value = b.style.value
                if (ns[a].style.type == "multiple") {
                    for (const [c, d] of Object.entries(ns[a].style.options)) {
                        d.style.value = b.style.options[c].style.value
                    }
                }
            }
            classes[k].styles = ns
            let ld = {}
            let dl = v.listeners
            for (const [a, b] of Object.entries(dl)) {
                ld[a] = new Listener(b.title, b.clas)
                let ns = {}
                let ds = b.styles
                for (const [a, b] of Object.entries(ds)) {
                    ns[a] = eval("new " + b.style.nclass + "(null)")
                    ns[a].style.value = b.style.value
                    if (ns[a].style.type == "multiple") {
                        for (const [c, d] of Object.entries(ns[a].style.options)) {
                            d.style.value = b.style.options[c].style.value
                        }
                    }
                }
                ld[a].styles = ns
            }
            classes[k].listeners = ld
            classes[k].reload_elements()
        }
        if (Object.keys(classes)[0] != null) {
            cclass = Object.keys(classes)[0]
            load_classes()
            load_class()
        }
        load_page_anim()
    }




    function add_class(v = null) {
        if (v == null) {
            v = document.getElementById("en_add_class_input").value
        }
        let success = false
        if (v != '' && !Object.keys(classes).includes(v)) {
            success = true
        }
        if (success) {

            classes[v] = new Class(v)
            load_classes()
            elements[current].element.get_class()
            hide_add_class()
        }
    }


    function es_class(v) {
        if (elements[current].element.classes != '') {
            elements[current].element.ref.classList.remove(elements[current].element.classes)
        }
        elements[current].element.classes = v
        if (v != '') {
            elements[current].element.ref.classList.add(v)
        }
        if (v == "") {
            v = "Default"
        }
        document.getElementById('main-drop-class').children[0].innerText = v
        toggle_dropdown('drop-class')
    }

    function load_class(v = null) {
        if (v != null) {
            cclass = v
        }
        defc = false
        let d = classes[cclass]
        if (defc) {
            d = def_classes[cclass]
        }
        d.get_data()
        d.get_listeners()
        document.getElementById("en_class_drop_bt").style.display = "flex"
    }
    function load_def_class(v = null) {
        if (v != null) {
            cclass = v
        }
        defc = true
        document.getElementById("en_class_drop_bt").style.display = "flex"
        def_classes[cclass].get_data()
        def_classes[cclass].get_listeners()
        document.getElementById("en_class_drop_bt").style.display = "flex"
    }


    class animation {
        constructor(name) {
            this.name = name
            this.keyframes = {}
            this.duration = 1.0
        }
    }

    function add_ceanim(data) {
        for (const [i, j] of Object.entries(data)) {

            animations[i] = new animation(j.name)
            for (const [k, v] of Object.entries(j.keyframes)) {
                let ns = null
                if (v != null) {
                    for (const [a, b] of Object.entries(v)) {
                        ns = eval("new " + b.style.nclass + "(null)")
                        if (ns.style.type == "multiple") {
                            for (const [c, d] of Object.entries(ns.style.options)) {
                                d.style.value = b.style.options[c].style.value
                            }
                        } else {
                            ns.style.value = b.style.value
                        }
                    }
                    if (animations[i].keyframes[k] != null) {
                        animations[i].keyframes[k].push(ns)
                    } else {
                        animations[i].keyframes[k] = [ns,]

                    }
                } else {
                    animations[i].keyframes[k] = []

                }
            }
        }
        list_anims()
    }

    function load_page_anim() {
        cur_anim = ""
        animations = {}
        for (const [i, j] of Object.entries(pageAnim)) {

            animations[i] = new animation(j.name)
            for (const [k, v] of Object.entries(j.keyframes)) {
                let ns = null
                if (v != null) {
                    for (const [a, b] of Object.entries(v)) {
                        ns = eval("new " + b.style.nclass + "(null)")
                        if (ns.style.type == "multiple") {
                            for (const [c, d] of Object.entries(ns.style.options)) {
                                d.style.value = b.style.options[c].style.value
                            }
                        } else {
                            ns.style.value = b.style.value
                        }
                    }
                    if (animations[i].keyframes[k] != null) {
                        animations[i].keyframes[k].push(ns)
                    } else {
                        animations[i].keyframes[k] = [ns,]

                    }
                } else {
                    animations[i].keyframes[k] = []

                }
            }
        }
        list_anims()

    }


    function add_anim() {
        let a_name = document.getElementById("en_add_anim_input").value
        if (a_name != '' && animations[a_name] == null) {
            animations[a_name] = new animation(a_name)
            cur_anim = a_name
            list_anims()
            load_anim()
            hide_add_anim()
        }
    }

    function load_anim(v = null) {
        if (Object.keys(animations).length != 0) {
            if (cur_anim == "") {
                cur_anim = Object.keys(animations)[0]
            }
            if (v != null) {
                cur_anim = v
            }
            let html = '',
                keys = animations[cur_anim].keyframes,
                current_k = keys[cur_key]
            document.getElementById("en_anim_currrent_t").innerText = "Animation: " + cur_anim
            if (keys[cur_key] == null) {
                document.getElementById("en_anim_add_key_bt").style.display = "flex"
                document.getElementsByTagName("time-control")[0].style.display = "flex"
                document.getElementById("en_anim_cont").innerHTML = html
                document.getElementById("en_anim_drop_bt").style.display = "none"
                document.getElementById("en_anim_del_key_bt").style.display = "none"
            } else {
                for (const [k, v] of Object.entries(current_k)) {
                    html += v.style.propertyHTML(null, null, true)
                }
                document.getElementById("en_anim_cont").innerHTML = html

                document.getElementById("en_anim_add_key_bt").style.display = "none"
                document.getElementById("en_anim_del_key_bt").style.display = "flex"
                document.getElementById("en_anim_drop_bt").style.display = "flex"

            }
        } else {
            document.getElementById("en_anim_currrent_t").innerText = ''
            document.getElementById('en_anim_cont').innerHTML = "<error-msg>Select a Animation to edit</error-msg>"
            document.getElementById("en_anim_add_key_bt").style.display = "none"
            document.getElementById("en_anim_del_key_bt").style.display = "none"
            document.getElementsByTagName("time-control")[0].style.display = "none"
            document.getElementById("en_anim_drop_bt").style.display = "none"

        }

    }

    function add_key() {
        animations[cur_anim].keyframes[cur_key] = {}
        let html = `<key id="key-en-` + cur_key + `"><k-ui></k-ui></key>`
        document.getElementsByTagName("keys")[0].insertAdjacentHTML("beforeend", html)
        document.getElementById("key-en-" + cur_key).style.width = (cur_key) + "%"
        load_anim()

    }
    function del_key() {
        delete animations[cur_anim].keyframes[cur_key]
        document.getElementById("key-en-" + cur_key).remove()
        load_anim()

    }

    function change_key(v) {
        cur_key = parseFloat(v)
        document.getElementsByTagName("c-at")[0].innerText = cur_key + "%"
        load_anim()
    }

    function prev_key() {
        if (animations[cur_anim].keyframes[cur_key] != null) {
            let kvs = Object.keys(animations[cur_anim].keyframes).sort()
            let pi = 0
            pi = kvs.indexOf(cur_key) - 1
            if (pi < 0) {
                cur_key = kvs[kvs.length + pi]
            } else {
                cur_key = kvs[pi]

            }
            document.getElementsByTagName("c-at")[0].innerText = cur_key + "%"
            document.getElementById("en_anim_slider").value = cur_key
            load_anim()

        } else {
            if (Object.keys(animations[cur_anim].keyframes).length != 0) {
                cur_key = Object.keys(animations[cur_anim].keyframes)[0]
                load_anim()
            }

        }
    }
    function next_key() {
        if (animations[cur_anim].keyframes[cur_key] != null) {
            let kvs = Object.keys(animations[cur_anim].keyframes).sort()
            let pi = 0
            pi = kvs.indexOf(cur_key) + 1
            if (pi < 0) {
                cur_key = kvs[kvs.length + pi]
            } else {
                cur_key = kvs[pi]

            }
            document.getElementsByTagName("c-at")[0].innerText = cur_key + "%"
            document.getElementById("en_anim_slider").value = cur_key
            load_anim()

        } else {
            if (Object.keys(animations[cur_anim].keyframes).length != 0) {
                cur_key = Object.keys(animations[cur_anim].keyframes)[0]
                load_anim()
            }

        }
    }

    function set_dur(v) {
        animations[cur_anim].duration = parseFloat(v)
        document.getElementById("at-key").max = v.toString() + ".0";
    }

    function load_key() {
        let html = '',
            keys = animations[cur_anim].keyframes
        for (const [k, v] of Object.entries(keys)) {
            html = ''
            for (const [s, c] of Object.entries(v)) {
                html += c.style.propertyHTML(null, null, true)
            }
            document.getElementById("en-l-tab-anim-p-" + k).innerHTML = html
        }
    }

    function reload_css_anim() {
        let dur = animations[cur_anim].duration,
            keys = animations[cur_anim].keyframes,
            css = ""
        let css_main = '',
            css_sub = '',
            p = ''
        for (const [k, v] of Object.entries(keys)) {
            p = k
            css_sub = ''
            for (const [i, c] of Object.entries(v)) {
                css_sub += c.style.get_css()
            }
            css_main += `
                  ` + p + `%{
                  ` + css_sub + `
                  }
          `
        }
        css = `
      @keyframes ` + cur_anim + `{
          ` + css_main + `
      }`
        let st = document.getElementById(cur_anim)
        if (st != null) {
            st.innerHTML = css
        } else {
            document.body.insertAdjacentHTML("beforeend", "<style id='" + cur_anim + "'></style>")
            st = document.getElementById(cur_anim)
            st.innerHTML = css
        }
    }

    function load_css_anim_g(dur, keys, name) {
        let cur_anim = name
        let css = ""
        let css_main = '',
            css_sub = '',
            p = ''
        for (const [k, v] of Object.entries(keys)) {
            p = ((parseInt(k) / dur) * 100).toString()
            css_sub = ''
            for (const [i, c] of Object.entries(v)) {
                css_sub += c.style.get_css()
            }
            css_main += `
                  ` + p + `%{
                  ` + css_sub + `
                  }
          `
        }
        css = `
      @keyframes ` + cur_anim + `{
          ` + css_main + `
      }`
        return css
    }


    //Main Element class
    class Element {
        constructor(tag, id, Ename = "", classes, properties, styles, listeners = {}, childof = "", childs = [], setup = true) {
            this.tag = tag
            this.id = id
            this.classes = classes
            this.styles = styles
            this.properties = properties
            this.listeners = listeners
            this.html = document.createElement(tag)
            this.html.id = id
            this.childof = childof
            this.ref = document.createElement(tag)
            this.ref.id = id
            if (classes != '') {
                this.ref.classList.add(classes)
            }
            this.childs = childs
            this.Ename = Ename
            this.ref.onclick = () => {
                load_property(event, "load", this.id)
                //switch_ui(1)
            }
            if (setup) {
                this.set_up_element()
                this.get_class()
            }
        }

        delete_self() {
            this.ref.remove()
            for (const [k, v] of Object.entries(this.childs)) {
                elements[v].delete_self()
            }
        }


        get_class() {
            let p_html = ``
            if (classes[cclass] != null) {
                p_html = `<item  onclick="es_class('` + this.classes + `')">` + this.classes + `</item>`
            }
            if (this.classes == "" || this.classes == null) {
                p_html = `<item  onclick="es_class('')">Default</item>`
            }
            let html = ''
            if (p_html != "" && p_html != `<item  onclick="es_class('')">Default</item>`) {
                html += `<item  onclick="es_class('')">Default</item>`
            }
            for (const [a, b] of Object.entries(classes)) {
                if (a != this.classes) {
                    html += `<item  onclick="es_class('` + a + `')">` + a + `</item>`
                }
            }
            let fhtml = ''
            if (p_html == "") {
                fhtml = html
            } else {
                fhtml = p_html + html
            }
            document.getElementById("drop-class").innerHTML = fhtml
            if (this.classes != "") {
                document.getElementById("main-drop-class").children[0].innerText = this.classes
            } else {

                document.getElementById('main-drop-class').children[0].innerText = "Default"
            }

        }

        set_up_element() {
            let property_HTML = ``
            let dt = null


            for (const [property, obj] of Object.entries(this.properties)) {
                if (obj.constructor.name != "URL") {
                    if (obj.property.type == 'switch') {
                        eval("this.html." + obj.property.js + "='" + obj.property.options[obj.property.sc].value + "'")

                        eval("this.ref." + obj.property.js + "='" + obj.property.options[obj.property.sc].value + "'")
                    }
                    else {
                        eval("this.html." + obj.property.js + "='" + obj.property.value + "'")

                        eval("this.ref." + obj.property.js + "='" + obj.property.value + "'")

                    }
                    if (obj.property.type == "media") {

                        eval("this.ref." + obj.property.js + "='" + images[obj.property.value] + "'")
                    }
                    property_HTML += obj.property.propertyHTML()
                } else {

                    eval("this.html." + obj.property.js + "='" + obj.property.value + "'")
                }
            }
            for (const [property, obj] of Object.entries(this.styles)) {
                if (obj.style.type == "multiple") {

                    eval("this.ref.style." + obj.style.js + "='" + obj.style.value + "'")
                    for (const [property, obj1] of Object.entries(obj.style.options)) {

                        eval("this.html.style." + obj1.style.js + "='" + obj1.style.value + "'")
                        eval("this.ref.style." + obj1.style.js + "='" + obj1.style.value + "'")

                    }
                } else {


                    if (obj.style.options != null && obj.style.options.c1 == "custom") {
                        eval("this.ref.style." + obj.style.js + "='" + obj.style.options.c2 + "(" + obj.style.value + ")'")

                    } else {

                        eval("this.html.style." + obj.style.js + "='" + obj.style.value + "'")
                        eval("this.ref.style." + obj.style.js + "='" + obj.style.value + "'")
                    }
                    if (obj.style.type == 'media') {
                        let imgs = Object.keys(images)
                        let us = Object.values(images)
                        eval("this.html.style." + obj.style.js + "='" + obj.style.options.c2 + "(../images/" + imgs[us.indexOf(obj.style.value)] + ")'")
                        eval("this.ref.style." + obj.style.js + "='" + obj.style.options.c2 + "(" + images[obj.style.value] + ")'")

                    }
                }
                property_HTML += obj.style.propertyHTML()
            }
            document.getElementById(current).appendChild(this.ref)
            document.getElementsByTagName("property-cont")[0].innerHTML = ""
            document.getElementsByTagName("property-cont")[0].insertAdjacentHTML("beforeend", property_HTML)

            if (!location.pathname.includes("/download")) {
                //change(3)
            }
        }

        get_property() {

            let property_HTML = ``
            for (const [property, obj] of Object.entries(this.properties)) {
                property_HTML += obj.property.propertyHTML()
            }
            for (const [property, obj] of Object.entries(this.styles)) {
                property_HTML += obj.style.propertyHTML()
            }
            for (const eclass of Object.entries(this.classes)) {
                //TODO
            }
            document.getElementsByTagName("property-cont")[0].innerHTML = ""
            document.getElementsByTagName("property-cont")[0].insertAdjacentHTML("beforeend", property_HTML)
        }

        reload_element() {


            for (const [property, obj] of Object.entries(this.properties)) {
                if (obj.constructor.name != "URL") {

                    eval("this.html." + obj.property.js + "='" + obj.property.value + "'")

                    eval("this.ref." + obj.property.js + "='" + obj.property.value + "'")


                } else {

                    eval("this.html." + obj.property.js + "='" + obj.property.value + "'")
                }

                if (obj.property.type == "media") {
                    let pt = "'../images/" + obj.property.value + "'"
                    if (!location.pathname.includes("customElements")) {
                        if (data[pids].home == currentPage) {
                            pt = "'./images/" + obj.property.value + "'"
                        }
                    }
                    eval("this.html." + obj.property.js + "=" + pt)
                }
                if (obj.property.type == "media") {

                    eval("this.ref." + obj.property.js + "='" + images[obj.property.value] + "'")
                }
            }
            for (const [property, obj] of Object.entries(this.styles)) {
                if (obj.style.type == "multiple") {

                    eval("this.ref.style." + obj.style.js + "='" + obj.style.value + "'")
                    for (const [property, obj1] of Object.entries(obj.style.options)) {

                        eval("this.html.style." + obj1.style.js + "='" + obj1.style.value + "'")
                        eval("this.ref.style." + obj1.style.js + "='" + obj1.style.value + "'")

                    }
                } else {


                    if (obj.style.options != null && obj.style.options.c1 == "custom") {
                        eval("this.ref.style." + obj.style.js + "='" + obj.style.options.c2 + "(" + obj.style.value + ")'")

                    } else {

                        eval("this.html.style." + obj.style.js + "='" + obj.style.value + "'")
                        eval("this.ref.style." + obj.style.js + "='" + obj.style.value + "'")
                    }
                    if (obj.style.type == 'media') {
                        let pt = `("../images/` + obj.style.value + `")'`
                        if (!location.pathname.includes("customElements")) {
                            if (data[pids].home == currentPage) {
                                pt = `("./images/` + obj.style.value + `")'`
                            }
                        }
                        eval("this.html.style." + obj.style.js + `='` + obj.style.options.c2 + pt)
                        eval("this.ref.style." + obj.style.js + `='url("` + images[obj.style.value] + `")'`)

                    }
                }
            }
            for (const eclass of Object.entries(this.classes)) {
                //TODO
            }
        }

        element_live_HTML() {
            html = ""
            for (cont[i, val] of Object.entries(childs)) {
                html += document.getElementById(elements[val].element.id).outerHTML;
            }
        }

        element_get_list(l = []) {
            let id = this.id
            var list = {}
            list[id] = this.childof
            for (const [i, val] of Object.entries(this.childs)) {
                if (val in l != true) {
                    list = Object.assign({}, list, elements[val].element.element_get_list(list))
                }

            }
            return list

        }

        set_property(data) {
            this.properties[data[0]].property.value = data[1]

            this.reload_element()
        }

        set_style(data, t) {
            this.styles[data[0]].style.value = data[1]
            if (this.styles[data[0]].style.type == "multiple") {
                let d = this.styles[data[0]]
                let inputs = d.style.options
                for (const [i, v] of Object.entries(inputs)) {
                    document.getElementById(t + d.style.options[i].style.title).value = data[1]
                    d.style.options[i].style.value = data[1]
                }
            }
            this.reload_element()
        }
        set_sub_style(data) {
            console.log(data)
            let d = this.styles[data[0]]
            d.style.options[data[1]].style.value = data[2]
            this.reload_element()
        }

    }

    //Element classes
    class heading {
        constructor(id) {
            this.properties = { "innerText": new innerText(id, "Heading", "Heading") }
            this.styles = {}
            this.element = new Element("h1", id, this.constructor.name, "", this.properties, this.styles)
        }


    }

    class paragraph {
        constructor(id) {
            this.properties = { "innerText": new innerText(id, "Paragraph", "Text") }
            this.styles = {}
            this.element = new Element("p", id, this.constructor.name, "", this.properties, this.styles)
        }


    }
    class Link {
        constructor(id) {
            this.properties = { "innerText": new innerText(id, "Link", "Text") }
            this.styles = {}
            this.element = new Element("a", id, this.constructor.name, "", this.properties, this.styles)
        }


    }
    class button {
        constructor(id) {
            this.properties = { "innerText": new innerText(id, "Button", "Text") }
            this.styles = {}
            this.element = new Element("button", id, this.constructor.name, "", this.properties, this.styles)
        }


    }

    class input {
        constructor(id) {
            this.properties = {}
            this.styles = {}
            this.element = new Element("input", id, this.constructor.name, "", this.properties, this.styles)
        }


    }
    class section {
        constructor(id) {
            this.properties = {}
            this.styles = { "Padding": new Padding(id, "5px", "Padding") }
            this.element = new Element("div", id, this.constructor.name, "", this.properties, this.styles)
        }


    }

    class img {

        constructor(id) {

            this.properties = { "srcMEDIA": new srcMEDIA(id, Object.keys(images)[0]) }
            this.styles = { "Width": new Width(id, "50px"), "Height": new Height(id, "50px") }
            this.element = new Element("img", id, this.constructor.name, "", this.properties, this.styles)
        }


    }



    //Main Property Class
    class Property {
        constructor(nclass, elemid, title, type, value, js, options = {}, sc = null) {
            this.elemid = elemid
            this.title = title
            this.type = type
            this.value = value
            this.js = js
            this.nclass = nclass
            this.options = options
            this.sc = sc
        }
        propertyHTML(o = null) {

            if (this.type == 'media') {
                var html = `
          <button style = 'margin:5px;padding:5px;'
        onclick = 'load_images();toggle_en_media(true,"`+ this.nclass + `","property")' >
          import from media </button>
        `

            }
            else if (this.type == "dropdown") {
                let id = uniqueId(), ft = ''
                let ophtml = ""
                let fhtml = ''
                for (const [i, val] of Object.entries(this.options)) {
                    if (val == this.value) {
                        ft = val
                        fhtml = `<item onclick="convert_p_data('` + this.elemid + `','` + this.nclass + `','` + val + `','main-drop-` + id + `');toggle_dropdown('drop-` + id + `')" >` + val + `</item>`
                    } else {
                        ophtml += `<item onclick="convert_p_data('` + this.elemid + `','` + this.nclass + `','` + val + `','main-drop-` + id + `');toggle_dropdown('drop-` + id + `')" value="` + val + `">` + val + `</item>`
                    }
                }
                html = `
            
            <dropdown id="main-drop-`+ id + `" onclick="toggle_dropdown('drop-` + id + `')">
            <p>`+ ft + `</p>
            <i class="fi fi-sr-caret-down"></i>
        </dropdown>
            <dropdown-menu  class="property-dropdown hidden" id='drop-` + id + `' value="` + this.value + `" >
          ` + fhtml + ophtml + `
          </dropdown-menu>
          
          `
                return `<property-div class="property-container">
      <property-h>` + this.title + `</property-h>
      ` + html + `
      </property-div>

      <property-action>
      <p-action  onclick="remove_prop('` + this.elemid + `','` + this.nclass + `')">
          remove Property
      </p-action>
  </property-action>
      `

            }
            else {
                var html = ` <input placeholder = "` + this.title + `"
        type = "` + this.type + `"
        oninput="change_property('` + this.elemid + `','` + this.nclass + `',this.value,'` + this.type + `')" value="` + this.value + `">
              `


            }
            return `<property-div>
          <property-h>` + this.title + `</property-h>
          ` + html + `
          </property-div>
          <property-action>
          <p-action  onclick="remove_prop('` + this.elemid + `','` + this.nclass + `')">
              remove Property
          </p-action>
      </property-action>
          `

        }

    }

    function remove_prop(id, c) {
        eval("elements[id].element.ref." + elements[id].element.properties[c].property.js + "= null")
        eval("elements[id].element.html." + elements[id].element.properties[c].property.js + "= null")
        delete elements[id].element.properties[c]
        elements[id].element.reload_element()
        elements[id].element.get_property()

    }

    function remove_style(id, c, hid = '') {
        if (id != "null") {
            delete elements[id].element.styles[c]
            elements[id].element.ref.removeAttribute("style")
            elements[id].element.html.removeAttribute("style")
            elements[id].element.reload_element()
            elements[id].element.get_property()
        } else {
            let d = classes[cclass]
            if (defc) {
                d = def_classes[cclass]
            }
            if (hid == '' || hid == 'undefined') {
                delete d.styles[c]
                d.get_property()
            } else {
                delete d.listeners[hid].styles[c]
                d.listeners[hid].set_listen_style()
                d.reload_elements()
                d.get_listeners()

            }

            try {
                classes[cclass].reload_elements()

            } catch (e) {
                def_classes[cclass].reload_elements()

            }
        }


    }


    class Style {
        constructor(nclass, elemid, title, type, value, js, options = null, link = true, link_type = false, hover = false, ismu = false) {
            this.elemid = elemid
            this.title = title
            this.type = type
            this.value = value
            this.js = js
            this.options = options
            this.nclass = nclass
            this.link = link
            this.link_type = link_type
            this.hover = hover
            this.ismu = ismu
        }
        propertyHTML(t = null, o = null, animat = false, hd) {
            var html = '',
                linkbt = '',
                ft = '',
                id = uniqueId()
            if (t == null) {
                if (this.type == "dropdown") {
                    let ophtml = ""
                    let fhtml = ''
                    for (const [i, val] of Object.entries(this.options)) {
                        if (val == this.value) {
                            ft = val
                            fhtml = `<item onclick="convert_data('` + this.elemid + `','` + this.nclass + `','` + val + `',` + animat + `,'main-drop-` + id + `','` + hd + `');toggle_dropdown('drop-` + id + `')" >` + val + `</item>`
                        } else {
                            ophtml += `<item onclick="convert_data('` + this.elemid + `','` + this.nclass + `','` + val + `',` + animat + `,'main-drop-` + id + `','` + hd + `');toggle_dropdown('drop-` + id + `')" value="` + val + `">` + val + `</item>`
                        }
                    }
                    html = `
                
                <dropdown id="main-drop-`+ id + `" onclick="toggle_dropdown('drop-` + id + `')">
                <p>`+ ft + `</p>
                <i class="fi fi-sr-caret-down"></i>
            </dropdown>
                <dropdown-menu  class="property-dropdown hidden" id='drop-` + id + `' value="` + this.value + `" >
              ` + fhtml + ophtml + `
              </dropdown-menu>
              
              `
                    return `<property-div class="property-container">
          <property-h>` + this.title + `</property-h>
          ` + html + `
          </property-div>
  
          <property-action>
          <p-action  onclick="remove_style('` + this.elemid + `','` + this.nclass + `','` + hd + `')">
              remove Property
          </p-action>
      </property-action>
          `

                }
                else if (this.type == "fontfamily") {
                    let ophtml = ""
                    let fhtml = ''

                    for (const [i, val] of Object.entries(ffs.items[0])) {
                        if (val.family == this.value) {
                            ft = val
                            fhtml = `<item onclick="set_font('` + this.elemid + `','` + this.nclass + `','` + val + `','main-drop-` + id + `');toggle_dropdown('drop-` + id + `')" >` + val + `</item>`
                        } else {
                            ophtml += `<item onclick="set_font('` + this.elemid + `','` + this.nclass + `','` + val + `','main-drop-` + id + `');toggle_dropdown('drop-` + id + `')">` + val + `</item>`
                        }
                    }
                    html = `
                
                <dropdown id="main-drop-`+ id + `" onclick="toggle_dropdown('drop-` + id + `')">
                <p>`+ ft + `</p>
                <i class="fi fi-sr-caret-down"></i>
            </dropdown>
                <dropdown-menu  class="property-dropdown hidden" id='drop-` + id + `' value="` + this.value + `" >
              ` + fhtml + ophtml + `
              </dropdown-menu>
              
              `
                    return `<property-div class="property-container">
          <property-h>` + this.title + `</property-h>
          ` + html + `
          </property-div>
  
          <property-action>
          <p-action  onclick="remove_style('` + this.elemid + `','` + this.nclass + `','` + hd + `')">
              remove Property
          </p-action>
      </property-action>
          `

                }
                else if (this.type == 'media') {
                    var html = `
          <button style = 'margin:5px;padding:5px;'
        onclick = 'load_images();toggle_en_media(true,"`+ this.nclass + `","style")' >
          import from media </button>
        `
                    return `<property-div>
        <property-h>` + this.title + `</property-h>
        ` + html + `
        </property-div>
  
        <property-action>
        <p-action  onclick="remove_style('` + this.elemid + `','` + this.nclass + `','` + hd + `')">
            remove Property
        </p-action>
    </property-action>
        `

                }

                else if (this.type == "multiple") {

                    for (const [i, c] of Object.entries(this.options)) {
                        html += c.style.propertyHTML(id, this.nclass, animat, hd)
                    }
                    let isi = ``
                    if (this.ismu) {
                        isi = `
                    <input  placeholder="` + this.title + `" type="` + this.type + `" oninput="change_style('` + this.elemid + `','` + this.nclass + `',this.value,` + animat + `,'` + id + `','` + hd + `')" value="` + this.value + `">`
                    }
                    return `
                <property-m-cont>
                <main-prop>
              <property-h-m>` + this.title + `</property-h-m>
              `+ isi + `
              <i onclick="expand_prop(event,'main-` + id + `')" class="fi fi-sr-caret-down"></i>
              </main-prop>
              <property-m  id='main-` + id + `'>
              ` + html + `
              </property-m>
                </property-m-cont>
              <property-action>
              <p-action  onclick="remove_style('` + this.elemid + `','` + this.nclass + `','` + hd + `')">
              remove Property
          </p-action>
      </property-action>
              `

                }

                else {
                    html = `
              <input id="`+ id + this.title + `"  placeholder="` + this.title + `" type="` + this.type + `" oninput="change_style('` + this.elemid + `','` + this.nclass + `',this.value,` + animat + `,'','` + hd + `')" value="` + this.value + `">
              `
                    return `<property-div>
          <property-h>` + this.title + `</property-h>
          ` + html + `
          </property-div>
          <property-action>
          <p-action  onclick="remove_style('` + this.elemid + `','` + this.nclass + `','` + hd + `')">
              remove Property
          </p-action>
      </property-action>
          `

                }
            }
            else {
                if (this.type == "dropdown") {
                    let ophtml = ""
                    let fhtml = ''
                    for (const [i, val] of Object.entries(this.options)) {
                        if (val == this.value) {
                            ft = val
                            fhtml = `<item onclick="convert_m_data('` + o + `','` + this.elemid + `','` + this.nclass + `','` + val + `',` + animat + `,'main-drop-` + id + `','` + hd + `');toggle_dropdown('drop-` + id + `')" >` + val + `</item>`
                        } else {
                            ophtml += `<item onclick="convert_m_data('` + o + `','` + this.elemid + `','` + this.nclass + `','` + val + `',` + animat + `,'main-drop-` + id + `','` + hd + `');toggle_dropdown('drop-` + id + `')" value="` + val + `">` + val + `</item>`
                        }
                    }
                    html = `
                
                <dropdown id="main-drop-`+ id + `" onclick="toggle_dropdown('drop-` + id + `')">
                <p>`+ ft + `</p>
                <i class="fi fi-sr-caret-down"></i>
            </dropdown>
                <dropdown-menu  class="property-dropdown hidden" id='drop-` + id + `' value="` + this.value + `" >
              ` + fhtml + ophtml + `
              </dropdown-menu>
              
              `
                    return `<property-div class="property-container">
          <property-h>` + this.title + `</property-h>
          ` + html + `
          </property-div>
  
          `

                } else if (this.type == "fontfamily") {
                    let ophtml = ""
                    let fhtml = ''
                    let c = 0
                    for (const [i, val] of Object.entries(ffs)) {
                        if (val == this.value) {
                            ft = val
                            ophtml += `<item class="active-menu" onclick="set_font('` + o + `','` + this.elemid + `','` + this.nclass + `','` + i + `',` + animat + `,'main-drop-` + id + `','` + hd + `');toggle_dropdown('drop-` + id + `')" >` + i + `</item>`
                        } else {
                            ophtml += `<item onclick="set_font('` + o + `','` + this.elemid + `','` + this.nclass + `','` + i + `',` + animat + `,'main-drop-` + id + `','` + hd + `');toggle_dropdown('drop-` + id + `')">` + i + `</item>`
                        }
                        c += 1
                    }
                    html = `
                
                <dropdown id="main-drop-`+ id + `" onclick="toggle_dropdown('drop-` + id + `')">
                <p>`+ ft + `</p>
                <i class="fi fi-sr-caret-down"></i>
            </dropdown>
                <dropdown-menu  class="property-dropdown hidden" id='drop-` + id + `' value="` + this.value + `" >
                <input oninput="filter_fonts(['`+this.value+`','`+this.elemid+`','`+this.nclass+`'],'cont-` + id + `',this.value)" placeholder='Search fonts'>
                <dropdown-cont id='cont-` + id + `'>
              `+ ophtml + `
              </dropdown-cont>
              </dropdown-menu>
              
              `
                    return `<property-div class="property-container">
          <property-h>` + this.title + `</property-h>
          ` + html + `
          </property-div>
  
          `

                }
                else if (this.type == 'media') {
                    var html = `
          <button style = 'margin:5px;padding:5px;'
        onclick = 'load_images();toggle_en_media(true,"`+ this.nclass + `")' >
          import from media </button>
        `

                    return `<div class="property-container">
        <h3>` + this.title + `</h3>
        ` + html + `
        <p class="en-del-prop" onclick="remove_style('` + this.elemid + `','` + this.nclass + `','` + hd + `')">Remove Style</p>
        </div>
  
        `

                }
                else {
                    html = `
              <input id="`+ hd + t + this.title + `" placeholder="` + this.title + `" type="` + this.type + `" oninput="change_sub_style('` + o + `','` + this.elemid + `','` + this.nclass + `',this.value,` + animat + `,'` + hd + `')" value="` + this.value + `">
              `
                    return `<property-div>
              <property-h>` + this.title + `</property-h>
              ` + html + `
              </property-div>
              `

                }

            }
        }

        get_css() {
            let css = ''
            if (this.type == "multiple") {

                for (const [k, v] of Object.entries(this.options)) {
                    css += v.style.get_css() + "\n"
                }
            }
            else if (this.type == "media") {
                if (this.value != "") {
                    let djs = [], cjs = '', prei = 0
                    for (var [i, st] of Object.entries(this.js)) {
                        if (st == st.toUpperCase()) {
                            let b = this.js.slice(prei, i)
                            prei = parseInt(i)
                            djs.push(b.toLowerCase())
                        }
                    }
                    djs.push(this.js.slice(prei, this.js.length).toLowerCase())
                    cjs = djs.join("-")
                    if (cjs != "") {
                        css = cjs + " : url('../images/" + Object.keys(images)[images.indexOf(this.value)] + "');\n"
                    } else {
                        css = this.js + " : url('../images/" + Object.keys(images)[images.indexOf(this.value)] + "');\n"
                    }
                }
            }
            else {
                if (this.value != "") {
                    let djs = [], cjs = '', prei = 0
                    for (var [i, st] of Object.entries(this.js)) {
                        if (st == st.toUpperCase()) {
                            let b = this.js.slice(prei, i)
                            prei = parseInt(i)
                            djs.push(b.toLowerCase())
                        }
                    }
                    djs.push(this.js.slice(prei, this.js.length).toLowerCase())
                    cjs = djs.join("-")
                    if (cjs != "") {
                        css = cjs + " : " + this.value + ";\n"
                    } else {
                        css = this.js + " : " + this.value + ";\n"
                    }
                }
            }

            return css
        }

    }

    class Listener {
        constructor(title, clas) {
            this.styles = {}
            this.title = title
            this.clas = clas
            this.html = document.createElement("style")
            this.html.id = clas + title
            document.body.appendChild(this.html)
            this.set_listen_style()
        }

        getProperty() {
            let html = ``
            for (const [k, v] of Object.entries(this.styles)) {
                html += v.style.propertyHTML(null, null, false, this.title)
            }
            return `
            
            <listen-tab>
            <listen-top>
                <listener-h>`+ this.title + `</listener-h>
                <i onclick="toggle_listener(this,'`+ this.title + `')" class="fi fi-sr-caret-up"></i>
            </listen-top>
            <listen-cont id='`+ this.title + `'>
            <dropdown onclick="toggle_dropdown('`+ this.title + `-drop');list_styles_lis('` + this.title + `-drop','menu-` + this.title + `')" class="button-menu">
                <p>Add Property</p>
            </dropdown>
            <dropdown-menu class="hidden" id="`+ this.title + `-drop">

                <input maxlength="15" oninput="filter_class(this.value)" placeholder="Search">
                <menu-c id="menu-`+ this.title + `">

                </menu-c>
            </dropdown-menu>
                `+ html + `
            </listen-cont>
        </listen-tab>
            
            `
        }

        set_listen_style() {
            let css = ``
            for (const [k, v] of Object.entries(this.styles)) {
                css += v.style.get_css()
            }
            let style = ''
            if (classes[this.clas] == null) {
                style = tags[this.clas.split('-')[0]] + ':' + this.title.toLowerCase() + '{' + css + '}'
            } else {
                style = '.' + this.clas + ':' + this.title.toLowerCase() + '{' + css + '}'

            }
            this.html.innerHTML = style

        }

    }



    //Property classes

    class innerHTML {
        constructor(elemid, value = "", title = "innerHTML") {
            this.property = new Property("innerHTML", elemid, title, "text", value, "innerHTML")
        }
    }

    class URL { constructor(elemid, value = '', title = 'URL') { this.property = new Property('URL', elemid, title, 'text', value, 'href') } }

    class srcURL {

        constructor(elemid, value = "", title = "Source (URL)") {

            this.property = new Property("srcURL", elemid, title, "text", value, "src")
        }
    }

    class srcMEDIA {
        constructor(elemid, value = "", title = "Source (MEDIA)") {

            this.property = new Property("srcMEDIA", elemid, title, "media", value, "src")
        }
    }


    class innerText {
        constructor(elemid, value = "", title = "innerText") {
            this.property = new Property("innerText", elemid, title, "text", value, "innerText")
        }
    }
    class Alt {
        constructor(elemid, value = "", title = "Alt") {
            this.property = new Property("Alt", elemid, title, "text", value, "alt")
        }
    }

    class Title {
        constructor(elemid, value = "", title = "Tooltip") {
            this.property = new Property("Title", elemid, title, "text", value, "title")
        }
    }

    class Type {
        constructor(elemid, value = "", title = "Input Type") {
            this.property = new Property(this.constructor.name, elemid, title, "dropdown", value, "type", ["text", "number", "email", "Date", "password"])
        }
    }


    class placeholder {
        constructor(elemid, value = "", title = "plaeholder") {
            this.property = new Property("placeholder", elemid, title, "text", value, "placeholder")
        }
    }

    class Margin {
        constructor(elemid, value = "", title = "Margin") {
            this.style = new Style("Margin", elemid, title, "multiple", value, "margin", {
                "MarginTop": new MarginTop(elemid),
                "MarginBottom": new MarginBottom(elemid),
                "MarginLeft": new MarginLeft(elemid),
                "MarginRight": new MarginRight(elemid)
            }, true, true, null, true)
        }
    }
    class Padding {
        constructor(elemid, value = "", title = "Padding") {
            this.style = new Style("Padding", elemid, title, "multiple", value, "padding", {
                "PaddingTop": new PaddingTop(elemid, value),
                "PaddingLeft": new PaddingLeft(elemid, value),
                "PaddingBottom": new PaddingBottom(elemid, value),
                "PaddingRight": new PaddingRight(elemid, value)
            }, true, true, null, true)
        }
    }

    class PaddingTop {
        constructor(elemid, value = "", title = "Top") {
            this.style = new Style("PaddingTop", elemid, title, "text", value, "paddingTop")
        }
    }

    class AnimationName {
        constructor(elemid, value = "", title = "Animation Name") {
            this.style = new Style("AnimationName", elemid, title, "text", value, "animationName")
        }
    }
    class AnimationDuration {
        constructor(elemid, value = "", title = "Animation Duration") {
            this.style = new Style("AnimationDuration", elemid, title, "text", value, "animationDuration")
        }
    }

    class PaddingLeft {
        constructor(elemid, value = "", title = "Left") {
            this.style = new Style("PaddingLeft", elemid, title, "text", value, "paddingLeft")
        }
    }

    class PaddingBottom {
        constructor(elemid, value = "", title = "Bottom") {
            this.style = new Style("PaddingBottom", elemid, title, "text", value, "paddingBottom")
        }
    }

    class PaddingRight {
        constructor(elemid, value = "", title = "Right") {
            this.style = new Style("PaddingRight", elemid, title, "text", value, "paddingRight")
        }
    }




    //document.getElementById().style.
    class MarginBottom {
        constructor(elemid, value = "", title = "Bottom") {
            this.style = new Style("MarginBottom", elemid, title, "text", value, "marginBottom")
        }
    }
    class MarginTop {
        constructor(elemid, value = "", title = "Top") {
            this.style = new Style("MarginTop", elemid, title, "text", value, "marginTop")
        }
    }
    class MarginRight {
        constructor(elemid, value = "", title = "Right") {
            this.style = new Style("MarginRight", elemid, title, "text", value, "marginRight")
        }
    }
    class MarginLeft {
        constructor(elemid, value = "", title = "Left") {
            this.style = new Style("MarginLeft", elemid, title, "text", value, "marginLeft")
        }
    }

    class Width {
        constructor(elemid, value = "", title = "Width") {
            this.style = new Style("Width", elemid, title, "text", value, "width")
        }
    }

    class Height {
        constructor(elemid, value = "", title = "Height") {
            this.style = new Style("Height", elemid, title, "text", value, "height")
        }
    }

    class BorderRadius {
        constructor(elemid, value = "", title = "Border Radius") {
            this.style = new Style("BorderRadius", elemid, title, "text", value, "borderRadius")
        }
    }

    class Display {
        constructor(elemid, value = "", title = "Display") {
            this.style = new Style("Display", elemid, title, "dropdown", value, "display", ["block", "none", "flex", "inline"])
        }
    }

    class TextColor {
        constructor(elemid, value = "#000000", title = "Font Color") {
            this.style = new Style("TextColor", elemid, title, "color", value, "color")
        }

    }
    class TextDecoration {
        constructor(elemid, value = "", title = "Font Style") {
            this.style = new Style("TextDecoration", elemid, title, "dropdown", value, "textDecoration", ["solid", "underline", "dashed", "revert", "dotted"])
        }

    }
    class FontWeight {
        constructor(elemid, value = "", title = "Font Weight") {
            this.style = new Style(this.constructor.name, elemid, title, "number", value, "fontWeight")
        }

    }
    class FontFamily {
        constructor(elemid, value = "", title = "Font Family") {
            this.style = new Style(this.constructor.name, elemid, title, "fontfamily", value, "fontFamily")
        }

    }
    class TextStyle {
        constructor(elemid, value = '', title = 'Text Style') {
            this.style = new Style('TextStyle', elemid, title, 'multiple', value, 'js',
                {
                    "FontSize": new FontSize(elemid),
                    "TextColor": new TextColor(elemid),
                    "TextDecoration": new TextDecoration(elemid),
                    "FontWeight": new FontWeight(elemid),
                    "FontFamily": new FontFamily(elemid)
                })
        }
    }

    class BackgroundColor {
        constructor(elemid, value = "#ffffff", title = "Background Color") {
            this.style = new Style("BackgroundColor", elemid, title, "color", value, "backgroundColor")
        }

    }
    class JustifyContent { constructor(elemid, value = '', title = 'Horizontal Alignment') { this.style = new Style('JustifyContent', elemid, title, 'dropdown', value, 'justifyContent', ["none", "center", "start", "end", "space-between", "space-around", "space-evenly"]) } }

    class FlexDirection {
        constructor(elemid, value = "row", title = "Flex Arrangement") {
            this.style = new Style("FlexDirection", elemid, title, "dropdown", value, "flexDirection", ["row", "column", "row-reverse", "column-reverse"])
        }

    }
    class AlignItems {
        constructor(elemid, value = "None", title = "Align Items") {
            this.style = new Style("AlignItems", elemid, title, "dropdown", value, "alignItems", ["None", "center", "end"])
        }

    }

    class FontSize { constructor(elemid, value = '', title = 'Font Size') { this.style = new Style('FontSize', elemid, title, 'text', value, 'fontSize') } }

    class BorderSize { constructor(elemid, value = '', title = 'Size') { this.style = new Style(this.constructor.name, elemid, title, 'text', value, 'borderWidth') } }

    class BorderColor { constructor(elemid, value = '', title = 'Color') { this.style = new Style(this.constructor.name, elemid, title, 'color', value, 'borderColor') } }

    class BorderStyle { constructor(elemid, value = '', title = 'Style') { this.style = new Style(this.constructor.name, elemid, title, 'dropdown', value, 'borderStyle', ['solid', 'dashed', 'dotted']) } }

    //document.getElementById().style.borderLeftColor

    class Border {
        constructor(elemid, value = '', title = 'Border') {
            this.style = new Style(this.constructor.name, elemid, title, 'multiple', value, 'border', {
                "BorderSize": new BorderSize(elemid),
                "BorderColor": new BorderColor(elemid),
                "BorderStyle": new BorderStyle(elemid)
            }, true, true, null, false)
        }
    }
    class BorderTopSize { constructor(elemid, value = '', title = 'Size') { this.style = new Style(this.constructor.name, elemid, title, 'text', value, 'borderTopWidth') } }

    class BorderTopColor { constructor(elemid, value = '', title = 'Color') { this.style = new Style(this.constructor.name, elemid, title, 'color', value, 'borderTopColor') } }

    class BorderTopStyle { constructor(elemid, value = '', title = 'Style') { this.style = new Style(this.constructor.name, elemid, title, 'dropdown', value, 'borderTopStyle', ['solid', 'dashed', 'dotted']) } }

    class BorderTop {
        constructor(elemid, value = '', title = 'Border Top') {
            this.style = new Style(this.constructor.name, elemid, title, 'multiple', value, 'border', {
                "BorderTopSize": new BorderTopSize(elemid),
                "BorderTopColor": new BorderTopColor(elemid),
                "BorderTopStyle": new BorderTopStyle(elemid)
            }, true, true, null, false)
        }
    }
    class BorderBottomSize { constructor(elemid, value = '', title = 'Size') { this.style = new Style(this.constructor.name, elemid, title, 'text', value, 'borderBottomWidth') } }

    class BorderBottomColor { constructor(elemid, value = '', title = 'Color') { this.style = new Style(this.constructor.name, elemid, title, 'color', value, 'borderBottomColor') } }

    class BorderBottomStyle { constructor(elemid, value = '', title = 'Style') { this.style = new Style(this.constructor.name, elemid, title, 'dropdown', value, 'borderBottomStyle', ['solid', 'dashed', 'dotted']) } }

    class BorderBottom {
        constructor(elemid, value = '', title = 'Border Bottom') {
            this.style = new Style(this.constructor.name, elemid, title, 'multiple', value, 'border', {
                "BorderBottomSize": new BorderBottomSize(elemid),
                "BorderBottomColor": new BorderBottomColor(elemid),
                "BorderBottomStyle": new BorderBottomStyle(elemid)
            }, true, true, null, false)
        }
    }
    class BorderLeftSize { constructor(elemid, value = '', title = 'Size') { this.style = new Style(this.constructor.name, elemid, title, 'text', value, 'borderLeftWidth') } }

    class BorderLeftColor { constructor(elemid, value = '', title = 'Color') { this.style = new Style(this.constructor.name, elemid, title, 'color', value, 'borderLeftColor') } }

    class BorderLeftStyle { constructor(elemid, value = '', title = 'Style') { this.style = new Style(this.constructor.name, elemid, title, 'dropdown', value, 'borderLeftStyle', ['solid', 'dashed', 'dotted']) } }

    class BorderLeft {
        constructor(elemid, value = '', title = 'Border Left') {
            this.style = new Style(this.constructor.name, elemid, title, 'multiple', value, 'border', {
                "BorderLeftSize": new BorderLeftSize(elemid),
                "BorderLeftColor": new BorderLeftColor(elemid),
                "BorderLeftStyle": new BorderLeftStyle(elemid)
            }, true, true, null, false)
        }
    }
    class BorderRightSize { constructor(elemid, value = '', title = 'Size') { this.style = new Style(this.constructor.name, elemid, title, 'text', value, 'borderRightWidth') } }

    class BorderRightColor { constructor(elemid, value = '', title = 'Color') { this.style = new Style(this.constructor.name, elemid, title, 'color', value, 'borderRightColor') } }

    class BorderRightStyle { constructor(elemid, value = '', title = 'Style') { this.style = new Style(this.constructor.name, elemid, title, 'dropdown', value, 'borderRightStyle', ['solid', 'dashed', 'dotted']) } }

    class BorderRight {
        constructor(elemid, value = '', title = 'Border Right') {
            this.style = new Style(this.constructor.name, elemid, title, 'multiple', value, 'border', {
                "BorderRightSize": new BorderRightSize(elemid),
                "BorderRightColor": new BorderRightColor(elemid),
                "BorderRightStyle": new BorderRightStyle(elemid)
            }, true, true, null, false)
        }
    }


    class Bgblur { constructor(elemid, value = '', title = 'Background Blur') { this.style = new Style('Bgblur', elemid, title, 'text', value, 'backdropFilter', { "c1": "custom", "c2": "blur" }) } }

    class BackgroundMEDIA { constructor(elemid, value = '', title = 'Background Image') { this.style = new Style('BackgroundMEDIA', elemid, title, 'media', value, 'backgroundImage', { "c1": "custom", "c2": "url" }) } }

    class BackgroundURL { constructor(elemid, value = '', title = 'Background Image') { this.style = new Style('BackgroundURL', elemid, title, 'text', value, 'backgroundImage', { "c1": "custom", "c2": "url" }) } }






    if (!location.pathname.includes("download") && pids == "offline") {

        pids = "offline"

        document.title = "Web Engine - " + pids

        t = `while(pids == null || pids == ''){
      pids = prompt("Enter site name:")
    }`
        setup_offline()
        toggle_splash()
    }

    function toggle_splash() {
        document.getElementsByTagName("splash")[0].classList.toggle("hidden")
    }



    function show_pop_up(msg) {
        let popup = document.getElementsByTagName("pop-up")[0]
        popup.style.bottom = "15px"
        popup.innerText = msg
        setTimeout(() => {
            popup.style.bottom = "-150px"

        }, 5000)
    }
}
catch (err) {
    console.log(err)
    setTimeout(() => { location.reload() }, 3000)

}
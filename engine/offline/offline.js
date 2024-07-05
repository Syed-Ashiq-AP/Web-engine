
import * as fdfs from "../js/fonts.js"
ffs= fdfs.ffs
try {
    const queryStringa = window.location.search;

    const urlParamsa = new URLSearchParams(queryStringa);

    var imgs = []
    var pid = urlParamsa.get('pid')


    var email = localStorage.getItem("email")
    
        load_data()

    document.getElementById("dbt").onclick = f_delete_media
    function f_delete_media() {
        const desertRef = ref(storage, 'images/' + email + '/' + pid + "/" + selmedia);

        deleteObject(desertRef)
    }

    function load_data() {
        

        data = JSON.parse(localStorage.getItem("user_data"))
        celem_list = Object.keys(data.customelems)
        pages = Object.keys(data[pid].pages)
        currentPage = pages[0]
        pageData = data[pid].pages[currentPage]
        if (data[pid].pages[currentPage].elements != null && Object.keys(data[pid].pages[currentPage].elements).length != 0) {
            pageElements = createDict(pageData.elements.key, pageData.elements.value)
            pageClasses = createDict(pageData.classes.key, pageData.classes.value)
            pageDefClasses = createDict(pageData.def_classes.key, pageData.def_classes.value)
            pageAnim = createDict(pageData.animations.key, pageData.animations.value)
            load_page_data()
        } else {
            set_up_page()
            create_default_classes()
        }
        load_list()
        list_anims()
        load_classes()
        load_custom_elems()
        load_pages()
        toggle_splash()
    }

    function createDict(keys, values) {
        let obj = {};
        for (let i = 0; i < keys.length; i++) {
            obj[keys[i]] = values[i] != undefined ? values[i] : null;
        }
        return obj
    }

    async function save_page_data() {
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
        
        var d_class_dic = {}
        var d_class_key = []
        var d_class_value = []
        for (const [k, v] of Object.entries(def_classes)) {
            d_class_value.push(JSON.parse(JSON.stringify(v)))
            d_class_key.push(k)
        }
        d_class_dic.key = d_class_key
        d_class_dic.value = d_class_value


        var anim_dic = {}
        var anim_key = []
        var anim_value = []
        for (const [k, v] of Object.entries(animations)) {
            var o = JSON.parse(JSON.stringify(v))
            anim_value.push(o)
            var key = {}
            for (const [a, b] of Object.entries(v.keyframes)) {
                key[a] = []
                for (const [l, m] of Object.entries(b)) {
                    key[a].push(JSON.parse(JSON.stringify(m)))
                }
            }
            anim_value[anim_value.indexOf(o)].keyframes = key
            anim_key.push(k)
        }
        anim_dic.key = anim_key
        anim_dic.value = anim_value

        data[pid].pages[currentPage].elements = elem_dic
        data[pid].pages[currentPage].classes = class_dic
        data[pid].pages[currentPage].def_classes = d_class_dic
        data[pid].pages[currentPage].animations = anim_dic
        data[pid].images = Object.keys(images)
        pageData = data[pid].pages[currentPage]

        localStorage.setItem("user_data", JSON.stringify(data))


    }
    document.getElementById("en-save-data").onclick = () => {
        save_page_data();
        show_pop_up("Saved");
    }

    function auto_save() {
        setTimeout(() => {
            save_page_data()
            show_pop_up("Auto Saved")
            auto_save()
        }, 480000)
    }
    auto_save()

    function toggle_splash() {
        document.getElementsByTagName("splash")[0].style.display = "none"
    }
} catch (err) {
    console.log(err)
}
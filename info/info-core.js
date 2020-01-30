const axios = require('axios')
const cheerio = require('cheerio');
const { baseUrl } = require('../config');

const vm = require('vm');

async function get(url){
    let response = await axios.get(url);
    let html = await response.data;
    let $ = cheerio.load(html);
    let script = $('body > script');
    let global = {
        window:{}
    };
    for(let i = 0; i < script.length; i++){
        if(script[i] && script[i].children.length>0){
            let scriptContent = script[i].firstChild.data;
            vm.createContext(global);
            vm.runInContext(scriptContent, global);
        }
    }
    return global.window;
}

async function getInfos(){
    let full = await get(baseUrl);
    return full['getTimelineService'];
}


module.exports = {
    getInfos:getInfos
}

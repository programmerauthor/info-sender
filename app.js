const info = require('./info/info-core');
const db = require('./store/db-store');
const { emails } = require('./config');
const sender = require('./sender/email-sender');
const emailFactory = require('./templete/email-templete');
const { baseUrl } = require('./config');
const process = require('process');

async function refresh(){
    let infos = await info.getInfos();
    if(!infos || infos.length <=0){
        return;
    }
    //时间排序找到最后一个
    let docs = await db.findAndSort({
        sortQuery:{
            id:-1
        },
        limit:1
    });
    let newArr = [];
    if(docs && docs.length > 0){
        let doc = docs[0];
        for(let i = 0; i < infos.length; i++){
            let info = infos[i];
            //从新数据中对比逐个插入，直到发现已插入的数据为止. id 作为标记依据
            if(info.id > doc.id){
                //存入数据库
                await db.insert(info);
                if(info.title != doc.title){
                    //新数据
                    newArr.push(info);
                }else{
                    console.log(`同一条信息id发生变更:${info.id} vs ${doc.id}`);
                }
            }
        }
    }else{
        //取最新一条作为事件提醒
        newArr.push(infos[0]);
        //没有旧数据，全部存入
        await db.insert(infos);
    }
    if(newArr.length > 0){
        //发送邮件通知
        for(let i = 0; i < newArr.length; i++){
            let info = newArr[i];
            for(let j = 0; j < emails.length; j++){
                let email = emails[j];
                await sender.send({
                    to:email,
                    subject:info.title,
                    html:emailFactory.createEmailHtml({//模板可以自己修改
                        info:info,
                        baseUrl:baseUrl
                    })
                });
            }
        }
    }
}

async function main(){
    await refresh();
}

main().catch(reason => {
    console.log(reason);
    process.exit();
})

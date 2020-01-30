
const baseUrl = `https://3g.dxy.cn/newh5/view/pneumonia_peopleapp?from=timeline&isappinstalled=0`;

const account = {
    from : `"sender-email" <sender-email@qq.com>`,  //改成你的邮箱
    host:'smtp.qq.com', //改成对应的邮箱服务商主机，QQ邮箱不用修改可以用这个
    port:'465', //改成对应邮箱服务商端接口，QQ邮箱不用修改可以用这个
    secureConnection:true, // 使用了 ssl
    auth:{
        user:'sender-email@qq.com',//用来发送邮件的邮箱，改成你的邮箱
        pass:'password'//邮箱的授权码，改成对应邮箱服务商的授权密码
    }
}

//接收者的邮箱数组
const emails = [
    '409941813@qq.com'
]

module.exports = {
    baseUrl:baseUrl,
    account:account,
    emails:emails
}

function createEmailHtml({ info, baseUrl }){
    return `
    <html>
        <div>${info.title}</div>
        <div>${info.summary}</div>
        <div>
            <a href=${baseUrl}>全部信息查看</a>
        </div>
    </html>   
    `;
}

module.exports = {
    createEmailHtml:createEmailHtml
}
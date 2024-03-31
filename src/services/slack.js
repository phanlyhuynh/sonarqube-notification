const { WebClient } = require("@slack/web-api");
const sonarqubeConstants = require("../constants/sonarqube");

const sendMessage = async (conversationId, data, body) => {
    const token = process.env.SLACK_TOKEN;
    formatMessage(data);
    const web = new WebClient(token);
    const result = await web.chat.postMessage({
        text: formatMessage(data, body),
        channel: conversationId,
    });

    console.log(`Successfully send message ${result.ts} in conversation ${conversationId}`);
}

const formatMessage = (data, body) => {
    const vuls = data.filter(item => item.type === sonarqubeConstants.types.VULNERABILITY_TYPE && item.issueStatus === sonarqubeConstants.status.OPEN)
    let message = '';
    message += `*Report*: ${new Date().toString()}\n`
    message += `*Project*: ${body?.project?.name || ''}\n`
    message += `*Link*: ${body?.project?.url || ''}\n`
    message += `*Total Vulnerabilities*: ${vuls.length} \n`;
    vuls.map(vul => {
        message += `>*${vul.message}*\n`+
                '*Severity*: `'+ vul.severity + '`\n'+
                `*Component*: ${vul.component}\n`;
    })

    return message;
}

module.exports = {
    sendMessage,
}

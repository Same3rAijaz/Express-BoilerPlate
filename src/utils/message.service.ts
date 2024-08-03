import axios from "axios";
import config from "../../config";

//@ts-ignore
export default function sendMessage({ phone, msgId, message }) {
    if (config.messageService.isEnabled) {
        axios.post(config.messageService.url as any, {
            "sender": config.messageService.sender,
            "mobileno": phone,
            "msgid": msgId,
            "message": message
        }, {
            headers: {
                Authorization: config.messageService.auth
            }
        })
            .then(function (response) {
                console.log('Response -> sendMessage', response.data)
            })
            .catch(function (error) {
                console.error(`Error -> sendMessage, ${error.message}`)
            });
    }
}

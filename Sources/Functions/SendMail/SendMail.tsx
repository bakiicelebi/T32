import emailjs from '@emailjs/react-native';
import { EMAIL_PUBLIC_KEY, EMAIL_SERVICE_KEY, EMAIL_TEMPLATE_KEY } from '@env';
import { Alert } from 'react-native'

const SendMail = (email: any, message: any,t:any) => {


    const templateParams = {
        email: email,
        message: message
    };

    emailjs.send(EMAIL_SERVICE_KEY, EMAIL_TEMPLATE_KEY, templateParams, {
        publicKey: EMAIL_PUBLIC_KEY,
    })
        .then(
            (response) => {
                console.log('SUCCESS!', response.status, response.text);
                console.log("receipt sent to " + email)
                Alert.alert(t('email sent successfully'));
            },
            (err) => {
                console.log('FAILED...', err);
                Alert.alert(t('failed to send email'));
            }
        );
};

export { SendMail }
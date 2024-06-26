import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Alert } from 'react-native';
import FileViewer from 'react-native-file-viewer';

const createPDF = async (content: any, zReport: any, t: any) => {


    let fileName;
    if (zReport) {
        fileName = `Z_REPORT_${new Date().toISOString().replace(/[-:.]/g, "_")}`;
    }
    else {
        fileName = `Sale_Receipt_${new Date().toISOString().replace(/[-:.]/g, "_")}`;
    }


    try {
        let options = {
            html: content,
            fileName: fileName,
            directory: 'Documents',
        };

        let file = await RNHTMLtoPDF.convert(options);
        Alert.alert(
            t('pdf created'),
            `${t('pdf file has been saved to:')} ${file.filePath}`,
            [
                {
                    text: t("view pdf"),
                    onPress: () => ViewPDF(file.filePath, t),
                },
                {
                    text: "OK",
                    style: "cancel",
                }
            ]
        );
        return file.filePath;
    } catch (error) {
        console.error(error);
        Alert.alert(t('error'), t('could not create pdf'));
    }
};

const ViewPDF = async (pdfFilePath: any, t: any) => {

    if (!pdfFilePath) {
        Alert.alert(t('no pdf found'), t('please create a pdf first.'));
        return;
    }

    try {
        FileViewer.open(pdfFilePath)
            .then(() => {
                console.log('Viewed Successfully');
            })
            .catch(_err => {
                console.log(_err);
                console.log("asas")
            });
    } catch (error) {
        Alert.alert(t('error'), t('could not view pdf'));
        console.error(error);

    }
};

export { createPDF };

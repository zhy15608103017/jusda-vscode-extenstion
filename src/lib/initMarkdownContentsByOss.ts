import { getContentByUrl } from "../utils/publishMethod";
const markdownContentUrl = "https://ossdev.jus-link.com/public-fe/markdownContents.json";

export default function initMarkdownContentsByOss(context){
    // 尝试从全局状态中获取数据
    const packageMarkDownContent = context.globalState.get('packageMarkDownContent');
    // 如果全局状态中没有数据，则重新获取数据
    if (!packageMarkDownContent) {
        getContentByUrl(markdownContentUrl).then((mdData:any)=>{
            context.globalState.update('packageMarkDownContent', mdData);
        });
    }
}
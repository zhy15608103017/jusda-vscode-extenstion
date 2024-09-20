import { getApolloConfig, apolloConfigDataClean } from "../utils/publishMethod";

export default function initApolloData(context){
        // 尝试从全局状态中获取数据
        const jusdaApolloData = context.globalState.get('jusdaApolloData');
        // getApolloConfig().then((apolloData:any)=>{
        //     const data = apolloConfigDataClean(apolloData.configurations);
        //     context.globalState.update('jusdaApolloData', data);
        // });
        // 如果全局状态中没有数据，则调用 Apollo 获取数据
        if (!jusdaApolloData) {
            getApolloConfig().then((apolloData:any)=>{
                const data = apolloConfigDataClean(apolloData.configurations);
                context.globalState.update('jusdaApolloData', data);
            });
        }
}
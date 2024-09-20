// @ts-nocheck
import React,{ useEffect, useState } from "react";
import { Tabs, Button, Form, Input  } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import useVsCodeApi from '@/utils/useVsCodeApi';
import { getCloneCommands } from '@/utils/publishMethod';
import styles from './index.less';


export default function HomePage() {
	const vscodeApi = useVsCodeApi();
	const defaultTerminalParams = {
        name: 'git clone的终端',
    };

	const [form] = Form.useForm(); 
	const [tabsData, setTabsData] = useState([]);
	const [selectTab, setSelectTab] = useState(null);
	const [steps, setSteps] = useState(1);
	const [systemName, setSystemName] = useState('');
	const [initData, setInitData] = useState([]);
	useEffect(()=>{
		window.addEventListener('message', event => {
            const message = event.data;
            switch (message.command) {
                case 'userChooseUrl':
					form.setFieldsValue({'projectPath': message.url});
                    break;
				case 'initApolloConfig':
					{
						setInitData(message.appolloData)
					}
					break;
				case 'systemName':
					setSystemName(message.systemName);
					break;
            }
        });
		// 返回清理函数，将在组件卸载时调用
		return () => {
			// 移除事件监听器
			window.removeEventListener('message', ()=>{});
		};
	},[])

	useEffect(()=>{
		if(vscodeApi){
			// 获取apollo配置信息
			vscodeApi.postMessage({
				method: 'getApolloConfig',
				params:{}
			});
			// 获取操作系统名称
			vscodeApi.postMessage({
				method: 'getSystemName',
				params:{}
			});
		}
	},[vscodeApi]);

	useEffect(()=>{
		// 渲染页面
		const data = initData.map((item,index)=>{
			return {
					label: (<div className={`${styles.tabItemTitle} ${item.key}`}>
								<span>{item.name}</span>
							</div>),
					key: item.key,
					children: 
						 item.views.map((viewItem)=>{
							return (<div className={`${styles.tabItemContent} ${viewItem.key === selectTab?.key ? styles.itemActive: null}`} key={viewItem.key} onClick={()=>tabClick(viewItem)}>
								<img src={viewItem.logoImgUrl}></img>
								<div className={styles.contentDescription}>
									<div className={styles.descriptiontitle}>
										<div className={styles.type}>
											<span className={styles.typeTxt}>{viewItem.type}</span>
										</div>
										<div title={viewItem.title} className={styles.projectDesc}>{viewItem.title}</div>
									</div>
									<div className={styles.conentsDesc}>{viewItem.content}</div>
								</div>
							</div>)
						})
				}
		})
		setTabsData(data);
	},[selectTab, initData]);

	const tabClick = (key) => {
		setSelectTab(key);
	}

	const stepsOnClick = (step) => {
		setSteps(step);
	}

	const onFinish = (values: any) => {
		const { projectPath } = values;
		const { name } = defaultTerminalParams;
		const { gitResourceAddress } = selectTab;
		const commands = getCloneCommands(projectPath, gitResourceAddress, systemName);
		// 使用通信在vscode中打开终端执行命令，git clone 项目代码并删除 .git 文件夹
		// 由于删除.git文件夹采用node方式的话，无法得到执行状态所以全部采用终端命令的方式执行
		vscodeApi.postMessage({
			method: 'terminalCommand',
			params: {
				name,
				cwd: projectPath,
				commands,
			}
		});
	};

	const submitOnFinish = () => {
		form.submit();
	}

	const onOpenFolderDialog = async () => {
		// 通知vscode显示文件夹选择框
		vscodeApi.postMessage({
			method: 'showOpenDialog',
		});
	}

	return (
		<div className={styles.container}>
			<div className={styles.cardContent}>
				<div className={styles.header}>
					<div>
						<div className={styles.title}>
						创建项目
						</div>
						<div className={styles.subTitle}>
						选择项目类型模版，快速创建项目
						</div>
					</div>
					
				</div>
				{steps===1 &&
					<div className={styles.conents}>
						<Tabs
							tabPosition={'left'}
							items={tabsData}
						/>
					</div>
				}
				{steps === 2 &&
					<div className={styles.twoConents}>
						<div className={styles.inputCon}>
						<Form
							name="setForm"
							form={form}
							layout="vertical"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							initialValues={{ remember: true }}
							onFinish={onFinish}
							autoComplete="off"
							style={{width: "500",}}
							>
							{/* <Form.Item
								label="应用名称"
								name="projectName"
								rules={[{ required: true, message: '请输入创建的应用名称!' }]}
							>
								<Input />
							</Form.Item> */}

							<Form.Item
								label="本地路径"
								name="projectPath"
								rules={[{ required: true, message: '请选择创建的本地路径!' }]}
							>
								<Input
									// size="small"
									placeholder={'请选择应用存储的本地路径'}
									className={styles.projectPath}
									readOnly
									suffix={
										// <img onClick={onOpenFolderDialog} className={styles.folderIcon} src={folderIcon} alt="folder" />
										<div onClick={onOpenFolderDialog} className={styles.folderIcon}>
											<FolderOutlined />
										</div>
									}
								/>
							</Form.Item>
							</Form>
						</div>
					</div>
				}
			</div>
			<div className={styles.footerBtns}>
				{steps===1 &&
					<Button disabled={selectTab ? false: true} type="ghost" onClick={()=>stepsOnClick(2)}>
						下一步
					</Button>
				}
				{steps===2 && 
					<div>
						<Button className={styles.btn_last_step} disabled={selectTab ? false: true} type="ghost" onClick={()=>stepsOnClick(1)}>
							上一步
						</Button>
						<Button disabled={selectTab ? false: true} type="ghost" onClick={()=>submitOnFinish()}>
							完 成
						</Button>
					</div>
				}
			</div>
		</div>
	);
}

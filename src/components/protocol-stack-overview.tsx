import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, Info, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface LayerInfo {
  id: string;
  name: string;
  fullName: string;
  description: string;
  functions: string[];
  commands: string[];
}

const BLE_LAYERS: LayerInfo[] = [
  {
    id: 'application',
    name: 'Application',
    fullName: 'Application Layer',
    description: '应用层 - 用户应用程序和业务逻辑',
    functions: ['用户业务逻辑实现', '应用数据处理', '用户界面交互', '设备功能定义'],
    commands: ['Custom_Service_Read', 'Custom_Service_Write', 'Application_Event', 'User_Interface_Update']
  },
  {
    id: 'gatt',
    name: 'GATT',
    fullName: 'Generic Attribute Profile',
    description: '通用属性规范，基于ATT协议定义服务和特征的发现、读写操作',
    functions: ['服务和特征发现', '属性读写操作', '通知和指示', '客户端/服务器角色管理'],
    commands: ['Discover_All_Primary_Services', 'Read_Characteristic_Value', 'Write_Characteristic_Value', 'Handle_Value_Notification']
  },
  {
    id: 'gap',
    name: 'GAP',
    fullName: 'Generic Access Profile',
    description: '通用访问规范，直接与HCI交互，负责设备发现、广播和连接管理',
    functions: ['设备发现和广播', '连接建立和管理', '安全策略定义', '角色管理(Central/Peripheral)'],
    commands: ['LE_Set_Advertising_Enable', 'LE_Create_Connection', 'LE_Connection_Update', 'LE_Disconnect']
  },
  {
    id: 'att',
    name: 'ATT',
    fullName: 'Attribute Protocol',
    description: '属性协议，提供属性的基本读写和发现机制，运行在L2CAP之上',
    functions: ['属性发现', '属性读写', '错误处理', '权限控制'],
    commands: ['Find_Information_Request', 'Read_By_Type_Request', 'Write_Request', 'Error_Response']
  },
  {
    id: 'smp',
    name: 'SMP',
    fullName: 'Security Manager Protocol',
    description: '安全管理协议，与ATT并行运行在L2CAP之上，负责密钥分发、配对和加密',
    functions: ['设备配对和绑定', '密钥生成和分发', '数据加密和认证', '隐私保护'],
    commands: ['Pairing_Request', 'Pairing_Response', 'Pairing_Confirm', 'Pairing_Random', 'Encryption_Information']
  },
  {
    id: 'l2cap',
    name: 'L2CAP',
    fullName: 'Logical Link Control and Adaptation Protocol',
    description: '逻辑链路控制和适配协议，提供数据包分段重组和多路复用',
    functions: ['数据包分段和重组', '多路复用', '流量控制', '错误检测和重传'],
    commands: ['Connection_Request', 'Configuration_Request', 'Disconnection_Request', 'Information_Request']
  },
  {
    id: 'hci',
    name: 'HCI',
    fullName: 'Host Controller Interface',
    description: '主机控制接口，提供主机和控制器之间的标准接口',
    functions: ['命令和事件传输', '数据路由', '流量控制', '错误报告'],
    commands: ['LE_Set_Advertising_Parameters', 'LE_Set_Scan_Parameters', 'LE_Read_Buffer_Size', 'Reset']
  },
  {
    id: 'link',
    name: 'Link Layer',
    fullName: 'Link Layer',
    description: '链路层 - 管理连接状态和数据传输',
    functions: ['连接状态管理', '数据包传输', '跳频控制', '功率管理'],
    commands: ['LL_CONNECTION_REQ', 'LL_DATA_PDU', 'LL_TERMINATE_IND', 'LL_CHANNEL_MAP_REQ']
  }
];

export function ProtocolStackOverview() {
  const [selectedLayer, setSelectedLayer] = useState<LayerInfo | null>(null);

  const handleLayerClick = (layer: LayerInfo) => {
    setSelectedLayer(selectedLayer?.id === layer.id ? null : layer);
  };

  const getLayerById = (id: string) => BLE_LAYERS.find(layer => layer.id === id);

  return (
    <div className="space-y-8">
      {/* 标题 */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">BLE协议栈架构</h2>
        <p className="text-slate-600">基于蓝牙官方标准的完整协议栈层次结构 - 点击各层查看详细信息</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 协议栈架构图 */}
        <div className="lg:col-span-2">



          {/* 应用层 */}
          <div className="mb-4">
            <Card
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-105"
              onClick={() => handleLayerClick(getLayerById('application')!)}
            >
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-xl font-bold">Application</h3>
                  <ChevronRight className="h-5 w-5" />
                </div>
                <p className="text-purple-100 text-sm mt-2">应用层 - 用户应用程序和业务逻辑</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mb-4">
            <ArrowDown className="h-6 w-6 text-slate-400" />
          </div>



          {/* Host层 */}
          <div className="mb-4">
            <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-6">
              <div className="space-y-4">


                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                  <div className="space-y-4 h-full md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                      {/* GATT */}
                      <Card
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                        onClick={() => handleLayerClick(getLayerById('gatt')!)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <h4 className="text-lg font-bold">GATT</h4>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                          <p className="text-blue-100 text-xs mt-1">Generic Attribute Profile</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* ATT */}
                      <Card
                        className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white border-0 shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                        onClick={() => handleLayerClick(getLayerById('att')!)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <h4 className="text-lg font-bold">ATT</h4>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                          <p className="text-cyan-100 text-xs mt-1">Attribute Protocol</p>
                        </CardContent>
                      </Card>

                      {/* SMP */}
                      <Card
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                        onClick={() => handleLayerClick(getLayerById('smp')!)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <h4 className="text-lg font-bold">SMP</h4>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                          <p className="text-red-100 text-xs mt-1">Security Manager Protocol</p>
                        </CardContent>
                      </Card>

                    </div>

                    <div>
                      {/* L2CAP */}
                      <Card
                        className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-0 shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                        onClick={() => handleLayerClick(getLayerById('l2cap')!)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <h4 className="text-lg font-bold">L2CAP</h4>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                          <p className="text-indigo-100 text-xs mt-1">Logical Link Control and Adaptation Protocol</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className='h-full'>
                    <Card
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                      onClick={() => handleLayerClick(getLayerById('gap')!)}
                    >
                      <CardContent className="p-4 text-center h-full flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center gap-2">
                          <h4 className="text-lg font-bold">GAP</h4>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        <p className="text-green-100 text-xs mt-1">Generic Access Profile</p>
                      </CardContent>
                    </Card>
                  </div>

                </div>


                {/* HCI */}
                <Card
                  className="bg-gradient-to-r from-orange-400 to-orange-500 text-white border-0 shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => handleLayerClick(getLayerById('hci')!)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <h4 className="text-lg font-bold">HCI</h4>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                    <p className="text-orange-100 text-xs mt-1">Host Controller Interface</p>
                  </CardContent>
                </Card>

              </div>

              <div className="text-center mt-4">
                <Badge variant="secondary" className="bg-slate-200 text-slate-700">Host</Badge>
              </div>
            </div>

          </div>

          <div className="flex justify-center mb-4">
            <ArrowDown className="h-6 w-6 text-slate-400" />
          </div>

          {/* Controller层 */}
          <div className="mb-6">
            <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-6">
              <div className="space-y-4">

                {/* Link Layer */}
                <Card
                  className="bg-gradient-to-r from-slate-600 to-slate-700 text-white border-0 shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => handleLayerClick(getLayerById('link')!)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <h4 className="text-lg font-bold">Link Layer</h4>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                    <p className="text-slate-200 text-xs mt-1">链路层 - 管理连接状态和数据传输</p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-4">
                <Badge variant="secondary" className="bg-slate-200 text-slate-700">Controller</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* 详细信息面板 */}
        <div className="lg:col-span-1">
          {selectedLayer ? (
            <Card className="sticky top-4 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedLayer.name}</span>
                  <button
                    onClick={() => setSelectedLayer(null)}
                    className="text-white hover:text-slate-200"
                  >
                    ✕
                  </button>
                </CardTitle>
                <p className="text-slate-200 text-sm">{selectedLayer.fullName}</p>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">描述</h4>
                  <p className="text-sm text-slate-600">{selectedLayer.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">核心功能</h4>
                  <ul className="space-y-1">
                    {selectedLayer.functions.map((func, index) => (
                      <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{func}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">关键命令</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedLayer.commands.map((command, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {command}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-4 shadow-lg">
              <CardContent className="p-6 text-center">
                <Info className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h4 className="font-semibold text-slate-800 mb-2">选择协议层</h4>
                <p className="text-sm text-slate-600">点击左侧任意协议层查看详细信息</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* 架构说明 */}
      <div className="bg-white rounded-lg shadow-lg border p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-600" />
          BLE协议栈架构说明
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-700">应用层</h4>
            <p>用户应用程序和业务逻辑实现</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-slate-700">主机层 (Host)</h4>
            <ul className="space-y-1 text-xs">
              <li>• <strong>GATT/ATT</strong>: 属性协议栈</li>
              <li>• <strong>SMP</strong>: 安全管理协议</li>
              <li>• <strong>GAP</strong>: 设备发现和连接</li>
              <li>• <strong>L2CAP</strong>: 逻辑链路控制</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-slate-700">控制器层 (Controller)</h4>
            <ul className="space-y-1 text-xs">
              <li>• <strong>HCI</strong>: 主机控制器接口</li>
              <li>• <strong>Link Layer</strong>: 物理连接管理</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-blue-800 mb-2">关键特点</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <p>✓ <strong>Host-Controller分离</strong>: 清晰的架构分层</p>
              <p>✓ <strong>并行协议</strong>: GATT、GAP、SMP可并行工作</p>
            </div>
            <div>
              <p>✓ <strong>标准化接口</strong>: HCI提供统一抽象</p>
              <p>✓ <strong>低功耗设计</strong>: 适合电池供电设备</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
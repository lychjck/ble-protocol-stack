export interface BLELayer {
  id: string;
  name: string;
  fullName: string;
  description: string;
  color: string;
  position: number;
  functions: string[];
  commands: Command[];
  packetStructure: PacketField[];
}

export interface Command {
  name: string;
  description: string;
  parameters?: string[];
}

export interface PacketField {
  name: string;
  size: string;
  description: string;
  color: string;
}

export const BLE_LAYERS: BLELayer[] = [
  {
    id: 'application',
    name: 'Application',
    fullName: 'Application Layer',
    description: '应用层，用户自定义的应用程序和业务逻辑',
    color: 'bg-indigo-500',
    position: 6,
    functions: [
      '用户业务逻辑实现',
      '应用数据处理',
      '用户界面交互',
      '设备功能定义'
    ],
    commands: [
      { name: 'Custom_Service_Read', description: '自定义服务读取' },
      { name: 'Custom_Service_Write', description: '自定义服务写入' },
      { name: 'Application_Event', description: '应用事件处理' },
      { name: 'User_Interface_Update', description: '用户界面更新' }
    ],
    packetStructure: [
      { name: 'App Header', size: 'Variable', description: '应用头部', color: 'bg-indigo-200' },
      { name: 'App Data', size: 'Variable', description: '应用数据', color: 'bg-indigo-300' },
      { name: 'App Footer', size: 'Variable', description: '应用尾部', color: 'bg-indigo-400' }
    ]
  },
  {
    id: 'gatt',
    name: 'GATT',
    fullName: 'Generic Attribute Profile',
    description: '通用属性规范，基于ATT协议定义服务和特征的发现、读写操作',
    color: 'bg-blue-500',
    position: 5,
    functions: [
      '服务和特征发现',
      '属性读写操作',
      '通知和指示',
      '客户端/服务器角色管理'
    ],
    commands: [
      { name: 'Discover_All_Primary_Services', description: '发现所有主要服务' },
      { name: 'Read_Characteristic_Value', description: '读取特征值' },
      { name: 'Write_Characteristic_Value', description: '写入特征值' },
      { name: 'Handle_Value_Notification', description: '句柄值通知' }
    ],
    packetStructure: [
      { name: 'Service UUID', size: '2/16 bytes', description: '服务UUID', color: 'bg-blue-200' },
      { name: 'Char UUID', size: '2/16 bytes', description: '特征UUID', color: 'bg-blue-300' },
      { name: 'Char Properties', size: '1 byte', description: '特征属性', color: 'bg-blue-400' },
      { name: 'Char Value', size: 'Variable', description: '特征值', color: 'bg-blue-500' }
    ]
  },
  {
    id: 'att',
    name: 'ATT',
    fullName: 'Attribute Protocol',
    description: '属性协议，提供属性的基本读写和发现机制，运行在L2CAP之上',
    color: 'bg-green-500',
    position: 4,
    functions: [
      '属性发现',
      '属性读写',
      '错误处理',
      '权限控制'
    ],
    commands: [
      { name: 'Find_Information_Request', description: '查找信息请求' },
      { name: 'Read_By_Type_Request', description: '按类型读取请求' },
      { name: 'Write_Request', description: '写入请求' },
      { name: 'Error_Response', description: '错误响应' }
    ],
    packetStructure: [
      { name: 'Opcode', size: '1 byte', description: '操作码', color: 'bg-green-200' },
      { name: 'Attribute Handle', size: '2 bytes', description: '属性句柄', color: 'bg-green-300' },
      { name: 'Attribute Type', size: '2/16 bytes', description: '属性类型', color: 'bg-green-400' },
      { name: 'Attribute Value', size: 'Variable', description: '属性值', color: 'bg-green-500' }
    ]
  },
  {
    id: 'smp',
    name: 'SMP',
    fullName: 'Security Manager Protocol',
    description: '安全管理协议，与ATT并行运行在L2CAP之上，负责密钥分发、配对和加密',
    color: 'bg-red-500',
    position: 3,
    functions: [
      '设备配对和绑定',
      '密钥生成和分发',
      '数据加密和认证',
      '隐私保护'
    ],
    commands: [
      { name: 'Pairing_Request', description: '配对请求' },
      { name: 'Pairing_Response', description: '配对响应' },
      { name: 'Pairing_Confirm', description: '配对确认' },
      { name: 'Pairing_Random', description: '配对随机数' },
      { name: 'Encryption_Information', description: '加密信息' }
    ],
    packetStructure: [
      { name: 'Code', size: '1 byte', description: '命令码', color: 'bg-red-200' },
      { name: 'IO Capability', size: '1 byte', description: 'IO能力', color: 'bg-red-300' },
      { name: 'OOB Flag', size: '1 byte', description: 'OOB标志', color: 'bg-red-400' },
      { name: 'Auth Req', size: '1 byte', description: '认证要求', color: 'bg-red-500' },
      { name: 'Key Distribution', size: '1 byte', description: '密钥分发', color: 'bg-red-600' }
    ]
  },
  {
    id: 'gap',
    name: 'GAP',
    fullName: 'Generic Access Profile',
    description: '通用访问规范，直接与HCI交互，负责设备发现、广播和连接管理',
    color: 'bg-purple-500',
    position: 2,
    functions: [
      '设备发现和广播',
      '连接建立和管理',
      '安全策略定义',
      '角色管理(Central/Peripheral)'
    ],
    commands: [
      { name: 'LE_Set_Advertising_Enable', description: '启用/禁用广播' },
      { name: 'LE_Create_Connection', description: '创建连接' },
      { name: 'LE_Connection_Update', description: '更新连接参数' },
      { name: 'LE_Disconnect', description: '断开连接' }
    ],
    packetStructure: [
      { name: 'AD Type', size: '1 byte', description: '广播数据类型', color: 'bg-purple-200' },
      { name: 'AD Length', size: '1 byte', description: '广播数据长度', color: 'bg-purple-300' },
      { name: 'AD Data', size: 'Variable', description: '广播数据', color: 'bg-purple-400' },
      { name: 'Device Name', size: 'Variable', description: '设备名称', color: 'bg-purple-500' }
    ]
  },
  {
    id: 'l2cap',
    name: 'L2CAP',
    fullName: 'Logical Link Control and Adaptation Protocol',
    description: '逻辑链路控制和适配协议，提供数据包分段重组和多路复用',
    color: 'bg-yellow-500',
    position: 1,
    functions: [
      '数据包分段和重组',
      '多路复用',
      '流量控制',
      '错误检测和重传'
    ],
    commands: [
      { name: 'Connection_Request', description: '连接请求' },
      { name: 'Configuration_Request', description: '配置请求' },
      { name: 'Disconnection_Request', description: '断开连接请求' },
      { name: 'Information_Request', description: '信息请求' }
    ],
    packetStructure: [
      { name: 'Length', size: '2 bytes', description: 'PDU长度', color: 'bg-yellow-200' },
      { name: 'Channel ID', size: '2 bytes', description: '信道标识', color: 'bg-yellow-300' },
      { name: 'Code', size: '1 byte', description: '命令码', color: 'bg-yellow-400' },
      { name: 'Data', size: 'Variable', description: '数据载荷', color: 'bg-yellow-500' }
    ]
  },
  {
    id: 'hci',
    name: 'HCI',
    fullName: 'Host Controller Interface',
    description: '主机控制接口，提供主机和控制器之间的标准接口',
    color: 'bg-orange-500',
    position: 0,
    functions: [
      '命令和事件传输',
      '数据路由',
      '流量控制',
      '错误报告'
    ],
    commands: [
      { name: 'LE_Set_Advertising_Parameters', description: '设置广播参数' },
      { name: 'LE_Set_Scan_Parameters', description: '设置扫描参数' },
      { name: 'LE_Read_Buffer_Size', description: '读取缓冲区大小' },
      { name: 'Reset', description: '重置控制器' }
    ],
    packetStructure: [
      { name: 'Packet Type', size: '1 byte', description: '数据包类型', color: 'bg-orange-200' },
      { name: 'OpCode', size: '2 bytes', description: '操作码', color: 'bg-orange-300' },
      { name: 'Parameter Length', size: '1 byte', description: '参数长度', color: 'bg-orange-400' },
      { name: 'Parameters', size: 'Variable', description: '命令参数', color: 'bg-orange-500' }
    ]
  }
];

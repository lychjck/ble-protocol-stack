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
      { name: 'Service Data', size: 'Variable', description: '服务相关数据', color: 'bg-indigo-200' },
      { name: 'User Data', size: 'Variable', description: '用户自定义数据', color: 'bg-indigo-300' },
      { name: 'Application Context', size: 'Variable', description: '应用上下文信息', color: 'bg-indigo-400' }
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
      { name: 'Service Declaration', size: '2-16 bytes', description: '服务声明(UUID)', color: 'bg-blue-200' },
      { name: 'Characteristic Declaration', size: '5+ bytes', description: '特征声明', color: 'bg-blue-300' },
      { name: 'Characteristic Value', size: 'Variable', description: '特征值', color: 'bg-blue-400' },
      { name: 'Descriptor', size: '2+ bytes', description: '描述符', color: 'bg-blue-500' }
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
      { name: 'Opcode', size: '1 byte', description: 'ATT操作码(0x01-0x1D)', color: 'bg-green-200' },
      { name: 'Handle', size: '2 bytes', description: '属性句柄(0x0001-0xFFFF)', color: 'bg-green-300' },
      { name: 'UUID', size: '2/16 bytes', description: '属性类型UUID', color: 'bg-green-400' },
      { name: 'Value', size: '0-512 bytes', description: '属性值数据', color: 'bg-green-500' }
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
      { name: 'Code', size: '1 byte', description: 'SMP命令码(0x01-0x0C)', color: 'bg-red-200' },
      { name: 'IO Capability', size: '1 byte', description: 'IO能力(0x00-0x04)', color: 'bg-red-300' },
      { name: 'OOB Data Flag', size: '1 byte', description: 'OOB数据标志', color: 'bg-red-400' },
      { name: 'AuthReq', size: '1 byte', description: '认证要求位域', color: 'bg-red-500' },
      { name: 'Max Encryption Key Size', size: '1 byte', description: '最大加密密钥长度(7-16)', color: 'bg-red-600' },
      { name: 'Initiator/Responder Key Distribution', size: '1 byte', description: '密钥分发字段', color: 'bg-red-700' }
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
      { name: 'AD Length', size: '1 byte', description: 'AD结构长度(不含长度字段)', color: 'bg-purple-200' },
      { name: 'AD Type', size: '1 byte', description: 'AD类型(0x01-0xFF)', color: 'bg-purple-300' },
      { name: 'AD Data', size: '0-29 bytes', description: 'AD数据载荷', color: 'bg-purple-400' },
      { name: 'Flags', size: '1 byte', description: '设备发现模式和能力标志', color: 'bg-purple-500' },
      { name: 'Local Name', size: 'Variable', description: '完整/缩短本地名称', color: 'bg-purple-600' }
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
      { name: 'Length', size: '2 bytes', description: 'L2CAP PDU长度(不含本字段)', color: 'bg-yellow-200' },
      { name: 'Channel ID', size: '2 bytes', description: '信道标识符(CID)', color: 'bg-yellow-300' },
      { name: 'Code', size: '1 byte', description: '信令命令码(0x01-0x14)', color: 'bg-yellow-400' },
      { name: 'Identifier', size: '1 byte', description: '命令标识符', color: 'bg-yellow-500' },
      { name: 'Data Length', size: '2 bytes', description: '数据长度', color: 'bg-yellow-600' },
      { name: 'Data', size: 'Variable', description: '信令数据或用户数据', color: 'bg-yellow-700' }
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
      { name: 'Packet Type', size: '1 byte', description: 'HCI包类型(0x01-0x04)', color: 'bg-orange-200' },
      { name: 'OpCode', size: '2 bytes', description: 'HCI命令操作码(OGF+OCF)', color: 'bg-orange-300' },
      { name: 'Parameter Total Length', size: '1 byte', description: '参数总长度(0-255)', color: 'bg-orange-400' },
      { name: 'Command Parameters', size: 'Variable', description: 'HCI命令参数', color: 'bg-orange-500' },
      { name: 'Event Code', size: '1 byte', description: 'HCI事件码(仅事件包)', color: 'bg-orange-600' },
      { name: 'Event Parameters', size: 'Variable', description: 'HCI事件参数(仅事件包)', color: 'bg-orange-700' }
    ]
  },
  {
    id: 'link',
    name: 'Link Layer',
    fullName: 'Link Layer',
    description: '链路层，管理物理连接状态、数据传输和跳频控制',
    color: 'bg-slate-500',
    position: -1,
    functions: [
      '连接状态管理',
      '数据包传输',
      '跳频控制',
      '功率管理',
      '自动重传请求(ARQ)',
      '信道映射'
    ],
    commands: [
      { name: 'LL_CONNECTION_REQ', description: '链路层连接请求' },
      { name: 'LL_DATA_PDU', description: '链路层数据PDU' },
      { name: 'LL_TERMINATE_IND', description: '链路层终止指示' },
      { name: 'LL_CHANNEL_MAP_REQ', description: '链路层信道映射请求' },
      { name: 'LL_CONNECTION_UPDATE_REQ', description: '链路层连接更新请求' }
    ],
    packetStructure: [
      { name: 'Preamble', size: '1 byte', description: '前导码(0xAA或0x55)', color: 'bg-slate-200' },
      { name: 'Access Address', size: '4 bytes', description: '接入地址', color: 'bg-slate-300' },
      { name: 'PDU Header', size: '2 bytes', description: 'PDU头部(类型+长度)', color: 'bg-slate-400' },
      { name: 'Payload', size: '0-255 bytes', description: 'PDU载荷数据', color: 'bg-slate-500' },
      { name: 'CRC', size: '3 bytes', description: '循环冗余校验', color: 'bg-slate-600' }
    ]
  }
];

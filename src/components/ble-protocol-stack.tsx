import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { ChevronLeft, ChevronDown } from 'lucide-react';

interface LayerField {
  name: string;
  bits: number;
  bytes: number;
  description: string;
  color: string;
  values?: string[];
  isClickable?: boolean;
  nextLayer?: string;
}

interface ProtocolLayer {
  name: string;
  title: string;
  description: string;
  fields: LayerField[];
}

const protocolLayers: Record<string, ProtocolLayer> = {
  link: {
    name: "Link Layer",
    title: "Link Layer (链路层)",
    description: "链路层处理RF调制、数据包格式和链路管理 - 这是BLE协议栈的最底层",
    fields: [
      {
        name: "Preamble",
        bits: 8,
        bytes: 1,
        description: "前导码，用于接收器同步",
        color: "bg-blue-200 border-blue-400",
        values: ["0xAA or 0x55 - Alternating pattern"]
      },
      {
        name: "Access Address",
        bits: 32,
        bytes: 4,
        description: "接入地址，标识逻辑链路",
        color: "bg-green-200 border-green-400",
        values: ["0x8E89BED6 - Advertising", "Connection specific - Data"]
      },
      {
        name: "PDU Header",
        bits: 16,
        bytes: 2,
        description: "协议数据单元头部",
        color: "bg-yellow-200 border-yellow-400",
        values: ["PDU Type, TxAdd, RxAdd, Length"]
      },
      {
        name: "HCI层载荷",
        bits: 0,
        bytes: 0,
        description: "点击查看HCI (Host Controller Interface) 层结构",
        color: "bg-gray-300 border-gray-500",
        isClickable: true,
        nextLayer: "hci"
      },
      {
        name: "CRC",
        bits: 24,
        bytes: 3,
        description: "循环冗余校验",
        color: "bg-red-200 border-red-400",
        values: ["24-bit CRC for error detection"]
      }
    ]
  },
  hci: {
    name: "HCI",
    title: "HCI (Host Controller Interface) 层",
    description: "HCI提供主机和控制器之间的标准接口，封装在链路层载荷中",
    fields: [
      {
        name: "Packet Type",
        bits: 4,
        bytes: 0.5,
        description: "HCI包类型标识符",
        color: "bg-blue-200 border-blue-400",
        values: ["0x01 - Command", "0x02 - ACL Data", "0x04 - Event"]
      },
      {
        name: "Handle",
        bits: 12,
        bytes: 1.5,
        description: "连接句柄，标识特定的BLE连接",
        color: "bg-green-200 border-green-400",
        values: ["0x0000-0x0EFF - Valid handles"]
      },
      {
        name: "PB Flag",
        bits: 2,
        bytes: 0.25,
        description: "包边界标志位",
        color: "bg-yellow-200 border-yellow-400",
        values: ["00 - First packet", "01 - Continuing packet"]
      },
      {
        name: "BC Flag",
        bits: 2,
        bytes: 0.25,
        description: "广播标志位",
        color: "bg-purple-200 border-purple-400",
        values: ["00 - Point-to-point", "01 - Active broadcast"]
      },
      {
        name: "Data Total Length",
        bits: 16,
        bytes: 2,
        description: "HCI ACL数据包的数据总长度",
        color: "bg-red-200 border-red-400",
        values: ["0x0000-0xFFFF - Length in bytes"]
      },
      {
        name: "L2CAP层载荷",
        bits: 0,
        bytes: 0,
        description: "点击查看L2CAP (Logical Link Control) 层结构",
        color: "bg-gray-300 border-gray-500",
        isClickable: true,
        nextLayer: "l2cap"
      }
    ]
  },
  l2cap: {
    name: "L2CAP",
    title: "L2CAP (Logical Link Control and Adaptation Protocol) 层",
    description: "L2CAP提供数据包分段、重组和多路复用功能，封装在HCI数据载荷中",
    fields: [
      {
        name: "Length",
        bits: 16,
        bytes: 2,
        description: "L2CAP PDU的数据长度",
        color: "bg-blue-200 border-blue-400",
        values: ["0x0000-0xFFFF - Length in bytes"]
      },
      {
        name: "Channel ID (CID)",
        bits: 16,
        bytes: 2,
        description: "通道标识符，区分不同的协议和服务",
        color: "bg-green-200 border-green-400",
        values: ["0x0004 - Attribute Protocol", "0x0005 - LE Signaling", "0x0006 - Security Manager"]
      },
      {
        name: "ATT层载荷",
        bits: 0,
        bytes: 0,
        description: "点击查看ATT (Attribute Protocol) 层结构",
        color: "bg-gray-300 border-gray-500",
        isClickable: true,
        nextLayer: "att"
      }
    ]
  },
  att: {
    name: "ATT",
    title: "ATT (Attribute Protocol) 层",
    description: "ATT协议定义了属性数据的传输格式和操作命令，封装在L2CAP载荷中",
    fields: [
      {
        name: "Opcode",
        bits: 8,
        bytes: 1,
        description: "操作码，定义ATT操作类型",
        color: "bg-blue-200 border-blue-400",
        values: ["0x01 - Error Response", "0x0A - Read Request", "0x12 - Write Request", "0x1B - Handle Value Notification"]
      },
      {
        name: "Attribute Handle",
        bits: 16,
        bytes: 2,
        description: "属性句柄，标识特定的属性",
        color: "bg-green-200 border-green-400",
        values: ["0x0001-0xFFFF - Valid handles"]
      },
      {
        name: "GATT层载荷",
        bits: 0,
        bytes: 0,
        description: "点击查看GATT (Generic Attribute Profile) 层结构",
        color: "bg-gray-300 border-gray-500",
        isClickable: true,
        nextLayer: "gatt"
      }
    ]
  },
  gatt: {
    name: "GATT",
    title: "GATT (Generic Attribute Profile) 层",
    description: "GATT定义了BLE设备间数据交换的框架，基于属性的客户端-服务器架构 - 这是最顶层的应用协议",
    fields: [
      {
        name: "Service UUID",
        bits: 16,
        bytes: 2,
        description: "服务的唯一标识符，定义设备提供的功能",
        color: "bg-blue-200 border-blue-400",
        values: ["0x1800 - Generic Access", "0x1801 - Generic Attribute", "0x180F - Battery Service"]
      },
      {
        name: "Characteristic UUID",
        bits: 16,
        bytes: 2,
        description: "特征的唯一标识符，定义具体的数据类型",
        color: "bg-green-200 border-green-400",
        values: ["0x2A00 - Device Name", "0x2A01 - Appearance", "0x2A19 - Battery Level"]
      },
      {
        name: "Properties",
        bits: 8,
        bytes: 1,
        description: "特征的属性标志位",
        color: "bg-yellow-200 border-yellow-400",
        values: ["Read (0x02)", "Write (0x08)", "Notify (0x10)", "Indicate (0x20)"]
      },
      {
        name: "Value Handle",
        bits: 16,
        bytes: 2,
        description: "特征值的句柄",
        color: "bg-purple-200 border-purple-400",
        values: ["0x0001-0xFFFF - Handle range"]
      },
      {
        name: "Characteristic Value",
        bits: 0,
        bytes: 0,
        description: "实际的特征数据值 - 这是用户数据的最终载荷",
        color: "bg-red-200 border-red-400",
        values: ["Variable length application data"]
      }
    ]
  }
};

export function BLEProtocolStack() {
  const [currentLayer, setCurrentLayer] = useState<string>("link");
  const [layerHistory, setLayerHistory] = useState<string[]>(["link"]);
  const [selectedField, setSelectedField] = useState<LayerField | null>(null);

  const layer = protocolLayers[currentLayer];

  const handleFieldClick = (field: LayerField) => {
    if (field.isClickable && field.nextLayer) {
      setCurrentLayer(field.nextLayer);
      setLayerHistory([...layerHistory, field.nextLayer]);
      setSelectedField(null);
    } else {
      setSelectedField(field);
    }
  };

  const goToLayer = (layerName: string) => {
    const index = layerHistory.indexOf(layerName);
    if (index !== -1) {
      setCurrentLayer(layerName);
      setLayerHistory(layerHistory.slice(0, index + 1));
      setSelectedField(null);
    }
  };

  const goBack = () => {
    if (layerHistory.length > 1) {
      const newHistory = layerHistory.slice(0, -1);
      const previousLayer = newHistory[newHistory.length - 1];
      setCurrentLayer(previousLayer);
      setLayerHistory(newHistory);
      setSelectedField(null);
    }
  };

  const nonClickableFields = layer.fields.filter(field => !field.isClickable);
  const totalBytes = nonClickableFields.reduce((sum, field) => sum + field.bytes, 0);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{layer.title}</CardTitle>
              <p className="text-muted-foreground mt-2">
                {layer.description}
              </p>
            </div>
            {layerHistory.length > 1 && (
              <Button onClick={goBack} variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4 mr-2" />
                返回下层
              </Button>
            )}
          </div>
          
          {/* 面包屑导航 */}
          <Breadcrumb>
            <BreadcrumbList>
              {layerHistory.map((layerName, index) => (
                <React.Fragment key={layerName}>
                  <BreadcrumbItem>
                    {index === layerHistory.length - 1 ? (
                      <BreadcrumbPage>{protocolLayers[layerName].name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink 
                        onClick={() => goToLayer(layerName)}
                        className="cursor-pointer"
                      >
                        {protocolLayers[layerName].name}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < layerHistory.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {/* 数据包可视化 */}
            <div className="border rounded-lg p-4 bg-muted/20">
              <div className="flex flex-wrap gap-1 mb-4">
                {layer.fields.map((field, index) => {
                  const isClickable = field.isClickable;
                  const isVariable = field.bits === 0 && !isClickable;
                  let width = "auto";
                  
                  if (!isVariable && !isClickable && totalBytes > 0) {
                    const widthRatio = (field.bytes / totalBytes) * 80; // 80% for non-variable fields
                    width = `${Math.max(widthRatio, 8)}%`;
                  } else if (isVariable) {
                    width = "120px";
                  } else if (isClickable) {
                    width = "150px";
                  }
                  
                  return (
                    <div
                      key={index}
                      className={`${field.color} border-2 rounded px-2 py-1 cursor-pointer hover:opacity-80 transition-all flex-shrink-0 ${
                        isClickable ? 'hover:scale-105 shadow-lg' : ''
                      }`}
                      style={{ width }}
                      onClick={() => handleFieldClick(field)}
                    >
                      <div className="text-xs font-medium truncate flex items-center">
                        {field.name}
                        {isClickable && <ChevronDown className="w-3 h-3 ml-1" />}
                      </div>
                      <div className="text-xs text-gray-600">
                        {field.bits === 0 ? 'Variable' : `${field.bits} bits`}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* 字节标尺 */}
              {totalBytes > 0 && (
                <div className="flex text-xs text-muted-foreground mb-2">
                  {Array.from({ length: Math.ceil(totalBytes) + 1 }, (_, i) => (
                    <div key={i} className="flex-1 text-center border-r border-muted last:border-r-0">
                      {i}
                    </div>
                  ))}
                  <div className="flex-1 text-center">... bytes</div>
                </div>
              )}
            </div>

            {/* 字段详细信息 */}
            {selectedField && (
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${selectedField.color}`}></div>
                    <CardTitle>{selectedField.name}</CardTitle>
                    {selectedField.bits > 0 && (
                      <Badge variant="outline">{selectedField.bits} bits</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-3">{selectedField.description}</p>
                  {selectedField.values && selectedField.values.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">可能的值:</h4>
                      <ul className="space-y-1">
                        {selectedField.values.map((value, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            • {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* 字段列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>{layer.name}层字段</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {layer.fields.filter(field => !field.isClickable).map((field, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer"
                           onClick={() => setSelectedField(field)}>
                        <div className={`w-3 h-3 rounded ${field.color}`}></div>
                        <span className="flex-1">{field.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {field.bits === 0 ? 'Variable' : `${field.bits}bit`}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>上层载荷</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {layer.fields.filter(field => field.isClickable).map((field, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded border border-dashed hover:bg-muted/50 cursor-pointer transition-all hover:border-solid"
                           onClick={() => handleFieldClick(field)}>
                        <div className={`w-3 h-3 rounded ${field.color}`}></div>
                        <span className="flex-1">{field.name}</span>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
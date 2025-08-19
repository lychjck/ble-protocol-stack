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
    description: "GATT是一个应用层协议框架，定义了基于属性的客户端-服务器架构。它不是一个具体的数据包格式，而是定义了服务、特征等概念模型，实际数据传输通过ATT协议完成。",
    fields: [
      {
        name: "服务 (Service)",
        bits: 0,
        bytes: 0,
        description: "服务是一组相关功能的集合，由UUID标识",
        color: "bg-blue-100 border-blue-300",
        values: ["Generic Access Service (0x1800)", "Generic Attribute Service (0x1801)", "Battery Service (0x180F)", "Heart Rate Service (0x180D)"]
      },
      {
        name: "特征 (Characteristic)",
        bits: 0,
        bytes: 0,
        description: "特征是服务中的具体数据项，包含属性、句柄和值",
        color: "bg-green-100 border-green-300",
        values: ["Device Name (0x2A00)", "Appearance (0x2A01)", "Battery Level (0x2A19)", "Heart Rate Measurement (0x2A37)"]
      },
      {
        name: "属性 (Attribute)",
        bits: 0,
        bytes: 0,
        description: "属性是GATT数据库中的基本单元，每个属性有句柄、类型和值",
        color: "bg-yellow-100 border-yellow-300",
        values: ["Handle: 0x0001-0xFFFF", "Type: UUID", "Value: Variable length data", "Permissions: Read/Write/Notify/Indicate"]
      },
      {
        name: "描述符 (Descriptor)",
        bits: 0,
        bytes: 0,
        description: "描述符提供特征的额外信息，如配置和格式描述",
        color: "bg-purple-100 border-purple-300",
        values: ["Client Characteristic Configuration (0x2902)", "Characteristic User Description (0x2901)", "Characteristic Format (0x2904)"]
      },
      {
        name: "应用数据",
        bits: 0,
        bytes: 0,
        description: "实际的应用层数据，通过ATT协议在特征值中传输",
        color: "bg-red-100 border-red-300",
        values: ["传感器数据", "控制命令", "状态信息", "配置参数"]
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
            {currentLayer === 'gatt' ? (
              // GATT层特殊显示 - 概念框架而非字节结构
              <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-green-50">
                <div className="text-center mb-4">
                  <h3 className="font-medium text-lg">GATT应用层框架</h3>
                  <p className="text-sm text-muted-foreground">
                    GATT不是PDU层，而是定义如何使用ATT协议的概念框架
                  </p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {layer.fields.map((field, index) => (
                    <div
                      key={index}
                      className={`${field.color} border-2 rounded p-3 cursor-pointer hover:opacity-80 transition-all h-24 flex flex-col`}
                      onClick={() => handleFieldClick(field)}
                    >
                      <div className="font-medium text-sm mb-2 flex-shrink-0">{field.name}</div>
                      <div className="text-xs text-gray-600 flex-1 overflow-hidden">
                        {field.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // 其他层的正常字节结构显示
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
                  <div className="flex gap-1 text-xs text-muted-foreground mb-2">
                    {layer.fields.map((field, index) => {
                      const isClickable = field.isClickable;
                      const isVariable = field.bits === 0 && !isClickable;
                      let width = "auto";
                      
                      if (!isVariable && !isClickable && totalBytes > 0) {
                        const widthRatio = (field.bytes / totalBytes) * 80;
                        width = `${Math.max(widthRatio, 8)}%`;
                      } else if (isVariable) {
                        width = "120px";
                      } else if (isClickable) {
                        width = "150px";
                      }
                      
                      // 计算当前字段的起始字节位置
                      let startByte = 0;
                      for (let i = 0; i < index; i++) {
                        const prevField = layer.fields[i];
                        if (!prevField.isClickable && prevField.bits > 0) {
                          startByte += prevField.bytes;
                        }
                      }
                      
                      if (isClickable || isVariable) {
                        return <div key={index} style={{ width }} className="text-center"></div>;
                      }
                      
                      // 为固定大小字段显示字节标尺
                      const byteCount = Math.ceil(field.bytes);
                      return (
                        <div key={index} style={{ width }} className="flex">
                          {Array.from({ length: byteCount }, (_, i) => (
                            <div key={i} className="flex-1 text-center border-r border-gray-300 last:border-r-0">
                              {startByte + i}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

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
                  <CardTitle>
                    {currentLayer === 'gatt' ? '数据载荷' : '上层载荷'}
                  </CardTitle>
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
                    {currentLayer === 'gatt' && (
                      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                        <p className="text-xs text-blue-700">
                          💡 GATT层不是实际的数据包层，而是定义如何组织和解释ATT属性数据的应用框架。
                          实际的数据仍然通过ATT协议传输。
                        </p>
                      </div>
                    )}
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
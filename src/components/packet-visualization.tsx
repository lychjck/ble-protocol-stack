import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BLELayer, PacketField } from '../types/ble-stack';
import { useState } from 'react';

interface PacketVisualizationProps {
  layers: BLELayer[];
}

interface PacketFieldVisualizationProps {
  field: PacketField;
  index: number;
  totalFields: number;
}

function PacketFieldVisualization({ field, index, totalFields }: PacketFieldVisualizationProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // 根据字段大小计算相对宽度
  const getFieldWidth = (size: string) => {
    if (size.includes('Variable')) return 'flex-grow';
    if (size.includes('1 byte')) return 'w-16';
    if (size.includes('2 bytes')) return 'w-24';
    if (size.includes('3 bytes')) return 'w-32';
    if (size.includes('4 bytes')) return 'w-40';
    if (size.includes('16 bytes')) return 'w-48';
    return 'w-20';
  };

  const fieldWidth = getFieldWidth(field.size);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`
              ${field.color} 
              ${fieldWidth === 'flex-grow' ? 'flex-1 min-w-[80px]' : fieldWidth}
              h-12 
              border-2 border-white 
              flex items-center justify-center 
              text-white text-xs font-medium 
              cursor-pointer 
              transition-all duration-200
              ${isHovered ? 'scale-105 shadow-lg z-10 relative' : ''}
              ${index === 0 ? 'rounded-l-lg' : ''}
              ${index === totalFields - 1 ? 'rounded-r-lg' : ''}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="text-center">
              <div className="font-semibold">{field.name}</div>
              <div className="text-xs opacity-90">{field.size}</div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <div className="font-semibold">{field.name}</div>
            <div className="text-sm">
              <span className="font-medium">大小:</span> {field.size}
            </div>
            <div className="text-sm">{field.description}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function PacketVisualization({ layers }: PacketVisualizationProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">BLE数据包结构可视化</h2>
        <p className="text-slate-600">鼠标悬停在字段上查看详细信息</p>
      </div>

      <div className="grid gap-8">
        {layers.sort((a, b) => b.position - a.position).map((layer) => (
          <Card key={layer.id} className="overflow-hidden shadow-lg">
            <CardHeader className={`${layer.color} text-white`}>
              <CardTitle className="flex items-center justify-between">
                <div>
                  <span className="text-lg">{layer.name} 数据包结构</span>
                  <div className="text-sm opacity-90 mt-1">{layer.fullName}</div>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Position {layer.position}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* 可视化数据包结构 */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                    <span>数据包结构图</span>
                    <span className="text-sm text-slate-500">(按字节顺序排列)</span>
                  </h4>
                  
                  {/* 字节位置标尺 */}
                  <div className="flex items-center text-xs text-slate-400 mb-2">
                    <div className="w-8 text-center">0</div>
                    <div className="flex-1 border-t border-dashed border-slate-300 mx-2"></div>
                    <div className="text-center">字节位置</div>
                    <div className="flex-1 border-t border-dashed border-slate-300 mx-2"></div>
                    <div className="w-8 text-center">N</div>
                  </div>

                  {/* 数据包字段可视化 */}
                  <div className="bg-slate-50 p-4 rounded-lg border-2 border-slate-200">
                    <div className="flex items-stretch gap-0 overflow-x-auto min-h-[60px]">
                      {layer.packetStructure.map((field, index) => (
                        <PacketFieldVisualization
                          key={index}
                          field={field}
                          index={index}
                          totalFields={layer.packetStructure.length}
                        />
                      ))}
                    </div>
                  </div>

                  {/* 字段说明表格 */}
                  <div className="mt-6">
                    <h5 className="font-semibold text-slate-800 mb-3">字段详细说明</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2 px-3 font-semibold text-slate-700">字段名</th>
                            <th className="text-left py-2 px-3 font-semibold text-slate-700">大小</th>
                            <th className="text-left py-2 px-3 font-semibold text-slate-700">描述</th>
                          </tr>
                        </thead>
                        <tbody>
                          {layer.packetStructure.map((field, index) => (
                            <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                              <td className="py-2 px-3">
                                <div className="flex items-center gap-2">
                                  <div className={`w-4 h-4 rounded ${field.color}`}></div>
                                  <span className="font-medium">{field.name}</span>
                                </div>
                              </td>
                              <td className="py-2 px-3">
                                <Badge variant="secondary" className="font-mono text-xs">
                                  {field.size}
                                </Badge>
                              </td>
                              <td className="py-2 px-3 text-slate-600">{field.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                {/* 协议说明 */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <span>协议层说明</span>
                  </h5>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    {layer.description}
                  </p>
                </div>

                {/* 关键命令 */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-semibold text-green-800 mb-3">关键命令示例</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {layer.commands.slice(0, 4).map((command, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className="text-xs font-mono">
                          {command.name}
                        </Badge>
                        <span className="text-green-700 text-xs">{command.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

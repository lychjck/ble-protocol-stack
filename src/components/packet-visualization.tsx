import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BLELayer } from '../types/ble-stack';

interface PacketVisualizationProps {
  layers: BLELayer[];
}

export function PacketVisualization({ layers }: PacketVisualizationProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">BLE数据包结构可视化</h2>
        <p className="text-slate-600">各协议层的典型数据包格式和字段说明</p>
      </div>

      <div className="grid gap-6">
        {layers.sort((a, b) => b.position - a.position).map((layer) => (
          <Card key={layer.id} className="overflow-hidden">
            <CardHeader className={`${layer.color} text-white`}>
              <CardTitle className="flex items-center justify-between">
                <span>{layer.name} 数据包结构</span>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Layer {layer.position}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* 数据包字段可视化 */}
                <div className="border rounded-lg p-4 bg-slate-50">
                  <div className="grid gap-2">
                    {layer.packetStructure.map((field, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`${field.color} text-white px-3 py-2 rounded-lg min-w-[120px] text-center text-sm font-medium`}>
                          {field.name}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <Badge variant="secondary" className="font-mono">
                              {field.size}
                            </Badge>
                            <span className="text-slate-600">{field.description}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-2">协议说明</h5>
                  <p className="text-sm text-blue-700">
                    {layer.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
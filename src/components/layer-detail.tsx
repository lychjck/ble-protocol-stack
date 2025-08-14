import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BLELayer } from '../types/ble-stack';

interface LayerDetailProps {
  layer: BLELayer;
}

export function LayerDetail({ layer }: LayerDetailProps) {
  return (
    <div className="space-y-6">
      {/* 核心功能 */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-3">核心功能</h3>
        <div className="grid gap-3">
          {layer.functions.map((func, index) => (
            <Card key={index} className="p-4">
              <h4 className="font-medium text-slate-700 mb-2">{func}</h4>
              <p className="text-sm text-slate-600">
                {layer.name}层的{func}功能实现
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* 关键命令 */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-3">关键命令</h3>
        <div className="flex flex-wrap gap-2">
          {layer.commands.map((command, index) => (
            <div key={index} className="mb-2">
              <Badge variant="outline" className="text-sm mb-1">
                {command.name}
              </Badge>
              <p className="text-xs text-slate-600">{command.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 数据包结构 */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-3">典型数据包结构</h3>
        <Card className="p-4 bg-slate-50">
          <div className="space-y-2">
            {layer.packetStructure.map((field, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-slate-600">{field.name}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{field.size}</Badge>
                  <span className="text-xs text-slate-500">{field.description}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronDown, ChevronRight, Layers, Command, Package, Info } from 'lucide-react';
import { BLE_LAYERS, BLELayer } from './types/ble-stack';
import { LayerDetail } from './components/layer-detail';
import { ProtocolStackOverview } from './components/protocol-stack-overview';
import { PacketVisualization } from './components/packet-visualization';

function App() {
  const [selectedLayer, setSelectedLayer] = useState<BLELayer | null>(null);
  const [expandedLayers, setExpandedLayers] = useState<Set<string>>(new Set());

  const toggleLayerExpansion = (layerId: string) => {
    const newExpanded = new Set(expandedLayers);
    if (newExpanded.has(layerId)) {
      newExpanded.delete(layerId);
    } else {
      newExpanded.add(layerId);
    }
    setExpandedLayers(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
            <Layers className="h-10 w-10 text-blue-600" />
            BLE协议栈可视化
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            交互式蓝牙低功耗协议栈层次结构展示，深入了解每层的功能、命令和数据包结构
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              协议栈总览
            </TabsTrigger>
            <TabsTrigger value="layers" className="flex items-center gap-2">
              <Command className="h-4 w-4" />
              分层详情
            </TabsTrigger>
            <TabsTrigger value="packets" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              数据包结构
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ProtocolStackOverview />
          </TabsContent>

          <TabsContent value="layers">
            <div className="grid gap-6">
              {BLE_LAYERS.sort((a, b) => b.position - a.position).map((layer) => (
                <Card key={layer.id} className="overflow-hidden">
                  <CardHeader 
                    className={`${layer.color} text-white cursor-pointer`}
                    onClick={() => toggleLayerExpansion(layer.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-3">
                          {layer.name} - {layer.fullName}
                          <Badge variant="secondary" className="bg-white/20 text-white">
                            Layer {layer.position}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-white/90 mt-2">
                          {layer.description}
                        </CardDescription>
                      </div>
                      {expandedLayers.has(layer.id) ? 
                        <ChevronDown className="h-6 w-6" /> : 
                        <ChevronRight className="h-6 w-6" />
                      }
                    </div>
                  </CardHeader>
                  
                  {expandedLayers.has(layer.id) && (
                    <CardContent className="p-6">
                      <LayerDetail layer={layer} />
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="packets">
            <PacketVisualization layers={BLE_LAYERS} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
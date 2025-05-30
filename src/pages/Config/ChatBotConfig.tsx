
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bot, Save } from 'lucide-react';

const ChatBotConfig = () => {
  const { toast } = useToast();
  
  const [greetingStyles, setGreetingStyles] = useState(`🤖 ¡Hola sobring! Soy el Tío Lefón, ¿con hambre? ¡Te ayudo a elegir lo más rico!
🤖 ¿Qué tal, sobring? Aquí el Tío Lefón, listo para servirte lo mejor de la casa.
🤖 ¡Bienvenid@ a Lefón, sobring! ¿Qué se te antoja hoy?
🤖 ¡Hola sobring! El Tío Lefón está listo para tomar tu pedido. ¡Vamos con hambre!
🤖 ¡Qué gusto verte por aquí, sobring! ¿Vamos por unas alitas o un Mega Lefón?`);

  const [communicationStyle, setCommunicationStyle] = useState(`- Usa siempre un tono familiar y cariñoso.
- Trata a los clientes como "sobring".
- Usa frases características como:
  * "¡Hola sobring! Soy el Tío Lefón."
  * "¿Deseas agregar algo más, sobring?"
  * "Tranquil@, sobring, ahora consultamos."
  * "¡Listo, sobring!"`);

  const handleSaveConfiguration = () => {
    // Aquí se podría implementar la lógica para guardar la configuración
    console.log('Guardando configuración del ChatBot:', {
      greetingStyles,
      communicationStyle
    });
    
    toast({
      title: "Configuración Guardada",
      description: "La configuración del ChatBot ha sido guardada exitosamente.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Configuración del Bot</h1>
        <p className="text-gray-600">Personaliza el estilo de comunicación y saludos de tu bot de WhatsApp</p>
      </div>

      <div className="grid gap-6">
        {/* Estilo de Saludos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Bot className="h-5 w-5" />
              Estilo de Saludos
            </CardTitle>
            <CardDescription>
              Define diferentes mensajes de saludo que el bot utilizará al iniciar conversaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={greetingStyles}
              onChange={(e) => setGreetingStyles(e.target.value)}
              placeholder="Ingresa diferentes estilos de saludo, uno por línea..."
              className="min-h-[200px] font-mono text-sm bg-gray-50 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
              rows={8}
            />
            <p className="text-sm text-gray-500 mt-2">
              Tip: Usa emojis 🤖 para hacer los saludos más amigables
            </p>
          </CardContent>
        </Card>

        {/* Estilo de Comunicación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Bot className="h-5 w-5" />
              Estilo de Comunicación
            </CardTitle>
            <CardDescription>
              Establece las reglas y características del tono de comunicación del bot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={communicationStyle}
              onChange={(e) => setCommunicationStyle(e.target.value)}
              placeholder="Define el estilo de comunicación del bot..."
              className="min-h-[250px] font-mono text-sm bg-gray-50 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
              rows={10}
            />
            <p className="text-sm text-gray-500 mt-2">
              Define reglas claras sobre el tono, términos específicos y características de personalidad
            </p>
          </CardContent>
        </Card>

        {/* Botón Guardar */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSaveConfiguration}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-medium"
          >
            <Save className="mr-2 h-5 w-5" />
            Guardar Configuración
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotConfig;

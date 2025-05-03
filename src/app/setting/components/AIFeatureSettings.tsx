"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Sparkles, Loader2, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"

export function AIFeatureSettings() {
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)
  
  // AI preferences state
  const [enableAI, setEnableAI] = useState(true)
  const [aiModel, setAiModel] = useState("gpt-4")
  const [creativity, setCreativity] = useState(70)
  const [autocomplete, setAutocomplete] = useState(true)
  const [suggestions, setSuggestions] = useState(true)
  const [dataCollection, setDataCollection] = useState(false)
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false)

  const handleCreativityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreativity(Number(e.target.value))
  }

  const handleSavePreferences = () => {
    setIsUpdating(true)

    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)
      toast({
        title: "AI preferences updated",
        description: "Your AI preferences have been updated successfully.",
      })
    }, 1500)
  }

  const handleModelSelect = (model: string) => {
    setAiModel(model)
    setIsModelDropdownOpen(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white">AI Features</h3>
        <p className="text-sm text-gray-400">Configure your AI assistant and preferences.</p>
      </div>
      <Separator className="bg-zinc-800" />

      <div className="grid gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-white">AI Assistant Configuration</CardTitle>
            </div>
            <CardDescription className="text-gray-400">
              Customize how the AI assistant works for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-ai" className="text-gray-300">Enable AI Features</Label>
                <p className="text-sm text-gray-400">Turn AI assistance on or off globally.</p>
              </div>
              <Switch 
                id="enable-ai" 
                checked={enableAI} 
                onCheckedChange={setEnableAI} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ai-model" className="text-gray-300">AI Model</Label>
              <div className="relative">
                <button
                  type="button"
                  disabled={!enableAI}
                  className={`flex items-center justify-between w-full px-3 py-2 text-left rounded-md ${!enableAI ? 'bg-zinc-800/50 text-gray-500' : 'bg-zinc-800'} border border-zinc-700`}
                  onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                >
                  <span>
                    {aiModel === "gpt-4" && "GPT-4 (Recommended)"}
                    {aiModel === "gpt-3.5" && "GPT-3.5 Turbo"}
                    {aiModel === "claude" && "Claude 3 Opus"}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isModelDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-md shadow-lg">
                    <div 
                      className="py-2 px-3 hover:bg-zinc-700 cursor-pointer"
                      onClick={() => handleModelSelect("gpt-4")}
                    >
                      GPT-4 (Recommended)
                    </div>
                    <div 
                      className="py-2 px-3 hover:bg-zinc-700 cursor-pointer"
                      onClick={() => handleModelSelect("gpt-3.5")}
                    >
                      GPT-3.5 Turbo
                    </div>
                    <div 
                      className="py-2 px-3 hover:bg-zinc-700 cursor-pointer"
                      onClick={() => handleModelSelect("claude")}
                    >
                      Claude 3 Opus
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-400">More advanced models provide better results but may be slower.</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="creativity" className="text-gray-300">Creativity Level</Label>
                <p className="text-sm text-gray-400 mb-2">Adjust how creative the AI responses should be.</p>
                <Input
                  id="creativity"
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={creativity}
                  onChange={handleCreativityChange}
                  disabled={!enableAI}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-400">
                  <span>Precise</span>
                  <span>Balanced</span>
                  <span>Creative</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-zinc-800 pt-4">
              <Label className="text-gray-300 mb-2 block">Feature Settings</Label>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autocomplete" className="text-gray-300">Code Autocomplete</Label>
                  <p className="text-sm text-gray-400">Get real-time code suggestions as you type.</p>
                </div>
                <Switch 
                  id="autocomplete" 
                  disabled={!enableAI}
                  checked={autocomplete} 
                  onCheckedChange={setAutocomplete}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="suggestions" className="text-gray-300">Smart Suggestions</Label>
                  <p className="text-sm text-gray-400">Receive contextual recommendations based on your code.</p>
                </div>
                <Switch 
                  id="suggestions" 
                  disabled={!enableAI}
                  checked={suggestions} 
                  onCheckedChange={setSuggestions}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-collection" className="text-gray-300">Improve AI with my data</Label>
                  <p className="text-sm text-gray-400">Allow anonymized data collection to improve the AI.</p>
                </div>
                <Switch 
                  id="data-collection" 
                  disabled={!enableAI}
                  checked={dataCollection} 
                  onCheckedChange={setDataCollection}
                />
              </div>
            </div>

            <Button 
              onClick={handleSavePreferences} 
              disabled={isUpdating || !enableAI}
              className="w-full mt-4"
            >
              {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isUpdating ? "Updating..." : "Save Preferences"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
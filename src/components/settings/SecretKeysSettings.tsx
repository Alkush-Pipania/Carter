"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Eye, EyeOff, Copy } from "lucide-react"
import { API_ENDPOINTS } from "@/services/apiEndpoints"
import { getCarter } from "@/services/API_Services"

export function SecretKeysSettings() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [secretKeys, setSecretKeys] = useState<Array<{
    name: string;
    secret_key: string;
    created_at: string;
  }>>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSecretKeys = async () => {
      try {
        setIsLoading(true)
        // Get userId from localStorage or another source
        const userId = localStorage.getItem('userId') || '1' // Default to '1' if not available
        const response = await getCarter(API_ENDPOINTS.SecretKeys, { userId })
        // console.log(response.data)
        if (response.data) {
          setSecretKeys(Array.isArray(response.data) ? response.data : [response.data])
        }
      } catch (error) {
        console.error("Error fetching secret keys:", error)
        toast.error("Failed to fetch secret keys")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSecretKeys()
  }, [])

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("The Secret ID has been copied to your clipboard.")
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-slate-800 dark:text-white transition-colors">Secret Keys</h3>
        <p className="text-sm text-slate-500 dark:text-gray-400 transition-colors">Manage your Secret IDs and other secret credentials.</p>
      </div>
      <Separator className="bg-slate-200 dark:bg-zinc-800 transition-colors" />

      <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-sm transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-800 dark:text-white text-lg transition-colors">Secret ID</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-4 text-center text-slate-500 dark:text-gray-400 transition-colors">Loading secret keys...</div>
          ) : secretKeys.length === 0 ? (
            <div className="py-4 text-center text-slate-500 dark:text-gray-400 transition-colors">No secret keys found</div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="min-w-full border-separate border-spacing-0">
                <thead className="hidden md:table-header-group">
                  <tr>
                    <th className="text-left py-3 text-slate-500 dark:text-gray-400 font-medium text-sm w-1/5 px-4 transition-colors">Name</th>
                    <th className="text-left py-3 text-slate-500 dark:text-gray-400 font-medium text-sm w-2/5 px-4 transition-colors">Key</th>
                    <th className="text-left py-3 text-slate-500 dark:text-gray-400 font-medium text-sm w-1/5 px-4 transition-colors">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-zinc-800 transition-colors">
                  {secretKeys.map((secretKey, index) => (
                    <tr key={index} className="group">
                      {/* Mobile View */}
                      <td className="md:hidden px-4 py-3 space-y-2" colSpan={5}>
                        <div className="flex items-center gap-2">
                          <div className="key-container relative rounded bg-slate-100 dark:bg-zinc-800 px-1.5 py-1 font-mono text-sm overflow-hidden w-[180px] transition-colors">
                            <div className="overflow-x-auto custom-scrollbar">
                              <code className="whitespace-nowrap text-text-primary inline-block">
                                {showKeys[index.toString()]
                                  ? secretKey.secret_key
                                  : secretKey.secret_key.substring(0, 10) + "•••••••••••••••••"}
                              </code>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="hover:bg-transparent" onClick={() => toggleKeyVisibility(index.toString())}>
                            {showKeys[index.toString()] ? <EyeOff className="h-4 text-text-primary hover:text-white w-4" /> : <Eye className="h-4 w-4 text-text-primary hover:text-white" />}
                          </Button>
                          <Button variant="ghost" size="icon" className="hover:bg-transparent " onClick={() => copyToClipboard(secretKey.secret_key)}>
                            <Copy className="h-4 text-text-primary hover:text-white w-4" />
                          </Button>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-gray-400 space-y-1 transition-colors">
                          <div>Name: {secretKey.name}</div>
                          <div>Created: {new Date(secretKey.created_at).toLocaleDateString()}</div>
                        </div>
                      </td>

                      {/* Desktop View */}
                      <td className="hidden md:table-cell px-4 py-3 font-medium text-slate-800 dark:text-white border-b border-slate-200 dark:border-zinc-800 transition-colors">
                        {secretKey.name}
                      </td>
                      <td className="hidden md:table-cell px-4 py-3 border-b border-slate-200 dark:border-zinc-800 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="key-container relative rounded bg-slate-100 dark:bg-zinc-800 px-1.5 py-1 font-mono text-sm overflow-hidden w-[300px] transition-colors">
                            <div className="overflow-x-auto custom-scrollbar">
                              <code className="whitespace-nowrap text-text-primary inline-block">
                                {showKeys[index.toString()]
                                  ? secretKey.secret_key
                                  : secretKey.secret_key.substring(0, 10) + "•••••••••••••••••"}
                              </code>
                            </div>
                          </div>
                          <Button variant="ghost" className="hover:bg-transparent" size="icon" onClick={() => toggleKeyVisibility(index.toString())}>
                            {showKeys[index.toString()] ? <EyeOff className="h-4 text-text-primary hover:text-white w-4" /> : <Eye className="h-4 text-text-primary hover:text-white w-4" />}
                          </Button>
                          <Button variant="ghost" className="hover:bg-transparent" size="icon" onClick={() => copyToClipboard(secretKey.secret_key)}>
                            <Copy className="h-4 w-4 text-text-primary hover:text-white" />
                          </Button>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-4 py-3 text-sm text-slate-600 dark:text-gray-300 border-b border-slate-200 dark:border-zinc-800 transition-colors">
                        {new Date(secretKey.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 1px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }
        .custom-scrollbar code {
          padding-bottom: 3px;
        }
      `}</style>
    </div>
  )
} 
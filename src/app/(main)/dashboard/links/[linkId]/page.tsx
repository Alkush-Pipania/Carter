
import { Suspense } from "react"
import { Card, CardContent} from "@/components/ui/card"
import { LinkDetailsSkeleton } from "./_components/LinkDetailsSkeleton"
import { PageHeader } from "./_components/PageHeader"
import { LinkDisplay } from "./_components/LinkDisplay"

export default async function EditLinkPage( {
  params,
}:{
  params: Promise<{linkId: string}>,
}) {
  
  const { linkId } = await params;

  return (
    <main className="w-full px-4 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader title="Link Details" description="View your link information" />
        <Card className="mt-4 sm:mt-6 bg-white dark:bg-zinc-900 border-slate-200 dark:border-gray-500 shadow-md dark:shadow-lg transition-colors">
          
          <CardContent>
            <Suspense fallback={<LinkDetailsSkeleton />}>
              <LinkDetails linkId={linkId}  />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

async function LinkDetails({ linkId,  }: { linkId: string; }) {
  return <LinkDisplay linkId={linkId}  />
}
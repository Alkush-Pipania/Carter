import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { authOption } from "@/lib/auth"
import { LinkDetailsSkeleton } from "./_components/LinkDetailsSkeleton"
import { PageHeader } from "./_components/PageHeader"
import { LinkDisplay } from "./_components/LinkDisplay"

export default async function EditLinkPage( {
  params,
}:{
  params: Promise<{linkId: string}>,
}) {
  const session = await getServerSession(authOption)
  if (!session) {
    redirect("/login")
  }
  const { linkId } = await params;

  return (
    <main className="w-full px-4 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader title="Link Details" description="View your link information" backHref="/dashboard" />
        <Card className="mt-4 sm:mt-6 bg-brand/brand-dark/60 backdrop-blur-md border-brand/brand-primaryblue/30 shadow-lg">
          
          <CardContent>
            <Suspense fallback={<LinkDetailsSkeleton />}>
              <LinkDetails linkId={linkId} userId={session.user.id} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

async function LinkDetails({ linkId, userId }: { linkId: string; userId: any }) {
  return <LinkDisplay linkId={linkId} userId={userId} />
}
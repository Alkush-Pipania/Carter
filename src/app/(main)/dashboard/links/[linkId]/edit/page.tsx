import { Suspense } from "react"
import { notFound, redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { authOption } from "@/lib/auth"
import { LinkDetailsSkeleton } from "./_components/LinkDetailsSkeleton"
import { PageHeader } from "./_components/PageHeader"
import { LinkDetailsForm } from "./_components/LinkDetailsForm"
import { linkformdetail } from "@/server/actions/links"

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
  console.log(session.user.id)

  return (
    <main className="container mx-auto px-4 py-8">
      <PageHeader title="Edit Link" description="Update your link details" backHref="/dashboard" />
      <Card className="mt-8 bg-zinc-950 text-white">
        <CardHeader>
          <CardTitle>Link Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<LinkDetailsSkeleton />}>
            <LinkDetails linkId={linkId} userId={session.user.id} />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  )
}

async function LinkDetails({ linkId, userId }: { linkId: string; userId: any }) {
  const linkDetails = await linkformdetail(linkId , userId);
 

  return <LinkDetailsForm initialData={linkDetails.data} />
}
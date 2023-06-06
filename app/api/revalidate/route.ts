import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {

  const tag:string = request.nextUrl.searchParams.get('tag') || ''

  revalidatedTag(tag)
  return NextResponse.json({revalidated: true, now: Date.now()})
}
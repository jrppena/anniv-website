import { NextResponse } from "next/server"

export const runtime = "nodejs"

interface CloudinaryResource {
  secure_url: string
  public_id: string
  created_at?: string
}

interface GalleryImage {
  url: string
  caption: string
  year: string
}

const formatCaption = (publicId: string) => {
  const fileName = publicId.split("/").pop() ?? publicId
  return fileName
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export async function GET() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  const folder = process.env.CLOUDINARY_FOLDER

  if (!cloudName || !apiKey || !apiSecret || !folder) {
    return NextResponse.json({ images: [] })
  }

  try {
    const allResources: CloudinaryResource[] = []
    let nextCursor: string | undefined

    do {
      const params = new URLSearchParams({
        type: "upload",
        resource_type: "image",
        prefix: `${folder}/`,
        max_results: "100",
      })

      if (nextCursor) {
        params.set("next_cursor", nextCursor)
      }

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload?${params.toString()}`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
          },
          cache: "no-store",
        }
      )

      if (!response.ok) {
        throw new Error(`Cloudinary request failed with ${response.status}`)
      }

      const data = (await response.json()) as {
        resources?: CloudinaryResource[]
        next_cursor?: string
      }

      allResources.push(...(data.resources ?? []))
      nextCursor = data.next_cursor
    } while (nextCursor && allResources.length < 300)

    const images: GalleryImage[] = allResources
      .sort((a, b) => {
        const aDate = a.created_at ? new Date(a.created_at).getTime() : 0
        const bDate = b.created_at ? new Date(b.created_at).getTime() : 0
        return bDate - aDate
      })
      .map((resource) => ({
        url: resource.secure_url,
        caption: formatCaption(resource.public_id),
        year: "Our Memory",
      }))

    return NextResponse.json({ images })
  } catch {
    return NextResponse.json({ images: [] }, { status: 200 })
  }
}

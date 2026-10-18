import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image');
    const prompt = formData.get('prompt') || "Make this image animate smoothly";

    if (!imageFile) {
      return NextResponse.json({ error: "សូមជ្រើសរើសរូបភាព" }, { status: 400 });
    }

    // បំប្លែងរូបភាពទៅជា Base64
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');

    // ហៅទៅកាន់ API របស់ 1min.ai
    const response = await fetch('https://1min.ai', {
      method: 'POST',
      headers: {
        'API-KEY': process.env.NEXT_PUBLIC_MIN_AI_KEY, // លាក់ Key ក្នុង Environment Variable របស់ Vercel
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: `data:${imageFile.type};base64,${base64Image}`,
        prompt: prompt,
        duration: 5
      })
    });

    const data = await response.json();

    if (data && data.url) {
      return NextResponse.json({ videoUrl: data.url });
    } else {
      return NextResponse.json({ error: "AI មិនបានផ្ដល់តំណភ្ជាប់វីដេអូមកទេ" }, { status: 500 });
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "មានកំហុសបច្ចេកទេសខាងក្នុង Server" }, { status: 500 });
  }
}


import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const PROMPTS: Record<string, (ctx: Record<string, string>) => string> = {
  consent_letter: (ctx) => `
You are writing on behalf of Urban News, PPP TV Kenya. Write a professional parental consent letter for ${ctx.schoolName || "[School Name]"} addressed to parents/guardians.
The letter should:
- Be from Urban News / PPP TV Kenya
- Explain that Urban Tour is a high school talent search show broadcast to 400,000+ daily viewers
- Request consent for their child to appear on national television
- Mention the event is free, prizes include certificates and gift hampers
- Be signed by Eugine Micah (Host & Head of Digital Operations) and Lucy Ogunde (Co-Host)
- Be professional but warm
${ctx.principalName ? `- The school principal is ${ctx.principalName}` : ""}
${ctx.notes ? `- Additional context: ${ctx.notes}` : ""}
Write the full letter, ready to print.`,

  outreach_email: (ctx) => `
You are writing on behalf of Urban News, PPP TV Kenya. Write a professional outreach email to ${ctx.schoolName || "[School Name]"}.
Context: ${ctx.contactContext || "Cold outreach — school has not been contacted before."}
${ctx.principalName ? `Principal: ${ctx.principalName}` : ""}
${ctx.notes ? `Notes: ${ctx.notes}` : ""}
The email should:
- Apologize for any delay if this is a follow-up
- Introduce Urban Tour: High School Talent Search on PPP TV Kenya
- Emphasize zero cost to the school
- Mention national TV exposure (400,000+ daily viewers)
- Mention student prizes (certificates, gift hampers) and principal recognition certificate
- Request a 15-minute meeting to finalize dates
- Be signed by Eugine Micah and Lucy Ogunde
- End with "Regards" only
Write the full email with subject line.`,

  pitch_document: (_ctx) => `
Write a full partnership pitch document for Urban Tour: High School Talent Search by Urban News on PPP TV Kenya.
Include:
- Introduction to Urban News and PPP TV Kenya (400,000+ daily viewers, 775K YouTube subscribers)
- What Urban Tour is: a professional TV production visiting one school at a time, students compete in talent categories
- Talent categories: Choir, Gospel, Poetry, Drama, Rap, Dance, Modeling
- What the school gets: zero cost, national TV exposure, professional media coverage, social media spotlight, student prizes (certificates + gift hampers), principal's framed Certificate of Recognition
- What Urban News brings: full camera crew, DJ, sound system, hosts Eugine Micah and Lucy Ogunde
- What the school needs to provide: venue, permission, coordination
- The 7-hour programme overview
- Next steps to partner
Make it energetic, professional, and compelling.`,

  partnership_email: (ctx) => `
Write a general partnership/sponsorship email from Urban News on PPP TV Kenya to ${ctx.partnerName || "a potential sponsor/partner"}.
${ctx.notes ? `Context: ${ctx.notes}` : ""}
The email should:
- Introduce Urban Tour: High School Talent Search
- Highlight the reach: PPP TV (400,000+ daily viewers), social media, YouTube
- Explain the sponsorship opportunity: brand visibility at school events, on-air mentions, social media features
- Be professional and compelling
- Be signed by Eugine Micah
- End with "Regards"
Write the full email with subject line.`,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { docType, context = {} } = body as { docType: string; context: Record<string, string> };

    const promptFn = PROMPTS[docType];
    if (!promptFn) return NextResponse.json({ error: "Unknown document type" }, { status: 400 });

    const prompt = promptFn(context);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "AI generation failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

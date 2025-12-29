import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();
  console.log(email);

  const resend = new Resend(process.env.RESEND_API_KEY);

  // 1. create a account
  const { error: createError } = await resend.contacts.create({
    email: email,
  });

  if (createError) {
    console.log(createError)
    return NextResponse.json({ error: createError.message }, { status: 500 });
  }

  // 2. add account to contact list
  const { error: addError } = await resend.contacts.segments.add({
    email,
    segmentId: "157a5a0d-546d-4a42-961b-76fe401bfb16"
  });

  if (addError) {
    console.log(addError)
    return NextResponse.json({ error: addError.message }, { status: 500 });
  }

  return NextResponse.json({message: ' Scribed successfully '}, {status: 200});
}
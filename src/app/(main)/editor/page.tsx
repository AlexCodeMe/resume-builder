import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import ResumeEditor from "./_components/resume-editor";
import { resumeDataInclude } from "@/lib/types";

export const metadata: Metadata = {
  title: "Design your resume",
};

interface EditorPageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export default async function EditorPage({ searchParams }: EditorPageProps) {
  const { resumeId } = await searchParams;

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;

  return <ResumeEditor resumeToEdit={resumeToEdit} />;
}
